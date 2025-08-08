import React from 'react';
import StyleSelect from './StyleSelect.jsx'
import * as css from './styles/overview.module.css';

function ProductInfo({product, styles, selectedStyle, setSelectedStyle, isFullScreen}) {
  const onSale = styles[selectedStyle].sale_price !== null;
  return (
    <div
      className={css.productInfoContainer}
      style={{display: isFullScreen ? 'none' : ''}}
    >
      <div className={`stack ${css.gap}`}>
        <div>stars</div>
        <div>{product.category}</div>
        <h2>{product.name}</h2>
        <div style={{ textDecoration: onSale ? 'line-through' : '' }}>
          {styles[selectedStyle].original_price}
        </div>
        {onSale && <div>{styles[selectedStyle].sale_price}</div>}
        <div className={`group ${css.gap}`}>
          <div><strong>style {'>'}</strong></div>
          <div>{styles[selectedStyle].name}</div>
        </div>
        <StyleSelect
          styles={styles}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
        />
        <div className={`group ${css.gap}`}>
          <select>
            <option>
              select size
            </option>
          </select>
          <select>
            <option>
              1
            </option>
          </select>
        </div>
        <div className={`group ${css.gap}`}>
          <button>Add to bag</button>
          <button>star</button>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo;