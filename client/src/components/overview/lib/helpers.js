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

function getInStockSkus(style) {
  return Object.keys(style.skus).filter(sku => style.skus[sku].quantity > 0);
}

function hasInStockItems(style) {
  return getInStockSkus(style).length > 0;
}

function getQtysWithLimit(style, sku) {
  if (!sku || !style.skus[sku]) return [];
  const maxQty = Math.min(style.skus[sku].quantity, 15);
  return Array.from({ length: maxQty }, (_, i) => `${i + 1}`);
}

export { getSkus, getQtys, checkScrollable, getInStockSkus, hasInStockItems, getQtysWithLimit };
