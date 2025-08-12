import React, {useState, useEffect} from 'react';
import ReviewsServices from '../services/ReviewsServices.js';
import StarRating from '../reviews/starRating/StarRating.jsx';
import StarRatingBreakdown from './StarRatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import * as styles from '../reviews.module.css';

function Ratings({ productId }) {
const [meta, setMeta] = useState([]);

  useEffect(() => {
    ReviewsServices.getMeta(productId, (meta) => {
      setMeta(meta);
    })
  }, []);

  let starRatings = meta?.ratings;

  const starRatingsArray = Object.entries(starRatings || {});
  const totalScore = starRatingsArray.reduce(
    (sum, [starValue, count]) => sum + Number(starValue) * Number(count),
    0
  );
  const totalRatings = starRatingsArray.reduce(
    (sum, [starValue, count]) => sum + Number(count),
    0
  );

  const averageRating = totalScore > 0 ? totalScore / totalRatings : 0;
  const displayRating = averageRating.toFixed(1);

  return (
    <div>
      <h2 className={styles.ratingsTitle}>Ratings & Reviews</h2>
      <div className={styles.ratingsHeader}>
        <h3 className={styles.ratingsAverage}>{displayRating}</h3>
        <div className={styles.ratingsStars}>
          <StarRating starRating={averageRating} starSize={18}/>
        </div>
      </div>
      <div className={styles.ratingsBreakdown}>
        <StarRatingBreakdown ratings={meta.ratings} totalRatings={totalRatings} recommended={meta.recommended}/>
      </div>
      <div>
        <ProductBreakdown characteristics={meta.characteristics} />
      </div>
    </div>
  );
}

export default Ratings;