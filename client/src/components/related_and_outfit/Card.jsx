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
        return axios.get('/reviews/meta', {
          params: {product_id: productId}
        })
      })
      .then(res => {
        setRatings(res.data.ratings)
        // Fetch images for slide show and thumbnail
        return axios.get(`/products/${productId}/styles`)
      })
      .then(res => setProductImages(res.data.results[0].photos))
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
      <ImageWithButton url={productImages[0].thumbnail_url ? productImages[0].thumbnail_url : 'https://blocks.astratic.com/img/general-img-landscape.png'}/>
      <div className="product-card-info">
        <small>{product.category.toUpperCase()}</small>
        <h4>{product.name}</h4>
        <small>${product.default_price}</small>
        <p>{stars} stars</p>
      </div>
    </div>
  )
}

function ImageWithButton({ url }) {
  const [hover, setHover] = useState(false);

  return (
    <div className="thumbnail-square" style={{height: 200}}>
      <img className="thumbnail-image" src={url} style={{objectPosition: 'center bottom'}}/>
      <button className="overlay-btn"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? '★' : '☆'}
      </button>
    </div>
  );
};

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


// /* The Modal (background) */
// .modal {
//   display: none; /* Hidden by default */
//   position: fixed; /* Stay in place */
//   z-index: 1; /* Sit on top */
//   padding-top: 100px; /* Location of the box */
//   left: 0;
//   top: 0;
//   width: 100%; /* Full width */
//   height: 100%; /* Full height */
//   overflow: auto; /* Enable scroll if needed */
//   background-color: rgb(0,0,0); /* Fallback color */
//   background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
// }

// /* Modal Content */
// .modal-content {
//   background-color: var(--color-bg);
//   margin: auto;
//   padding: 20px;
//   border: 1px solid var(--color-border);
//   width: 80%;
// }

// /* The Close Button */
// .close {
//   color: #aaaaaa;
//   float: right;
//   font-size: 28px;
//   font-weight: bold;
// }

// .close:hover,
// .close:focus {
//   color: #000;
//   text-decoration: none;
//   cursor: pointer;
// }


// <button id="myBtn">Open Modal</button>

// <div id="myModal" class="modal">

//   <div class="modal-content">
//     <span class="close">&times;</span>
//     <p>Some text in the Modal..</p>
//   </div>

// </div>

// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
// </script>

// </body>
// </html>
