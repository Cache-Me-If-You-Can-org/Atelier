import React, { useState } from 'react';
import * as g from '../../global.module.css';
import * as styles from '../reviews.module.css';

function StarRatingBreakdown({
  ratings,
  totalRatings,
  recommended,
  handleStarFilterClick,
}) {
  const [starFilters, setStarFilters] = useState([]);
  const recommendedPercentage = (Number(recommended?.true)
       / (Number(recommended?.true) + Number(recommended?.false)))
    * 100;

  const roundedRecPercentage = Math.floor(recommendedPercentage);

  const percentages = [];

  Object.entries(ratings || {}).forEach(([key, value], index) => {
    percentages.push({
      index: index + 1,
      width: ((value / totalRatings) * 100).toFixed(2),
    });
  });

  percentages.sort((a, b) => b.index - a.index);

  const addFilter = (rating) => {
    const prevFilters = [...starFilters];

    if (prevFilters.includes(rating)) {
      const index = starFilters.indexOf(rating);
      prevFilters.splice(index, 1);
    } else prevFilters.push(rating);

    setStarFilters(prevFilters);
    handleStarFilterClick(prevFilters);
  };

  const clearFilters = () => {
    setStarFilters([]);
    handleStarFilterClick([]);
  };

  return (
    <div>
      <h4 className={`${styles.recPercentage} ${g.textSm}`}>
        {roundedRecPercentage}
        % of reviews recommend this product
      </h4>
      {starFilters.length
        ? (
          <div className={`${styles.starFiltersWrapper} ${g.textXs}`}>
            {starFilters.sort((a, b) => b - a).map((starFilter, index) => (
              <span key={starFilter}>
                {starFilter}
                &nbsp;Stars
                {index + 1 < 5 ? ',' : null}
                &nbsp;
              </span>
            ))}
            <button className={styles.clearStarFiltersBtn} onClick={() => clearFilters()} type='button'>Clear filters</button>
          </div>
        )
        : (
          null
        )}
      <ul className={styles.ratingsBreakdownList}>
        {percentages.map((percentageListItem) => (
          <li key={crypto.randomUUID()} className={styles.ratingBreakdown}>
            <button
              onClick={() => addFilter(percentageListItem.index)}
              type='button'
              className={
                starFilters.includes(percentageListItem.index)
                  ? `${styles.starFilterSelected} ${styles.starFilterHover}` : `${styles.starFilterHover}`
              }
            >
              <span className={`${styles.starTitle} ${g.textXs}`}>
                {percentageListItem.index}
                &nbsp;stars
              </span>
              <div className={styles.ratingBarWrapper}>
                <span
                  className={styles.ratingPercentage}
                  style={{
                    '--percentageWidth': `${percentageListItem.width}%`,
                  }}
                />
                <span className={styles.ratingBar} />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// style='--percentageWidth: 44.24%;'

export default StarRatingBreakdown;
