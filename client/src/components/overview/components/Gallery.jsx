import { CornersOut, ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import React, { useState, useEffect } from 'react';
import Thumbnail from './Thumbnail';
import Image from '../../shared/Image';
import * as g from '../../global.module.css';
import * as css from '../styles/gallery.module.css';

function Gallery({
  styles,
  selectedStyle,
  setIsFullScreen,
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [displayImage, setDisplayImage] = useState(styles[selectedStyle].photos[selectedImage].url);

  useEffect(() => {
    setDisplayImage(styles[selectedStyle].photos[selectedImage].url);
  }, [selectedImage, selectedStyle, styles]);

  const handleArrows = (direction) => {
    if (direction === 'next' && selectedImage !== styles[selectedStyle].photos.length - 1) {
      setSelectedImage((prev) => prev + 1);
    }
    if (direction === 'prev' && selectedImage !== 0) {
      setSelectedImage((prev) => prev - 1);
    }
  };

  return (
    <div className={css.galleryWrapper}>
      <Image src={displayImage} />
      <div className={css.overlay}>
        <div className={`${g.group} ${g.fullHeight}`}>
          <div className={`${g.stack} ${g.fullHeight} ${css.thumbnailWrapper}`}>
            {styles[selectedStyle].photos.map((photo, i) => (
              <Thumbnail
                key={photo.thumbnail_url}
                i={i}
                imgUrl={photo.thumbnail_url}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            ))}
          </div>
          <div className={`${g.stack} ${css.controlsWrapper}`}>
            <div className={css.fullscreen}>
              <CornersOut
                size={32}
                className={`${g.pointer} ${css.icon}`}
                onClick={() => setIsFullScreen((prev) => !prev)}
              />
            </div>
            <div className={`${g.group} ${g.sb} ${css.arrows}`}>
              <ArrowLeft
                size={32}
                className={`${g.pointer} ${css.icon}`}
                onClick={() => handleArrows('prev')}
              />
              <ArrowRight
                size={32}
                className={`${g.pointer} ${css.icon}`}
                onClick={() => handleArrows('next')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
