import React, { useState } from 'react';
import TruncatedText from './TruncatedText';
import QuarterStarRating from '../../shared/QuarterStarRating';
import ReviewsServices from '../services/ReviewsServices';
import Modal from '../../shared/Modal';
import Image from '../../shared/Image';
import * as styles from '../reviews.module.css';

function ReviewsList({ review }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reported, setReported] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulness, setHelpfulness] = useState(review.helpfulness);
  const date = new Date(review.date);

  const year = date.getFullYear();
  const monthName = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate().toString().padStart(2, '0');

  const formattedDate = `${monthName} ${day}, ${year}`;

  const handleHelpfulClick = (id) => {
    ReviewsServices.markReviewAsHelpful(id, () => {
      setIsHelpful(true);
      setHelpfulness(helpfulness + 1);
    });
  };

  const handleReportClick = (id) => {
    ReviewsServices.reportReview(id, () => {
      setReported(true);
    });
  };

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
      <TruncatedText text={review.body} />
      <div className={styles.photoContainer}>
        {review.photos.map((photo) => (
          <div key={photo.id}>
            <button type='button' onClick={() => setIsOpen(true)}>
              <Image className={styles.reviewPhotoSm} src={photo.url} />
            </button>
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              Module={
                <Image className={styles.reviewPhotoLg} src={photo.url} />
              }
            />
          </div>
        ))}
      </div>
      {review.recommend ? <p>✓ I recommend this product</p> : null}
      {review.response ? (
        <div className={styles.reviewTitleResponse}>
          <h3 className={styles.reviewTitleResponseTitle}>Response from seller: </h3>
          <p>{review.response}</p>
        </div>
      ) : null}
      <div>
        <p>
          <span>
            Helpful?
            <button onClick={() => handleHelpfulClick(review.review_id)} disabled={isHelpful} type='button'>Yes</button>
            (
            {helpfulness}
            )
          </span>
          <span>
            <button onClick={() => handleReportClick(review.review_id)} disabled={reported} type='button'>{reported ? 'Review reported' : 'Report'}</button>
          </span>
        </p>
      </div>
    </div>
  );
}

export default ReviewsList;
