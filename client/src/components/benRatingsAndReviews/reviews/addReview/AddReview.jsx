import React, { useState } from 'react';
import CharacteristicInput from './CharacteristicInput';
import PhotoForm from '../../../shared/PhotoForm';
import QuarterStarRating from '../../../shared/QuarterStarRating';
import * as styles from '../../reviews.module.css';

function AddReview({
  productId, productName, meta, handleAddReview,
}) {
  const [recommend, setRecommend] = useState('');
  const [size, setSize] = useState({});
  const [width, setWidth] = useState({});
  const [comfort, setComfort] = useState({});
  const [quality, setQuality] = useState({});
  const [length, setLength] = useState({});
  const [fit, setFit] = useState({});
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

  const characteristicOptions = {
    size: [
      'A size too small',
      '½ a size too small',
      'Perfect',
      '½ a size too big',
      'A size too wide',
    ],
    width: [
      'Too narrow',
      'Slightly narrow',
      'Perfect',
      'Slightly wide',
      'Too wide',
    ],
    comfort: [
      'Uncomfortable',
      'Slightly uncomfortable',
      'Ok',
      'Comfortable',
      'Perfect',
    ],
    quality: [
      'Poor',
      'Below average',
      'What I expected',
      'Pretty great',
      'Perfect',
    ],
    length: [
      'Runs short',
      'Runs slightly short',
      'Perfect',
      'Runs slightly long',
      'Runs long',
    ],
    fit: [
      'Runs tight',
      'Runs slightly tight',
      'Perfect',
      'Runs slightly long',
      'Runs long',
    ],
  };

  const starMeaning = [
    'Poor',
    'Fair',
    'Average',
    'Good',
    'Great',
  ];

  const metaCharacteristics = meta?.characteristics || [];

  const characteristicsArr = Object.entries(metaCharacteristics).map(([name, data]) => ({
    name,
    ...data,
  }));

  const fullCharArr = characteristicsArr.map((obj) => ({
    ...obj,
    options: characteristicOptions[obj.name.toLowerCase()],
  }));

  console.log(fullCharArr);

  const emailPattern = /\S+@\S+\.\S+/;

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedSummary = summary.trim();
    const trimmedBody = body.trim();
    const trimmedName = nickname.trim();
    const trimmedEmail = email.trim();

    if (stars === 0) {
      setOverallRatingError(!overallRatingError);
    }

    if (recommend === '') {
      setRecommendError(!recommendError);
    }

    if (trimmedSummary.length > 60) {
      setSummaryError(!summaryError);
    }

    if (trimmedBody.length < 50) {
      setBodyError(!bodyError);
    }

    if (trimmedName === '') {
      setNicknameError(!nicknameError);
    }

    if (!emailPattern.test(trimmedEmail) || trimmedEmail.length === 0) {
      setEmailError(!emailError);
      return;
    }

    const characteristics = {
      ...size,
      ...width,
      ...comfort,
      ...quality,
      ...length,
      ...fit,
    };
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

    handleAddReview(newReview);
  };

  const setters = {
    size: setSize,
    width: setWidth,
    comfort: setComfort,
    quality: setQuality,
    length: setLength,
    fit: setFit,
  };

  const values = {
    size,
    width,
    comfort,
    quality,
    length,
    fit,
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Write Your Review</h1>
      <h2>
        About the&nbsp;
        {/* {productName} */}
      </h2>
      <div className={styles.formBlock}>
        <h3>
          Overall rating
          <span className={styles.requiredFlag}>*</span>
        </h3>
        {overallRatingError ? <p className={styles.errorMessage}>Selection required</p> : null}
        <div className={styles.starWrapper}>
          <QuarterStarRating isReview size={32} getRating={setStars} />
          <p>{starMeaning[stars - 1]}</p>
        </div>
      </div>
      <div className={styles.formBlock}>
        <h3>
          Do you recommend this product?
          <span className={styles.requiredFlag}>*</span>
        </h3>
        {recommendError ? <p className={styles.errorMessage}>Selection required</p> : null}
        <div className={styles.radioSection}>
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
        <h3>
          Characteristics
          <span className={styles.requiredFlag}>*</span>
        </h3>

        {fullCharArr.map((characteristic) => (
          <CharacteristicInput
            key={characteristic.id}
            id={characteristic.id.toString()}
            label={characteristic.name}
            name={characteristic.name}
            options={characteristic.options}
            value={values[characteristic.name.toLowerCase()]}
            setValue={setters[characteristic.name.toLowerCase()]}
          />
        ))}
      </div>

      <div className={styles.formBlock}>
        <label className={styles.formLabel} htmlFor='summary'>
          <h3>
            Summary
          </h3>
          {summaryError ? (
            <p className={styles.errorMessage}>
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
          <h3>
            Review body
            <span className={styles.requiredFlag}>*</span>
          </h3>
          {bodyError
            ? (
              <p className={styles.errorMessage}>
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
        <p>
          Minimum required characters left:&nbsp;
          {body.length < 50
            ? <span>{50 - body.length}</span>
            : <span>Minimum reached</span>}
        </p>
      </div>

      <div className={styles.formBlock}>
        <h3>
          Upload your photos
        </h3>
        <PhotoForm setPhotos={setPhotos} photos={photos} photoCount={5} isModal={false} />
      </div>

      <div className={styles.formBlock}>
        <label className={styles.formLabel} htmlFor='nickname'>
          <h3>
            What is your nickname?
            <span className={styles.requiredFlag}>*</span>
          </h3>
          {nicknameError ? <p className={styles.errorMessage}>Name required</p> : null}
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
          <h3>
            Your email
            <span className={styles.requiredFlag}>*</span>
          </h3>
          {emailError ? <p className={styles.errorMessage}>Please submit a valid email</p> : null}
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
