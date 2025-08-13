import React from 'react';
import QuarterStarRating from '../../shared/QuarterStarRating';
import * as styles from '../reviews.module.css';

function ReviewsList({ review }) {
  const date = new Date(review.date);

  const year = date.getFullYear();
  const monthName = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate().toString().padStart(2, '0');

  const formattedDate = `${monthName} ${day}, ${year}`;

  return (
    <div className={styles.reviewTileWrapper}>
      <div className={styles.reviewTileHeading}>
        <div className={styles.reviewTileStarRating}>
          <QuarterStarRating rating={review.rating} size={18} />
        </div>
        <div className={styles.reviewTileAuthorship}>
          <span className={styles.reviewTileUserName}>
            {review.reviewer_name}
            ,
          </span>
          <span>{formattedDate}</span>
        </div>
      </div>
      <h2>{review.summary}</h2>
      <p>{review.body}</p>
      <p>✓ I recommend this product</p>
      <div className={styles.reviewTitleResponse}>
        <h3 className={styles.reviewTitleResponseTitle}>Response: </h3>
        <p>{review.response}</p>
      </div>
      <div>
        <p>
          <span>
            Helpful?
            <button type='button'>Yes</button>
            {review.helpfulness}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ReviewsList;
