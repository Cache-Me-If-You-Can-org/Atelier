import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswersList from './AnswersList';
import * as styles from './qanda.module.css';
import * as g from '../global.module.css';
import AnswerForm from './AnswerForm';
import Modal from '../shared/Modal';

function Question({ productName, question }) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulness, setHelpfulness] = useState(question.question_helpfulness);
  const [isOpen, setIsOpen] = useState(false);
  const [newAnswer, setNewAnswer] = useState({});

  useEffect(() => {
    const helpful = localStorage.getItem(`helpful_${question.question_id}`);
    if (helpful) {
      setIsHelpful(helpful);
    }
  }, [question.question_id]);

  function helpfulHandler() {
    const helpful = localStorage.getItem(`helpful_${question.question_id}`);
    if (!helpful) {
      setIsHelpful(true);
      localStorage.setItem(`helpful_${question.question_id}`, true);
      axios.put(`/qa/questions/${question.question_id}/helpful`)
        .then(() => {
          setHelpfulness(helpfulness + 1);
        });
    } else {
      setIsHelpful(true);
    }
  }
  function addAnswer() {
    setIsOpen(true);
  }
  return (
    <div className={g.stack}>
      <div className={[styles.question, g.textMd].join(' ')}>
        <strong>Q:</strong>
        <strong className={styles.questionBody}>{question.question_body}</strong>
        <div className={[styles.questionDetails, g.textXs].join(' ')}>
          <div className={styles.helpfulness}>
            {'Helpful? '}
            {isHelpful ? (
              <span>
                &nbsp;
              </span>
            ) : (
              <input
                className={g.btnLinkify}
                type='button'
                onClick={helpfulHandler}
                value='Yes'
              />
            )}
            {` (${helpfulness})`}
          </div>
          <div>
            {' | '}
          </div>
          <div>
            <input
              className={g.btnLinkify}
              type='button'
              onClick={addAnswer}
              value='Add Answer'
            />
          </div>
        </div>
      </div>
      <AnswersList
        key={`answers_${question.question_id}`}
        questionId={question.question_id}
        newAnswer={newAnswer}
      />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        Module={(
          <AnswerForm
            question={question}
            productName={productName}
            setIsOpen={setIsOpen}
            setNewAnswer={setNewAnswer}
          />
        )}
      />
    </div>
  );
}

export default Question;
