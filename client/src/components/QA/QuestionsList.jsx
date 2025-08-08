import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Question from './Question.jsx';
import API from './api.js';
import Search from './Search.jsx';

function QuestionsList({product_id}) {
  const [allQuestions, setAllQuestions] = useState([]);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [count, setCount] = useState(2);
  const [filterBy, setFilterBy] = useState('');

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
  useEffect(() => {
    console.log('num qs', allQuestions.slice().length);
    let filtered = allQuestions.filter((question) => {
      if (question.question_body.includes(filterBy)) {
        console.log('found matching q', question.question_body);
        return question;
      } else {
        console.log('q does not match', question.question_body);
        return;
      }
    });
    console.log('filtered', filtered);
    setDisplayedQuestions(filtered);
  }, [filterBy]);

  // useEffect(() => {
  //   axios.get(`${API.api}/qa/questions`, { params: { product_id: product_id }, headers: API.headers})
  //     .then((res) => {
  //       console.log('QUESTIONS FOR PRODUCT', product_id, res.data.results);
  //       setAllQuestions(res.data.results);
  //       setDisplayedQuestions(res.data.results.slice(0, count));
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
      <Search setFilterBy={setFilterBy}/>
      {displayedQuestions.map((question) => (<Question key={question.question_id} product_id={product_id} question={question} />))}
      { count <  allQuestions.length && filterBy ==='' ? (<input type="button" value="More Answered Questions" onClick={moreQuestions} />) : (<div></div>)}
    </div>
  )
}
export default QuestionsList;