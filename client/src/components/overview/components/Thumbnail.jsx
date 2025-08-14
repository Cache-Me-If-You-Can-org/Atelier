import React from 'react';
import Image from '../../shared/Image';
import * as css from '../styles/thumbnail.module.css';

function Thumbnail({
  imgUrl, selectedImage, setSelectedImage, i,
}) {
  return (
    <button
      type='button'
      className={css.thumbnail}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedImage(i);
      }}
    >
      <Image src={imgUrl} />
      <div
        className={css.indicator}
        style={{ backgroundColor: selectedImage === i ? 'brown' : 'transparent' }}
      />
    </button>
  );
}

export default Thumbnail;
