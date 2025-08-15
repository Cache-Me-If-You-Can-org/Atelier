import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as styles from './qanda.module.css';
import * as g from '../global.module.css';

function QuestionForm({
  productId, productName, setIsOpen, setNewQuestion,
}) {
  const [errMsg, setErrMsg] = useState(null);
  let errBuilder = '';
  function validate() {
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    if (document.getElementById('question_body').value === '') {
      errBuilder += 'Question\n';
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
  function submitQuestionHandler() {
    if (validate()) {
      const q = {
        body: document.getElementById('question_body').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        product_id: parseInt(productId, 10),
      };
      setIsOpen(false);
      setNewQuestion(q);
    }
  }
  return (
    <div>
      <h3>Ask Your Question </h3>
      <h5>
        {'About the '}
        {productName}
      </h5>
      {errMsg && <p className={styles.error}>{`You must enter the following:\n${errMsg}`}</p>}
      <div>
        <p>Your Question:* </p>
        <input id='question_body' placeholder='Your Question' cols='50' rows='6' maxLength='1000' />
      </div>
      <div>
        <p>What is your nickname:* </p>
        <textarea id='name' placeholder='Example: jackson11!' maxLength='60' />
      </div>
      <p>For privacy reasons, do not use your full name or email address </p>
      <div>
        <p>Your email:* </p>
        <input id='email' placeholder='Example: jack@email.com' maxLength='60' />
      </div>
      <p>For authentication reasons, you will not be emailed </p>
      <button type='button' onClick={submitQuestionHandler}>Submit question</button>
    </div>
  );
}

export default QuestionForm;
