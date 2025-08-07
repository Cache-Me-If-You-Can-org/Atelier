import { useEffect, useState } from "react";
import axios from "axios";

export default function Card({ productId }) {
  const [product, setProduct] = useState(null);
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    axios.get(`/products/${productId}`)
      .then(res => {
        setProduct(res.data);
        axios.get(`/reviews/meta`, {
          params: {product_id: productId}
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