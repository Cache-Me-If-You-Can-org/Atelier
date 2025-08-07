import React, {useState, useEffect} from "react";
//import Ratings from "./Ratings.jsx";
//import ReviewList from "./ReviewList.jsx";
import { Rating } from 'react-simple-star-rating'
import axios from 'axios';


export default function RatingsAndReviews( {sectionId, productId,  setTotalReviewCount } ) {


  const [totalReviews, setTotalReviews] = useState(0);
  const [metaData, setMetaData] = useState({});
  const [rating, setRating] = useState(3.5);


  useEffect(() => {
    getProductMetaData();
    setTotalReviewCount(totalReviews);
  }, [])

  function getProductMetaData () {
    axios.get('/reviews/meta/' , {
      params: { product_id: productId }
    })
    .then((res) => {
      setMetaData(res.data);
      setTotalReviewCount(Object.values(res.data.ratings).reduce((memo,count) => {  return memo += 1 * count;}, 0));

    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(()=> {},[rating])

  const handleRating = (rate) => {
    alert(rate);
    setRating(rate);
  }


  return (
    <section id={sectionId}>
      <title>Ratings & Reviews</title>
      <h3>RATINGES & REVIEWS</h3>
      <p>Product ID {productId}</p>
      {/* <Ratings productId={productId}/> */}
      <div className="group">
        <Rating key={`stars_${rating}`} onClick={handleRating} initialValue={3.5} readonly={false} allowFraction={true} transition={true}/>
        </div>
    </section>
  )
}



