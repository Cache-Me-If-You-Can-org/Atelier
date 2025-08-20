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

export default function App({ productId }) {
  // replaces [selectedProduct, setSelectedProduct]
  const [selectedProductId, setSelectedProductId] = useState(productId);
  const [product, setProduct] = useState(null);
  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [ratings, setRatings] = useState(null);
  const [meta, setMeta] = useState(null);

  const fetchMeta = () => (
    axios.get('/reviews/meta', {
      params: { product_id: product.id },
    })
      .then((res) => {
        setMeta(res.data);
        setRatings(res.data.ratings);
      })
      .catch((err) => {
        console.error('failed to fetch meta', err);
      })
  );

  useEffect(() => {
    // We have to reset the states to null so nothing tries to render
    // when we change products
    setProduct(null);
    setRatings(null);
    axios.get(`/products/${selectedProductId}`)
      .then((res) => {
        setProduct(res.data);
        return axios.get('/reviews/meta', {
          params: { product_id: res.data.id },
        });
      })
      .then((res) => {
        setMeta(res.data);
        setRatings(res.data.ratings);
      })
      .catch((err) => {
        console.error('failed to get products', err);
      });
  }, [selectedProductId]);

  if (product === null || ratings === null) {
    return (<div>loading...</div>);
  }

  return (
    <div className={[g.stack, g.gapLg].join(' ')}>
      <Overview product={product} ratings={ratings} />
      <div className={[g.containerMd, g.stack, g.gapLg].join(' ')}>
        <RelatedAndOutfit
          sectionId='relatedProductsAndOutfit'
          productId={product.id}
          product={product}
          setSelectedProductId={setSelectedProductId}
        />
        <QA product={product} />
        <RatingsAndReviews
          sectionId='ratingsAndReviews'
          productName={product.name}
          meta={meta}
        />
        <BenRatingsAndReviews
          productId={product.id}
          productName={product.name}
          ratings={ratings}
          fetchMeta={fetchMeta}
        />
      </div>
    </div>
  );
}
