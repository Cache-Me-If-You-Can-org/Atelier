import React, { useState, useEffect } from 'react';
import * as shared from './shared.module.css';
import * as g from '../global.module.css';
import Thumbnail from './Thumbnail';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

function PhotoForm({
  photos = [],
  setPhotos, setIsOpen, photoCount, isModal,
}) {
  const currPhotos = photos.length === photoCount ? photos : Array(photoCount).fill('');

  const [canUpload, setCanUpload] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [noUrl, setNoUrl] = useState(false);
  const [noValidUrl, setNoValidUrl] = useState(false);
  useEffect(() => {
    setCanUpload(currPhotos.includes(''));
  }, [currPhotos]);

  function submitPhotoHandler() {
    const url = inputValue.trim();

    if (!url) {
      setNoUrl(true);
      setNoValidUrl(false);
      return;
    }
    setNoUrl(false);
    if (validator.isURL(url)) {
      setNoValidUrl(false);
    } else {
      setNoValidUrl(true);
      return;
    }

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
      <div className={g.flex}>
        {currPhotos.map((url) => (
          url ? (
            <Thumbnail
              key={uuidv4()}
              className={g.mSm}
              src={url}
            />
          ) : (
            <div key={uuidv4()} className={[shared.placeholderImage, g.mSm].join(' ')} />
          )
        ))}
      </div>

      {canUpload ? (
        <div>
          <p>Upload your image: </p>
          {noUrl && <p className={shared.error}>You must enter a URL</p>}
          {noValidUrl && <p className={shared.error}>You must enter a valid URL</p>}
          <input
            id='photos_upload'
            className={g.multiBtn}
            value={inputValue}
            placeholder='image url'
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className={g.multiBtn} type='button' onClick={submitPhotoHandler}>Upload</button>
          {isModal ? <button className={g.multiBtn} type='button' onClick={() => setIsOpen(false)}>Done</button> : null}
        </div>
      ) : (
        <div>
          <p>
            Only&nbsp;
            {photoCount}
            &nbsp;
            photos may be uploaded
          </p>
          {isModal ? <button className={g.multiBtn} type='button' onClick={() => setIsOpen(false)}>Done</button> : null}
        </div>
      )}
    </div>
  );
}

export default PhotoForm;
