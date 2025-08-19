import React, { useState, useEffect } from 'react';
import * as shared from './shared.module.css';
import * as g from '../global.module.css';
import Thumbnail from './Thumbnail';
import { v4 as uuidv4 } from 'uuid';

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
      <div className={g.flex}>
        {currPhotos.map((url) => (
          url ? (
            <Thumbnail
              key={uuidv4()}
              className={g.mSm}
              src={url}
            />
          ) : (
            <div key={crypto.randomUUID()} className={[shared.placeholderImage, g.mSm].join(' ')} />
          )
        ))}
      </div>

      {canUpload ? (
        <div>
          <p>Upload your image: </p>
          {noUrl && <p className={shared.error}>You must enter a URL</p>}
          <input
            id='photos_upload'
            value={inputValue}
            placeholder='image url'
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type='button' onClick={submitPhotoHandler}>Upload</button>
          {isModal ? <button type='button' onClick={() => setIsOpen(false)}>Done</button> : null}
        </div>
      ) : (
        <div>
          <p>
            Only&nbsp;
            {photoCount}
            &nbsp;
            photos may be uploaded
          </p>
          {isModal ? <button type='button' onClick={() => setIsOpen(false)}>Done</button> : null}
        </div>
      )}
    </div>
  );
}

export default PhotoForm;
