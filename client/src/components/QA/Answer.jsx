import React, { useState } from 'react';
import axios from 'axios';
import * as styles from './qanda.module.css';

function Answer({ answer }) {
  let date = new Date(answer.date);
  date = date.toDateString();
  const [reported, setReported] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulness, setHelpfulness] = useState(answer.helpfulness);

  function report() {
    axios.put(`/qa/answers/${answer.answer_id}/report`)
      .then(() => {
        setReported(true);
      });
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
            <input
              className={styles.btnLinkify}
              type='button'
              onClick={helpfulHandler}
              value='Yes'
            />
          </span>
          <span>
            {` (${helpfulness})`}
          </span>
        </span>
        <span>
          {' | '}
          <span>
            <input
              type='button'
              className={styles.btnLinkify}
              value={reported ? 'Reported' : 'Report'}
              onClick={() => {
                if (!reported) {
                  report();
                }
              }}
            />
          </span>
        </span>
      </div>
    </div>
  );
}

export default Answer;
