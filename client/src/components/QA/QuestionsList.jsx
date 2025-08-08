import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Question from './Question.jsx';

function QuestionsList({product_id}) {
  const [allQuestions, setAllQuestions] = useState([]);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [count, setCount] = useState(2);

  useEffect(() => {
    axios.get('/qa/questions', { params: { product_id: product_id }})
      .then((res) => {
        console.log('QUESTIONS FOR PRODUCT', product_id, res.data.results);
        setAllQuestions(res.data.results);
        setDisplayedQuestions(res.data.results.slice(0, count));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  // useEffect(() => {
  //   axios.get(`${API.api}/qa/questions`, { params: { product_id: product_id }, headers: API.headers})
  //     .then((res) => {
  //       console.log('QUESTIONS FOR PRODUCT', product_id, res.data.results);
  //       setAllQuestions(res.data.results);
  //     })
  //     .catch((err) => {
  //       throw new Error(err);
  //     });
  // }, []);
  useEffect(() => {
    let q = allQuestions.slice(0, count);
    setDisplayedQuestions([...q]);
  }, [count])

  function moreQuestions() {
    setCount(count + 2);
    if (count > allQuestions.length) {
      setCount(allQuestions.length);
    }
  }

  return (
    <div>
      {displayedQuestions.map((question) => (<Question key={question.question_id} product_id={product_id} question={question} />))}
      { count <  allQuestions.length ? (<input type="button" value="More Answered Questions" onClick={moreQuestions} />) : (<div></div>)}
    </div>
  )
}
export default QuestionsList;