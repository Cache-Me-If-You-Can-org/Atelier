import React, { useState, useRef, useEffect } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import * as css from '../styles/select.module.css';
import * as g from '../../global.module.css';
import { getScrollIndicators } from '../lib/helpers';

function Select({
  options = [],
  value = '',
  onChange,
  placeholder = '',
  className = '',
  disabled = false,
  isOpen: externalIsOpen,
  onOpenChange,
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [scrollIndicators, setScrollIndicators] = useState({ showTop: false, showBottom: false });
  const scrollContainerRef = useRef(null);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (val) => {
    if (disabled) return;
    onChange(val);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const indicators = getScrollIndicators(scrollContainerRef.current);
      setScrollIndicators(indicators);
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
        className={`${css.selectDisplay} ${disabled ? css.disabled : ''}`}
        onClick={handleToggle}
        disabled={disabled}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <span className={css.arrow}>
          {isOpen ? <CaretUp className={g.textMd} weight='bold' /> : <CaretDown className={g.textMd} weight='bold' />}
        </span>
      </button>
      {isOpen && !disabled && (
        <div className={css.selectList}>
          {scrollIndicators.showTop && (
            <div className={css.topScrollIndicator}>
              <CaretUp className={[g.textMd, css.scrollIndicator].join(' ')} weight='bold' />
            </div>
          )}
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
          {scrollIndicators.showTop && (
            <div className={css.topScrollIndicator}>
              <CaretUp className={[g.textMd, css.scrollIndicator].join(' ')} weight='bold' />
            </div>
          )}
          {scrollIndicators.showBottom && (
            <div className={css.bottomScrollIndicator}>
              <CaretDown className={[g.textMd, css.scrollIndicator].join(' ')} weight='bold' />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Select;
