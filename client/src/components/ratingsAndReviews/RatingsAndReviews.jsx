import React, {useState, useEffect} from "react";
import Ratings from "./Ratings.jsx";
//import ReviewList from "./ReviewList.jsx";
import { Rating } from 'react-simple-star-rating'
import axios from 'axios';


export default function RatingsAndReviews( {sectionId, productId,  setTotalReviewCount, setProductRating } ) {


  const [totalReviews, setTotalReviews] = useState(0);
  const [metaData, setMetaData] = useState({});
  const [rating, setRating] = useState(0);


  useEffect(() => {
    getProductMetaData();
   }, [])

  useEffect(() => {},[rating]);

  function getProductMetaData () {
    axios.get('/reviews/meta/' , {
      params: { product_id: productId }
    })
    .then((res) => {
      setMetaData(res.data);
      return res.data;
    })
    .then((metaData) => {
      let reviewCount = 0;
      let productRating = 0;
      for( let key in metaData.ratings) {
        reviewCount += 1*metaData.ratings[key];
        productRating += key * metaData.ratings[key];
      }
      productRating /= reviewCount;
      setTotalReviews(reviewCount);
      setTotalReviewCount(reviewCount);
      setProductRating((productRating * 10 | 0) / 10 );
      setRating((productRating * 10 | 0) / 10);

    })
    .catch((err) => {
      console.log(err);
    });
  };

  let stars = ["5", "4", "3", "2", "1"];
  let characteristics = [
    {
      name: "Size",
      "1": "A size too small",
      "2": "",
      "3": "Perfect",
      "4": "",
      "5": "A size too wide"
    },
    {
      name: "Width",
      "1": "Too narrow",
      "2": "",
      "3": "Perfect",
      "4": "",
      "5": "Too wide"
    },
    {
      name: "Comfort",
      "1": "Uncomfortable",
      "2": "",
      "3": "Ok",
      "4": "",
      "5": "Perfect"
    },
    {
      name: "Quality",
      "1": "Poor",
      "2": "Below average",
      "3": "What I expected",
      "4": "Pretty great",
      "5": "Perfect"
    },
    {
      name: "Length",
      "1": "Runs short",
      "2": "Runs slightly short",
      "3": "Perfect",
      "4": "Runs slightly",
      "5": "Runs long"
    },
    {
      name: "Fit",
      "1": "Runs short",
      "2": "Runs slightly short",
      "3": "Perfect",
      "4": "Runs slightly",
      "5": "Runs long"
    },
  ];

  return (
    <section id={sectionId}>
      <title>Ratings & Reviews</title>
      <h3>RATINGS & REVIEWS</h3>

      <div className="group">
         <Ratings productId={productId} metaData={metaData} totalReviews={totalReviews} rating={rating} stars={stars} ranges={characteristics}/>
         {/* <ReviewList productId={productId} totalReviews={totalReviews} stars={stars} ranges={characteristics}/> */}

      </div>
    </section>
  )
}



      //  <Rating key={`stars_${rating}`} onClick={handleRating} initialValue={3.5} readonly={false} allowFraction={true} transition={true}/>
