import { useEffect, useState } from "react";
import axios from "axios"
axios.defaults.baseURL = 'http://localhost:3000';

export default function Card({ product_id }) {
  const [product, setProduct] = useState(null);
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    axios.get(`/products/${product_id}`)
      .then(res => {
        setProduct(res.data);
        axios.get(`/reviews/meta`, {
          params: {product_id: product_id}
        })
          .then(res => setRatings(res.data.ratings))
          .catch(err => console.error('error loading ratings:', err));
      })
      .catch(err => {
        console.error('error loading product by id:', err)
      });
  }, [])

  if (!ratings) {
    return (
      <div className="product-card" style={{ minHeight: 150 }}>
        <p>Loading...</p>
      </div>
    )
  }

  // Get the star unicode for the footer portion of the card
  var stars = Math.round(calculateStars(ratings));
  console.log('stars', stars);

  return (
    <div className="product-card" style={{ minHeight: 150 }}>
      <p>{product.category}</p>
      <h4>{product.name}</h4>
      <small>${product.default_price}</small>
      <p>{stars} stars</p>
    </div>
  )
}

function calculateStars(ratings) {
  // Puts the string amounts of each rating
  // in a single place
  var allRatings = [
    ratings['1'],
    ratings['2'],
    ratings['3'],
    ratings['4'],
    ratings['5']
  ]
  var averageRating = findAverage(allRatings);
  return averageRating;
}

// Uses the amount of each rating times the value of that
// rating divided by the amount of each rating to get the average
function findAverage(strings) {
  var total = 0;
  for (var i = 0; i < strings.length; i++) {
    total += Number(strings[i]) * 1;
  }

  var valueTotal = 0;
  for (var i = 0; i < strings.length; i++) {
    valueTotal += Number(strings[i]) * (i + 1);
  }

  return valueTotal / total;
}