export const isEllipsis = (el: HTMLElement) => {
  const range = document.createRange();
  range.setStart(el, 0);
  range.setEnd(el, el.childNodes.length);
  const rangeWidth = range.getBoundingClientRect().width;
  const padding =
    (Number.parseInt(el.style.paddingLeft) || 0) +
    (Number.parseInt(el.style.paddingRight) || 0);

  return (
    rangeWidth + padding > el.offsetWidth || el.scrollWidth > el.offsetWidth
  );
};

export default isEllipsis;
