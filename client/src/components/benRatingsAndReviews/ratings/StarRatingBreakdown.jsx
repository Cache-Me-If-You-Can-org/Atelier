import React from 'react';
import * as g from '../../global.module.css';
import * as styles from '../reviews.module.css';

function StarRatingBreakdown({ ratings, totalRatings, recommended }) {
  const recommendedPercentage = Number(recommended?.true) / ((Number(recommended?.true) + Number(recommended?.false))) * 100;

  const roundedRecPercentage = Math.floor(recommendedPercentage);

  let percentages = [];

  Object.entries(ratings || {}).forEach(([key, value], index) => {
    percentages.push(
      {
        index: index + 1,
        width: ((value / totalRatings) * 100).toFixed(2),
      },
    );
  });

  percentages.sort((a, b) => b.index - a.index);

  return (
    <div>
      <h4 className={`${styles.recPercentage} ${g.textSm}`}>
        {roundedRecPercentage}
        % of reviews recommend this product
      </h4>
      <ul className={styles.ratingsBreakdownList}>
        {percentages.map((percentageListItem, index) => (
          <li key={index} className={styles.ratingBreakdown}>
            <span className={`${styles.starTitle} ${g.textXs}`}>
              {percentageListItem.index}
              &nbsp;stars
            </span>
            <div className={styles.ratingBarWrapper}>
              <span className={styles.ratingPercentage} style={{ '--percentageWidth': percentageListItem.width + '%' }} />
              <span className={styles.ratingBar} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StarRatingBreakdown;
