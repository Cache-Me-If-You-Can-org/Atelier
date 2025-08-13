import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Question from './Question';
import Search from './Search';
import Modal from '../shared/Modal';
import QuestionForm from './QuestionForm';

function QuestionsList({ productId }) {
  const [allQuestions, setAllQuestions] = useState([]);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [count, setCount] = useState(2);
  const [filterBy, setFilterBy] = useState('');
  const [isQFormOpen, setQFormIsOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({});

  useEffect(() => {
    axios.get('/qa/questions', { params: { product_id: productId } })
      .then((res) => {
        setAllQuestions(res.data.results);
        setDisplayedQuestions(res.data.results.slice(0, count));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);
  useEffect(() => {
    const filtered = allQuestions.filter((question) => {
      if (question.question_body.includes(filterBy)) {
        // console.log('found matching q', question.question_body);
        return question;
      }
      return;
    });
    // console.log('filtered', filtered);
    setDisplayedQuestions(filtered);
  }, [filterBy]);

  useEffect(() => {
    const q = allQuestions.slice(0, count);
    setDisplayedQuestions([...q]);
  }, [count]);

  function moreQuestions() {
    setCount(count + 2);
    if (count > allQuestions.length) {
      setCount(allQuestions.length);
    }
  }
  function addQuestion() {
    setQFormIsOpen(true);
  }

  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      // console.log('gonna hit api with ans', newAnswer);
      axios.post('/qa/questions', JSON.stringify(newQuestion), { headers: { 'Content-Type': 'application/json' } })
        .then(() => {
          console.log('posted!');
          // add new answer to all answers (rerender)
        })
        .catch((err) => { throw new Error(err); });
    } else {
      didMount.current = true;
    }
  }, [newQuestion]);

  return (
    <div>
      <div>
        <Search setFilterBy={setFilterBy} />
        {displayedQuestions.map((question) => (
          <Question
            key={question.question_id}
            productId={productId}
            question={question}
          />
        ))}
        { count < allQuestions.length && filterBy === '' ? (<input type='button' value='More Answered Questions' onClick={moreQuestions} />) : (<div />)}
        <input type='button' value='Add a Question' onClick={addQuestion} />
      </div>
      <Modal
        isOpen={isQFormOpen}
        setIsOpen={setQFormIsOpen}
        Module={(
          <QuestionForm
            productId={productId}
            setIsOpen={setQFormIsOpen}
            setNewQuestion={setNewQuestion}
          />
        )}
      />
    </div>
  );
}
export default QuestionsList;
