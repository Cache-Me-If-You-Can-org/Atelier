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
  const [isInZoomMode, setIsInZoomMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

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

  const handleFullscreenClick = () => {
    if (isInZoomMode) {
      setIsInZoomMode(false);
    }
    setIsFullScreen((prev) => !prev);
  };

  const handleGalleryClick = () => {
    if (!isFullScreen) {
      setIsFullScreen(true);
    } else {
      setIsInZoomMode((prev) => !prev);
    }
  };

  const handleMouseMove = (e) => {
    if (isInZoomMode) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  const imageStyle = isInZoomMode ? {
    transform: 'scale(2.5)',
    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
    transition: 'transform-origin 0.1s ease-out',
    objectFit: 'contain',
  } : {};

  const galleryStyle = () => {
    if (isInZoomMode) {
      return { cursor: 'zoom-out' };
    }
    if (isFullScreen) {
      return { cursor: 'zoom-in' };
    }
    return { cursor: 'pointer' };
  };

  return (
    <div
      role='button'
      className={css.galleryWrapper}
      style={galleryStyle()}
      tabIndex='0'
      onClick={handleGalleryClick}
      onKeyDown={handleKeyPress}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={displayImage}
        style={imageStyle}
      />
      <div className={`${css.overlay} ${isInZoomMode ? css.overlayHidden : ''}`}>
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleFullscreenClick();
                }}
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
