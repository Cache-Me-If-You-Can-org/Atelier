import React, { useState, useEffect } from 'react';
import { Select } from '../components';
import { getSkus, getQtys } from '../lib/helpers.js';
import { Plus } from '@phosphor-icons/react';
import * as g from '../../global.module.css';
import * as css from '../styles/cart_form.module.css';

function CartForm({
  styles,
  selectedStyle,
  setSku,
  setQty,
  sku,
  qty,
  postToCart
}) {
  return (
    <>
      <div className={`${g.group} ${css.gap}`}>
        <Select
          className={css.fill}
          options={getSkus(styles[selectedStyle]).map(sku => (
            {
              label: styles[selectedStyle].skus[sku].size,
              value: sku
            }
          ))}
          onChange={(value) => setSku(value)}
          value={sku}
        />
        <Select
          options={getQtys(styles[selectedStyle], sku).map(amount => (
            {
              label: amount,
              value: amount
            }
          ))}
          onChange={(value) => setQty(value)}
          value={qty}
        />
      </div>
      <div className={`${g.group} ${css.gap}`}>
        <button
          className={`${g.center} ${g.sb} ${css.fill}`}
          onClick={postToCart}
        >
          Add to bag
          <Plus size={15}/>
        </button>
      </div>
    </>
  )
}

export default CartForm;