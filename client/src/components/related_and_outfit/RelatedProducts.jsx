import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Card from './Card';
import settings from './Carousel';
import * as styles from './relatedOutfit.module.css';

export default function RelatedProducts({ productId, setSelectedProductId }) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    axios.get(`/products/${productId}/related`)
      .then((res) => {
        setRelatedProducts(res.data);
      })
      .catch((err) => {
        console.error('error loading related products:', err);
      });
  }, [productId]);

  if (!relatedProducts.length) {
    return (
      <div className={styles.relatedOutfit}>
        Loading elements...
      </div>
    );
  }

  return (
    <div className={styles.relatedOutfit}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Slider {...settings}>
        {relatedProducts.map((id) => (
          <Card key={`key-${id}`} productId={id} originalProductId={productId} setSelectedProductId={setSelectedProductId} />
        ))}
      </Slider>
    </div>
  );
}
