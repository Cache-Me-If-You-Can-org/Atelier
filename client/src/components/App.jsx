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
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [product, setProduct] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    // We have to reset the states to null so nothing tries to render
    // when we change products
    setProduct(null);
    setRatings(null);

    axios.get('/products')
      .then((res) => {
        setTotalProducts(res.data.length);
        return axios.get(`/products/${res.data[selectedProduct].id}`);
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
      .catch((err) => {
        console.error('failed to get products', err);
      });
  }, [selectedProduct]);

  if (product === null || ratings === null) {
    return (<div>loading...</div>);
  }

  const handleProductSwitch = (direction) => {
    if (direction === 'next' && selectedProduct < totalProducts - 1) {
      setSelectedProduct((prev) => prev + 1);
    } 
    if (direction === 'prev' && selectedProduct > 0) {
      setSelectedProduct((prev) => prev - 1);
    }
  };
  return (
    <div className={[g.stack, g.gapLg].join(' ')}>
      <div className={[g.center, g.stack].join(' ')}>
        {`${totalReviewCount} reviews for product ${product.id} with a rating of ${productRating}`}
        <div className={[g.group, g.gapSm].join(' ')}>
          <button type='button' onClick={() => handleProductSwitch('prev')}>
            prev
          </button>
          <button type='button' onClick={() => handleProductSwitch('next')}>
            next
          </button>
        </div>
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
