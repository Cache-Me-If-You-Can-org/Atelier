import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './overview/Overview';
import RelatedAndOutfit from './RelatedAndOutfit';
import RatingsAndReviews from './ratingsAndReviews/RatingsAndReviews';
import BenRatingsAndReviews from './benRatingsAndReviews/BenRatingsAndReviews';
import QA from './QA/index';
import * as g from './global.module.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function App() {
  const [product, setProduct] = useState(null);
  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [ratings, setRatings] = useState(null);

  // assuming we don't get a product id passed to us,
  // use the first product we find
  useEffect(() => {
    axios.get('/products')
      .then((res) => {
        return axios.get(`/products/${res.data[0].id}`);
      })
      .then((res) => {
        setProduct(res.data);
        return axios.get('/reviews/meta', {
          params: { product_id: res.data.id },
        });
      })
      .then((res) => {
        setRatings(res.data.ratings);
      })
      .catch((err) => console.error('failed to get products', err));
  }, []);

  if (product === null || ratings === null) {
    return (<div>loading...</div>);
  }

  return (
    <div className={[g.stack, g.gapLg].join(' ')}>
      <div className={g.center}>
        {`${totalReviewCount} reviews for product ${product.id} with a rating of ${productRating}`}
      </div>
      <Overview product={product} ratings={ratings} />
      <div className={[g.container, g.stack, g.gapLg].join(' ')}>
        <RelatedAndOutfit
          sectionId='relatedProductsAndOutfit'
          productId={product.id}
          product={product}
        />
        <QA product={product} />
        <RatingsAndReviews
          sectionId='ratingsAndReviews'
          productId={product.id}
          setTotalReviewCount={setTotalReviewCount}
          setProductRating={setProductRating}
          product={product}
        />
        <BenRatingsAndReviews
          productId={product.id}
          product={product}
        />
      </div>
    </div>
  );
}
