import React from 'react';
import ReviewsList from './reviews/ReviewsList';
import Ratings from './ratings/Ratings';
import * as styles from './reviews.module.css';

function BenRatingsAndReviews({ productId }) {
  return (
    <div>
      <div className={styles.ratingsAndReviewsLayout}>
        <div className={styles.ratingsWrapper}>
          <Ratings productId={productId} />
        </div>
        <div className={styles.reviewsWrapper}>
          <ReviewsList productId={productId} />
        </div>
      </div>
    </div>
  );
}

export default BenRatingsAndReviews;
