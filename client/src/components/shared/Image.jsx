import React from 'react';
import * as css from './shared.module.css';

function Image({...props}) {
  return( <img className={css.image} {...props}/> );
}

export default Image;