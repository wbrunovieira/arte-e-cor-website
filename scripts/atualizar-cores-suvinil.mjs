// Baixa o catálogo de cores da Suvinil e grava src/lib/cores-suvinil.json.
// Rode com: node scripts/atualizar-cores-suvinil.mjs
// A API é interna da Suvinil (sem documentação pública), por isso guardamos uma cópia
// no projeto: o simulador não pode depender dela no ar.
import { writeFileSync } from "node:fs";

const API = "https://catalog.suvinil.com.br/api/v1/colors?perPage=1000&page=";
const SAIDA = new URL("../src/lib/cores-suvinil.json", import.meta.url);

/** Famílias na ordem em que aparecem na seção de cores. */
const FAMILIAS = ["brancos", "cinzas", "beges", "amarelos", "laranjas", "vermelhos", "rosas", "roxos", "azuis", "verdes"];

function hsl([r, g, b]) {
  const [R, G, B] = [r / 255, g / 255, b / 255];
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const l = (max + min) / 2;
  const d = max - min;
  if (!d) return [0, 0, l * 100];
  const s = d / (1 - Math.abs(2 * l - 1));
  let h;
  if (max === R) h = ((G - B) / d) % 6;
  else if (max === G) h = (B - R) / d + 2;
  else h = (R - G) / d + 4;
  h *= 60;
  if (h < 0) h += 360;
  return [h, s * 100, l * 100];
}

/** Família pela cor, na linguagem de quem escolhe tinta: branco, cinza e bege antes do matiz. */
function familia(rgb) {
  const [h, , l] = hsl(rgb);
  // Croma puro (max - min) separa melhor os quase-brancos que o "saturation" do HSL,
  // que dispara em cores muito claras: #F2E5E2 tem 38% de saturação e só 6% de croma.
  const croma = (Math.max(...rgb) - Math.min(...rgb)) / 255;
  if (croma <= 0.05) return l >= 80 ? "brancos" : "cinzas";
  if (croma <= 0.14 && l >= 80) return "brancos";
  if (croma <= 0.26 && l >= 62 && h >= 15 && h < 75) return "beges";
  if (croma <= 0.18 && l < 62 && h >= 15 && h < 75) return "beges";
  // Vermelho claro é rosa para quem escolhe tinta: o corte é pela clareza, não só pelo matiz.
  if (h >= 300 && h < 345) return "rosas";
  if (h < 12 || h >= 345) return l >= 68 ? "rosas" : "vermelhos";
  if (h < 45) return "laranjas";
  if (h < 70) return "amarelos";
  if (h < 175) return "verdes";
  if (h < 260) return "azuis";
  return "roxos";
}

const cores = [];
for (let page = 1; page <= 10; page++) {
  const res = await fetch(API + page, { headers: { "user-agent": "arte-e-cor-website/1.0 (atualizacao de cores)" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} na página ${page}`);
  const { content } = await res.json();
  cores.push(...content.items);
  if (page >= content.totalPage) break;
}

// Só o Leque de Cores V5, o leque físico atual, e sem metalizadas/especiais.
const semEspeciais = new Set(["Cores Metalizadas", "Glasu!", "Cores Prontas Outras Superfícies"]);
const selecionadas = cores.filter(
  (c) =>
    c.active &&
    (c.colorToColorFans ?? []).some((f) => f.colorFan?.version === "1700") &&
    !(c.colorToColorGroups ?? []).some((g) => semEspeciais.has(g.colorGroup?.name)),
);

const porFamilia = Object.fromEntries(FAMILIAS.map((f) => [f, []]));
for (const c of selecionadas) {
  const rgb = c.rgb.split(",").map(Number);
  const hex = rgb.map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
  porFamilia[familia(rgb)].push([c.name, c.code, `#${hex}`, Math.round(hsl(rgb)[2])]);
}
// Dentro da família, do mais claro para o mais escuro.
for (const f of FAMILIAS) porFamilia[f] = porFamilia[f].sort((a, b) => b[3] - a[3]).map(([nome, codigo, hex]) => [nome, codigo, hex]);

const total = FAMILIAS.reduce((n, f) => n + porFamilia[f].length, 0);
writeFileSync(SAIDA, JSON.stringify({ atualizadoEm: new Date().toISOString().slice(0, 10), total, familias: porFamilia }));
console.log(`${total} cores gravadas em src/lib/cores-suvinil.json`);
for (const f of FAMILIAS) console.log(` ${f}: ${porFamilia[f].length}`);
