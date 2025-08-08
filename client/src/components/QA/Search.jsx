import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import API from './api.js';

function Search({setFilterBy}) {
  var updateTerm = (word) => {
    if (word.length > 3) {
      console.log('filtering for', word);
      setFilterBy(`${word}`);
    } else {
      console.log('filter cleared');
      setFilterBy('');
    }
  }
  return (
    <div>
      <input type="text" placeholder="Have a question? Search for answers…" onChange={(e)=>updateTerm(e.target.value)}></input>
    </div>
  )
}

export default Search;