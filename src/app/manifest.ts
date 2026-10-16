import type { MetadataRoute } from "next";
import { AUTHOR, DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${AUTHOR}`,
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    // Um manifest por site, em inglês (D8); o proxy manda "/" para o idioma certo.
    lang: "en",
    start_url: "/",
    display: "standalone",
    background_color: "#011627",
    theme_color: "#011627",
    icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
