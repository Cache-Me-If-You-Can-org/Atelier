import React, { useState, useRef, useEffect } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import * as css from '../styles/select.module.css';

function Select({
  options = [],
  value = '',
  onChange,
  placeholder = 'Select...',
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={`${css.selectWrapper} ${className}`.trim()}>
      <div
        className={css.selectDisplay}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <span className={css.arrow}>
          {isOpen ? <CaretUp size={20} /> : <CaretDown size={20} />}
        </span>
      </div>
      {isOpen && (
        <ul className={css.selectList}>
          {options.map(({ value: optionValue, label }) => (
            <li
              key={optionValue}
              className={`${css.selectOption} ${optionValue === value ? css.active : ''}`}
              onClick={() => handleSelect(optionValue)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
