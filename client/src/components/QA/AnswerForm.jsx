import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import * as styles from './qanda.module.css';

function AnswerForm({product_id, question, setIsOpen, setNewAnswer}) {
  // this should be rendered in a new window
  // axios GET for product_name

  function validate() {
    const emailReg = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    let errMsg = ''
    if (document.getElementById("answer_body").value === '') {
      errMsg += 'Answer\n';
    }
    if (document.getElementById("name").value === '') {
      errMsg += 'Nickname\n';
    }
    if (document.getElementById("email").value === '') {
      errMsg += 'Email\n';
    } else {
      const em = document.getElementById("email").value;
      if (!emailReg.test(em)) {
        errMsg += 'Email with valid format';
      }
    }
    if (errMsg) {
      alert('You must enter the following:\n' + errMsg);
      return false;
    } else {
      return true;
    }
  }
  function submitAnswerHandler() {
    if (validate()) {
      let ans = {
        body: document.getElementById("answer_body").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        photos: []
      }
      //console.log(ans)
      setIsOpen(false);
      setNewAnswer(ans);
      console.log('saved ans', ans);

    }
  }

  const product_name = 'product name'
  return (
    <div>
      <h3>Submit your Answer</h3>
      <h5>{product_name}: {question.question_body}</h5>
      <div>
        <label>Your Answer: </label>
        <input id="answer_body" placeholder="Your Answer"></input>
      </div>
      <div>
        <label>What is your nickname: </label>
        <input id="name" placeholder="Example: jack543!"></input>
      </div>
      <p>For privacy reasons, do not use your full name or email address</p>
      <div>
        <label>Your email: </label>
        <input id="email" placeholder="Example: jack@email.com"></input>
      </div>
      <p>For authentication reasons, you will not be emailed</p>
      <input type="button" value="Add photos"></input>
      <input type="button" value="Submit answer" onClick={submitAnswerHandler}></input>
    </div>
  )
}

export default AnswerForm;