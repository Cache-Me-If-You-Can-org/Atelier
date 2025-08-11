import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as styles from './qanda.module.css';
import Image from '../shared/Image.jsx';

function PhotoForm({photos, setPhotos, setIsOpen}) {
  const [canUpload, setCanUpload] = useState(true);
  function submitPhotoHandler() {
      const url = document.getElementById("photos_upload").value;
      var currPhotos = photos.slice();
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
          {photos.map((photo) => (<Image className={styles.inlineThumbnail} src={photo}/>))}
        </div>
        <label>Upload your image: </label>
        <input id="photos_upload" placeholder="image url"></input>
        <input type="button" value="Upload" onClick={submitPhotoHandler}></input>
        <input type="button" value="Done" onClick={()=>setIsOpen(false)}></input>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <h5>Images</h5>
          {photos.map((photo) => (<Image className={styles.inlineThumbnail} src={photo}/>))}
        </div>
        <p>Only 5 photos may be uploaded</p>
        <input type="button" value="Done" onClick={()=>setIsOpen(false)}></input>
      </div>
    );
  }
}

export default PhotoForm;