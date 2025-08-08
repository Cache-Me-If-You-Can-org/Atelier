import React from 'react';
import Image from './Image.jsx';
import * as css from './shared.module.css';

function Thumbnail({src, ...props}) {
  return(
    <div className={css.thumbnail} {...props}>
      <Image src={src}/>
    </div>
  )
}

export default Thumbnail;