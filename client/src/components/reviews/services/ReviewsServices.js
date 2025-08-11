import axios from "axios";

const api = axios.create({
  // TODO: Change this for deployment:
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

const ReviewsServices = {
  getReviews: (productId, count, page, callback) => {
    api
      .get(`/reviews/`, {
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
    api
      .get ('/reviews/meta/', {
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
};

export default ReviewsServices;
