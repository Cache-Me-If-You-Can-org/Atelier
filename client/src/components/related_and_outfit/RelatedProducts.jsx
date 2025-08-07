import { useEffect, useState } from "react";
import axios from "axios";
import Slider from 'react-slick';
import Card from "./Card.jsx";
import settings from "./Carousel.jsx";

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
      <div className="related-outfit">
        Loading elements...
      </div>
    )
  }

  return (
    <div className="related-outfit">
      <Slider {...settings}>
        {relatedProducts.map((id, index) => (
          <Card key={index} productId={id} />
        ))}
      </Slider>
    </div>
  );
};