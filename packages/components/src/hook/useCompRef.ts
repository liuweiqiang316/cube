export const useCompRef = <T extends abstract new (...args: any) => any>(_comp: T) => {
  return ref<InstanceType<T>>();
};

export const useCompRef2 = <T extends abstract new (...args: any) => any>() => {
  return ref<InstanceType<T>>();
};


/**
 * 使用:
 * 1. 
 * const a = useComRef(Comp)
 * 2. 
 * const a = useComRef2<typeof Comp>()
 */