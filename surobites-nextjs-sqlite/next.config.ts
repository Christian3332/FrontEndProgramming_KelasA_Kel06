import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // root dikunci ke folder ini, soalnya folder induk juga punya package-lock.json
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
