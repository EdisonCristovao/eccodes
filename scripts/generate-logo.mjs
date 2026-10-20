// Gera o wordmark "EC.c▌" (spec 1.1) com o texto convertido em <path> (não
// depende de fonte instalada em quem abre o SVG), em duas versões (item 19):
//   public/imgs/logo.svg       — fundo #011627 com raio 8px, cores do site
//   public/imgs/logo-light.svg — sem fundo, para fundo claro (README/tema claro)
//
// Uso (na raiz do projeto, uma vez; os SVGs gerados ficam versionados):
//   node scripts/generate-logo.mjs
//
// Fontes: src/assets/fonts/FiraCode-Bold.woff (OFL, ver OFL.txt na mesma pasta).
import satori from "satori";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const WIDTH = 176;
const HEIGHT = 64;
const FONT_SIZE = 42; // cap-height ≈ 28px em Fira Code
const CURSOR_HEIGHT = 32;

// Versão clara: mesmos matizes, escurecidos até o contraste pedido sobre
// branco e sobre o #F6F8FA do GitHub (texto AA ≥ 4,5:1; cursor ≥ 3:1).
const variants = [
  {
    file: "logo.svg",
    background: "#011627",
    color: { ec: "#ffffff", dot: "#43D9AD", cursor: "#FEA55F" },
  },
  {
    file: "logo-light.svg",
    background: undefined,
    color: { ec: "#011627", dot: "#1A8062", cursor: "#E96701" },
  },
];

const bold = await readFile(join(root, "src/assets/fonts/FiraCode-Bold.woff"));

for (const { file, background, color } of variants) {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: WIDTH,
          height: HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background,
          borderRadius: 8,
          fontFamily: "Fira Code",
          fontWeight: 700,
          fontSize: FONT_SIZE,
          letterSpacing: "-0.02em",
        },
        children: [
          { type: "span", props: { style: { color: color.ec }, children: "EC" } },
          { type: "span", props: { style: { color: color.dot }, children: ".c" } },
          {
            type: "div",
            props: {
              style: {
                width: 2,
                height: CURSOR_HEIGHT,
                marginLeft: "0.12em",
                background: color.cursor,
              },
            },
          },
        ],
      },
    },
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [{ name: "Fira Code", data: bold, weight: 700, style: "normal" }],
    }
  );

  const out = join(root, "public/imgs", file);
  await writeFile(out, svg + "\n");
  console.log(`wrote ${out} (${svg.length} bytes)`);
}
