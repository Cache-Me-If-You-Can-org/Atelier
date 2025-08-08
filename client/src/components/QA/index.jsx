import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Question from './Question.jsx';

function QA({currentProductId}) {
  const [questions, setQuestions] = useState([]);
  const product_id = '37313';
  //const product_id = '40347';
  useEffect(() => {
    axios.get('/qa/questions', { params: { product_id: product_id }})
      .then((response) => {
        console.log('QUESTIONS FOR PRODUCT', product_id, response.data.results);
        setQuestions(response.data.results);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  return (
    <div>
      {questions.map((question) => (<Question key={question.question_id} product_id={product_id} question={question} />))}
    </div>
  );
}

export default QA;
