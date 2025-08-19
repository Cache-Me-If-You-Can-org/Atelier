import React from 'react';
import * as g from '../../global.module.css';
import * as styles from '../reviews.module.css';
import { v4 as uuidv4 } from 'uuid';

function ProductBreakdown({ characteristics }) {
  const ratingsMap = {
    Size: ['Too small', 'Perfect', 'Too big'],
    Width: ['Too narrow', 'Perfect', 'Too wide'],
    Fit: ['Too tight', 'Perfect', 'Too long'],
    Length: ['Too short', 'Perfect', 'Too long'],
    Comfort: ['Uncomfortable', 'Perfect'],
    Quality: ['Poor', 'Great'],
  };

  const prodBreakdowns = Object.entries(characteristics || {}).map(
    ([title, { id, value }]) => ({
      title,
      id,
      value: Math.floor((Number(value) / 5) * 100),
      ratings: ratingsMap[title] || [],
      ratingsLength: ratingsMap[title].length,
    }),
  );

  return (
    <div>
      <ul className={styles.ratingsBreakdownList}>
        {prodBreakdowns.map((prodBreakdown) => (
          <li key={prodBreakdown.id} className={styles.prodBreakdown}>
            <span className={`${styles.prodTitle} ${g.textSm}`}>{prodBreakdown.title}</span>
            <div className={styles.prodBreakdownWrapper}>
              <span
                className={styles.prodBreakdownMarker}
                style={{ '--percentageLeft': `${prodBreakdown.value}%` }}
              />
              {prodBreakdown.ratingsLength === 2 ? (
                <div className={styles.prodBreakdownBarWrapper}>
                  <span className={styles.two} />
                  <span className={styles.two} />
                </div>
              ) : (
                <div className={styles.prodBreakdownBarWrapper}>
                  <span />
                  <span className={styles.three} />
                  <span />
                </div>
              )}
            </div>
            <div className={`${styles.ratingsTitles} ${g.textXs}`}>
              {prodBreakdown.ratings.map((rating) => (
                <span key={uuidv4()}>{rating}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductBreakdown;
