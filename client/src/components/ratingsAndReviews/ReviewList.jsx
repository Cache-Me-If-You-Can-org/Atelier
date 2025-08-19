import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Review from './Review';
import * as lcl from './ratingsAndReviews.module.css';
import * as gbl from '../global.module.css';
// import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from '../shared/Modal';
import AddReview from './AddReview';

function getKey() {
  return uuidv4();
}
//
export default function ReviewList({
  meta, productName, setNewReview, cDef, filters,
}) {
  const [page, setPage] = useState(1);
  const [count] = useState(2);

  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState('relevant');
  const [isOpen, setIsOpen] = useState(false);

  const [reviewCount, setReviewCount] = useState(0);
  const [prodId, setProdId] = useState(meta?.product_id);

  const [markedHelpful, setMarkedHelpful] = useState([]);
  const [markedReported, setMarkedReported] = useState([]);
  const [errMsg, setErrMsg] = useState(null);

  const sortOptions = {
    helpful: 'helpful',
    newest: 'newest',
    relevant: 'relevant',
  };

  function getReviews(data, productId, callback) {
    if (!productId) {
      return;
    }
    axios.get('/reviews/sort/', {
      params: {
        page,
        count,
        sort,
        product_id: productId,
        filters: [...filters].map((x) => x[0]),
      },
    })
      .then((res) => {
        callback([...data, ...res.data.results]);
      })
      .catch((err) => {
        setErrMsg(err.code);
        callback([]);
      });
  }

  useEffect(() => {
    if (!_.isEmpty(meta)) {
      setReviewCount(1 * meta.recommended.true + 1 * meta.recommended.false);
      if (prodId !== meta.product_id) {
        setProdId(meta.product_id);
        setPage(1);
        getReviews([], meta.product_id, setReviews);
      } else {
        getReviews(reviews, prodId, setReviews);
      }
    }
  }, [meta]);

  useEffect(() => {
    if (page > 1) {
      getReviews(reviews, prodId, setReviews);
    }
  }, [page]);

  useEffect(() => {
    setPage(1);
    getReviews([], prodId, setReviews);
  }, [sort, filters, helpful]);

  return (
    <article className={lcl.reviews} id='reviewlist'>

      {errMsg && <div>{errMsg}</div>}

      {_.isEmpty(meta) && <div>Loading...</div> }

      {!_.isEmpty(meta) && (
      <>
        {/* <div>filters: {[...filters].map(x => x[0])}</div> */}

        <div className={`${gbl.stack} ${lcl.reviewlist}`}>
          <div className={`${gbl.group} ${lcl.listtitle}`}>
            <div>
              {' '}
              {reviewCount}
              {' '}
              reviews, sorted by
              {' '}
            </div>
            <select className={lcl.sort} name='sortOptions' id='sortOptions' onChange={(e) => setSort(e.target.value)} value={sort}>
              { Object.keys(sortOptions).map(
                (option) => <option value={option} key={getKey()}>{option}</option>,
              )}
            </select>
          </div>
          <hr />
          { reviews.length > 0 ? (
            <div className={lcl.scrollable}>
              {reviews.map(
                (row, idx) => (
                  <Review
                    review={row}
                    key={getKey()}
                    showHR={idx !== reviews.length - 1}
                    reported={markedReported}
                    setReported={setMarkedReported}
                    helpful={markedHelpful}
                    setHelpful={setMarkedHelpful}
                  />
                ),
              )}
            </div>
          ) : null }
          <hr />
          <div className={`${gbl.group} ${gbl.center}`}>
            {/* control buttons here */}
            { reviewCount > reviews.length ? (
              <button type='button' id='moreReviews' name='moreReviews' className={lcl.buttonPadding} onClick={() => setPage(page + 1)}>
                More Reviews
              </button>
            )
              : null}
            <button type='button' id='addReview' name='addReview' className={lcl.buttonPadding} onClick={() => setIsOpen(true)}>
              Add Review
            </button>
          </div>
        </div>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          disableClose
          Module={(
            <AddReview
              meta={meta}
              productName={productName}
              cDef={cDef}
              setIsOpenReview={setIsOpen}
              reviewAdded={setNewReview}
            />
            )}
        />
      </>
      )}
    </article>
  );
}
