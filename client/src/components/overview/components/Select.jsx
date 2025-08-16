import React, { useState, useRef, useEffect } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import * as css from '../styles/select.module.css';
import * as g from '../../global.module.css';
import { checkScrollable } from '../lib/helpers';

function Select({
  options = [],
  value = '',
  onChange,
  placeholder = 'Select...',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const scrollContainerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setShowScrollIndicator(checkScrollable(scrollContainerRef.current));
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleScroll();
    }
  }, [isOpen]);

  return (
    <div className={`${css.selectWrapper} ${className}`.trim()}>
      <button
        type='button'
        className={css.selectDisplay}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <span className={css.arrow}>
          {isOpen ? <CaretUp className={g.textMd} weight='bold' /> : <CaretDown className={g.textMd} weight='bold' />}
        </span>
      </button>
      {isOpen && (
        <div className={css.selectList}>
          <div
            className={css.relative}
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {options.map(({ value: optionValue, label }) => (
              <li key={optionValue} role='none'>
                <button
                  type='button'
                  role='option'
                  aria-selected={optionValue === value}
                  className={`${css.selectOption} ${optionValue === value ? css.active : ''}`}
                  onClick={() => handleSelect(optionValue)}
                >
                  {label}
                </button>
              </li>
            ))}
          </div>
          {showScrollIndicator && (
            <div className={css.indicatorWrapper}>
              <CaretDown className={[g.textMd, css.scrollIndicator].join(' ')} weight='bold' />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Select;
