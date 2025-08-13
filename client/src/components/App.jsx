import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './overview/Overview';
import RelatedAndOutfit from './RelatedAndOutfit';
import RatingsAndReviews from './ratingsAndReviews/RatingsAndReviews';
import BenRatingsAndReviews from './benRatingsAndReviews/BenRatingsAndReviews';
import QA from './QA/index';
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

  const topText = `${totalReviewCount} reviews for product ${currentProductId} with a rating of ${productRating}`;
  return (
    <div className='app container'>
      <div className='center'>
        {topText}
      </div>
      <Overview sectionId='overview' productId={currentProductId} />
      <RelatedAndOutfit sectionId='relatedProductsAndOutfit' productId={currentProductId} />
      <QA currentProductId={currentProductId} />
      <RatingsAndReviews sectionId='ratingsAndReviews' productId={currentProductId} setTotalReviewCount={setTotalReviewCount} setProductRating={setProductRating} />
      <BenRatingsAndReviews productId={currentProductId} />
    </div>
  );
}
