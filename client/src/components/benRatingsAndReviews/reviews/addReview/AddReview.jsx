import React, { useState } from 'react';
import CharacteristicInput from './CharacteristicInput';
import PhotoForm from '../../../shared/PhotoForm';
import QuarterStarRating from '../../../shared/QuarterStarRating';
import * as styles from '../../reviews.module.css';

function AddReview({ productId, meta, handleAddReview }) {
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
  const [stars, setStars] = useState([]);

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

  const metaCharacteristics = meta?.characteristics || [];

  const characteristicsArr = Object.entries(metaCharacteristics).map(([name, data]) => ({
    name,
    ...data,
  }));

  const fullCharArr = characteristicsArr.map((obj) => ({
    ...obj,
    options: characteristicOptions[obj.name.toLowerCase()],
  }));

  const handleSubmit = (event) => {
    event.preventDefault();
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
      summary,
      body,
      recommend,
      name: nickname,
      email,
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
      <h1>Add Review</h1>
      <div className={styles.formBlock}>
        <h2>Overall Rating</h2>
        <QuarterStarRating isReview size={32} getRating={setStars} />
      </div>
      <div className={styles.formBlock}>
        <h2>Recommendation</h2>
        <p>Do you recommend this product?</p>
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
        <h2>Characteristics</h2>

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
        <h2>Summary</h2>
        <label className={styles.formLabel} htmlFor='summary'>
          Review Summary:
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
          Review Body:
          <textarea
            className={styles.formInput}
            minLength='50'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            name='body'
            rows='3'
            cols='33'
            placeholder='Why did you like the product or not?'
          />
        </label>
      </div>

      <div className={styles.formBlock}>
        <PhotoForm setPhotos={setPhotos} photos={photos} photoCount={5} isModal={false} />
      </div>

      <div className={styles.formBlock}>
        <h2>Info</h2>
        <label className={styles.formLabel} htmlFor='nickname'>
          Nickname:
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
          Email:
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
