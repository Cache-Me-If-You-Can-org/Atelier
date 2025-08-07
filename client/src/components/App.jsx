import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Overview from './Overview.jsx';
import RatingsAndReviews from './RatingsAndReviews.jsx';
import RelatedProducts from './RelatedProducts.jsx';
import Outfit from './Outfit.jsx';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


export default function App() {

  const [currentProductId, setCurrentProductId] = useState(37321);
  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [productRating, setProductRating] = useState(0);

  useEffect(() => {
    // axios.get('/products')
    //      .then(res => setCurrentProductId(res.data[0].id))
    //      .catch(err => console.log('failed to get products', err));
  }, []);

  if (currentProductId === null) {
    return (<div>loading...</div>);
  }

  return (
    <div className="app container">
      Our App!!
      <div className="center">{totalReviewCount} reviews for product {currentProductId} with a rating of {productRating}</div>
      <Overview sectionId={"overview"} productId={currentProductId}/>
      <RelatedProducts sectionId={"relatedProducts"} id={currentProductId}/>
      <Outfit sectionId={"outfit"} />
      <RatingsAndReviews sectionId={"ratingsAndReviews"} productId={currentProductId} setTotalReviewCount={setTotalReviewCount} setProductRating={setProductRating}/>
    </div>
  )
};

