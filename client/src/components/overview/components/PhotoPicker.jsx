import React, { useState, useEffect, useRef } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import Image from '../../shared/Image';
// import { checkScrollable } from '../lib/helpers';
import * as css from '../styles/photo_picker.module.css';
import * as g from '../../global.module.css';

function PhotoPicker({
  selectedImage, setSelectedImage, photos,
}) {
  const [indicators, setIndicators] = useState({ showTop: true, showBottom: true });
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const showTop = container.scrollTop > 0;
      const showBottom = container.scrollHeight - container.scrollTop - container.clientHeight > 1;
      setIndicators({ showTop, showBottom });
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div
      className={[g.stack, g.gapSm, css.thumbnailWrapper].join(' ')}
      ref={scrollContainerRef}
      onScroll={handleScroll}
    >
      {/* {indicators.showTop && (
        <div className={[g.center, css.topScroll].join(' ')}>
          <CaretUp className={[g.textMd, css.scrollIndicator].join(' ')} weight='bold' />
        </div>
      )} */}
      {photos.map((photo, i) => (
        <button
          key={photo.thumbnail_url}
          type='button'
          className={css.thumbnail}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedImage(i);
          }}
        >
          <Image src={photo.thumbnail_url} />
          <div
            className={css.indicator}
            style={{ backgroundColor: selectedImage === i ? 'brown' : 'transparent' }}
          />
        </button>
      ))}
      {/* {indicators.showBottom && (
        <div className={[g.center, css.bottomScroll].join(' ')}>
          <CaretDown className={[g.textMd, css.scrollIndicator].join(' ')} weight='bold' />
        </div>
      )} */}
    </div>
  );
}

export default PhotoPicker;
