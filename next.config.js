/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  images: {
    // AVIF primeiro (~20–30% menor que WebP); WebP para quem não aceita.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400, // 31 dias
  },
  async headers() {
    return [
      {
        // Sem hash no nome: cache de 1 dia e revalidação em segundo plano.
        source: "/imgs/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
