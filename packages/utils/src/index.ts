export * from "./request";
export * from "./download";
export * from "./isEllipsis";
export * from "./withInstall";

export const isFunction = (val: any) => typeof val === "function";

/**
 * 交换数组两元素
 * @param arr 数组
 * @param i 需要交换元素索引
 * @param j 需要交换元素索引
 * @returns 交换完成后的新数组
 */
export const swapArray = <T>(arr: Array<T>, i: number, j: number) => {
  const temp = [...arr];
  temp[i] = temp.splice(j, 1, temp[i])[0];

  return temp;
};

/**
 * 获取数组中重复的数据
 * @param arr
 * @returns 重复的数据数组
 */
export const getRepeat = <T extends string | number | boolean>(arr: T[]) => {
  let set = [...new Set(arr)];

  return arr.reduce((acc: T[], curr) => {
    if (set.includes(curr)) {
      set = set.filter((item) => item !== curr);

      return acc;
    }

    return [...acc, curr];
  }, []);
};

/**
 * 伪随机颜色
 */
export const randomColor = () =>
  `#${Math.ceil(Math.random() * 16 ** 6).toString(16)}`;
