import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Favicon 32×32: aba ativa em miniatura — ".c" verde sobre o fundo do editor,
// barra laranja na base (10% da altura). Só ".c": em 16/32px "EC.c" não é legível.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
          borderRadius: 4,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#43D9AD",
            fontFamily: "Fira Code",
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: "-0.02em",
            marginBottom: 3,
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
            height: 3,
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
