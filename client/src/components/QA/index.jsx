import React from 'react';
import axios from 'axios';
import QuestionsList from './QuestionsList';

function QA({ currentProductId }) {
  const productId = currentProductId; // product from server
  // const productId = '37322'; // multiple answers, 1 q
  // const productId = '37324'; // multiple answers, multiple questions
  axios.get(`/products/${productId}`);
  return (
    <section id='questionsAndAnswers'>
      <h4>QUESTIONS & ANSWERS</h4>
      <QuestionsList productId={productId} />
    </section>
  );
}

export default QA;
