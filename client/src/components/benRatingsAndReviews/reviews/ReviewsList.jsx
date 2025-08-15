import React, { useState, useEffect, useRef } from 'react';
import ReviewTile from './ReviewTile';
import ReviewsServices from '../services/ReviewsServices';
import Reviews from '../controllers/ReviewsStore';
import Modal from '../../shared/Modal';
import AddReview from './addReview/AddReview';
import * as g from '../../global.module.css';
import * as styles from '../reviews.module.css';

function ReviewsList({ productId, meta }) {
  const [reviews, setReviews] = useState([]);
  const firstReviewRef = useRef(0);
  const lastReviewRef = useRef(2);
  const [isOpen, setIsOpen] = useState(false);

  // Get first 2 reviews on first page load
  useEffect(() => {
    ReviewsServices.getReviews(
      productId,
      Reviews.count,
      Reviews.page,
      (data) => {
        Reviews.totalResults = data.results;
        const renderedReviews = data.results.slice(
          firstReviewRef.current,
          lastReviewRef.current,
        );
        setReviews(renderedReviews);
      },
    );

    ReviewsServices.getReviews(
      productId,
      Reviews.count,
      Reviews.page + 1,
      (nextData) => {
        if (nextData.results.length !== 0) {
          Reviews.totalResults = [...data.results, ...nextData.results];
        }
      },
    );
  }, [productId]);

  // Get next two reviews
  const getMoreReviews = () => {
    firstReviewRef.current += 2;
    lastReviewRef.current += 2;

    Reviews.visibleReviews = lastReviewRef.current;

    const nextReviews = Reviews.totalResults.slice(
      firstReviewRef.current,
      lastReviewRef.current,
    );
    const newReviews = [...reviews, ...nextReviews];
    setReviews(newReviews);
  };

  const addNewreview = (reviewData) => {
    ReviewsServices.addReview(reviewData, (response) => {
      console.log(response);
      setIsOpen(false);
    });
  };

  // Scroll to new reviews when two new reviews load
  useEffect(() => {
    if (Reviews.visibleReviews > 2) {
      const reviewContainer = document.getElementById('reviews');
      const lastChild = reviewContainer.lastElementChild;
      const scrollPosition = lastChild.offsetTop + 100;

      if (lastChild) {
        lastChild.scrollIntoView({ behavior: 'smooth', block: 'end' });

        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [reviews]);

  return (
    <div className={styles.reviewsListWrapper}>
      <div id='reviews' className={styles.reviewsList}>
        {reviews.length
          ? reviews.map((review) => (
            <div key={review.review_id} id='review-tile'>
              <ReviewTile review={review} />
            </div>
          ))
          : null}
      </div>
      {reviews.length ? (
        <button
          className={g.textMd}
          id='btn-reviews'
          type='button'
          onClick={() => getMoreReviews()}
        >
          More Reviews
        </button>
      ) : null}
      <button className={g.textMd} type='button' onClick={() => setIsOpen(true)}>Add Review +</button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        Module={(
          <AddReview
            productId={productId}
            handleAddReview={addNewreview}
            meta={meta}
          />
        )}
      />
    </div>
  );
}

export default ReviewsList;
