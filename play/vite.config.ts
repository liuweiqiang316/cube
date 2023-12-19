import { defineConfig } from "vite";
import { resolve } from "path";
import DefineOptions from "unplugin-vue-define-options/vite";
import vueDevtools from "vite-plugin-vue-devtools";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { WqResolver } from "@llwwqq/resolver";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    vueDevtools(),
    AutoImport({
      resolvers: [WqResolver()],
    }),
    Components({
      resolvers: [WqResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@/": resolve(__dirname, "./src/"),
    },
  },
  server: {
    host: true,
  },
});
