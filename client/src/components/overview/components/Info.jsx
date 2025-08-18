import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StyleSelector from './StyleSelector';
import Price from './Price';
import CartForm from './CartForm';
import QuarterStarRating from '../../shared/QuarterStarRating';
import { calculateStars, getReviewCount } from '../../lib/helpers';
import * as g from '../../global.module.css';
import * as css from '../styles/info.module.css';

function Info({
  product,
  styles,
  selectedStyle,
  setSelectedStyle,
  isFullScreen,
  ratings,
}) {
  const [skuId, setSkuId] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setSkuId(null);
    setQty(1);
  }, [selectedStyle]);

  const postToCart = () => {
    if (skuId) {
      return axios.post(
        '/cart',
        JSON.stringify({ sku_id: Number(skuId) }),
        { headers: { 'Content-Type': 'application/json' } },
      );
    }
    return new Error('no selected sku');
  };

  return (
    <div
      className={css.infoWrapper}
      style={{ display: isFullScreen ? 'none' : '' }}
    >
      <div className={[g.stack, g.gapMd].join(' ')}>
        <div className={[g.group, g.gapSm, g.alignCenter].join(' ')}>
          <QuarterStarRating rating={calculateStars(ratings)} />
          <a
            className={g.textSm}
            href='#ratingsAndReviews'
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('ratingsAndReviews').scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          >
            {`Read all ${getReviewCount(ratings)} reviews`}
          </a>
        </div>
        <div className={g.stack}>
          <p className={[g.textMd, g.upper].join(' ')}>{product.category}</p>
          <h2 className={[g.textLg, g.bold].join(' ')}>{product.name}</h2>
        </div>
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
