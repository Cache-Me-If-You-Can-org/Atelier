import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { format, parseISO } from 'date-fns';
import { Check } from '@phosphor-icons/react';
import validator from 'validator';
import * as lcl from './ratingsAndReviews.module.css';
import * as gbl from '../global.module.css';
import Modal from '../shared/Modal';
import QuarterStarRating from '../shared/QuarterStarRating';

function getKey() {
  return uuidv4();
}

export default function Review({
  review, showHR, reported, setReported, helpful, setHelpful,
}) {
  const [showMore, setShowMore] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  function handleOnClickHelpful(e) {
    if (e.target.id === 'Yes') {
      axios.put(`reviews/${review.review_id}/helpful`, {})
        .then(() => setHelpful([...helpful, review.review_id]))
        .catch(() => {});
    } else {
      setHelpful([...helpful, review.review_id]);
    }
  }

  function handleOnClickReport() {
    axios.put(`reviews/${review.review_id}/report`, {})
      .then(() => {
        setReported([...reported, review.review_id]);
      })
      .catch(() => {});
  }

  function handleOnClickThumbnail(url) {
    setCurrentImage(url);
    setIsOpen(true);
  }

  return (
    <article>
      <div className={`${gbl.stack} ${lcl.review}`}>
        {/* Review List - needs to be scrollable without pushing content off the page */}
        <div>
          {/* review body */}
          <div>
            {/* summary ( rating, date, summary(line break) */}
            <div className={`${gbl.group} ${gbl.sb} ${lcl.rowspace}`}>
              <div>
                <QuarterStarRating rating={review.rating} size={24} />
              </div>
              <div>{format(parseISO(review.date), 'MMMM d, yyyy')}</div>
            </div>
            <div className={lcl.bold}>{review.summary ? review.summary.slice(0, 60) : null }</div>
          </div>

          <div className={`${gbl.group}  ${lcl.rowspace}`}>
            {/* body - display first 250 chars, expand onClick */}
            { review.body.length <= 250 || showMore
              ? (
                <span className={lcl.wrap}>
                  {' '}
                  {review.body}
                  {' '}
                </span>
              )
              : (
                <span className={lcl.wrap}>
                  {review.body.slice(0, 250)}
                  &nbsp;
                  <button type='button' className={lcl.link} onClick={(() => setShowMore(true))}>
                    ... show more
                  </button>
                </span>
              )}
          </div>

          {/* thumbnails  - onclick opens modal window with full size image */}
          { review.photos[0] ? (
            <div className={`${lcl.thumbnailgroup} ${gbl.center} ${lcl.rowspace}`}>
              {
                review.photos.map((val) => {
                  if (validator.isURL(val.url)) {
                    return (
                      <input
                        type='image'
                        className={lcl.thumbnail}
                        key={getKey()}
                        id={val.id}
                        onClick={() => handleOnClickThumbnail(val.url)}
                        onKeyPress={() => handleOnClickThumbnail(val.url)}
                        src={val.url}
                        alt=''
                      />
                    );
                  }
                  return null;
                })
              }
            </div>
          )
            : null}
        </div>

        { /* recommended (conditional) */
          review.recommend ? (
            <div className={gbl.group}>
              <Check size={20} />
              <span>&nbsp;I recommend this product</span>
            </div>
          )
            : (
              <>I recommend this product</>
            )
        }

        <div>
          {/* reviewer name */}

          {review.verified
            ? (
              <span>
                {review.reviewer_name}
                ,&nbsp;
                <span className={lcl.verified}>Verified Purchaser</span>
              </span>
            )
            : (<span>{review.reviewer_name}</span>)}

          {/* {review.verified ? (<i className={`fa-solid fa-circle-check fa-sm ${lcl.icon}
          ${lcl.rowspace}`} /> ): null } */}
          {/* {review.reviewer_name} */}
        </div>

        { /* response from seller (conditional) */
          review.response ? (
            <div className={`${gbl.stack} ${lcl.response} ${lcl.rowspace}`}>
              <div className={lcl.bold}>Response:</div>
              <div>{review.response}</div>
            </div>
          )
            : null
        }

        <div className={`${gbl.group} ${lcl.rowspace} ${lcl.helpful} ${gbl.center} ${lcl.left}`}>
          {/* actions - Helpful, report */}
          <span>Helpful? </span>
          <button type='button' className={`${lcl.horizontalpadding} ${lcl.link}`} id='Yes' onClick={(e) => handleOnClickHelpful(e)} disabled={helpful.includes(review.review_id)}>Yes</button>
          <button type='button' className={`${lcl.horizontalpadding} ${lcl.link}`} id='No' onClick={(e) => handleOnClickHelpful(e)} disabled={helpful.includes(review.review_id)}>No</button>
          <span className={lcl.horizontalpadding}>
            (
            { review.helpfulness ? (review.helpfulness) : ('0')}
            )
          </span>
          <span className={lcl.horizontalpadding}>|</span>
          <button type='button' className={`${lcl.horizontalpadding} ${lcl.link}`} onClick={() => handleOnClickReport()} disabled={reported.includes(review.review_id)}>Report</button>
        </div>

        { showHR && (<hr />) }
      </div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        Module={<img src={currentImage} alt='' />}
      />

    </article>
  );
}
