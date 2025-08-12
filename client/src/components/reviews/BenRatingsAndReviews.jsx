import React from "react";
import ReviewsList from "./components/ReviewsList.jsx";
import Ratings from "./components/Ratings.jsx";
import * as styles from "./reviews.module.css";

function BenRatingsAndReviews({ productId }) {
  return (
    <div className="ratings-wrapper">
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