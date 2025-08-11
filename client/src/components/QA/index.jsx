import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Question from './Question.jsx';
import QuestionsList from './QuestionsList.jsx';

function QA({currentProductId}) {
  const [questions, setQuestions] = useState([]);
  // const product_id = currentProductId; //product from server
  // const product_id ='37322' //multiple answers, 1 q
  const product_id ='37324'; //multiple answers, multiple questions
  return (
    <div>
      <h4>QUESTIONS & ANSWERS</h4>
      <QuestionsList product_id={product_id}/>
    </div>
  );
}

export default QA;
