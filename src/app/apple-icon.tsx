import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Apple touch icon 180×180: mesma marca compacta do favicon, quadrado e
// full-bleed (o iOS aplica a máscara arredondada sozinho; cantos transparentes
// virariam preto na tela inicial), borda externa 1px #1E2D3D.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const bold = await readFile(
    join(process.cwd(), "src/assets/fonts/FiraCode-Bold.woff")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#011627",
          border: "1px solid #1E2D3D",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#43D9AD",
            fontFamily: "Fira Code",
            fontWeight: 700,
            fontSize: 93,
            letterSpacing: "-0.02em",
            marginBottom: 18,
          }}
        >
          .c
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 18,
            background: "#FEA55F",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Fira Code", data: bold, weight: 700, style: "normal" }],
    }
  );
}
