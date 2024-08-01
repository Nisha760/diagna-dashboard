import React, { useState, useRef, useEffect } from 'react';
import s from  './SelectDropdown.module.css';
import classNames from 'classnames';
import { Option } from '@/src/modules/ICUflow/types';

type SelectProps = {
  options: Option[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
}

export const SelectDropdown = ({ options, value, onChange, placeholder }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      setSelectedOption(options.find(option => option.value === value) || null);
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOpen = () => setIsOpen(prev => !prev);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={s.select_container}>
      <button
        type="button"
        onClick={toggleOpen}
        className={s.select_button}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span className={classNames(s.select_icon, {
            [s.select_icon_open]: isOpen
        })}>&#9662;</span>
      </button>
      {isOpen && (
        <div className={s.select_dropdown}>
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={classNames(s.select_option, {
                [s.select_option_selected]: selectedOption?.value === option.value
              })}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

