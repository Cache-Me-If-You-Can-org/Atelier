import React, { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx';
import ReviewsServices from '../services/ReviewsServices.js';
import Reviews from '../controllers/ReviewsStore.js';
/* eslint-disable react/prop-types */

function ReviewsList({productId}) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    ReviewsServices.getReviews(productId, Reviews.count, Reviews.page, (data) => {
      setReviews(data.results);
    });
  }, []);

  const getMoreReviews = () => {
    Reviews.page += 1;
    ReviewsServices.getReviews(productId, Reviews.count, Reviews.page, (data) => {
      setReviews(data.results);
    });
  };

  return (
    <div className="reviews-list-wrapper">
      <h2>Ratings and Reviews List: </h2>
      {reviews.map((review) => (
        <ReviewTile key={review.review_id} review={review} />
      ))}
      <button type="button" onClick={() => getMoreReviews()}>More Reviews</button>
    </div>
  );
}

export default ReviewsList;
