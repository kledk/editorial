import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/

export default defineConfig(({ command }) => {
  const modules = [
    { name: "@editorial/core", path: "core" },
    { name: "@editorial/presentation", path: "presentation" },
    { name: "@editorial/text", path: "addons/text/paragraph" },
    { name: "@editorial/enforce-layout", path: "addons/enforce-layout" },
    {
      name: "@editorial/ui-block-insert-side-control",
      path: "ui/block-insert-side-control",
    },
    {
      name: "@editorial/ui-placeholder-hint",
      path: "ui/placeholder-hint",
    },
    {
      name: "@editorial/ui-text",
      path: "ui/text",
    },
    {
      name: "@editorial/ui-toolbar-hover",
      path: "ui/toolbar-hover",
    },
    {
      name: "@editorial/ui-toolbars",
      path: "ui/toolbars",
    },
    {
      name: "@editorial/ui",
      path: "ui/ui",
    },
  ];
  const alias = Object.fromEntries(
    modules.map((m) => [m.name, resolve(__dirname, `../${m.path}/src`)])
  );
  console.log(alias);
  return {
    optimizeDeps: {
      link: modules.map((m) => m.name),
    },
    rollupOptions: {
      external: modules.map((m) => m.name),
    },
    resolve: {
      alias,
    },
    plugins: [react()],
  };
});
