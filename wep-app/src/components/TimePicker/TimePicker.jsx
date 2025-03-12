// src/components/TimePicker.jsx
import React, { useState } from 'react';
import './TimePicker.css';

export const TimePicker = ({ value, onChange }) => {
  const [hour, setHour] = useState(value.hour || 9);
  const [minute, setMinute] = useState(value.minute || 25);
  const [period, setPeriod] = useState(value.period || 'PM');

  const handleHourChange = (direction) => {
    let newHour = direction === 'up' ? hour + 1 : hour - 1;
    if (newHour > 12) newHour = 1;
    if (newHour < 1) newHour = 12;
    setHour(newHour);
    onChange({ hour: newHour, minute, period });
  };

  const handleMinuteChange = (direction) => {
    let newMinute = direction === 'up' ? minute + 1 : minute - 1;
    if (newMinute > 59) newMinute = 0;
    if (newMinute < 0) newMinute = 59;
    setMinute(newMinute);
    onChange({ hour, minute: newMinute, period });
  };

  const togglePeriod = () => {
    const newPeriod = period === 'AM' ? 'PM' : 'AM';
    setPeriod(newPeriod);
    onChange({ hour, minute, period: newPeriod });
  };

  const formatNumber = (num) => (num < 10 ? `0${num}` : num);

  return (
    <div className="time-picker">
      <div className="time-picker-field">
        <button type="button" onClick={() => handleHourChange('up')} className="arrow-btn">
          ↑
        </button>
        <span className="time-value">{formatNumber(hour)}</span>
        <button type="button" onClick={() => handleHourChange('down')} className="arrow-btn">
          ↓
        </button>
      </div>
      <span className="time-separator">:</span>
      <div className="time-picker-field">
        <button type="button" onClick={() => handleMinuteChange('up')} className="arrow-btn">
          ↑
        </button>
        <span className="time-value">{formatNumber(minute)}</span>
        <button type="button" onClick={() => handleMinuteChange('down')} className="arrow-btn">
          ↓
        </button>
      </div>
      <button type="button" onClick={togglePeriod} className="period-btn">
        {period}
      </button>
    </div>
  );
};