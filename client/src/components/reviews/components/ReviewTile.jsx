import React from "react";
import StarRating from "./StarRating.jsx";
import * as styles from "../reviews.module.css";

function ReviewsList({ review }) {
  const date = new Date(review.date);

  const year = date.getFullYear();
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate().toString().padStart(2, "0");

  const formattedDate = `${monthName} ${day}, ${year}`;

  return (
    <div className={styles.reviewTileWrapper}>
      <div className={styles.reviewTileHeading}>
        <div className={styles.reviewTileStarRating}>
          <StarRating starRating={review.rating} starSize={18}/>
        </div>
        <div className={styles.reviewTileAuthorship}>
          <span className={styles.reviewTileUserName}>
            {review.reviewer_name},
          </span>
          <span className="review-title__review-date">{formattedDate}</span>
        </div>
      </div>
      <h2 className="review-tile__summary">{review.summary}</h2>
      <p className="review-tile__body">{review.body}</p>
      <p className="review-tile__recommended">✓ I recommend this product</p>
      <div className={styles.reviewTitleResponse}>
        <h3 className={styles.reviewTitleResponseTitle}>Response: </h3>
        <p className="review-title__response-title">{review.response}</p>
      </div>
      <div className="review-tile__helpfulness-footer">
        <p className="review-tile__helpfulness-text">
          <span className="review-tile__helpful-btn">
            Helpful?
            <button type="button">Yes</button>
            {review.helpfulness}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ReviewsList;
