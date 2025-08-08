import React, { useState, useEffect, useRef } from "react";
import ReviewTile from "./ReviewTile.jsx";
import ReviewsServices from "../services/ReviewsServices.js";
import Reviews from "../controllers/ReviewsStore.js";
import * as styles from "../reviews.module.css";

function ReviewsList({ productId }) {
  const [reviews, setReviews] = useState([]);

  const firstReviewRef = useRef(0);
  const lastReviewRef = useRef(2);

  // Get first 2 reviews on first page load
  useEffect(() => {
    ReviewsServices.getReviews(
      productId,
      Reviews.count,
      Reviews.page,
      (data) => {
        Reviews.totalResults = data.results;
        let renderedReviews = data.results.slice(
          firstReviewRef.current,
          lastReviewRef.current
        );
        setReviews(renderedReviews);
      }
    );

    ReviewsServices.getReviews(
      productId,
      Reviews.count,
      Reviews.page + 1,
      (nextData) => {
        if (nextData.results.length !== 0) {
          Reviews.totalResults = [...data.results, ...nextData.results];
        } else {
          return;
        }
      }
    );
  }, []);

  // Scroll to new posts when two new posts load
  useEffect(() => {
    let reviewContainer = document.getElementById("reviews");
    let lastChild = reviewContainer.lastElementChild;

    if (lastChild) {
      lastChild.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [reviews]);

  // Get next two reviews
  const getMoreReviews = () => {
    firstReviewRef.current += 2;
    lastReviewRef.current += 2;

    Reviews.visibleReviews = lastReviewRef.current;

    let nextReviews = Reviews.totalResults.slice(
      firstReviewRef.current,
      lastReviewRef.current
    );
    let newReviews = [...reviews, ...nextReviews];
    setReviews(newReviews);
  };

  return (
    <div className="reviews-list-wrapper">
      <div id="reviews" className={styles.reviewsListWrapper}>
        <h2>Ratings and Reviews List: </h2>
        {reviews.length
          ? reviews.map((review) => (
              <div key={review.review_id} id="review-tile">
                <ReviewTile review={review} />
              </div>
            ))
          : null}
      </div>
      {reviews.length ? (
        <button
          className={styles.btn}
          type="button"
          onClick={() => getMoreReviews()}
        >
          More Reviews
        </button>
      ) : null}
    </div>
  );
}

export default ReviewsList;
