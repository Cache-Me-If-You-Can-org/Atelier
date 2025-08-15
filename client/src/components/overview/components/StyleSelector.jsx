import React from 'react';
import { Check, CaretRight } from '@phosphor-icons/react';
import Image from '../../shared/Image';
import { getSkus, getQtys } from '../lib/helpers';
import * as g from '../../global.module.css';
import * as css from '../styles/style_selector.module.css';

function StyleSelector({
  styles, selectedStyle, setSelectedStyle, setSkuId, setQty, skuId,
}) {
  return (
    <>
      <div className={[g.group, g.gapSm, css.alignCenter].join(' ')}>
        <p className={[g.textMd, g.bold, g.upper].join(' ')}>style</p>
        <CaretRight className={g.textMd} weight='bold'/>
        <p className={[g.textMd, g.upper].join(' ')}>{styles[selectedStyle].name}</p>
      </div>
      <div className={css.grid}>
        {styles.map((style, i) => (
          <div key={style.style_id} className={css.circle}>
            {selectedStyle === i
              && (
              <div className={`${css.checkmark} ${g.center}`}>
                <Check size={10} />
              </div>
              )}
            <Image
              className={css.image}
              src={style.photos[0].thumbnail_url}
              onClick={() => {
                setSkuId(getSkus(styles[i])[0]);
                setQty(getQtys(styles[selectedStyle], skuId)[0]);
                setSelectedStyle(i);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default StyleSelector;
