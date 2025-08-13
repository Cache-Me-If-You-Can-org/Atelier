import React, { useState } from 'react';
import CharacteristicInput from './CharacteristicInput';
import PhotoForm from '../../../shared/PhotoForm';
import QuarterStarRating from '../../../shared/QuarterStarRating';
import * as styles from '../../reviews.module.css';

function AddReview() {
  const [recommended, setRecommended] = useState('');
  const [size, setSize] = useState({ '': 0 });
  const [width, setWidth] = useState({ '': 0 });
  const [comfort, setComfort] = useState({ '': 0 });
  const [quality, setQuality] = useState({ '': 0 });
  const [length, setLength] = useState({ '': 0 });
  const [fit, setFit] = useState({ '': 0 });
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [stars, setStars] = useState([]);

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
    console.log({
      recommended,
      summary,
      body,
      nickname,
      email,
      photos,
      stars,
      characteristics,
    });
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
          <label className={styles.radioLabel} htmlFor='recommended'>
            <span className={styles.radioTitle}>Yes</span>
            <input
              className={styles.formRadio}
              type='radio'
              name='radioRecommendedGroup'
              value='true'
              checked={recommended === true}
              onChange={(e) => setRecommended(e.target.value === 'true')}
            />
          </label>
          <label className={styles.radioLabel} htmlFor='recommended'>
            <span className={styles.radioTitle}>No</span>
            <input
              className={styles.formRadio}
              type='radio'
              name='radioRecommendedGroup'
              value='false'
              checked={recommended === false}
              onChange={(e) => setRecommended(e.target.value === 'true')}
            />
          </label>
        </div>
      </div>

      <div className={styles.formBlock}>
        <h2>Characteristics</h2>
        <CharacteristicInput
          label='Size'
          name='size'
          options={[
            'A size too small',
            '½ a size too small',
            'Perfect',
            '½ a size too big',
            'A size too wide',
          ]}
          value={size}
          setValue={setSize}
        />

        <CharacteristicInput
          label='Width'
          name='width'
          options={[
            'Too narrow',
            'Slightly narrow',
            'Perfect',
            'Slightly wide',
            'Too wide',
          ]}
          value={width}
          setValue={setWidth}
        />

        <CharacteristicInput
          label='Comfort'
          name='comfort'
          options={[
            'Uncomfortable',
            'Slightly uncomfortable',
            'Ok',
            'Comfortable',
            'Perfect',
          ]}
          value={comfort}
          setValue={setComfort}
        />

        <CharacteristicInput
          label='Quality'
          name='quality'
          options={[
            'Poor',
            'Below average',
            'What I expected',
            'Pretty great',
            'Perfect',
          ]}
          value={quality}
          setValue={setQuality}
        />

        <CharacteristicInput
          label='Length'
          name='length'
          options={[
            'Runs short',
            'Runs slightly short',
            'Perfect',
            'Runs slightly long',
            'Runs long',
          ]}
          value={length}
          setValue={setLength}
        />

        <CharacteristicInput
          label='Fit'
          name='fit'
          options={[
            'Runs tight',
            'Runs slightly tight',
            'Perfect',
            'Runs slightly long',
            'Runs long',
          ]}
          value={fit}
          setValue={setFit}
        />
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
