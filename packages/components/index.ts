import * as components from "./src";
export * from "./src";
import { App } from "vue";

export default {
  install: (app: App) => {
    for (let c in components) {
      // @ts-ignore
      app.use(components[c]);
    }
  },
};
