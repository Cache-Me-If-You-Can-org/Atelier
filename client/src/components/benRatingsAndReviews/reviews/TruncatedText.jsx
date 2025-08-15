import React, { useState } from 'react';
// import * as styles from '../reviews.module.css';

function TruncatedText({ text, charLimit = 250 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = isExpanded ? text : `${text.substring(0, charLimit)}...`;

  return (
    <div>
      <p>{text.length > charLimit ? truncatedText : text}</p>
      {text.length > charLimit && (
        <button type='button' onClick={toggleExpanded}>
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}

export default TruncatedText;
