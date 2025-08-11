import React from "react";
import * as styles from "../reviews.module.css";

function ProductBreakdown({ characteristics }) {

  const ratingsMap = {
    Size: ['Too small', 'Perfect', 'Too big'],
    Width: ['Too narrow', 'Perfect', 'Too wide'],
    Fit: ['Too tight', 'Perfect', 'Too long'],
    Length: ['Too short', 'Perfect', 'Too long'],
    Comfort: ['Uncomfortable', 'Perfect'],
    Quality: ['Poor', 'Great']
  };

  const prodBreakdowns = Object.entries(characteristics || {}).map(([title, { id, value }]) => ({
    title,
    id,
    value: Math.floor((Number(value) / 5) * 100), // convert to number
    ratings: ratingsMap[title] || [],
    ratingsLength: ratingsMap[title].length,
  }));

  console.log(prodBreakdowns);

  return (
    <div>
      <ul className={styles.ratingsBreakdownList}>
        {prodBreakdowns.map((prodBreakdown) => (
          <li key={prodBreakdown.id} className={styles.prodBreakdown}>
            <span className={styles.prodTitle}>{prodBreakdown.title}</span>
            <div className={styles.prodBreakdownWrapper}>
                <span className={styles.prodBreakdownMarker} style={{ '--percentageLeft': prodBreakdown.value + '%' }}></span>
                {prodBreakdown.ratingsLength === 2 ? (
                  <div className={styles.prodBreakdownBarWrapper}>
                    <span className={styles.two}></span>
                    <span className={styles.two}></span>
                  </div>
                ) : (
                  <div className={styles.prodBreakdownBarWrapper}>
                    <span></span>
                    <span className={styles.three}></span>
                    <span></span>
                  </div>
                )}
              </div>
              <div className={styles.ratingsTitles}>
                {prodBreakdown.ratings.map((rating, index) => (
                  <span key={index}>{rating}</span>
                ))}
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductBreakdown;