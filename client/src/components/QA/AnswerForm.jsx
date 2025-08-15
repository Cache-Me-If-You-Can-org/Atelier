import React, { useState } from 'react';
import PhotoForm from '../shared/PhotoForm';
import Modal from '../shared/Modal';
import * as styles from './qanda.module.css';
import * as g from '../global.module.css';

function AnswerForm({
  productName, question, setIsOpen, setNewAnswer,
}) {
  const [photoIsOpen, setPhotoIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [errMsg, setErrMsg] = useState(null);
  let errBuilder = '';
  function validate() {
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    if (document.getElementById('answer_body').value === '') {
      errBuilder += 'Answer\n';
    }
    if (document.getElementById('name').value === '') {
      errBuilder += 'Nickname\n';
    }
    if (document.getElementById('email').value === '') {
      errBuilder += 'Email\n';
    } else {
      const em = document.getElementById('email').value;
      if (!emailReg.test(em)) {
        errBuilder += 'Email with valid format';
      }
    }
    if (errBuilder.length > 0) {
      setErrMsg(errBuilder);
      return false;
    }
    return true;
  }
  function submitAnswerHandler() {
    if (validate()) {
      const ans = {
        body: document.getElementById('answer_body').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        photos,
      };
      // console.log(ans)
      setIsOpen(false);
      setNewAnswer(ans);
      // console.log('saved ans', ans);
    }
  }

  return (
    <div>
      <h3>Submit your Answer </h3>
      <h5>
        {productName}
        {': '}
        {question.question_body}
      </h5>
      {errMsg && <p className={styles.error}>{`You must enter the following:\n${errMsg}`}</p>}
      <div>
        <p>Your Answer:* </p>
        <textarea id='answer_body' placeholder='Your Answer' cols='50' rows='6' maxLength='1000' />
      </div>
      <div>
        <p>What is your nickname:* </p>
        <input id='name' placeholder='Example: jack543!' maxLength='60' />
      </div>
      <p>For privacy reasons, do not use your full name or email address </p>
      <div>
        <p>Your email:* </p>
        <input id='email' placeholder='Example: jack@email.com' maxLength='60' />
      </div>
      <p>For authentication reasons, you will not be emailed </p>
      <button type='button' onClick={() => { setPhotoIsOpen(true); }}>Add photos</button>
      <button type='button' onClick={submitAnswerHandler}>Submit answer</button>
      <Modal
        isOpen={photoIsOpen}
        setIsOpen={setPhotoIsOpen}
        Module={(
          <PhotoForm
            setIsOpen={setPhotoIsOpen}
            photos={photos}
            setPhotos={setPhotos}
            photoCount={5}
            isModal
          />
        )}
      />
    </div>
  );
}

export default AnswerForm;
