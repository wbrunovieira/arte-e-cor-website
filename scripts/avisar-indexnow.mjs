// Avisa Bing, Yandex e outros buscadores do IndexNow que o site mudou.
// Rode depois de publicar: node scripts/avisar-indexnow.mjs
// A chave fica em public/<chave>.txt, servida em https://arteecortintas.com.br/<chave>.txt;
// é assim que o buscador confirma que quem avisou é dono do domínio.
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://arteecortintas.com.br";
const URLS = [`${SITE}/`];

const chave = readdirSync(join(RAIZ, "public"))
  .find((f) => /^[0-9a-f]{8,128}\.txt$/.test(f))
  ?.replace(".txt", "");

if (!chave) {
  console.error("Nenhuma chave do IndexNow em public/. Gere uma com: openssl rand -hex 16 > public/<chave>.txt");
  process.exit(1);
}

// O buscador busca a chave no site antes de aceitar o aviso; se o arquivo não estiver no ar, para aqui.
const noAr = await fetch(`${SITE}/${chave}.txt`);
if (!noAr.ok || (await noAr.text()).trim() !== chave) {
  console.error(`A chave não está publicada em ${SITE}/${chave}.txt. Publique o site antes de avisar.`);
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: chave,
    keyLocation: `${SITE}/${chave}.txt`,
    urlList: URLS,
  }),
});

// 200 e 202 são aceite; 422 costuma ser URL fora do domínio da chave.
console.log(`IndexNow respondeu ${res.status} para ${URLS.length} URL(s).`);
process.exit(res.ok ? 0 : 1);
