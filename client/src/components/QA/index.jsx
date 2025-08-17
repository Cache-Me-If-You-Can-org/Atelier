import React from 'react';
import QuestionsList from './QuestionsList';
import * as styles from './qanda.module.css';
import * as g from '../global.module.css';

function QA({ product }) {
  return (
    <section id='questionsAndAnswers'>
      <h4 className={[styles.qaTitle, g.textMd].join(' ')}>QUESTIONS & ANSWERS</h4>
      <QuestionsList product={product} />
    </section>
  );
}

export default QA;
