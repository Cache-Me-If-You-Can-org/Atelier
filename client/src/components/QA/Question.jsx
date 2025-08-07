import React from 'react';
import axios from 'axios';
import AnswersList from './AnswersList.jsx';

function Question({ question }) {
  // given the question as a prop, find all answers associated with that question, sorted
  // sort first by seller, then by helpfulness without upending seller answers

  return (
    <div>
      <div>
        Q:
        {question.question_body}
      </div>
      <AnswersList key={`answers_${question.question_id}`} question_id={question.question_id}/>
    </div>
  );
}

export default Question;
