import { useEffect, useState } from "react";
import axios from "axios";
import Slider from 'react-slick';
import Card from "./Card.jsx";
import settings from "./Carousel.jsx";
import * as styles from './relatedOutfit.module.css';

export default function RelatedProducts({ productId }) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    axios.get(`/products/${productId}/related`)
      .then(res => {
        setRelatedProducts(res.data);
      })
      .catch(err => {
        console.error('error loading related products:', err);
      })
  }, []);

  if (!relatedProducts.length) {
    return (
      <div className={styles.relatedOutfit}>
        Loading elements...
      </div>
    )
  }

  return (
    <div className={styles.relatedOutfit}>
      <Slider {...settings}>
        {relatedProducts.map((id, index) => (
          <Card key={index} productId={id} originalProductId={productId} />
        ))}
      </Slider>
    </div>
  );
};