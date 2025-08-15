import React, { cloneElement, useState, useEffect } from 'react';
import * as shared from './shared.module.css';

const starSVGs = {
  full: (
    <svg viewBox='0 0 24 24' fill='gold' xmlns='http://www.w3.org/2000/svg'>
      <path d='M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z' />
    </svg>
  ),
  threeQuarter: (
    <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='grad3q' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='75%' style={{ stopColor: 'gold', stopOpacity: 1 }} />
          <stop offset='75%' style={{ stopColor: 'lightgray', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d='M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z'
        fill='url(#grad3q)'
      />
    </svg>
  ),
  half: (
    <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='gradHalf' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='50%' style={{ stopColor: 'gold', stopOpacity: 1 }} />
          <stop offset='50%' style={{ stopColor: 'lightgray', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d='M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z'
        fill='url(#gradHalf)'
      />
    </svg>
  ),
  quarter: (
    <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='gradQuarter' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='25%' style={{ stopColor: 'gold', stopOpacity: 1 }} />
          <stop offset='25%' style={{ stopColor: 'lightgray', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d='M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z'
        fill='url(#gradQuarter)'
      />
    </svg>
  ),
  empty: (
    <svg viewBox='0 0 24 24' fill='lightgray' xmlns='http://www.w3.org/2000/svg'>
      <path d='M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z' />
    </svg>
  ),
};

function numberToStars(num) {
  num = Math.min(Math.max(num, 0), 5);
  const rounded = Math.round(num * 4) / 4;
  const result = [];

  for (let i = 0; i < 5; i++) {
    const diff = rounded - i;
    if (diff >= 1) result.push('full');
    else if (diff >= 0.75) result.push('threeQuarter');
    else if (diff >= 0.5) result.push('half');
    else if (diff >= 0.25) result.push('quarter');
    else result.push('empty');
  }
  return result;
}

export default function QuarterStarRating({
  rating = 0,
  isReview = false,
  getRating,
  size = 16,
}) {
  const [stars, setStars] = useState(numberToStars(isReview ? 0 : rating));
  const [hoverable, setHoverable] = useState(true);

  useEffect(() => {
    if (rating !== undefined) {
      setStars(numberToStars(isReview ? 0 : rating));
    }
  }, [rating, isReview]);

  const handleStarEnter = (starNum) => {
    if (hoverable) setStars(numberToStars(starNum));
  };

  const handleStarLeave = () => {
    if (hoverable) setStars(numberToStars(0));
  };

  const handleStarClick = (starNum) => {
    setHoverable(!hoverable);
    if (!hoverable) {
      if (getRating) getRating(0);
    } else {
      setStars(numberToStars(starNum));
      if (getRating) getRating(starNum);
    }
  };

  if (!stars) return null;

  return (
    <div className={shared.starDiv}>
      {stars.map((type, index) => (
        isReview ? (
          <button
            key={index}
            className={shared.starsHover}
            onMouseEnter={() => handleStarEnter(index + 1)}
            onMouseLeave={() => handleStarLeave()}
            onClick={() => handleStarClick(index + 1)}
            type='button'
          >
            {cloneElement(starSVGs[type], {
              width: `${size}px`,
              height: `${size}px`,
            })}
          </button>
        ) : (
          <div key={index}>
            {cloneElement(starSVGs[type], {
              width: `${size}px`,
              height: `${size}px`,
            })}
          </div>
        )
      ))}
    </div>
  );
}
