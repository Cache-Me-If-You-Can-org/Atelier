import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Question from './Question.jsx';
import QuestionsList from './QuestionsList.jsx';
import API from './api.js';

function QA({currentProductId}) {
  const [questions, setQuestions] = useState([]);
  const product_id = '37313';
  //const product_id = '40347';

  return (
    <div>
      <QuestionsList product_id={product_id}/>
    </div>
  );
}

export default QA;
