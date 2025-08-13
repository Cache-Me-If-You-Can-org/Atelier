import React from 'react';
import * as styles from '../../reviews.module.css';

// Reusable component for a characteristic radio group
function CharacteristicInput({
  label, options, value, setValue, name,
}) {
  return (
    <div className={styles.characteristic}>
      <h3 className={styles.radioSectionTitle}>
        {label}
        :
        <span>
          (
          {value ? options[value - 1] : 'Nothing selected'}
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
              checked={value === String(index + 1)}
              onChange={(e) => setValue(e.target.value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default CharacteristicInput;
