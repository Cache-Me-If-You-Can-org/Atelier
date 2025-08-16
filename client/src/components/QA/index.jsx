import React from 'react';
import QuestionsList from './QuestionsList';
import * as styles from './qanda.module.css';
import * as g from '../global.module.css';

function QA({ product, setSelectedProductId }) {
  // const productId = currentProductId; // product from server
  // const productId = '37322'; // multiple answers, 1 q
  // const productId = '37324'; // multiple answers, multiple questions
  function differentProduct(id) {
    setSelectedProductId(id);
  }
  return (
    <section id='questionsAndAnswers'>
      <input type='button' onClick={() => { differentProduct(37322); }} value='Get another product' />
      <input type='button' onClick={() => { differentProduct(37324); }} value='Get another other product' />
      <h4 className={[styles.qaTitle, g.textMd].join(' ')}>QUESTIONS & ANSWERS</h4>
      <QuestionsList product={product} />
    </section>
  );
}

export default QA;
