import React, {useState, useEffect} from "react";
// import Ratings from "./Ratings.jsx";
// import ReviewList from "./ReviewList.jsx";
import { Rating } from 'react-simple-star-rating'
import axios from 'axios';


export default function RatingsAndReviews( {sectionId, productId,  setTotalReviewCount, setProductRating } ) {


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

      let reviewCount = 0;
      let productRating = 0;
      for( let key in res.data.ratings) {
        reviewCount += 1*res.data.ratings[key];
        productRating += key * res.data.ratings[key];
      }
      productRating /= reviewCount;

      setTotalReviewCount(reviewCount);
      setProductRating((productRating * 10 | 0) / 10 );



    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(()=> {},[rating])

  // const handleRating = (rate) => {
  //   alert(rate);
  //   setRating(rate);
  // }


  return (
    <section id={sectionId}>
      <title>Ratings & Reviews</title>
      <h3>RATINGES & REVIEWS</h3>
      <p>Product ID {productId}</p>
      {/* <Ratings productId={productId} meta={metaData} totalReviews={totalReviews}/> */}
      <div className="group">
        {/* <Rating key={`stars_${rating}`} onClick={handleRating} initialValue={3.5} readonly={false} allowFraction={true} transition={true}/> */}
        </div>
    </section>
  )
}



