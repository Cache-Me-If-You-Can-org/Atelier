import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card.jsx";
import settings from "./Carousel.jsx";
import Slider from 'react-slick';
axios.defaults.baseURL = 'http://localhost:3000';

export default function RelatedProducts({ id }) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    //either using axios or props, get the outfit data
    console.log('beginning to load related data...')
    axios.get(`/products/${id}/related`)
      .then(res => {
        setRelatedProducts(res.data);
      })
      .catch(err => {
        console.error('error loading related products:', err);
      })
  }, []);

  console.log('products', relatedProducts);

  if (!relatedProducts.length) {
    console.log('length', relatedProducts.length);
    return (
      <div className="related">
        Loading elements...
      </div>
    )
  }

  return (
    <div className="related">
      <Slider {...settings}>
        {relatedProducts.map((id, index) => (
          <Card key={index} product_id={id} />
        ))}
      </Slider>
    </div>
  );
};