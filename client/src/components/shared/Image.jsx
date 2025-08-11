import React from 'react';
import * as css from './shared.module.css';

function Image({ className = '', ...props }) {
  return (
    <img
      className={`${css.image} ${className}`.trim()}
      {...props}
    />
  );
}

export default Image;