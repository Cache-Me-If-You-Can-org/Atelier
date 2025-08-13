import React, { useState, useEffect } from 'react';
import * as styles from './photoForm.module.css';
import Image from './Image';

function PhotoForm({
  photos = [],
  setPhotos, setIsOpen, photoCount, isModal,
}) {
  const currPhotos = photos.length === photoCount ? photos : Array(photoCount).fill('');

  const [canUpload, setCanUpload] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [noUrl, setNoUrl] = useState(false);

  useEffect(() => {
    setCanUpload(currPhotos.includes(''));
  }, [currPhotos]);

  function submitPhotoHandler() {
    const url = inputValue.trim();

    if (!url) {
      setNoUrl(true);
      return;
    }
    setNoUrl(false);

    const firstEmptyIndex = currPhotos.indexOf('');
    if (firstEmptyIndex === -1) {
      return;
    }

    const newPhotos = [...currPhotos];
    newPhotos[firstEmptyIndex] = url;
    setPhotos(newPhotos);
    setInputValue('');
  }

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
          {noUrl && <p className={styles.error}>You must enter a URL</p>}
          <input
            id='photos_upload'
            value={inputValue}
            placeholder='image url'
            onChange={(e) => setInputValue(e.target.value)}
          />
          <input type='button' value='Upload' onClick={submitPhotoHandler} />
          {isModal ? <input type='button' value='Done' onClick={() => setIsOpen(false)} /> : null}
        </div>
      ) : (
        <div>
          <p>
            Only&nbsp;
            {photoCount}
            &nbsp;
            photos may be uploaded
          </p>
          {isModal ? <input type='button' value='Done' onClick={() => setIsOpen(false)} /> : null}
        </div>
      )}
    </div>
  );
}

export default PhotoForm;
