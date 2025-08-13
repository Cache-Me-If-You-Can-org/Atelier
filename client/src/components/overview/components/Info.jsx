import React, { useState } from 'react';
import axios from 'axios';
import StyleSelector from './StyleSelector';
import Price from './Price';
import CartForm from './CartForm';
import { getSkus, getQtys } from '../lib/helpers';
import * as g from '../../global.module.css';
import * as css from '../styles/info.module.css';

function Info({
  product,
  styles,
  selectedStyle,
  setSelectedStyle,
  isFullScreen,
}) {
  const [skuId, setSkuId] = useState(getSkus(styles[selectedStyle])[0]);
  const [qty, setQty] = useState(getQtys(styles[selectedStyle], skuId)[0]);

  const postToCart = () => {
    axios.post('/cart', JSON.stringify({ sku_id: parseInt(skuId, 10) }), { headers: { 'Content-Type': 'application/json' } })
      .then((res) => console.log('successfully added to cart', res))
      .catch((err) => console.error('failed to add to cart', err));
  };
  return (
    <div
      className={css.infoWrapper}
      style={{ display: isFullScreen ? 'none' : '' }}
    >
      <div className={[g.stack, g.gapMd].join(' ')}>
        <div>stars</div>
        <p className={[g.textMd, g.upper].join(' ')}>{product.category}</p>
        <h2 className={[g.textLg, g.bold].join(' ')}>{product.name}</h2>
        <Price styles={styles} selectedStyle={selectedStyle} />
        <StyleSelector
          styles={styles}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          setSkuId={setSkuId}
          setQty={setQty}
          skuId={skuId}
        />
        <CartForm
          styles={styles}
          selectedStyle={selectedStyle}
          postToCart={postToCart}
          setSkuId={setSkuId}
          setQty={setQty}
          skuId={skuId}
          qty={qty}
        />
      </div>
    </div>
  );
}

export default Info;
