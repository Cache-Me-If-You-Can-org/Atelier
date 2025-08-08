import React from 'react';
import Image from '../shared/Image.jsx';
import { Check } from '@phosphor-icons/react'
import * as css from './styles/overview.module.css';

function StyleSelect({styles, selectedStyle, setSelectedStyle}) {

  return(
    <div className={css.grid}>
      {styles.map((style, i) => (
        <div key={style.style_id} className={css.circle}>
          {selectedStyle === i &&
            <div className={css.checkmark}>
              <Check size={10}/>
            </div>
          }
          <Image
            src={style.photos[0].thumbnail_url}
            onClick={() => setSelectedStyle(i)}
            className={css.image}
          />
        </div>
      ))}
    </div>
  )
}

export default StyleSelect;