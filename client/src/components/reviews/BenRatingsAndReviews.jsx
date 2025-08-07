import React from 'react';
import ReviewsList from './components/ReviewsList.jsx';

function Ratings({ productId }) {
  return (
    <div className="ratings-wrapper">
      <h1>Ben - Ratings & Reviews Work: </h1>
      <ReviewsList productId={productId}/>
    </div>
  );
}

export default Ratings;
