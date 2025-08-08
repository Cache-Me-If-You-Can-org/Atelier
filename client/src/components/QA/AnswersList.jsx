import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Answer from './Answer.jsx';
import * as styles from './qanda.module.css';

function AnswersList({ question_id }) {
  const [answers, setAnswers] = useState([]);
  const [gotAll, setGotAll] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!gotAll) {
      axios.get(`/qa/questions/${question_id}/answers`, { params: { page: page.toString() } })
        .then((response) => {
          // console.log('added up to 2 answers for Q', question_id, ':', response.data.results);
          if (response.data.results.length === 0) {
            console.log('got all answers for this Q already!');
            setGotAll(true);
          } else {
            setAnswers(answers.slice().concat(response.data.results));
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      axios.get(`/qa/questions/${question_id}/answers`, { params: { page: page.toString() } })
        .then((response) => {
          // console.log('collapsed answers for Q', question_id, ':', response.data.results);
          setAnswers(response.data.results);
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
        { gotAll ? (<input type="button" value="Collapse" onClick={collapseAnswers} />) : (<input type="button" value="Load More Answers" onClick={loadMoreAnswers} />)}
      </div>
    </div>

  );
}
export default AnswersList;
