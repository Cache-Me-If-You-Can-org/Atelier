import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReviewTile from './ReviewTile';
import ReviewsFilters from './ReviewsFilters';
import ReviewsServices from '../services/ReviewsServices';
import Reviews from '../controllers/ReviewsStore';
import Modal from '../../shared/Modal';
import AddReview from './addReview/AddReview';
import * as g from '../../global.module.css';
import * as styles from '../reviews.module.css';

function ReviewsList({ productId, meta, starFilters }) {
  const [totalReviews, setTotalReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const firstReviewRef = useRef(0);
  const lastReviewRef = useRef(2);
  const [isOpen, setIsOpen] = useState(false);
  const defaultReviewsRef = useRef([]);

  const getRelevant = useCallback(() => {
    ReviewsServices.getReviews(
      productId,
      Reviews.count,
      Reviews.page,
      (data) => {
        const initialTotalReviews = data.results;
        setTotalReviews(initialTotalReviews);
        const firstTwoReviews = data.results.slice(0, lastReviewRef.current);
        setVisibleReviews(firstTwoReviews);
        defaultReviewsRef.current = initialTotalReviews;
      },
    );
  }, [productId]);

  // Get first 2 reviews on first page load
  useEffect(() => {
    getRelevant();
  }, [getRelevant]);

  const filterReviews = (filteredTotal) => {
    setTotalReviews(filteredTotal);
    const updatedVisibleReviews = totalReviews.slice(0, lastReviewRef.current);
    setVisibleReviews(updatedVisibleReviews);
  };

  // Get next two reviews
  const getMoreReviews = () => {
    firstReviewRef.current += 2;
    lastReviewRef.current += 2;

    const nextReviews = totalReviews.slice(
      firstReviewRef.current,
      lastReviewRef.current,
    );
    const newReviews = [...visibleReviews, ...nextReviews];
    setVisibleReviews(newReviews);
  };

  const addNewreview = (reviewData) => {
    ReviewsServices.addReview(reviewData, (response) => {
      console.log(response);
      setIsOpen(false);
    });
  };

  // Scroll to new reviews when two new reviews load
  useEffect(() => {
    if (visibleReviews.length > 2) {
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
  }, [visibleReviews]);

  return (
    <div className={styles.reviewsListWrapper}>
      <p>{starFilters}</p>
      <ReviewsFilters
        totalReviews={totalReviews}
        filterTotalReviews={filterReviews}
        handleRelevantSelection={getRelevant}
      />
      <div id='reviews' className={styles.reviewsList}>
        {visibleReviews.length
          ? visibleReviews
            .filter((review) => (starFilters.length > 0
              ? starFilters.includes(review.rating) : (review)
            ))
            .map((review) => (
              <div key={review.review_id} id='review-tile'>
                <ReviewTile review={review} />
              </div>
            ))
          : null}
      </div>
      {visibleReviews.length ? (
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
