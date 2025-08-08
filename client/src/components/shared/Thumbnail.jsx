import React from 'react';
import Image from './Image.jsx';
import * as css from './shared.module.css';

function Thumbnail({src}) {
  return(
    <div className={css.thumbnail}>
      <Image src={src}/>
    </div>
  )
}

export default Thumbnail;