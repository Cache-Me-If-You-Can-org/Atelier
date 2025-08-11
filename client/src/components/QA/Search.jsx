import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as styles from './qanda.module.css';

function Search({setFilterBy}) {
  var updateTerm = (word) => {
    if (word.length > 3) {
      setFilterBy(`${word}`);
    } else {
      setFilterBy('');
    }
  }
  return (
    <div className={styles.search}>
      <input type="text" placeholder="Have a question? Search for answers…" onChange={(e)=>updateTerm(e.target.value)}></input>
    </div>
  )
}

export default Search;