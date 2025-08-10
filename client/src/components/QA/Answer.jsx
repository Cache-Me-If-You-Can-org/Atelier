import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as styles from './qanda.module.css';

function Answer({ answer }) {
  let date = new Date(answer.date);
  date = date.toDateString();
  const [reported, setReported] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulness, setHelpfulness] = useState(answer.helpfulness);

  function report() {
    setReported(true);
    axios.put(`/qa/answers/${answer.answer_id}/report`);
  }
  function helpfulHandler() {
     if (!isHelpful) {
      setIsHelpful(true);
      axios.put(`/qa/answers/${answer.answer_id}/helpful`)
        .then(() => {
          setHelpfulness(helpfulness + 1);
        });
    }
  }
  return (
    <div className={styles.answer}>
      <div>{answer.body}</div>
      <div className={styles.answerDetails}>
        <span>{`by ${answer.answerer_name}, ${date.slice(3)}`}</span>
        <span>
          {' | Helpful? '}
          <span>
            <a onClick={helpfulHandler}>
              Yes
            </a>
          </span>
          <span>
            {` (${helpfulness})`}
          </span>
        </span>
        <span>
          {' | '}
          <span>
            <a onClick={() => {
              if (reported) {
                console.log('already reported!');
              } else {
                report();
              }
            }}>
              {reported ? 'Reported' : 'Report'}
            </a>
          </span>
        </span>
      </div>
    </div>
  )
}

export default Answer;