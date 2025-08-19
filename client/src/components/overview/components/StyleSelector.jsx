import React from 'react';
import { Check, CaretRight } from '@phosphor-icons/react';
import Image from '../../shared/Image';
import * as g from '../../global.module.css';
import * as css from '../styles/style_selector.module.css';

function StyleSelector({
  styles, selectedStyle, setSelectedStyle, setSkuId, setQty,
}) {
  return (
    <>
      <div className={[g.group, g.gapSm, g.alignStart].join(' ')}>
        <div className={[g.group, g.gapSm, g.alignCenter].join(' ')}>
          <p className={[g.textMd, g.bold, g.upper].join(' ')}>style</p>
          <CaretRight className={g.textMd} weight='bold' />
        </div>
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
                setSelectedStyle(i);
                setSkuId(null);
                setQty(1);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default StyleSelector;
