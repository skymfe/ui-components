import { defineConfig } from "vite";
import { extname, relative, resolve } from "path";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { fileURLToPath } from "url";
import { glob } from "glob";
import type { PreRenderedAsset } from "rollup";

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.json",
      include: ["src"],
    }),
    libInjectCss(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ui-components",
      fileName: "ui-components",
      formats: ["es"],
    },
    rollupOptions: {
      external: [],
      output: {
        assetFileNames: (assetInfo: PreRenderedAsset) => {
          if (assetInfo.name?.endsWith(".css")) {
            const componentName = assetInfo.name.replace(".css", "");
            return `styles/${componentName}.css`;
          }
          return "assets/[name][extname]";
        },
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        inlineDynamicImports: false,
      },
      input: Object.fromEntries(
        glob
          .sync("src/**/*.{ts,tsx}", {
            ignore: ["src/**/*.d.ts", "src/**/*.test.ts", "src/**/*.test.tsx"],
          })
          .map((file) => [
            relative("src", file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
    },
    cssCodeSplit: true,
    minify: true,
    sourcemap: true,
  },
});
