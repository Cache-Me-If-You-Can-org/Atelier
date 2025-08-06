import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card.jsx";
import settings from "./Carousel.jsx";
import Slider from 'react-slick';
axios.defaults.baseURL = 'http://localhost:3000';

export default function RelatedProducts({ id }) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    axios.get(`/products/${id}/related`)
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
          <Card key={index} product_id={id} />
        ))}
      </Slider>
    </div>
  );
};