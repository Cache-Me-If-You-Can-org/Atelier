import React from 'react';
import * as styles from '../../reviews.module.css';

// Reusable component for a characteristic radio group
function CharacteristicInput({ label, options, value, setValue, name }) {
  return (
    <div>
      <h3>{label}</h3>
      <p>{value ? options[value - 1] : 'none selected'}</p>
      {options.map((optionLabel, index) => (
        <label className={styles.formLabel} key={String(optionLabel)} htmlFor={name}>
          <span>{optionLabel}</span>
          <input
            className={styles.formRadio}
            type="radio"
            name={name}
            value={String(index + 1)}
            checked={value === String(index + 1)}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
      ))}
    </div>
  );
}

export default CharacteristicInput;
