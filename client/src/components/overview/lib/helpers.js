function getSkus(style) {
  return Object.keys(style.skus);
}

function getQtys(style, sku) {
  return Array.from({length: style.skus[sku].quantity}, (_, i) => '' + (i + 1));
}

export { getSkus, getQtys };