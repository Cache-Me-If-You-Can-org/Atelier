import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import * as lcl from './ratingsAndReviews.module.css';
import * as gbl from '../global.module.css';
import QuarterStarRating from '../shared/QuarterStarRating';

uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
function getKey() {
  return uuidv4();
}

export default function Ratings({
  meta, filters, setFilters, cDef, stars,
}) {
  const [pctRecommend, setPctRecommend] = useState(0);
  const [maxStars, setMaxStars] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!_.isEmpty(meta)) {
      setReviewCount(1 * meta.recommended.true + 1 * meta.recommended.false);
      setPctRecommend(Math.floor((meta.recommended.true / reviewCount) * 100));
      if (!_.isEmpty(stars)) {
        setMaxStars(stars.reduce((memo, star) => {
          if (meta?.ratings[star]) {
            return memo + 1 * meta.ratings[star];
          }
          return memo;
        }, 0));
      }
      const reviewCounter = Object.keys(meta.ratings)
        .reduce((val, key) => val + 1 * meta.ratings[key], 0);
      let productRating = Object.keys(meta.ratings)
        .reduce((val, key) => val + 1 * key * meta.ratings[key], 0);
      productRating /= reviewCounter;
      setReviewCount(reviewCounter);
      setRating(Math.round(productRating * 10) / 10);
    }
  }, [meta, filters, reviewCount, stars]);

  function handleOnClickClearFilters() {
    setFilters(new Set());
  }

  function handleOnClickStar(e) {
    const tmp = new Set(filters);
    if (tmp.has(e.target.id)) {
      tmp.delete(e.target.id);
    } else {
      tmp.add(e.target.id);
    }
    setFilters(tmp);
  }

  return (
    <aside className={lcl.ratings}>

      {_.isEmpty(meta) && <p>Loading...</p>}

      {!_.isEmpty(meta) && (
      <>
        <div className={gbl.group}>
          <div className={lcl.rating}>{rating.toFixed(1)}</div>
          <div className={`${gbl.center} ${lcl.starrating}`}>
            <QuarterStarRating rating={rating} size={24} />
          </div>
          {/* <div className={gbl.center}>{reviewCount}</div> */}
        </div>
        <div className={gbl.stack}>
          {/* <div className={gbl.center}>
            <div>Rating Breakdown</div>
          </div> */}
          <div className={`${gbl.group} ${gbl.center} ${lcl.filters}`}>

            { filters.size > 0 ? (
              <>
                <span>{[...filters].sort().join(', ')}</span>
                &nbsp; &nbsp;
                <button
                  type='button'
                  className={`${lcl.clear} ${lcl.link}`}
                  onClick={() => handleOnClickClearFilters()}
                  onKeyPress={() => handleOnClickClearFilters()}
                >
                  clear all
                </button>
              </>
            )
              : <>&nbsp;</>}
          </div>
          <div className={lcl.stars}>
            { stars.map((star) => (
              <button
                type='button'
                key={getKey()}
                className={`${gbl.group} ${gbl.center} ${lcl.filters} ${lcl.link}`}
                id={`${star} Stars`}
                onClick={(e) => handleOnClickStar(e)}
                onKeyPress={(e) => handleOnClickStar(e)}
              >
                <label htmlFor={`${star}Star`} name={`${star}Star`} className={lcl.label}>{`${star} Stars`}</label>
                <progress
                  className={`${gbl.center} ${lcl.progress}`}
                  id={`${star} Stars`}
                  max={maxStars}
                  value={meta.ratings[star] ? meta.ratings[star] : 0}
                />
                <div className={lcl.starcount}>
                  { meta.ratings[star] ? meta.ratings[star] : null }
                </div>
              </button>
            ))}
          </div>
          <p>
            {pctRecommend}
            % of reviews recommend this product
          </p>

          <div className={lcl.range}>
            {Object.keys(cDef).map((range) => (meta.characteristics[range]
              ? (
                <div key={meta.characteristics[range].id} className={lcl.spaceVertical}>
                  <div>{range}</div>
                  <input type='range' min='0' max='50' defaultValue={meta.characteristics[range].value * 10} disabled className={lcl.slider} id={range.name} />
                  <div className={`${gbl.group} ${lcl.bar} ${lcl.label}`}>
                    <div className={lcl.label}>{cDef[range][0]}</div>
                    <div className={lcl.label}>{cDef[range][4]}</div>
                  </div>
                </div>
              )
              : null))}

          </div>
        </div>
      </>
      ) }
    </aside>
  );
}
