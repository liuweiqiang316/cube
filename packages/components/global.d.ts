declare module "vue" {
  export interface GlobalComponents {
    WqInput: typeof import("@llwwqq/components")["WqInput"];
  }

  interface ComponentCustomProperties {}
}

export {};
