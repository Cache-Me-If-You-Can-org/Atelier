import React from 'react';
import QuestionsList from './QuestionsList';
import * as styles from './qanda.module.css';
import * as g from '../global.module.css';

function QA({ product }) {
  // const productId = currentProductId; // product from server
  // const productId = '37322'; // multiple answers, 1 q
  // const productId = '37324'; // multiple answers, multiple questions
  return (
    <section id='questionsAndAnswers'>
      <h4 className={[styles.qaTitle, g.textM].join(' ')}>QUESTIONS & ANSWERS</h4>
      <QuestionsList product={product} />
    </section>
  );
}

export default QA;
