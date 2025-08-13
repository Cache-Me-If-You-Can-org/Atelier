import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoForm from '../shared/PhotoForm';
import Modal from '../shared/Modal';

function AnswerForm({
  productId, question, setIsOpen, setNewAnswer,
}) {
  const [productName, setProductName] = useState(null);
  const [photoIsOpen, setPhotoIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    axios.get(`/products/${productId}`)
      .then((res) => {
        setProductName(res.data.name);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);
  function validate() {
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    let errMsg = '';
    if (document.getElementById('answer_body').value === '') {
      errMsg += 'Answer\n';
    }
    if (document.getElementById('name').value === '') {
      errMsg += 'Nickname\n';
    }
    if (document.getElementById('email').value === '') {
      errMsg += 'Email\n';
    } else {
      const em = document.getElementById('email').value;
      if (!emailReg.test(em)) {
        errMsg += 'Email with valid format';
      }
    }
    if (errMsg) {
      alert(`You must enter the following:\n${errMsg}`);
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
        :
        {question.question_body}
      </h5>
      <div>
        <p>Your Answer: </p>
        <input id='answer_body' placeholder='Your Answer' />
      </div>
      <div>
        <p>What is your nickname: </p>
        <input id='name' placeholder='Example: jack543!' />
      </div>
      <p>For privacy reasons, do not use your full name or email address </p>
      <div>
        <p>Your email: </p>
        <input id='email' placeholder='Example: jack@email.com' />
      </div>
      <p>For authentication reasons, you will not be emailed </p>
      <input type='button' value='Add photos' onClick={() => { setPhotoIsOpen(true); }} />
      <input type='button' value='Submit answer' onClick={submitAnswerHandler} />
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
