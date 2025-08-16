import { CornersOut, ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import React, { useState, useEffect } from 'react';
import PhotoPicker from './PhotoPicker';
import Image from '../../shared/Image';
import * as g from '../../global.module.css';
import * as css from '../styles/gallery.module.css';

function Gallery({
  styles,
  selectedStyle,
  setIsFullScreen,
  isFullScreen,
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

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft') {
      handleArrows('prev');
    }
    if (e.key === 'ArrowRight') {
      handleArrows('next');
    }
  };

  return (
    <div
      role='button'
      className={css.galleryWrapper}
      style={{ cursor: isFullScreen ? 'zoom-out' : 'zoom-in' }}
      tabIndex='0'
      onClick={() => setIsFullScreen((prev) => !prev)}
      onKeyDown={handleKeyPress}
    >
      <Image src={displayImage} />
      <div className={css.overlay}>
        <div className={[g.group, g.fullHeight].join(' ')}>
          <PhotoPicker
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            photos={styles[selectedStyle].photos}
          />
          <div className={[g.stack, css.controlsWrapper].join(' ')}>
            <div className={css.fullscreen}>
              <CornersOut
                className={[g.pointer, g.textLg, css.icon].join(' ')}
              />
            </div>
            <div className={[g.group, g.sb, css.arrows].join(' ')}>
              {selectedImage !== 0 ? (
                <ArrowLeft
                  className={[g.pointer, g.textLg, css.icon].join(' ')}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArrows('prev');
                  }}
                />
              ) : <div />}
              {selectedImage !== styles[selectedStyle].photos.length - 1 ? (
                <ArrowRight
                  className={[g.pointer, g.textLg, css.icon].join(' ')}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArrows('next');
                  }}
                />
              ) : <div />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
