import React from 'react';
import * as styles from './qanda.module.css';
import * as g from '../global.module.css';

function Search({ setFilterBy }) {
  const updateTerm = (word) => {
    if (word.length > 3) {
      setFilterBy(`${word}`);
    } else {
      setFilterBy('');
    }
  };

  return (
    <div className={styles.search}>
      <input className={[styles.emphasize, g.pSm, g.textMd].join(' ')} type='text' placeholder='Have a question? Search for answers…' onChange={(e) => updateTerm(e.target.value)} />
    </div>
  );
}

export default Search;
