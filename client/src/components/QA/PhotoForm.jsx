import React from 'react';
import { useState, useEffect } from 'react';
import * as styles from './qanda.module.css';
import Image from '../shared/Image';

function PhotoForm({ photos, setPhotos, setIsOpen }) {
  const [canUpload, setCanUpload] = useState(true);
  function submitPhotoHandler() {
    const url = document.getElementById('photos_upload').value;
    const currPhotos = photos.slice();
    currPhotos.push(url);
    setPhotos(currPhotos);
  }
  useEffect(() => {
    if (photos.length === 5) {
      setCanUpload(false);
    }
  }, [photos]);

  if (canUpload) {
    return (
      <div>
        <div>
          <h5>Images</h5>
          { photos.map((photo) => (<Image className={styles.inlineThumbnail} src={photo} />)) }
        </div>
        <p>Upload your image: </p>
        <input id='photos_upload' placeholder='image url' />
        <input type='button' value='Upload' onClick={submitPhotoHandler} />
        <input type='button' value='Done' onClick={() => setIsOpen(false)} />
      </div>
    );
  }
  return (
    <div>
      <div>
        <h5>Images</h5>
        {photos.map((photo) => (<Image className={styles.inlineThumbnail} src={photo} />))}
      </div>
      <p>Only 5 photos may be uploaded</p>
      <input type='button' value='Done' onClick={() => setIsOpen(false)} />
    </div>
  );
}

export default PhotoForm;
