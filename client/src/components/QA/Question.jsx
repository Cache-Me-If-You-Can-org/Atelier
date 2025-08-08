import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import AnswersList from './AnswersList.jsx';
import * as styles from './qanda.module.css';

function Question({ question }) {
  // given the question as a prop, find all answers associated with that question, sorted
  // sort first by seller, then by helpfulness without upending seller answers
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulness, setHelpfulness] = useState(question.question_helpfulness);
  function helpfulHandler() {
    if (!isHelpful) {
      setIsHelpful(true);
      axios.put(`/qa/questions/${question.question_id}/helpful`)
        .then(() => {
          setHelpfulness(helpfulness + 1);
        });
    }
  }

  return (
    <div>
      <div className={styles.question}>
        <div>
          <strong>{`Q: ${question.question_body}`} </strong>
        </div>
        <div>
          {'Helpful? '}
          <span>
            <a onClick={helpfulHandler}>Yes</a>
          </span>
          <span>
            {` (${helpfulness})`}
          </span>
          <span>
            {' | '}
            <a href='/'>Add Answer</a>
          </span>
        </div>
      </div>
      <AnswersList key={`answers_${question.question_id}`} question_id={question.question_id}/>
    </div>
  );
}

export default Question;
