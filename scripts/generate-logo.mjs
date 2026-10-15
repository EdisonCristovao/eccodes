// Gera public/imgs/logo.svg — o wordmark "EC.c▌" (spec 1.1) com o texto
// convertido em <path> (não depende de fonte instalada em quem abre o SVG).
//
// Uso (na raiz do projeto, uma vez; o SVG gerado fica versionado):
//   node scripts/generate-logo.mjs
//
// Fontes: src/assets/fonts/FiraCode-Bold.woff (OFL, ver OFL.txt na mesma pasta).
import satori from "satori";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const WIDTH = 160;
const HEIGHT = 48;
const FONT_SIZE = 42; // cap-height ≈ 28px em Fira Code
const color = { white: "#ffffff", green: "#43D9AD", orange: "#FEA55F" };

const bold = await readFile(join(root, "src/assets/fonts/FiraCode-Bold.woff"));

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
        fontFamily: "Fira Code",
        fontWeight: 700,
        fontSize: FONT_SIZE,
        letterSpacing: "-0.02em",
      },
      children: [
        { type: "span", props: { style: { color: color.white }, children: "EC" } },
        { type: "span", props: { style: { color: color.green }, children: ".c" } },
        {
          type: "div",
          props: {
            style: {
              width: 2,
              height: 32, // y de 8 a 40
              marginLeft: "0.12em",
              background: color.orange,
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

const out = join(root, "public/imgs/logo.svg");
await writeFile(out, svg + "\n");
console.log(`wrote ${out} (${svg.length} bytes)`);
