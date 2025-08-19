import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import ReviewTile from './ReviewTile';
import ReviewsFilters from './ReviewsFilters';
import ReviewsServices from '../services/ReviewsServices';
import Reviews from '../controllers/ReviewsStore';
import Modal from '../../shared/Modal';
import AddReview from './addReview/AddReview';
import Sort from './Sort';
import * as g from '../../global.module.css';
import * as styles from '../reviews.module.css';

function ReviewsList({
  productId, meta, starFilters,
}) {
  const [totalReviews, setTotalReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollAction, setScrollAction] = useState(null);
  const firstReviewRef = useRef(0);
  const lastReviewRef = useRef(2);
  const defaultReviewsRef = useRef([]);

  const getRelevant = useCallback(() => {
    ReviewsServices.getReviews(
      productId,
      Reviews.count,
      Reviews.page,
      (data) => {
        const initialTotalReviews = Sort.byRelevance(data.results);
        setTotalReviews(initialTotalReviews);
        const firstTwoReviews = data.results.slice(0, lastReviewRef.current);
        setVisibleReviews(firstTwoReviews);
        defaultReviewsRef.current = initialTotalReviews;
        if (lastReviewRef.current > 2) setScrollAction('top');
      },
    );
  }, [productId]);

  // Get first 2 reviews on first page load
  useEffect(() => {
    getRelevant();
  }, [getRelevant]);

  const filterReviews = (filteredTotal) => {
    setTotalReviews(filteredTotal);
    const updatedVisibleReviews = filteredTotal.slice(0, lastReviewRef.current);
    setVisibleReviews(updatedVisibleReviews);
    setScrollAction('top');
  };

  // Get next two reviews
  const getMoreReviews = () => {
    firstReviewRef.current += 2;
    lastReviewRef.current += 2;

    const nextReviews = totalReviews.slice(
      firstReviewRef.current,
      lastReviewRef.current,
    );
    setVisibleReviews((prev) => [...prev, ...nextReviews]);
    setScrollAction('bottom');
  };

  const addNewreview = (reviewData) => {
    ReviewsServices.addReview(reviewData, (response) => {
      console.log(response);
      setIsOpen(false);
      getRelevant();
    });
  };

  useEffect(() => {
    if (!scrollAction) return;

    const reviewContainer = document.getElementById('reviews');
    const firstChild = reviewContainer.firstElementChild;
    const lastChild = reviewContainer.lastElementChild;
    const scrollPosition = lastChild.offsetTop + 100;

    if (scrollAction === 'top' && firstChild) {
      firstChild.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (scrollAction === 'bottom' && lastChild) {
      lastChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }

    setScrollAction(null);
  }, [visibleReviews, scrollAction]);

  const filteredReviews = visibleReviews.filter((review) => (starFilters.length > 0
    ? starFilters.includes(review.rating) : true));

  return (
    <div className={styles.reviewsListWrapper}>
      <ReviewsFilters
        totalReviews={totalReviews}
        filterTotalReviews={filterReviews}
      />
      <div id='reviews' className={styles.reviewsList}>
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={crypto.randomUUID()} id='review-tile'>
              <ReviewTile review={review} />
            </div>
          ))
        ) : (
          <p className={styles.noReviews}>No reviews to display</p>
        )}
      </div>
      {visibleReviews.length !== totalReviews.length && filteredReviews.length !== 0 ? (
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
