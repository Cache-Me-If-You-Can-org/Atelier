import React, { useState, useEffect } from 'react';
import ReviewsList from './reviews/ReviewsList';
import Ratings from './ratings/Ratings';
import ReviewsServices from './services/ReviewsServices';
import * as styles from './reviews.module.css';

function BenRatingsAndReviews({ productId }) {
  const [meta, setMeta] = useState([]);
  useEffect(() => {
    ReviewsServices.getMeta(productId, (metaData) => {
      setMeta(metaData);
    });
  }, [productId]);
  return (
    <div>
      <div className={styles.ratingsAndReviewsLayout}>
        <div className={styles.ratingsWrapper}>
          <Ratings productId={productId} meta={meta} />
        </div>
        <div className={styles.reviewsWrapper}>
          <ReviewsList productId={productId} meta={meta} />
        </div>
      </div>
    </div>
  );
}

export default BenRatingsAndReviews;
