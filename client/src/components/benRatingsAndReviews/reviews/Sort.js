const Sort = {
  byRelevance: (reviews) => {
    const now = new Date();

    const maxHelpfulness = Math.max(...reviews.map((r) => r.helpfulness || 0));
    const maxDays = Math.max(
      ...reviews.map((r) => (now - new Date(r.date)) / (1000 * 60 * 60 * 24)),
    );

    return [...reviews]
      .map((review) => {
        const helpScore = maxHelpfulness ? review.helpfulness / maxHelpfulness : 0;
        const ageDays = (now - new Date(review.date)) / (1000 * 60 * 60 * 24);
        const recencyScore = maxDays ? 1 - ageDays / maxDays : 0;
        const relevanceScore = helpScore * 0.7 + recencyScore * 0.3;
        return { ...review, relevanceScore };
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  },

  byNewest: (reviews) => [...reviews].sort((a, b) => {
    const dateDiff = new Date(b.date) - new Date(a.date);
    if (dateDiff !== 0) return dateDiff;
    return b.review_id - a.review_id; // tie-breaker
  }),

  byHelpfulness: (reviews) => [...reviews].sort((a, b) => b.helpfulness - a.helpfulness),

};

export default Sort;
