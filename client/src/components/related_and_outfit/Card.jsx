import { useEffect, useState } from "react";
import axios from "axios";

export default function Card({ productId }) {
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState(null);
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    // Fetch basic data (price, name, category)
    axios.get(`/products/${productId}`)
      .then(res => {
        setProduct(res.data);
        // Fetch review data for the time being
        axios.get('/reviews/meta', {
          params: {product_id: productId}
        })
          .then(res => {
            setRatings(res.data.ratings)
            // Fetch images for slide show and thumbnail
            axios.get(`/products/${productId}/styles`)
              .then(res => setProductImages(res.data.results[0].photos))
              .catch(err => console.error('error loading product images:', err));
          })
          .catch(err => console.error('error loading ratings:', err));
      })
      .catch(err => {
        console.error('error loading product by id:', err)
      });
  }, [])

  if (!productImages) {
    return (
      <div className="product-card">
        <p>Loading...</p>
      </div>
    )
  }

  // Get the star unicode for the footer portion of the card
  var stars = Math.round(calculateStars(ratings));

  return (
    <div className="product-card">
      {productImages[0].thumbnail_url ? <ImageWithButton url={productImages[0].thumbnail_url}/> : 'nothing'}
      <div className="product-card-info">
        <p>{product.category.toUpperCase()}</p>
        <h4>{product.name}</h4>
        <small>${product.default_price}</small>
        <p>{stars} stars</p>
      </div>
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

function ImageWithButton({ url }) {
  const [hover, setHover] = useState(false);

  return (
    <div className="img-container">
      <img src={url} />
      <button className="overlay-btn"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? '★' : '☆'}
      </button>
    </div>
  );
};