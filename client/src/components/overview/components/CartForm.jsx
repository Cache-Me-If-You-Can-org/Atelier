import React, { useState, useEffect } from 'react';
import { Plus, Check } from '@phosphor-icons/react';
import Select from './Select';
import { hasInStockItems, formatSizeOptions, formatQuantityOptions } from '../lib/helpers';
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
  const [showSizeMessage, setShowSizeMessage] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isSizeSelectOpen, setIsSizeSelectOpen] = useState(false);

  const currentStyle = styles[selectedStyle];
  const hasStock = hasInStockItems(currentStyle);

  useEffect(() => {
    if (skuId) {
      setShowSizeMessage(false);
    }
  }, [skuId]);

  useEffect(() => {
    resetAllStates();
  }, [selectedStyle]);

  const resetAllStates = () => {
    setShowSizeMessage(false);
    setIsAddedToCart(false);
    setIsSizeSelectOpen(false);
  };

  const handleSizeSelection = (value) => {
    setSkuId(value);
    setQty(1);
  };

  const handleQuantitySelection = (value) => {
    setQty(Number(value));
  };

  const promptSizeSelection = () => {
    setShowSizeMessage(true);
    setIsSizeSelectOpen(true);
  };

  const handleAddToCartClick = () => {
    if (!skuId) {
      promptSizeSelection();
      return;
    }
    postToCart()
      .then(() => {
        setIsAddedToCart(true);
        setTimeout(() => setIsAddedToCart(false), 2000);
      })
      .catch((error) => {
        console.error('Failed to add to cart:', error);
      });
  };

  const renderOutOfStockView = () => (
    <div className={[g.group, g.gapMd, g.fullWidth].join(' ')}>
      <Select
        className={css.fill}
        onChange={handleSizeSelection}
        value=""
        options={[]}
        placeholder="OUT OF STOCK"
        disabled={true}
      />
      <Select
        onChange={handleQuantitySelection}
        value=""
        options={[]}
        placeholder="-"
        disabled={true}
      />
    </div>
  );

  const renderSizeMessage = () => {
    if (!showSizeMessage) return null;
    
    return (
      <div className={css.sizeMessage}>
        Please select size
      </div>
    );
  };

  const renderDropdowns = () => (
    <div className={[g.group, g.gapMd, g.fullWidth].join(' ')}>
      <Select
        className={css.fill}
        onChange={handleSizeSelection}
        value={skuId || ''}
        options={formatSizeOptions(currentStyle)}
        placeholder="Select Size"
        disabled={false}
        isOpen={isSizeSelectOpen}
        onOpenChange={setIsSizeSelectOpen}
      />
      <Select
        onChange={handleQuantitySelection}
        value={skuId ? qty : ''}
        options={formatQuantityOptions(currentStyle, skuId)}
        placeholder={skuId ? qty : '-'}
        disabled={!skuId}
      />
    </div>
  );

  return (
    <>
      {!hasStock ? renderOutOfStockView() :
        <>
          <div className={g.stack}>
            {renderSizeMessage()}
            {renderDropdowns()}
          </div>
          <div className={g.flex}>
            <button
              type='button'
              className={[g.center, g.sb, css.fill].join(' ')}
              onClick={handleAddToCartClick}
            >
              Add to Cart
              {isAddedToCart ? 
                <Check className={g.textMd} weight='bold' /> 
                :
                <Plus className={g.textMd} weight='bold' />
              }
            </button> 
          </div>
        </>
      }
    </>
  );
}

export default CartForm;