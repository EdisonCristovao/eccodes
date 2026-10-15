import type { MetadataRoute } from "next";
import { AUTHOR, DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${AUTHOR}`,
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#011627",
    theme_color: "#011627",
    icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
