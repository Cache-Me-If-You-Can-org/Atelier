import React from 'react';
import * as g from '../../global.module.css';
import * as css from '../styles/price.module.css';

function Price({styles, selectedStyle}) {
  const onSale = styles[selectedStyle].sale_price !== null;
  return (
    <div className={`${g.group} ${css.gap}`}>
      <div style={{ textDecoration: onSale ? 'line-through' : '' }}>
        {'$' + styles[selectedStyle].original_price}
      </div>
      {onSale &&
        <div className={css.red}>
          {'$' + styles[selectedStyle].sale_price}
        </div>}
    </div>
  )
}

export default Price;