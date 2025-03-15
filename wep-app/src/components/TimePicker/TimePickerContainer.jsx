import React, { useState, useEffect } from 'react';
import { TimePicker } from './TimePicker';
import { InputContent } from '../ContainerInput/InputContent';

export const TimePickerContainer = ({ time, onTimeChange, inputRef, pickerRef, availableTimes = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTimeClick = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleClickOutside = (event) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      pickerRef.current &&
      !pickerRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatTime = (time) => {
    if (!time) return '';
    return `${time.hour < 10 ? `0${time.hour}` : time.hour}:${time.minute < 10 ? `0${time.minute}` : time.minute} ${time.period}`;
  };

  return (
    <div ref={inputRef} className="time-input-wrapper">
      <InputContent
        type="text"
        name="time"
        value={formatTime(time)}
        onClick={handleTimeClick}
        readOnly={true}
        onChange={() => {}}
        placeholder="Select Time"
      />
      {isOpen && (
        <div ref={pickerRef} className="time-picker-popup">
          <TimePicker
            value={time}
            onChange={onTimeChange}
            availableTimes={availableTimes}
          />
        </div>
      )}
    </div>
  );
};