import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Overview from './Overview.jsx';
import Reviews from './Reviews.jsx';

export default function App() {

  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    axios.get('/products')
         .then(res => setCurrentProductId(res.data[0].id))
         .catch(err => console.log('failed to get products', err));
  }, []);

  if (currentProductId === null) {
    return (<div>loading...</div>);
  }

  return (
    <div className="app">
      Our App!!
      <Overview productId={currentProductId}/>
      <Reviews productId={currentProductId}/>
    </div>
  )
};