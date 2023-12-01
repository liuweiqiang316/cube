import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import DefineOptions from "unplugin-vue-define-options/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  build: {
    //打包文件目录
    outDir: "es",
    //压缩
    //minify: false,
    rollupOptions: {
      //忽略打包vue文件
      external: ["vue"],
      input: ["index.ts"],
      output: [
        {
          //打包格式
          format: "es",
          //打包后文件名
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          // preserveModules: true,
          exports: "named",
          //配置打包根目录
          dir: "./dist/es",
        },
        {
          //打包格式
          format: "cjs",
          //打包后文件名
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          // preserveModules: true,
          exports: "named",
          //配置打包根目录
          dir: "./dist/lib",
        },
        {
          name: "llwwqq",
          //打包格式
          format: "umd",
          //打包后文件名
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          // preserveModules: true,
          exports: "named",
          //配置打包根目录
          dir: "./dist/umd",
          globals: {
            vue: "vue",
          },
        },
      ],
    },
    lib: {
      entry: "./index.ts",
    },
    commonjsOptions: {
      include: [],
    },
  },
  optimizeDeps: {
    disabled: false,
  },
  plugins: [
    vue(),
    dts({
      entryRoot: "./src",
      outputDir: ["./dist/es/src", "./dist/lib/src"],
      //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
      tsConfigFilePath: "./tsconfig.json",
    }),
    DefineOptions(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  define: {
    __vite_process_env_NODE_ENV: `'${process.env.NODE_ENV}'`,
  },
});
