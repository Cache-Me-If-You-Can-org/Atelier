import React, { useState, useEffect } from 'react';
import { Gallery, Info } from './components';
import { getSkus, getQtys } from './lib/helpers.js';
import * as g from '../global.module.css';
import axios from 'axios';

function Overview({productId}) {
  const [product, setProduct] = useState(null);
  const [styles, setStyles] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    axios.get(`/products/${productId}`)
         .then(res => {setProduct(res.data); return res.data;})
        //  .then(res => console.log('product: ', res))
         .catch(err => console.log('failed to get product by id', err));

    axios.get(`/products/${productId}/styles`)
         .then(res => {setStyles(res.data.results); return res.data.results;})
        //  .then(res => console.log('styles: ', res))
         .catch(err => console.log('failed to get styles by id', err));
  }, [])

  if (styles === null || product === null) {
    return (<div>loading...</div>);
  }

  return (
    <section id='overview' className={g.container}>
      <div className={g.group}>
        <Gallery
          product={product}
          styles={styles}
          selectedStyle={selectedStyle}
          setIsFullScreen={setIsFullScreen}
        />
        <Info
          product={product}
          styles={styles}
          selectedStyle={selectedStyle}
          isFullScreen={isFullScreen}
          setSelectedStyle={setSelectedStyle}
        />
      </div>
    </section>
  )
}

export default Overview;