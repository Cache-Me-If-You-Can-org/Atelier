import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import validator from 'validator';
import * as lcl from './ratingsAndReviews.module.css';
import * as gbl from '../global.module.css';
import Modal from '../shared/Modal';
import LoadImage from './LoadImage';
import QuarterStarRating from '../shared/QuarterStarRating';
import { v4 as uuidv4 } from 'uuid';

export default function AddReview({
  meta, productName, cDef, setIsOpenReview, reviewAdded,
}) {
  const [selectedCharacteristics, setSelectedCharacteristics] = useState({});
  const [render, setRender] = useState(true);
  const [bodyCount, setBodyCount] = useState('Minimum required characters left [50]');
  const [images, setImages] = useState([null, null, null, null, null]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [myRating, setMyRating] = useState(0);

  const [nicknameValue, setNicknameValue] = useState(null);
  const [emailValue, setEmailValue] = useState(null);
  const [summaryValue, setSummaryValue] = useState(null);
  const [bodyValue, setBodyValue] = useState(null);
  const [iRecommend, setIRecommend] = useState(null);
  const [editMsgs, setEditMsgs] = useState({});

  const [errMsg, setErrMsg] = useState(null);

  function getKey() {
    return uuidv4();
  }

  function passEditChecks() {
    const msgs = {};

    if (!myRating || myRating === 0) {
      msgs.myRating = 'A rating must be selected';
    }
    if (iRecommend === null) {
      msgs.recommend = 'a Yes or No recommendation must be specified';
    }

    if (Object.keys(selectedCharacteristics).length !== Object.keys(meta.characteristics).length) {
      msgs.characteristics = 'All characteristics must have a rating value';
    }

    if (!summaryValue || summaryValue.length > 60) {
      msgs.summary = 'A review summary must be entered and be no more than 60 characters';
    }
    if (!bodyValue || bodyValue.length < 50 || bodyValue.length > 1000) {
      msgs.body = 'The review body must be betweeen 50 and 1000 characters';
    }
    if (!nicknameValue || nicknameValue.length > 60) {
      msgs.nickname = 'Nickname must be entered and be no more than 60 characters';
    }

    if (!emailValue || !validator.isEmail(emailValue) || emailValue.length > 60) {
      msgs.email = 'A valid email address must be entered and be no more than 60 characters';
    }

    if (Object.keys(msgs).length) {
      setEditMsgs(msgs);
      return false;
    }
    return true;
  }

  function handleOnClickSubmit(e) {
    e.preventDefault();
    if (e.target.id === 'post' && passEditChecks()) {
      const tmp = {};
      Object.keys(meta.characteristics).forEach((key) => {
        tmp[meta.characteristics[key].id] = 1 * selectedCharacteristics[key] + 1;
      });
      const newReviewData = {
        product_id: 1 * meta.product_id,
        rating: myRating,
        summary: summaryValue,
        body: bodyValue,
        recommend: iRecommend,
        name: nicknameValue,
        email: emailValue,
        photos: images.filter((item) => item),
        characteristics: tmp,
      };
      axios.post('/reviews', JSON.stringify(newReviewData), { headers: { 'Content-Type': 'application/json' } })
        .then(() => {
          reviewAdded(true);
          setIsOpenReview(false);
        })
        .catch((err) => {
          setErrMsg(`${err.code}: ${err.message}`);
        });
    }
    if (e.target.id === 'cancel') {
      setIsOpenReview(false);
    }
  }

  function handleOnClickCharacteristics(e) {
    const tmp = selectedCharacteristics;
    tmp[e.target.name] = e.target.value;
    setSelectedCharacteristics(tmp);
    setRender(!render);
  }

  function handleOnClickCRecommend(e) {
    setIRecommend(e.target.value === 'Yes');
  }

  function handleOnInputBody(e) {
    setBodyCount(e.target.value.length < 50
      ? `Minimum required charactes left [${50 - e.target.value.length}]`
      : 'Minimum reached');
    setBodyValue(validator.escape(e.target.value));
  }

  function handleOnClickImage(e) {
    setCurrentImageIdx(+e.target.id);
    setIsOpen(true);
  }

  return (
    <form className={`${gbl.stack} ${gbl.center}`}>

      {errMsg
      && (
      <div className={`${gbl.stack} ${gbl.center}`}>
        <div className={lcl.errormessage}>{errMsg}</div>
        <button
          type='button'
          id='cancel'
          className={lcl.buttonPadding}
          onClick={(e) => handleOnClickSubmit(e)}
        >
          Cancel
        </button>
      </div>
      )}

      {!errMsg && _.isEmpty(meta) && <p>loading...</p>}

      {!errMsg && !_.isEmpty(meta) && (
        <>
          <div className={`${gbl.stack} ${gbl.center} ${lcl.formTitle}`}>
            {/* form title */}
            <p>Write Your Review Here</p>
            <p className={lcl.subTitle}>
              About the
              {' '}
              {productName}
            </p>
          </div>

          <div className={gbl.stack}>
            {/* star rating */}
            <QuarterStarRating isReview size={32} getRating={setMyRating} />
            {editMsgs.myRating && <span className={lcl.validationErr}>{editMsgs.myRating}</span>}
          </div>

          <div className={`${gbl.group} ${lcl.spaceVertical}`}>
            {/* recommendation */}
            <span>
              Do you recommend this product?
              <span className={lcl.required}>*</span>
            </span>
            <label htmlFor='recommendYes' className={lcl.radio}>
              Yes
              <input
                type='radio'
                className={lcl.radio}
                id='recommendYes'
                name='recommend'
                value='Yes'
                onChange={(e) => handleOnClickCRecommend(e)}
                checked={iRecommend === true}
              />
            </label>
            <label htmlFor='recommendNo' className={lcl.radio}>
              No
              <input
                type='radio'
                className={lcl.radio}
                id='recommendNo'
                name='recommend'
                value='No'
                onChange={(e) => handleOnClickCRecommend(e)}
                checked={iRecommend === false}
              />
            </label>
          </div>
          {editMsgs.recommend && <span className={lcl.validationErr}>{editMsgs.recommend}</span>}

          <div>
            {/* characteristics */}
            <div>
              {' '}
              Select Characteristics:
              <span className={lcl.required}>*</span>
            </div>
            {editMsgs.characteristics
              && <span className={lcl.validationErr}>{editMsgs.characteristics}</span>}

            {Object.keys(cDef).map((range) => (meta.characteristics[range]
              ? (
                <div key={getKey()} className={lcl.spaceVertical}>

                  <div className={gbl.group} key={getKey()}>
                    {range}
                    :&nbsp;
                    <span className={`${gbl.center} ${lcl.legend}`} key={getKey()}>
                      {selectedCharacteristics[range] ? cDef[range][selectedCharacteristics[range]] : 'none selected'}
                      &nbsp;&nbsp;
                    </span>
                  </div>

                  <div className={gbl.group}>
                    <span className={lcl.charWidth}>
                      {cDef[range][0]}
                      &nbsp;&nbsp;
                    </span>
                    <div className={`${gbl.group}${lcl.legend}`} key={getKey()}>

                      {cDef[range].map((item, idx) => (
                        <input
                          type='radio'
                          className={lcl.radio}
                          name={range}
                          value={idx}
                          key={getKey()}
                          onChange={(e) => handleOnClickCharacteristics(e, range)}
                          checked={1 * selectedCharacteristics[range] === idx}
                        />
                      ))}
                    </div>
                    <span>
                      &nbsp;&nbsp;
                      {cDef[range][4]}
                    </span>
                  </div>
                </div>
              )
              : null
            ))}
          </div>

          <div className={lcl.spaceVertical}>
            {/* review Summary */}
            <label htmlFor='summary'>
              Summary:
              <span className={lcl.required}>*</span>
&nbsp;
              <input
                type='text'
                id='summary'
                name='summary'
                placeholder='Example: Best purchase ever!'
                size='30'
                onInput={(e) => setSummaryValue(validator.escape(e.target.value))}
              />
            </label>
          </div>
          {editMsgs.summary && <span className={lcl.validationErr}>{editMsgs.summary}</span>}

          <div className={`${gbl.stack} ${gbl.center} ${lcl.spaceVertical}`}>
            {/* review body */}
            <textarea
              id='body'
              name='body'
              placeholder='What did you like the product or not?'
              rows='10'
              cols='50'
              onInput={(e) => handleOnInputBody(e)}
            />
            <span>{bodyCount}</span>
          </div>
          {editMsgs.body && <span className={lcl.validationErr}>{editMsgs.body}</span>}

          <div>
            {/* Images */}

            <div className={`${lcl.thumbnailgroup} ${gbl.center} ${lcl.rowspace} ${lcl.spaceVertical}`}>
              {
                images.map((item, idx) => (item
                  ? (
                    <input
                      type='image'
                      className={lcl.thumbnail}
                      id={idx}
                      onClick={(e) => handleOnClickImage(e)}
                      onKeyPress={(e) => handleOnClickImage(e)}
                      src={item}
                      key={getKey()}
                      alt=''
                    />
                  )
                  : (
                    <input
                      type='image'
                      className={`${lcl.thumbnailplaceholder} ${gbl.center}`}
                      id={idx}
                      key={getKey()}
                      onClick={(e) => handleOnClickImage(e)}
                      onKeyPress={(e) => handleOnClickImage(e)}
                      alt=''
                    />
                  )
                ))
              }
            </div>

          </div>
          <div className={`${gbl.stack} ${lcl.spaceVertical}`}>
            {/* personal information */}
            <div className={`${gbl.group}  ${lcl.spaceVertical}`}>
              <label htmlFor='nickname'>
                Nickname:
                <span className={lcl.required}>*</span>
                &nbsp;
                <input
                  type='text'
                  id='nickname'
                  name='nickname'
                  placeholder='Example: jackson11!'
                  maxLength='60'
                  minLength='1'
                  size='40'
                  onInput={(e) => setNicknameValue(validator.escape(e.target.value))}
                />
              </label>
            </div>
            <p className={lcl.subTitle}>
              For privacy reasons, do not use your full name or email address
            </p>
            {editMsgs.nickname && <span className={lcl.validationErr}>{editMsgs.nickname}</span>}

            <div className={`${gbl.group}  ${lcl.spaceVertical}`}>
              <label htmlFor='email'>
                eMail Address:
                <span className={lcl.required}>*</span>
&nbsp;
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Example: jackson11@email.com'
                  maxLength='60'
                  minLength='1'
                  size='40'
                  onInput={(e) => setEmailValue(validator.escape(e.target.value))}
                />
              </label>
            </div>
            <p className={lcl.subTitle}>For authentication reasons, you will not be emailed</p>
          </div>
            {editMsgs.email && <span className={lcl.validationErr}>{editMsgs.email}</span>}
          <div>
            <button
              type='button'
              id='post'
              className={lcl.buttonPadding}
              onClick={(e) => handleOnClickSubmit(e)}
            >
              Post
            </button>
            <button
              type='button'
              id='cancel'
              className={lcl.buttonPadding}
              onClick={(e) => handleOnClickSubmit(e)}
            >
              Cancel
            </button>
          </div>
        </>
      )}

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        disableClose
        Module={(
          <LoadImage
            setImages={setImages}
            setIsOpenImage={setIsOpen}
            images={images}
            idx={currentImageIdx}
            allowOverlay={false}
            allowClose={false}
          />
        )}
      />

    </form>
  );
}
