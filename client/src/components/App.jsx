import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './overview/Overview';
import RelatedAndOutfit from './RelatedAndOutfit';
import RatingsAndReviews from './ratingsAndReviews/RatingsAndReviews';
import BenRatingsAndReviews from './reviews/BenRatingsAndReviews';
import QA from './QA/index';
import * as g from './global.module.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function App() {
  const [currentProductId, setCurrentProductId] = useState(null);
  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [productRating, setProductRating] = useState(0);

  useEffect(() => {
    axios.get('/products')
      .then((res) => setCurrentProductId(res.data[0].id))
      .catch((err) => console.error('failed to get products', err));
  }, []);

  if (currentProductId === null) {
    return (<div>loading...</div>);
  }

  return (
    <div className={[g.stack, g.gapLg].join(' ')}>
      <div className={g.center}>
        {`${totalReviewCount} reviews for product ${currentProductId} with a rating of ${productRating}`}
      </div>
      <Overview productId={currentProductId} />
      <div className={[g.container, g.stack, g.gapLg].join(' ')}>
        <RelatedAndOutfit
          sectionId='relatedProductsAndOutfit'
          productId={currentProductId}
        />
        <QA currentProductId={currentProductId} />
        <RatingsAndReviews
          sectionId='ratingsAndReviews'
          productId={currentProductId}
          setTotalReviewCount={setTotalReviewCount}
          setProductRating={setProductRating}
        />
        <BenRatingsAndReviews productId={currentProductId} />
      </div>
    </div>
  );
}
