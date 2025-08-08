import React, { useState, useEffect } from 'react';
import Thumbnail from './Thumbnail.jsx';
import { CornersOut, ArrowLeft, ArrowRight } from '@phosphor-icons/react'

function Gallery({
  product,
  styles,
  selectedStyle,
  // setSelectedStyle
  isFullScreen,
  setIsFullScreen
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [displayImage, setDisplayImage] = useState(styles[selectedStyle].photos[selectedImage].url);

  useEffect(() => {
    setDisplayImage(styles[selectedStyle].photos[selectedImage].url)
  }, [selectedImage, selectedStyle])

  const handleArrows = (direction) => {
    if (direction === 'next' && selectedImage !== styles[selectedStyle].photos.length - 1) {
      setSelectedImage(prev => prev + 1);
    }
    if (direction === 'prev' && selectedImage !== 0) {
      setSelectedImage(prev => prev - 1);
    }
  }
  return (
    <div className='gallery-container'>
      <img className='thumbnail-image' src={displayImage}/>
      <div className='overlay'>
        <div className='group full-height'>
          <div className='thumbnail-container stack full-height'>
            {styles[selectedStyle].photos.map((photo, i) => {
              return (
                <Thumbnail
                  key={i}
                  i={i}
                  imgUrl={photo.thumbnail_url}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                />
              )
            })}
          </div>
          <div className='stack fs-arrows-container'>
            <div className='fullscreen-icon' >
              <CornersOut
                size={32}
                className='pointer icon'
                onClick={() => setIsFullScreen(prev => !prev)}
              />
            </div>
            <div className='overview-arrows group sb'>
              <ArrowLeft
                size={32}
                className='pointer icon'
                onClick={() => handleArrows('prev')}
              />
              <ArrowRight
                size={32}
                className='pointer icon'
                onClick={() => handleArrows('next')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery;