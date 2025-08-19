import axios from 'axios';

const ReviewsServices = {
  getReviews: (productId, count, page, callback) => {
    axios
      .get('/reviews/', {
        params: {
          product_id: productId,
          count,
          page,
        },
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  getMeta: (productId, callback) => {
    axios
      .get('/reviews/meta/', {
        params: {
          product_id: productId,
        },
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  addReview: (reviewData, callback) => {
    axios
      .post('/reviews', reviewData)
      .then((response) => {
        callback(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  markReviewAsHelpful: (reviewId, callback) => {
    axios
      .put(`/reviews/${reviewId}/helpful`)
      .then((response) => {
        callback(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  reportReview: (reviewId, callback) => {
    axios
      .put(`/reviews/${reviewId}/report`)
      .then((response) => {
        callback(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
};

export default ReviewsServices;
