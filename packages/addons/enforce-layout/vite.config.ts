import { defineConfig } from "vite";
import path from "path";
import typescript from "@rollup/plugin-typescript";
import react from "@vitejs/plugin-react";
import { name } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    build: {
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: name,
        formats: ["es", "umd"],
        fileName: (format) => `main.${format}.js`,
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "slate",
          "slate-react",
          "slate-history",
          "@editorial/core",
        ],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            slate: "slate",
            "slate-react": "slatereact",
            "slate-history": "slatehistory",
            "@editorial/core": "reactchiefeditor"
          },
        },
      },
    },
    plugins: [
      ...(command === "serve"
        ? [react()]
        : [
            typescript({
              outputToFilesystem: false,
              rootDir: path.resolve(__dirname, "src"),
              declaration: true,
              declarationDir: path.resolve(__dirname, "dist"),
              exclude: path.resolve("./node_modules/**"),
              sourceMap: true,
            }),
          ]),
    ],
  };
});
