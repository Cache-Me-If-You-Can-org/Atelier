import React, { useState } from 'react';
import CharacteristicsSelector from './CharacteristicsSelector';
import PhotoForm from '../../../shared/PhotoForm';
import QuarterStarRating from '../../../shared/QuarterStarRating';
import * as g from '../../../global.module.css';
import * as styles from '../../reviews.module.css';

function AddReview({
  productId, meta, handleAddReview,
}) {
  const [recommend, setRecommend] = useState('');
  const [characteristics, setCharacteristics] = useState({});
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [stars, setStars] = useState(0);

  const [overallRatingError, setOverallRatingError] = useState(false);
  const [recommendError, setRecommendError] = useState(false);
  const [characteristicsError, setCharacteristicsError] = useState(false);
  const [summaryError, setSummaryError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const getCharacteristics = (newCharacteristics) => {
    setCharacteristics(newCharacteristics);
  };

  const starMeaning = [
    'Poor',
    'Fair',
    'Average',
    'Good',
    'Great',
  ];

  const emailPattern = /\S+@\S+\.\S+/;

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedSummary = summary.trim();
    const trimmedBody = body.trim();
    const trimmedName = nickname.trim();
    const trimmedEmail = email.trim();

    setCharacteristicsError(Object.keys(characteristics).length
    !== Object.keys(meta?.characteristics).length);
    setOverallRatingError(stars === 0);
    setRecommendError(recommend === '');
    setSummaryError(trimmedSummary.length > 60);
    setBodyError(trimmedBody.length < 50);
    setNicknameError(trimmedName === '');
    setEmailError(!emailPattern.test(trimmedEmail) || trimmedEmail.length === 0);

    if (
      Object.keys(characteristics).length !== Object.keys(meta?.characteristics).length
      || stars === 0
      || recommend === ''
      || trimmedSummary.length > 60
      || trimmedBody.length < 50
      || trimmedName === ''
      || !emailPattern.test(trimmedEmail)
      || trimmedEmail.length === 0
    ) {
      return;
    }

    const newReview = {
      product_id: productId,
      rating: stars,
      summary: trimmedSummary,
      body: trimmedBody,
      recommend,
      name: trimmedName,
      email: trimmedEmail,
      photos,
      characteristics,
    };

    console.log(newReview);

    handleAddReview(newReview);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className={g.textLg}>Write Your Review</h1>
      <h2 className={g.textMd}>
        About the&nbsp;
        {/* {productName} */}
      </h2>

      <div className={styles.formBlock}>
        <h3 className={g.textMd}>
          Overall rating
          <span className={styles.requiredFlag}>*</span>
        </h3>
        <div>
          {overallRatingError ? <p className={`${styles.errorMessage} ${g.textSm}`}>Selection required</p> : null}
        </div>
        <div className={styles.starWrapper}>
          <QuarterStarRating isReview size={24} getRating={setStars} />
          <p className={g.textXs}>{starMeaning[stars - 1]}</p>
        </div>
      </div>
      <div className={styles.formBlock}>
        <h3 className={g.textMd}>
          Do you recommend this product?
          <span className={styles.requiredFlag}>*</span>
        </h3>
        <div>
          {recommendError ? <p className={`${styles.errorMessage} ${g.textSm}`}>Selection required</p> : null}
        </div>
        <div className={`${styles.radioSection} ${g.textSm}`}>
          <label className={styles.radioLabel} htmlFor='recommend'>
            <span className={styles.radioTitle}>Yes</span>
            <input
              className={styles.formRadio}
              type='radio'
              name='radioRecommendGroup'
              value='true'
              checked={recommend === true}
              onChange={(e) => setRecommend(e.target.value === 'true')}
            />
          </label>
          <label className={styles.radioLabel} htmlFor='recommend'>
            <span className={styles.radioTitle}>No</span>
            <input
              className={styles.formRadio}
              type='radio'
              name='radioRecommendGroup'
              value='false'
              checked={recommend === false}
              onChange={(e) => setRecommend(e.target.value === 'true')}
            />
          </label>
        </div>
      </div>

      <div className={styles.formBlock}>
        <h3 className={g.textMd}>
          Characteristics
          <span className={styles.requiredFlag}>*</span>
        </h3>
        <div>
          {characteristicsError && (
            <p className={`${styles.errorMessage} ${g.textSm}`}>Please select a value for every characteristic</p>
          )}
        </div>
        <CharacteristicsSelector
          getCharacteristics={getCharacteristics}
          characteristics={meta?.characteristics}
        />
      </div>

      <div className={styles.formBlock}>
        <label className={styles.formLabel} htmlFor='summary'>
          <h3 className={g.textMd}>
            Summary
          </h3>
          {summaryError ? (
            <p className={`${styles.errorMessage} ${g.textSm}`}>
              Summary must be less than 60 characters
            </p>
          ) : null}
          <input
            className={styles.formInput}
            value={summary}
            maxLength='60'
            onChange={(e) => setSummary(e.target.value)}
            type='text'
            name='summary'
            placeholder='Example: Best purchase ever!'
          />
        </label>
        <label className={styles.formLabel} htmlFor='body'>
          <h3 className={g.textMd}>
            Review body
            <span className={styles.requiredFlag}>*</span>
          </h3>
          {bodyError
            ? (
              <p className={`${styles.errorMessage} ${g.textSm}`}>
                Body must be greater than 50 characters
              </p>
            ) : null}
          <textarea
            className={styles.formInput}
            minLength='50'
            maxLength='1000'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            name='body'
            rows='3'
            cols='33'
            placeholder='Why did you like the product or not?'
          />
        </label>
        <p className={g.textSm}>
          Minimum required characters left:&nbsp;
          {body.length < 50
            ? <span>{50 - body.length}</span>
            : <span>Minimum reached</span>}
        </p>
      </div>

      <div className={styles.formBlock}>
        <h3 className={g.textMd}>
          Upload your photos
        </h3>
        <PhotoForm setPhotos={setPhotos} photos={photos} photoCount={5} isModal={false} />
      </div>

      <div className={styles.formBlock}>
        <label className={styles.formLabel} htmlFor='nickname'>
          <h3 className={g.textMd}>
            What is your nickname?
            <span className={styles.requiredFlag}>*</span>
          </h3>
          <div>
            {nicknameError ? <p className={`${styles.errorMessage} ${g.textSm}`}>Name required</p> : null}
          </div>
          <input
            className={styles.formInput}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            type='text'
            name='nickname'
            placeholder='Your nickname'
          />
        </label>
        <label className={styles.formLabel} htmlFor='email'>
          <h3 className={g.textMd}>
            Your email
            <span className={styles.requiredFlag}>*</span>
          </h3>
          <div>
            {emailError ? <p className={`${styles.errorMessage} ${g.textSm}`}>Please submit a valid email</p> : null}
          </div>
          <input
            className={styles.formInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            name='email'
            placeholder='Your email'
          />
        </label>
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default AddReview;
