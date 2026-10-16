import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { pages } from "@/dictionaries/pages";
import { LOCALES, type Locale } from "@/lib/i18n";
import { localeFromParams } from "@/lib/site";

// OG image 1200×630: janela de editor com a aba "EC.c", gutter numerado,
// código colorido e o wordmark no canto inferior direito. Um PNG por idioma
// (mesmo layout; `role` e `alt` do dicionário), prerenderizado.
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const size = { width: 1200, height: 630 };
const contentType = "image/png";

// `alt` por idioma só é possível via generateImageMetadata (o export `alt`
// é estático). O id entra na URL: /<lang>/opengraph-image/editor.
export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string };
}) {
  const lang = await localeFromParams(Promise.resolve(params));
  return [{ id: "editor", alt: pages[lang].og.alt, size, contentType }];
}

const color = {
  bg: "#011627",
  lines: "#1E2D3D",
  grey: "#6F8BA8",
  blue: "#7C88DD",
  green: "#43D9AD",
  nude: "#E99287",
  orange: "#FEA55F",
  white: "#ffffff",
};

const SAFE = 72; // margem de segurança (LinkedIn/WhatsApp cortam as bordas)
const CODE_SIZE = 34;
const LINE_HEIGHT = CODE_SIZE * 1.6;

type Token = { text: string; color: string };
const codeLines = (lang: Locale): Token[][] => [
  [{ text: "// edison.cristovao.codes", color: color.grey }],
  [
    { text: "const ", color: color.blue },
    { text: "developer", color: color.green },
    { text: " = {", color: color.white },
  ],
  [
    { text: "  name: ", color: color.white },
    { text: '"Edison Cristovão"', color: color.nude },
    { text: ",", color: color.white },
  ],
  [
    { text: "  role: ", color: color.white },
    { text: `"${pages[lang].og.role}"`, color: color.nude },
    { text: ",", color: color.white },
  ],
  [{ text: "};", color: color.white }],
  [], // linha 6: só o cursor
];

async function loadFonts() {
  const dir = join(process.cwd(), "src/assets/fonts");
  const [regular, bold] = await Promise.all([
    readFile(join(dir, "FiraCode-Regular.woff")),
    readFile(join(dir, "FiraCode-Bold.woff")),
  ]);
  return [
    { name: "Fira Code", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Fira Code", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = await localeFromParams(params);
  const lines = codeLines(lang);
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: color.bg,
          color: color.white,
          fontFamily: "Fira Code",
          fontSize: CODE_SIZE,
          position: "relative",
        }}
      >
        {/* barra de título com a aba ativa */}
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            height: 64,
            borderBottom: `1px solid ${color.lines}`,
            paddingLeft: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  background: color.lines,
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginLeft: 40,
              padding: "0 28px",
              borderLeft: `1px solid ${color.lines}`,
              borderRight: `1px solid ${color.lines}`,
              borderBottom: `3px solid ${color.orange}`,
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <div style={{ display: "flex" }}>
              <span style={{ color: color.white }}>EC</span>
              <span style={{ color: color.green }}>.c</span>
            </div>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: color.grey,
              }}
            />
          </div>
        </div>

        {/* editor: gutter + código */}
        <div style={{ display: "flex", flex: 1 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 88,
              paddingTop: SAFE - 64 + 8,
              borderRight: `1px solid ${color.lines}`,
              color: color.grey,
              fontSize: 28,
            }}
          >
            {lines.map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  height: LINE_HEIGHT,
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: SAFE - 64 + 8,
              paddingLeft: 32,
            }}
          >
            {lines.map((tokens, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  height: LINE_HEIGHT,
                  alignItems: "center",
                  whiteSpace: "pre",
                }}
              >
                {tokens.map((token, j) => (
                  <span key={j} style={{ color: token.color }}>
                    {token.text}
                  </span>
                ))}
                {tokens.length === 0 && (
                  <div
                    style={{
                      width: 3,
                      height: CODE_SIZE * 1.1,
                      background: color.orange,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* wordmark */}
        <div
          style={{
            position: "absolute",
            right: SAFE,
            bottom: SAFE,
            display: "flex",
            alignItems: "center",
            fontSize: 70,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: color.white }}>EC</span>
          <span style={{ color: color.green }}>.c</span>
          <div
            style={{
              width: 4,
              height: 70 * 1.1,
              marginLeft: "0.12em",
              background: color.orange,
            }}
          />
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
