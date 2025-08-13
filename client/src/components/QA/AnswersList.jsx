import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Answer from './Answer';
import * as styles from './qanda.module.css';

function AnswersList({ questionId }) {
  const [allAnswers, setAllAnswers] = useState([]);
  const [displayedAnswers, setDisplayedAnswers] = useState([]);
  useEffect(() => {
    axios.get(`/qa/questions/${questionId}/answers`, { params: { count: 999 } })
      .then((res) => {
        setAllAnswers(res.data.results);
        setDisplayedAnswers(res.data.results.slice(0, 2));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  function loadAllAnswers() {
    // show all remaining answers
    // confined to half the screen and scrollable
    setDisplayedAnswers(allAnswers.slice());
  }
  function collapseAnswers() {
    setDisplayedAnswers(allAnswers.slice(0, 2));
  }
  return (
    <div className={styles.answersList}>
      <div>
        <strong>A:</strong>
      </div>
      <div>
        {displayedAnswers.map((answer) => <Answer key={answer.answer_id} answer={answer} />)}
        { (displayedAnswers.length === allAnswers.length && displayedAnswers.length > 2) ? (<input type='button' value='Collapse' onClick={collapseAnswers} />) : (<div />)}
        {(allAnswers.length > 2 && displayedAnswers.length < allAnswers.length) ? (<input type='button' value='Load More Answers' onClick={loadAllAnswers} />) : (<div />)}
      </div>
    </div>

  );
}
export default AnswersList;
