import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as styles from './qanda.module.css';

function Answer({ answer }) {
  let date = new Date(answer.date);
  date = date.toDateString();
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
            <a href='/'>
              Report
            </a>
          </span>
        </span>
      </div>
    </div>
  )
}

export default Answer;