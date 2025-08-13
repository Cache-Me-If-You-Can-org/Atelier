import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Answer from './Answer';
import * as styles from './qanda.module.css';

function AnswersList({ questionId, newAnswer }) {
  const [allAnswers, setAllAnswers] = useState([]);
  const [displayedAnswers, setDisplayedAnswers] = useState([]);
  const [count, setCount] = useState(2);
  useEffect(() => {
    axios.get(`/qa/questions/${questionId}/answers`, { params: { count: 999 } })
      .then((res) => {
        setAllAnswers(res.data.results);
        setDisplayedAnswers(res.data.results.slice(0, count));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [questionId, count]);

  useEffect(() => {
    const a = allAnswers.slice(0, count);
    setDisplayedAnswers([...a]);
  }, [count, allAnswers]);

  function loadAllAnswers() {
    setCount(allAnswers.length);
  }
  function collapseAnswers() {
    setCount(2);
  }
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      // console.log('gonna hit api with ans', newAnswer);
      axios.post(`/qa/questions/${questionId}/answers`, JSON.stringify(newAnswer), { headers: { 'Content-Type': 'application/json' } })
        .then(() => {
          axios.get(`/qa/questions/${questionId}/answers`, { params: { count: 999 } })
            .then((res) => {
              setAllAnswers(res.data.results);
              if (count !== 2) {
                setCount(res.data.results.length);
              }
            })
            .catch((err) => { throw new Error(err); });
        })
        .catch((err) => { throw new Error(err); });
    } else {
      didMount.current = true;
    }
  }, [count, newAnswer, questionId]);

  return (
    <div className={[styles.answersList, styles.scrollable].join(' ')}>
      <div>
        <strong>A:</strong>
      </div>
      <div>
        {displayedAnswers.map((answer) => <Answer key={answer.answer_id} answer={answer} />)}
        { (count > 2) ? (<button type='button' onClick={collapseAnswers}>Collapse</button>) : (<div />)}
        {(allAnswers.length > 2 && count === 2) ? (<button type='button' onClick={loadAllAnswers}>Load More Answers</button>) : (<div />)}
      </div>
    </div>

  );
}
export default AnswersList;
