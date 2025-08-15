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
  const [productId, setProductId] = useState(null);
  const [product, setProduct] = useState(null);
  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [productRating, setProductRating] = useState(0);

  // assuming we don't get a product id passed to us,
  // use the first product we find
  useEffect(() => {
    axios.get('/products')
      .then((res) => {
        setProductId(res.data[0].id);
      })
      .catch((err) => console.error('failed to get products', err));
  }, []);

  useEffect(() => {
    axios.get(`/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.error('failed to get products', err));
  }, [productId]);

  if (product === null) {
    return (<div>loading...</div>);
  }

  return (
    <div className={[g.stack, g.gapLg].join(' ')}>
      <div className={g.center}>
        {`${totalReviewCount} reviews for product ${productId} with a rating of ${productRating}`}
      </div>
      <Overview productId={productId} product={product} />
      <div className={[g.container, g.stack, g.gapLg].join(' ')}>
        <RelatedAndOutfit
          sectionId='relatedProductsAndOutfit'
          setProductId={setProductId}
          productId={productId}
          product={product}
        />
        <QA product={product} />
        <RatingsAndReviews
          sectionId='ratingsAndReviews'
          productId={productId}
          setTotalReviewCount={setTotalReviewCount}
          setProductRating={setProductRating}
          product={product}
        />
        <BenRatingsAndReviews
          productId={productId}
          product={product}
        />
      </div>
    </div>
  );
}
