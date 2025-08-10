import React from 'react';
import Image from '../../shared/Image.jsx';
import * as css from '../styles/thumbnail.module.css';

function Thumbnail({imgUrl, selectedImage, setSelectedImage, i}) {
  return(
    <div
      className={css.thumbnail}
      onClick={() => setSelectedImage(i)}
    >
      <Image src={imgUrl}/>
      <div
        className={css.indicator}
        style={{backgroundColor: selectedImage === i ? 'brown' : 'transparent'}}
        />
    </div>
  )
}

export default Thumbnail;