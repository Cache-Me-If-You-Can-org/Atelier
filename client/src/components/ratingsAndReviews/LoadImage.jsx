import React, { useState } from 'react';
import validator from 'validator';
import * as lcl from './ratingsAndReviews.module.css';
import * as gbl from '../global.module.css';

export default function LoadImage({
  setImages, images, idx, setIsOpenImage,
}) {
  const [imageURL, setImageURL] = useState(images[idx]);
  let timeout;

  function handleOnInputURL(e) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (validator.isURL(e.target.value)) {
        setImageURL(e.target.value);
      } else {
        setImageURL(null);
      }
    }, 500);
  }

  function handleOnClickConfirm(e) {
    const tmp = [...images];
    if (e.target.id === 'save' && imageURL) {
      tmp[idx] = imageURL;
    }
    if (e.target.id === 'delete') {
      tmp[idx] = null;
    }
    setImages([...tmp]);
    setIsOpenImage(false);
  }

  function handleOnClickCancel() {
    setIsOpenImage(false);
  }

  return (
    <div className={`${gbl.stack} ${gbl.center}`}>
      <div className={`${gbl.stack} ${gbl.center}`}>

        <div>
          {imageURL ? <img src={imageURL} alt='' />
            : <div className={`${lcl.thumbnailplaceholder} ${gbl.center}`}>+</div>}
        </div>

        {!images[idx] && <input type='text' placeholder='enter image URL' onInput={(e) => handleOnInputURL(e)} size='80' />}

        <div className={gbl.group}>
          <button
            type='button'
            className={`${lcl.horizontalpadding} ${lcl.verticalpadding}`}
            id={images[idx] ? 'delete' : 'save'}
            onClick={(e) => handleOnClickConfirm(e)}
          >
            {images[idx] ? 'Delete' : 'Save'}
          </button>
          <button
            type='button'
            className={`${lcl.horizontalpadding} ${lcl.verticalpadding}`}
            id='cancel'
            onClick={(e) => handleOnClickCancel(e)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
