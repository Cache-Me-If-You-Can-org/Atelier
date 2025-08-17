import React from 'react';
import { Plus } from '@phosphor-icons/react';
import Select from './Select';
import { getInStockSkus, hasInStockItems, getQtysWithLimit } from '../lib/helpers';
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
  const currentStyle = styles[selectedStyle];
  const inStockSkus = getInStockSkus(currentStyle);
  const hasStock = hasInStockItems(currentStyle);

  const handleSizeChange = (value) => {
    setSkuId(value);
    setQty(1);
  };

  const sizeOptions = hasStock 
    ? inStockSkus.map((sku) => ({
        label: currentStyle.skus[sku].size,
        value: sku,
      }))
    : [];

  const qtyOptions = skuId && hasStock
    ? getQtysWithLimit(currentStyle, skuId).map((amount) => ({
        label: amount,
        value: amount,
      }))
    : [];

  return (
    <>
      <div className={[g.group, g.gapMd, g.fullWidth].join(' ')}>
        <Select
          className={css.fill}
          onChange={handleSizeChange}
          value={skuId || ''}
          options={sizeOptions}
          placeholder={hasStock ? 'Select Size' : 'OUT OF STOCK'}
          disabled={!hasStock}
        />
        <Select
          onChange={(value) => setQty(value)}
          value={skuId ? qty : ''}
          options={qtyOptions}
          placeholder={skuId ? qty : '-'}
          disabled={!skuId}
        />
      </div>
      <div className={[g.group, css.gap].join(' ')}>
        <button
          type='submit'
          className={[g.center, g.sb, css.fill].join(' ')}
          onClick={postToCart}
          disabled={!skuId}
        >
          Add to bag
          <Plus className={g.textMd} weight='bold' />
        </button>
      </div>
    </>
  );
}

export default CartForm;
