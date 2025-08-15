import React from 'react';
import * as styles from './relatedOutfit.module.css';

// Custom arrow for the carousel
function Arrow(props) {
  const { className, style, onClick } = props;
  const classes = `${className} ${styles.carouselArrow}`;
  return (
    <div
      className={classes}
      style={{ ...style }}
      onClick={onClick}
      onKeyPress={() => onClick}
      role='button'
      tabIndex='0'
    />
  );
}

// Settings for the carousel
export default {
  infinite: false,
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <Arrow />,
  prevArrow: <Arrow />,
};
