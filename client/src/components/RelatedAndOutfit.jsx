import React from 'react';
import RelatedProducts from './related_and_outfit/RelatedProducts';
import Outfit from './related_and_outfit/Outfit';

export default function RelatedAndOutfit({ productId, sectionId, setSelectedProductId }) {
  return (
    <section id={sectionId}>
      RELATED PRODUCTS
      <RelatedProducts productId={productId} setSelectedProductId={setSelectedProductId} />
      YOUR OUTFIT
      <Outfit productId={productId} setSelectedProductId={setSelectedProductId} />
    </section>
  );
}
