import React, { useState, useEffect } from 'react';
import { StyleSelector, Price, CartForm } from '../components';
import { getSkus, getQtys } from '../lib/helpers.js';
import * as g from '../../global.module.css';
import * as css from '../styles/info.module.css';
import axios from 'axios';

function Info({
  product,
  styles,
  selectedStyle,
  setSelectedStyle,
  isFullScreen,
}) {
  const [sku, setSku] = useState(getSkus(styles[selectedStyle])[0]);
  const [qty, setQty] = useState(getQtys(styles[selectedStyle], sku)[0]);

  const postToCart = () => {
    axios.post('/cart', {sku_id: parseInt(sku)})
         .then(res => console.log('successfully added to cart', res))
         .catch(err => console.log('failed to add to cart', err));
  }
  return (
    <div
      className={css.infoWrapper}
      style={{display: isFullScreen ? 'none' : ''}}
    >
      <div className={`${g.stack} ${css.gap}`}>
        <div>stars</div>
        <div>{product.category.toUpperCase()}</div>
        <h2>{product.name}</h2>
        <Price styles={styles} selectedStyle={selectedStyle} />
        <StyleSelector
          styles={styles}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          setSku={setSku}
          setQty={setQty}
          sku={sku}
        />
        <CartForm
          styles={styles}
          selectedStyle={selectedStyle}
          postToCart={postToCart}
          setSku={setSku}
          setQty={setQty}
          sku={sku}
          qty={qty}
        />
      </div>
    </div>
  )
}

export default Info;