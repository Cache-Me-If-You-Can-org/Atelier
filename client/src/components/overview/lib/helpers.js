function getSkus(style) {
  return Object.keys(style.skus);
}

function getQtys(style, sku) {
  return Array.from({ length: style.skus[sku].quantity }, (_, i) => `${i + 1}`);
}

function getScrollIndicators(element) {
  if (!element) return { showTop: false, showBottom: false };
  
  const { scrollTop, scrollHeight, clientHeight } = element;
  const showTop = scrollTop > 0;
  const showBottom = scrollHeight - scrollTop - clientHeight > 1;
  
  return { showTop, showBottom };
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

function formatSizeOptions(style) {
  if (!hasInStockItems(style)) return [];
  
  const inStockSkus = getInStockSkus(style);
  return inStockSkus.map((sku) => ({
    label: style.skus[sku].size,
    value: sku,
  }));
}

function formatQuantityOptions(style, skuId) {
  if (!skuId || !hasInStockItems(style)) return [];
  
  return getQtysWithLimit(style, skuId).map((amount) => ({
    label: amount,
    value: amount,
  }));
}

function scrollToImageInContainer(containerRef, imageIndex) {
  if (!containerRef.current) return;

  const container = containerRef.current;
  const photos = container.children;
  
  if (imageIndex < 0 || imageIndex >= photos.length) return;

  const targetPhoto = photos[imageIndex];
  const containerRect = container.getBoundingClientRect();
  const photoRect = targetPhoto.getBoundingClientRect();

  const isAboveView = photoRect.top < containerRect.top;
  const isBelowView = photoRect.bottom > containerRect.bottom;

  if (isAboveView || isBelowView) {
    targetPhoto.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }
}

export { 
  getSkus, 
  getQtys, 
  getScrollIndicators,
  getInStockSkus, 
  hasInStockItems, 
  getQtysWithLimit,
  formatSizeOptions,
  formatQuantityOptions,
  scrollToImageInContainer,
};