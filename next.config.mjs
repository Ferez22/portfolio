import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Post renamed: marketing-harness -> content-studio-free (2026-11-06) -> content-studio (2026-11-09, open source).
    return [
      { source: "/:lang/blog/marketing-harness", destination: "/:lang/blog/content-studio", permanent: true },
      { source: "/blog/marketing-harness", destination: "/en/blog/content-studio", permanent: true },
      { source: "/:lang/blog/content-studio-free", destination: "/:lang/blog/content-studio", permanent: true },
      { source: "/blog/content-studio-free", destination: "/en/blog/content-studio", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
