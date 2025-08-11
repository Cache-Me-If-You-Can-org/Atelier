import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import AnswersList from './AnswersList.jsx';
import * as styles from './qanda.module.css';
import AnswerForm from './AnswerForm.jsx';
import Modal from '../shared/Modal.jsx';

function Question({ product_id, question }) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulness, setHelpfulness] = useState(question.question_helpfulness);
  const [isOpen, setIsOpen] = useState(false);
  const [newAnswer, setNewAnswer] = useState({});

  function helpfulHandler() {
    if (!isHelpful) {
      setIsHelpful(true);
      axios.put(`/qa/questions/${question.question_id}/helpful`)
        .then(() => {
          setHelpfulness(helpfulness + 1);
        });
    }
  }
  function addAnswer() {
    setIsOpen(true)
  }
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      // console.log('gonna hit api with ans', newAnswer);
      axios.post(`/qa/questions/${question.question_id}/answers`, JSON.stringify(newAnswer), {headers: {'Content-Type':'application/json'}}).
        then(() => {
          console.log('posted!');
          // add new answer to all answers (rerender)
        })
        .catch((err) => console.log(err));
    } else {
      didMount.current = true;
    }
  }, [newAnswer]);

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
            <a onClick={addAnswer}>Add Answer</a>
          </span>
        </div>
      </div>
      <AnswersList key={`answers_${question.question_id}`} question_id={question.question_id}/>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} Module={() => (
        <AnswerForm product_id={product_id} question={question} setIsOpen={setIsOpen} setNewAnswer={setNewAnswer}/>
      )}/>
    </div>
  );
}

export default Question;
