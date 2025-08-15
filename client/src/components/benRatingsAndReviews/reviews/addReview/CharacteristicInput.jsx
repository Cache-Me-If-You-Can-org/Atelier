import React from 'react';
import * as styles from '../../reviews.module.css';

function CharacteristicInput({
  label, options, value, onChange, name,
}) {
  return (
    <div className={styles.characteristic}>
      <h4 className={styles.radioSectionTitle}>
        {label}
        :
        <span>
          (
          {value ? options[value - 1] : 'Nothing selected'}
          )
        </span>
      </h4>
      <div className={styles.radioSection}>
        {options.map((optionLabel, index) => (
          <label className={styles.radioLabel} key={optionLabel} htmlFor={name}>
            <span className={styles.radioTitle}>{optionLabel}</span>
            <input
              className={styles.formRadio}
              type='radio'
              name={name}
              value={String(index + 1)}
              checked={value === index + 1}
              onChange={() => onChange(index + 1)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default CharacteristicInput;
