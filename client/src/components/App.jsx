import { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './Overview.jsx';
//import Reviews from './Reviews.jsx';
import RelatedProducts from './RelatedProducts.jsx';
import Outfit from './Outfit.jsx';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function App() {

  const [currentProductId, setCurrentProductId] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios.get('/products')
      .then(res => {
        setCurrentProductId(res.data[0].id);
        setProducts(res.data);
      })
      .catch(err => console.log('failed to get products', err))
  }, []);

  if (currentProductId === null) {
    return (<div>loading...</div>);
  }

  return (
    <div className="app container">
      Our App!!
      <Overview productId={currentProductId}/>
      <RelatedProducts id={currentProductId}/>
      <Outfit />
      {/* <Reviews productId={currentProductId}/> */}
    </div>
  )
};