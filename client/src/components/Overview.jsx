import React, { useState, useEffect } from 'react';
import Gallery from './overview/Gallery.jsx';
import ProductInfo from './overview/ProductInfo.jsx';
import axios from 'axios';

function Overview({productId}) {
  const [product, setProduct] = useState(null);
  const [styles, setStyles] = useState(null);

  useEffect(() => {
    axios.get(`/products/${productId}`)
         .then(res => setProduct(res.data))
         .catch(err => console.log('failed to get product by id', err));

    axios.get(`/products/${productId}/styles`)
         .then(res => setStyles(res.data))
         .catch(err => console.log('failed to get styles by id', err));
  }, [])

  return (
    <div className='container'>
      <div className='group'>
        <Gallery product={product} styles={styles}/>
        <ProductInfo product={product} styles={styles}/>
      </div>
    </div>
  )
}

export default Overview;