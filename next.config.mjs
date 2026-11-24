/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: false, // GSAP text-splitting mutates DOM once; avoid double-mount
  images: { unoptimized: true, remotePatterns: [{ protocol: "https", hostname: "softsaro.com.np", pathname: "/uploads/**" }] },
};
