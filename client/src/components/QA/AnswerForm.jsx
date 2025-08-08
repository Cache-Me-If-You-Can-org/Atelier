import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as styles from './qanda.module.css';

function AnswerForm({product_id, question}) {
  // this should be rendered in a new window
  // axios GET for product_name
  const product_name = 'product name'
  return (
    <div>
      <h3>Submit your Answer</h3>
      <h5>{product_name}: {question.question_body}</h5>
      <div>
        <label>Your Answer: </label>
        <input placeholder="Your Answer"></input>
      </div>
      <div>
        <label>What is your nickname: </label>
        <input placeholder="Example: jack543!"></input>
      </div>
      <p>For privacy reasons, do not use your full name or email address</p>
      <div>
        <label>Your email: </label>
        <input placeholder="Example: jack@email.com"></input>
      </div>
      <p>For authentication reasons, you will not be emailed</p>
      <input type="button" value="Add photos"></input>
    </div>
  )
}

export default AnswerForm;