import React, { useState } from 'react';
import TruncatedText from './TruncatedText';
import QuarterStarRating from '../../shared/QuarterStarRating';
import ReviewsServices from '../services/ReviewsServices';
import Modal from '../../shared/Modal';
import Image from '../../shared/Image';
import * as g from '../../global.module.css';
import * as styles from '../reviews.module.css';

function ReviewsList({ review }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reported, setReported] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulness, setHelpfulness] = useState(review.helpfulness);
  const [url, setUrl] = useState(null);
  const date = new Date(review.date);

  const year = date.getUTCFullYear();
  const monthName = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  const day = date.getUTCDate().toString().padStart(2, '0');

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
  function expandPhoto(photo) {
    setIsOpen(true);
    setUrl(photo);
  }
  return (
    <div className={styles.reviewTileWrapper}>
      <div className={styles.reviewTileHeading}>
        <div className={styles.reviewTileStarRating}>
          <QuarterStarRating rating={review.rating} size={18} />
        </div>
        <div className={g.textXs}>
          <span className={styles.reviewTileUserName}>
            {review.reviewer_name}
            ,
          </span>
          <span>{formattedDate}</span>
        </div>
      </div>
      <h2 className={`${styles.reviewTileSummary} ${g.textMd}`}>{review.summary}</h2>
      <TruncatedText text={review.body} />
      {review.photos.length > 0
        ? (
          <div className={styles.photoContainer}>
            {review.photos.map((photo) => (
              <div key={photo.id}>
                <button type='button' onClick={() => setIsOpen(true)}>
                  <Image
                    onClick={() => expandPhoto(photo.url)}
                    className={styles.reviewPhotoSm}
                    src={photo.url}
                  />
                </button>
              </div>
            ))}
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              Module={
                <Image className={styles.reviewPhotoLg} src={url} />
              }
            />
          </div>
        )
        : null}
      {review.recommend ? <p className={`${styles.reviewTileRecommend} ${g.textSm}`}>✓ I recommend this product</p> : null}
      {review.response ? (
        <div className={`${styles.reviewTitleResponse} ${g.textSm}`}>
          <h3 className={`${styles.reviewTitleResponseTitle} ${g.textSm}`}>Response from seller: </h3>
          <p className={g.textSm}>{review.response}</p>
        </div>
      ) : null}
      <div className={`${styles.reviewTilesHelpfulSection} ${g.textXs}`}>
        <p>
          Helpful?
          <span>
            <button className={g.textXs} onClick={() => handleHelpfulClick(review.review_id)} disabled={isHelpful} type='button'>Yes</button>
            (
            {helpfulness}
            )
          </span>
          <span>
            <button className={g.textXs} onClick={() => handleReportClick(review.review_id)} disabled={reported} type='button'>{reported ? 'Review reported' : 'Report'}</button>
          </span>
        </p>
      </div>
    </div>
  );
}

export default ReviewsList;
