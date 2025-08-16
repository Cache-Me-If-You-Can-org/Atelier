function getSkus(style) {
  return Object.keys(style.skus);
}

function getQtys(style, sku) {
  return Array.from({ length: style.skus[sku].quantity }, (_, i) => `${i + 1}`);
}

function checkScrollable(element) {
  if (!element) return false;
  const { scrollTop, scrollHeight, clientHeight } = element;
  const isScrollable = scrollHeight > clientHeight;
  const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
  return isScrollable && !isAtBottom;
}


export { getSkus, getQtys, checkScrollable };
