import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.json",
      include: ["src"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "UIComponents",
      fileName: "ui-components",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
