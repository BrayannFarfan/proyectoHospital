import React, { useState, useEffect } from 'react';
import './TimePicker.css';

export const TimePicker = ({ value, onChange, availableTimes = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const initialIndex = availableTimes.findIndex(
      (t) => t.hour === value?.hour && t.minute === value?.minute && t.period === value?.period
    );
    return initialIndex >= 0 ? initialIndex : 0;
  });

  useEffect(() => {
    const newIndex = availableTimes.findIndex(
      (t) => t.hour === value?.hour && t.minute === value?.minute && t.period === value?.period
    );
    if (newIndex >= 0) setSelectedIndex(newIndex);
  }, [value, availableTimes]);

  const handleHourChange = (direction) => {
    const newIndex = direction === 'up'
      ? (selectedIndex + 1) % availableTimes.length
      : (selectedIndex - 1 + availableTimes.length) % availableTimes.length;
    setSelectedIndex(newIndex);
    onChange(availableTimes[newIndex]);
  };

  const handleMinuteChange = (direction) => {
    const newIndex = direction === 'up'
      ? (selectedIndex + 1) % availableTimes.length
      : (selectedIndex - 1 + availableTimes.length) % availableTimes.length;
    setSelectedIndex(newIndex);
    onChange(availableTimes[newIndex]);
  };

  const togglePeriod = () => {
    const newIndex = (selectedIndex + 1) % availableTimes.length;
    setSelectedIndex(newIndex);
    onChange(availableTimes[newIndex]);
  };

  const formatNumber = (num) => (num < 10 ? `0${num}` : num);
  const currentTime = availableTimes[selectedIndex] || { hour: 9, minute: 25, period: 'PM' };

  return (
    <div className="time-picker">
      <div className="time-picker-field">
        <button type="button" onClick={() => handleHourChange('up')} className="arrow-btn">
          ↑
        </button>
        <span className="time-value">{formatNumber(currentTime.hour)}</span>
        <button type="button" onClick={() => handleHourChange('down')} className="arrow-btn">
          ↓
        </button>
      </div>
      <span className="time-separator">:</span>
      <div className="time-picker-field">
        <button type="button" onClick={() => handleMinuteChange('up')} className="arrow-btn">
          ↑
        </button>
        <span className="time-value">{formatNumber(currentTime.minute)}</span>
        <button type="button" onClick={() => handleMinuteChange('down')} className="arrow-btn">
          ↓
        </button>
      </div>
      <button type="button" onClick={togglePeriod} className="period-btn">
        {currentTime.period}
      </button>
    </div>
  );
};