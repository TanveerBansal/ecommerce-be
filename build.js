import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  packages: "external",
  platform: "node",
  target: "node20",
  outfile: "dist/index.js",
  sourcemap: true,
  format: "esm",
  alias: {
    "@": "./src"
  }
}).catch(() => process.exit(1));