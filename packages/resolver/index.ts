import type {
  ComponentResolver,
  ComponentResolveResult,
  ComponentResolverObject,
} from "./types";

export const WqResolver = (): ComponentResolver => {
  return {
    type: "component",
    resolve: (name: string): ComponentResolveResult => {
      if (name.startsWith("Wq")) {
        return {
          name,
          from: "@llwwqq/components",
          sideEffects: [
            `@llwwqq/components/es/${name.slice(2)}/style/index.css`,
            `element-plus/es/components/${name
              .slice(2)
              .toLocaleLowerCase()}/style/index.mjs`,
          ],
        };
      }
    },
  } as ComponentResolverObject;
};
