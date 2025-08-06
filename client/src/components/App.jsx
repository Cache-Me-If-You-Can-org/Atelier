import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Overview from './Overview.jsx';

export default function App() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios.get('/products')
         .then(res => setProducts(res.data))
         .catch(err => console.log('failed to get products', err));
  }, []);

  if (products === null) {
    return <div>loading...</div>
  }

  return (
    <div className="app">
      Our App!!
      <Overview product={products[0]}/>
    </div>
  )
};