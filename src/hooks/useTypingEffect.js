import { useState, useEffect, useRef } from 'react';

export const useTypingEffect = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    indexRef.current = 0;

    const timer = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => {
      clearInterval(timer);
    };
  }, [text, speed]);

  return { displayedText, isTyping };
};

