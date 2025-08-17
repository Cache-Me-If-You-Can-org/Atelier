import React, { useState, useEffect, useRef } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import Image from '../../shared/Image';
import { getScrollIndicators } from '../lib/helpers';
import * as css from '../styles/photo_picker.module.css';
import * as g from '../../global.module.css';

function PhotoPicker({
  selectedImage, setSelectedImage, photos,
}) {
  const [indicators, setIndicators] = useState({ showTop: false, showBottom: false });
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const newIndicators = getScrollIndicators(scrollContainerRef.current);
      setIndicators(newIndicators);
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div
      className={[g.stack, g.gapSm, css.photoWrapper].join(' ')}
    >
      <div 
        className={[g.stack, g.gapSm, css.scrollContainer].join(' ')}
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {photos.map((photo, i) => (
          <button
            key={photo.thumbnail_url}
            type='button'
            className={css.photo}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(i);
            }}
          >
            <Image src={photo.thumbnail_url} />
            <div
              className={css.photoIndicator}
              style={{ backgroundColor: selectedImage === i ? 'brown' : 'transparent' }}
            />
          </button>
        ))}
      </div>
      {indicators.showTop && (
        <div className={[g.center, css.topScroll].join(' ')}>
          <CaretUp className={[g.textMd, css.scrollIndicator].join(' ')} weight='bold' />
        </div>
      )}
      {indicators.showBottom && (
        <div className={[g.center, css.bottomScroll].join(' ')}>
          <CaretDown className={[g.textMd, css.scrollIndicator].join(' ')} weight='bold' />
        </div>
      )}
    </div>
  );
}

export default PhotoPicker;