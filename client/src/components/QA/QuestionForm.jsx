import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuestionForm({
  productId, setIsOpen, newQuestion, setNewQuestion,
}) {
  const [productName, setProductName] = useState(null);
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
    if (document.getElementById('question_body').value === '') {
      errMsg += 'Question\n';
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
  function submitQuestionHandler() {
    if (validate()) {
      const q = {
        body: document.getElementById('question_body').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        product_id: parseInt(productId, 10),
      };
      console.log(q);
      setIsOpen(false);
      setNewQuestion(q);
      console.log('saved q', q);
    }
  }
  return (
    <div>
      <h3>Ask Your Question </h3>
      <h5>
        About the
        {productName}
      </h5>
      <div>
        <p>Your Question: </p>
        <input id='question_body' placeholder='Your Question' />
      </div>
      <div>
        <p>What is your nickname: </p>
        <input id='name' placeholder='Example: jackson11!' />
      </div>
      <p>For privacy reasons, do not use your full name or email address </p>
      <div>
        <p>Your email: </p>
        <input id='email' placeholder='Example: jack@email.com' />
      </div>
      <p>For authentication reasons, you will not be emailed </p>
      <input type='button' value='Submit question' onClick={submitQuestionHandler} />
    </div>
  );
}

export default QuestionForm;
