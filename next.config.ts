import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker imajı için bağımsız (standalone) çıktı
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  experimental: {
    // İstemci paketini küçük tutmak için paket importlarını optimize et
    optimizePackageImports: ["sortablejs"],
  },
  async headers() {
    return [
      {
        // Ürün/kategori görselleri sık değişmez; uzun süreli cache.
        source: "/img/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
