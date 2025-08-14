import React, { useState } from 'react';
import * as styles from '../../reviews.module.css';

// Reusable component for a characteristic radio group
function CharacteristicInput({
  label, options, value, setValue, name, id,
}) {
  return (
    <div className={styles.characteristic}>
      <h4 className={styles.radioSectionTitle}>
        {label}
        :
        <span>
          (
          {value?.[id] ? options[value[id] - 1] : 'Nothing selected'}
          )
        </span>
      </h4>
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
