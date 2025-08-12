import React from 'react';
import QuestionsList from './QuestionsList';

function QA({ currentProductId }) {
  // const product_id = currentProductId; //product from server
  // const product_id ='37322' // multiple answers, 1 q
  const product_id = '37324'; // multiple answers, multiple questions
  return (
    <div>
      <h4>QUESTIONS & ANSWERS</h4>
      <QuestionsList product_id={product_id} />
    </div>
  );
}

export default QA;
