import React from 'react';
import * as css from './shared.module.css';

function Image({src}) {
  return( <img className={css.image} src={src}/> );
}

export default Image;