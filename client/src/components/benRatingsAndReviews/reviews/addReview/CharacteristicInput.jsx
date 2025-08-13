import React, { useState } from 'react';
import * as styles from '../../reviews.module.css';

// Reusable component for a characteristic radio group
function CharacteristicInput({
  label, options, value, setValue, name,
}) {
  let id = '';
  switch (name) {
    case 'size':
      id = '000000';
      break;
    case 'width':
      id = '000001';
      break;
    case 'comfort':
      id = '125033';
      break;
    case 'quality':
      id = '125034';
      break;
    case 'length':
      id = '125032';
      break;
    case 'fit':
      id = '125031';
      break;
    default:
      id = '';
      break;
  }

  return (
    <div className={styles.characteristic}>
      <h3 className={styles.radioSectionTitle}>
        {label}
        :
        <span>
          (
          {value?.[id] ? options[value[id] - 1] : 'Nothing selected'}
          )
        </span>
      </h3>
      <div className={styles.radioSection}>
        {options.map((optionLabel, index) => (
          <label className={styles.radioLabel} key={String(optionLabel)} htmlFor={name}>
            <span className={styles.radioTitle}>{optionLabel}</span>
            <input
              className={styles.formRadio}
              type='radio'
              name={name}
              value={String(index + 1)}
              checked={value?.[id] === index + 1}
              onChange={(e) => setValue(
                {
                  [id]: Number(e.target.value),
                },
              )}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default CharacteristicInput;
