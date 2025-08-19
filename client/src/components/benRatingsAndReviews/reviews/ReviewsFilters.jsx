import React, { useState } from 'react';
import Sort from './Sort';
import * as g from '../../global.module.css';
import * as styles from '../reviews.module.css';

function ReviewsFilters({ totalReviews, filterTotalReviews }) {
  const [selectedFilter, setSelectedFilter] = useState('relevance');
  const safeReviews = Array.isArray(totalReviews) ? totalReviews : [];

  const filter = (filterVal) => {
    const currentFilter = filterVal[0];

    if (currentFilter === 'newest') {
      filterTotalReviews(Sort.byNewest(totalReviews));
    } else if (currentFilter === 'helpful') {
      filterTotalReviews(Sort.byHelpfulness(totalReviews));
    } else if (currentFilter === 'relevance') {
      filterTotalReviews(Sort.byRelevance(totalReviews));
    }
  };

  return (
    <div className={styles.reviewsFilter}>
      <label className={`${styles.reviewsFilterTitle} ${g.textMd}`} htmlFor='reviewsFilters'>
        {safeReviews.length}
        &nbsp;
        reviews, sorted by&nbsp;
      </label>
      <select
        value={selectedFilter}
        onChange={(e) => {
          const options = [...e.target.selectedOptions];
          const value = options.map((option) => option.value);
          setSelectedFilter(value);
          filter(value);
        }}
        name='reviewsFilters'
        id='reviewsFilters'
      >
        <option value='relevance'>Relevance</option>
        <option value='newest'>Newest</option>
        <option value='helpful'>Helpful</option>
      </select>
    </div>
  );
}

export default ReviewsFilters;
