// Recoloração de paredes 100% no navegador (canvas). Nenhuma imagem sai do aparelho.

export type Rgb = [number, number, number];

export function parseHex(value: string): Rgb | null {
  const hex = value.trim().replace(/^#/, "");
  const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as Rgb;
}

export function toHex([r, g, b]: Rgb) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

async function toBitmapSource(src: string | Blob): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof src !== "string") return createImageBitmap(src, { imageOrientation: "from-image" });
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  await img.decode();
  return img;
}

/** Carrega a imagem reduzida para no máximo `maxSide` px e devolve os pixels. */
export async function loadPixels(src: string | Blob, maxSide = 1400): Promise<ImageData> {
  const source = await toBitmapSource(src);
  const w0 = source.width;
  const h0 = source.height;
  const scale = Math.min(1, maxSide / Math.max(w0, h0));
  const w = Math.round(w0 * scale);
  const h = Math.round(h0 * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(source, 0, 0, w, h);
  if ("close" in source) source.close();
  return ctx.getImageData(0, 0, w, h);
}

/** Lê uma máscara PNG (canal alfa) no tamanho da imagem de trabalho. */
export async function loadMask(src: string, width: number, height: number): Promise<Float32Array> {
  const px = await loadPixels(src, Math.max(width, height) * 4);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  const tmp = document.createElement("canvas");
  tmp.width = px.width;
  tmp.height = px.height;
  tmp.getContext("2d")!.putImageData(px, 0, 0);
  ctx.drawImage(tmp, 0, 0, width, height);
  const data = ctx.getImageData(0, 0, width, height).data;
  const mask = new Float32Array(width * height);
  for (let i = 0; i < mask.length; i++) mask[i] = data[i * 4 + 3] / 255;
  return mask;
}

function lum(r: number, g: number, b: number) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

const suavizadas = new WeakMap<ImageData, Uint8ClampedArray>();

// Cópia desfocada (5x5) usada só para decidir a seleção: fios e rejuntes finos deixam de "cortar" a parede.
function suavizada(img: ImageData) {
  const pronta = suavizadas.get(img);
  if (pronta) return pronta;
  const { width: w, height: h, data } = img;
  const r = 2;
  const tmp = new Float32Array(w * h * 3);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sr = 0, sg = 0, sb = 0, n = 0;
      for (let k = -r; k <= r; k++) {
        const xx = Math.min(w - 1, Math.max(0, x + k));
        const i = (y * w + xx) * 4;
        sr += data[i]; sg += data[i + 1]; sb += data[i + 2]; n++;
      }
      const o = (y * w + x) * 3;
      tmp[o] = sr / n; tmp[o + 1] = sg / n; tmp[o + 2] = sb / n;
    }
  }
  const out = new Uint8ClampedArray(w * h * 4);
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let sr = 0, sg = 0, sb = 0, n = 0;
      for (let k = -r; k <= r; k++) {
        const yy = Math.min(h - 1, Math.max(0, y + k));
        const o = (yy * w + x) * 3;
        sr += tmp[o]; sg += tmp[o + 1]; sb += tmp[o + 2]; n++;
      }
      const i = (y * w + x) * 4;
      out[i] = sr / n; out[i + 1] = sg / n; out[i + 2] = sb / n; out[i + 3] = 255;
    }
  }
  suavizadas.set(img, out);
  return out;
}

/**
 * Seleção por semelhança de cor a partir do ponto tocado (flood fill).
 * A diferença de luminosidade pesa menos que a de cor, para a seleção atravessar sombras e luz na mesma parede.
 */
export function floodSelect(img: ImageData, x: number, y: number, tolerance: number): Uint8Array {
  const { width: w, height: h } = img;
  const data = suavizada(img);
  const region = new Uint8Array(w * h);
  const sx = Math.min(w - 1, Math.max(0, Math.round(x)));
  const sy = Math.min(h - 1, Math.max(0, Math.round(y)));

  let sr = 0, sg = 0, sb = 0, n = 0;
  for (let dy = -2; dy <= 2; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      const px = sx + dx, py = sy + dy;
      if (px < 0 || py < 0 || px >= w || py >= h) continue;
      const i = (py * w + px) * 4;
      sr += data[i]; sg += data[i + 1]; sb += data[i + 2]; n++;
    }
  }
  sr /= n; sg /= n; sb /= n;
  const sL = lum(sr, sg, sb);
  const sCr = sr - sL;
  const sCb = sb - sL;
  const limit = (tolerance * 2.55) ** 2;

  const matches = (p: number) => {
    const i = p * 4;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const L = lum(r, g, b);
    const dL = (L - sL) * 0.45;
    const dCr = r - L - sCr;
    const dCb = b - L - sCb;
    return dL * dL + dCr * dCr * 1.4 + dCb * dCb * 1.4 <= limit;
  };

  const stack = [sy * w + sx];
  region[sy * w + sx] = 1;
  while (stack.length) {
    const p = stack.pop()!;
    const px = p % w;
    const neighbors = [px > 0 ? p - 1 : -1, px < w - 1 ? p + 1 : -1, p - w, p + w];
    for (const q of neighbors) {
      if (q < 0 || q >= w * h || region[q]) continue;
      if (matches(q)) {
        region[q] = 1;
        stack.push(q);
      }
    }
  }
  return region;
}

/** Suaviza a borda da seleção (fecha pequenos furos e desfoca 1px) e junta com a máscara atual. */
export function mergeRegion(mask: Float32Array, region: Uint8Array, w: number, h: number) {
  const dilated = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x;
      if (region[p] || (x > 0 && region[p - 1]) || (x < w - 1 && region[p + 1]) || (y > 0 && region[p - w]) || (y < h - 1 && region[p + w])) {
        dilated[p] = 1;
      }
    }
  }
  const out = new Float32Array(mask);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const p = y * w + x;
      let s = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) s += dilated[p + dy * w + dx];
      const v = s / 9;
      if (v > out[p]) out[p] = v;
    }
  }
  return out;
}

/** Aplica a cor preservando a luz da foto: sombras continuam sombras, textura continua textura. */
export function recolor(img: ImageData, mask: Float32Array, color: Rgb, out: ImageData) {
  const src = img.data;
  const dst = out.data;
  const [tr, tg, tb] = color;

  let sum = 0, weight = 0;
  for (let p = 0; p < mask.length; p += 3) {
    const m = mask[p];
    if (m <= 0) continue;
    const i = p * 4;
    sum += lum(src[i], src[i + 1], src[i + 2]) * m;
    weight += m;
  }
  const mean = weight > 0 ? sum / weight : 128;

  for (let p = 0; p < mask.length; p++) {
    const i = p * 4;
    const m = mask[p];
    if (m <= 0.002) {
      dst[i] = src[i]; dst[i + 1] = src[i + 1]; dst[i + 2] = src[i + 2]; dst[i + 3] = 255;
      continue;
    }
    const f = Math.min(1.75, lum(src[i], src[i + 1], src[i + 2]) / mean) ** 0.85;
    dst[i] = src[i] * (1 - m) + Math.min(255, tr * f) * m;
    dst[i + 1] = src[i + 1] * (1 - m) + Math.min(255, tg * f) * m;
    dst[i + 2] = src[i + 2] * (1 - m) + Math.min(255, tb * f) * m;
    dst[i + 3] = 255;
  }
}
