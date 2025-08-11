import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as styles from './qanda.module.css';

function Answer({ answer }) {
  let date = new Date(answer.date);
  date = date.toDateString();
  const [reported, setReported] = useState(false);

  function report() {
    setReported(true);
    axios.put(`/qa/answers/${answer.answer_id}/report`);
  }
  return (
    <div className={styles.answer}>
      <div>{answer.body}</div>
      <div className={styles.answerDetails}>
        <span>{`by ${answer.answerer_name}, ${date.slice(3)}`}</span>
        <span>
          {' | Helpful? '}
          <span>
            <a href='/'>
              Yes
            </a>
          </span>
          <span>
            {` (${answer.helpfulness})`}
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