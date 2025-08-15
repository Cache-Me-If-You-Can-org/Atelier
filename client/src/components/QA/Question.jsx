import React, { useState } from 'react';
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
    setIsOpen(true);
  }

  return (
    <div className={g.stack}>
      <div className={[styles.question, g.textM].join(' ')}>
        <div>
          <strong>Q:</strong>
          <strong className={styles.questionBody}>{question.question_body}</strong>
        </div>
        <div className={[styles.questionDetails, g.textXs].join(' ')}>
          {'Helpful? '}
          <span>
            <input
              className={g.btnLinkify}
              type='button'
              onClick={helpfulHandler}
              value='Yes'
            />
          </span>
          <span>
            {` (${helpfulness})`}
          </span>
          <span>
            {' | '}
            <input
              className={g.btnLinkify}
              type='button'
              onClick={addAnswer}
              value='Add Answer'
            />
          </span>
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
