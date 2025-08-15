import React, { useState } from 'react';

function ReviewsFilters({ totalReviews, filterTotalReviews, handleRelevantSelection }) {
  const [selectedFilter, setSelectedFilter] = useState('relevance');

  const filter = (filterVal) => {
    const currentFilter = filterVal[0];
    if (currentFilter === 'newest') {
      totalReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
      filterTotalReviews(totalReviews);
    } else if (currentFilter === 'helpful') {
      totalReviews.sort((a, b) => (b.helpfulness) - (a.helpfulness));
      filterTotalReviews(totalReviews);
    } else if (currentFilter === 'relevance') {
      handleRelevantSelection();
    }
  };

  return (
    <div>
      <label htmlFor='reviewsFilters'>reviews, sorted by</label>
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
