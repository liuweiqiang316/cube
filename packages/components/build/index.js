import gulp from "gulp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import less from "gulp-less";
import autoprefixer from "gulp-autoprefixer";
import shell from "shelljs";

const componentPath = resolve(dirname(fileURLToPath(import.meta.url)), "../");

const { src, dest } = gulp;

// 删除打包产物
export const removeDist = async () => {
  shell.rm("-rf", `${componentPath}/dist`);
  // shell.rm("-rf", `${componentPath}/dist/es`);
  // shell.rm("-rf", `${componentPath}/dist/types`);
};

// 构建css
export const buildRootStyle = () => {
  return src(`${componentPath}/src/style.less`)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(dest(`${componentPath}/dist/es`))
    .pipe(dest(`${componentPath}/dist/lib`));
};

// 构建每个组件下单独的css
export const buildStyle = () => {
  return src(`${componentPath}/src/**/style/**.less`)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(dest(`${componentPath}/dist/es`))
    .pipe(dest(`${componentPath}/dist/lib`));
};

// 打包组件
export const buildComponent = async () => {
  shell.cd(componentPath);
  shell.exec("vite build");
};
