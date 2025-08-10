import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import AnswersList from './AnswersList.jsx';
import * as styles from './qanda.module.css';
import AnswerForm from './AnswerForm.jsx';
//import API from './api.js';
import Modal from '../shared/Modal.jsx';

function Question({ product_id, question }) {
  // given the question as a prop, find all answers associated with that question, sorted
  // sort first by seller, then by helpfulness without upending seller answers
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
    // if (!isHelpful) {
    //   setIsHelpful(true);
    //   axios.put(`${API.api}/qa/questions/${question.question_id}/helpful`, {headers: API.headers})
    //     .then(() => {
    //       setHelpfulness(helpfulness + 1);
    //     });
    // }
  }
  // whenever isOpen is set to false, save the input data first(?)
  function addAnswer() {
    setIsOpen(true)
  }
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      console.log('gonna hit api with ans', newAnswer);
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
