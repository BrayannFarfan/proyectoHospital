// src/components/WordSwap.jsx
import { useState, useEffect } from 'react';
import './wordSwap.css'; 

const WordSwap = ({ words}) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, 2000);
  
      return () => clearInterval(interval);
    }, [words.length]);
  
    return (
      <div className="word-container">
        <span className="word">{words[currentWordIndex]}</span>
      </div>
    );
};

export default WordSwap;