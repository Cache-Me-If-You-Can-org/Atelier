import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Answer from './Answer';
import * as styles from './qanda.module.css';

function AnswersList({ questionId }) {
  const [answers, setAnswers] = useState([]);
  const [gotAll, setGotAll] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!gotAll) {
      axios.get(`/qa/questions/${questionId}/answers`, { params: { page: page.toString(), count: '2' } })
        .then((res) => {
          if (res.data.results.length === 0) {
            setGotAll(true);
          } else {
            setAnswers(answers.slice().concat(res.data.results));
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      axios.get(`/qa/questions/${questionId}/answers`, { params: { page: page.toString(), count: '2' } })
        .then((res) => {
          setAnswers(res.data.results);
          setGotAll(false);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }, [page]);

  function loadMoreAnswers() {
    // show all remaining answers
    // confined to half the screen and scrollable
    setPage(page + 1);
  }
  function collapseAnswers() {
    setPage(1);
  }
  return (
    <div className={styles.answersList}>
      <div>
        <strong>A:</strong>
      </div>
      <div>
        {answers.map((answer) => <Answer key={answer.answer_id} answer={answer} />)}
        { gotAll ? (<input type='button' value='Collapse' onClick={collapseAnswers} />) : (<input type='button' value='Load More Answers' onClick={loadMoreAnswers} />)}
      </div>
    </div>

  );
}
export default AnswersList;
