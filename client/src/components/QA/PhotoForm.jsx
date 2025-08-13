import React, { useState, useEffect } from 'react';
import * as styles from './photoForm.module.css';
import Image from '../shared/Image';

function PhotoForm({ photos = [], setPhotos, setIsOpen }) {
  const [canUpload, setCanUpload] = useState(true);
  const [currPhotos, setCurrPhotos] = useState(Array(5).fill(null));
  const [inputValue, setInputValue] = useState('');
  const [noUrl, setNoUrl] = useState(false);

  function submitPhotoHandler() {
    const url = inputValue.trim();

    if (!url) {
      setNoUrl(true);
      return;
    }

    setCurrPhotos((prevPhotos) => {
      const newPhotos = [...prevPhotos];
      const firstNullIndex = newPhotos.indexOf(null);
      if (firstNullIndex !== -1) {
        newPhotos[firstNullIndex] = url;
      }
      setNoUrl(false);
      setPhotos(currPhotos);
      return newPhotos;
    });
  }

  useEffect(() => {
    setCanUpload(currPhotos.includes(null));
  }, [currPhotos]);

  return (
    <div>
      <h5>Images</h5>
      <div className={styles.placeHolderWrapper}>
        {currPhotos.map((url, index) => (
          url ? (
            <Image
              key={index}
              className={styles.inlineThumbnail}
              src={url}
            />
          ) : (
            <div key={index} className={styles.placeholderImage} />
          )
        ))}
      </div>

      {canUpload ? (
        <div>
          <p>Upload your image: </p>
          {noUrl ? <p className={styles.error}>You must enter a URL</p> : null}
          <input id='photos_upload' value={inputValue} placeholder='image url' onChange={(e) => setInputValue(e.target.value)} />
          <input type='button' value='Upload' onClick={submitPhotoHandler} />
          <input type='button' value='Done' onClick={() => setIsOpen(false)} />
        </div>
      ) : (
        <div>
          <p>Only 5 photos may be uploaded</p>
          <input type='button' value='Done' onClick={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default PhotoForm;
