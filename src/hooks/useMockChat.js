import { useState, useCallback, useEffect } from 'react';
import { getChatResponse, getSystemMessage } from '../mock/chatResponses';

export const useMockChat = () => {
  const [messages, setMessages] = useState([getSystemMessage()]);
  const [isTyping, setIsTyping] = useState(false);
  const [pendingBotMessage, setPendingBotMessage] = useState(null);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!pendingBotMessage) {
      setDisplayedText('');
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    let index = 0;
    
    const typeInterval = setInterval(() => {
      if (index < pendingBotMessage.length) {
        setDisplayedText(pendingBotMessage.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        // Add complete message after typing finishes
        const botMsg = {
          type: 'bot',
          text: pendingBotMessage,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setPendingBotMessage(null);
        setDisplayedText('');
        setIsTyping(false);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [pendingBotMessage]);

  const sendMessage = useCallback((userMessage) => {
    // Add user message
    const userMsg = {
      type: 'user',
      text: userMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Simulate delay before response
    setTimeout(() => {
      const response = getChatResponse(userMessage);
      
      // Add system action message
      const actionMsg = {
        type: 'system',
        text: response.action,
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, actionMsg]);
      
      // Set pending bot message for typing effect
      setPendingBotMessage(response.message);
    }, 500);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([getSystemMessage()]);
    setPendingBotMessage(null);
    setDisplayedText('');
    setIsTyping(false);
  }, []);

  return {
    messages,
    sendMessage,
    clearMessages,
    isTyping,
    displayedText,
  };
};

