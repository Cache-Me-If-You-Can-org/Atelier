import React, { useState, useEffect } from 'react';
import Gallery from './overview/Gallery.jsx';
import ProductInfo from './overview/ProductInfo.jsx';
import axios from 'axios';

function Overview({productId}) {
  const [product, setProduct] = useState(null);
  const [styles, setStyles] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    axios.get(`/products/${productId}`)
         .then(res => {setProduct(res.data); return res.data;})
         .then(res => console.log('product: ', res))
         .catch(err => console.log('failed to get product by id', err));

    axios.get(`/products/${productId}/styles`)
         .then(res => {setStyles(res.data.results); return res.data.results;})
         .then(res => console.log('styles: ', res))
         .catch(err => console.log('failed to get styles by id', err));
  }, [])

  if (styles === null || product === null) {
    return (<div>loading...</div>);
  }

  return (
    <section id='overview' className='container'>
      <div className='group'>
        <Gallery
          product={product}
          styles={styles}
          selectedStyle={selectedStyle}
          // setSelectedStyle={setSelectedStyle}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
        <ProductInfo
          product={product}
          styles={styles}
          isFullScreen={isFullScreen}
        />
      </div>
    </section>
  )
}

export default Overview;