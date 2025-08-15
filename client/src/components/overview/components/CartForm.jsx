import React from 'react';
import { Plus } from '@phosphor-icons/react';
import Select from './Select';
import { getSkus, getQtys } from '../lib/helpers';
import * as g from '../../global.module.css';
import * as css from '../styles/cart_form.module.css';

function CartForm({
  styles,
  selectedStyle,
  setSkuId,
  setQty,
  skuId,
  qty,
  postToCart,
}) {
  return (
    <>
      <div className={[g.group, g.gapSm, g.fullWidth].join(' ')}>
        <Select
          className={css.fill}
          options={getSkus(styles[selectedStyle]).map((sku) => (
            {
              label: styles[selectedStyle].skus[sku].size,
              value: sku,
            }
          ))}
          onChange={(value) => setSkuId(value)}
          value={skuId}
        />
        <Select
          options={getQtys(styles[selectedStyle], skuId).map((amount) => (
            {
              label: amount,
              value: amount,
            }
          ))}
          onChange={(value) => setQty(value)}
          value={qty}
        />
      </div>
      <div className={[g.group, css.gap].join(' ')}>
        <button
          type='submit'
          className={[g.center, g.sb, css.fill].join(' ')}
          onClick={postToCart}
        >
          Add to bag
          <Plus className={g.textMd} weight='bold' />
        </button>
      </div>
    </>
  );
}

export default CartForm;
