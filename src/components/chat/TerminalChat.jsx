import { useState, useRef, useEffect } from 'react';
import { useMockChat } from '../../hooks/useMockChat';
import { Card } from '../ui/Card';
import { FaChevronRight } from 'react-icons/fa';

export const TerminalChat = () => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isTyping, displayedText } = useMockChat();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, displayedText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    sendMessage(input);
    setInput('');
    inputRef.current?.focus();
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getMessageStyle = (type) => {
    switch (type) {
      case 'system':
        return 'text-primary-blue font-mono text-xs';
      case 'user':
        return 'text-gray-200';
      case 'bot':
        return 'text-gray-300';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <Card variant="terminal" className="h-[500px] flex flex-col p-0 overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-dark-surface border-b border-primary-blue/30 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary-red"></div>
          <div className="w-3 h-3 rounded-full bg-accent-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-status-green"></div>
        </div>
        <div className="text-primary-blue font-mono text-xs">RPA HELPLINE TERMINAL</div>
        <div className="w-12"></div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-custom">
        {messages.map((msg, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center space-x-2 text-xs text-gray-500 font-mono">
              <span>[{formatTime(msg.timestamp)}]</span>
              <span className={msg.type === 'system' ? 'text-primary-blue' : ''}>
                {msg.type === 'system' && 'SYSTEM'}
                {msg.type === 'user' && 'USER'}
                {msg.type === 'bot' && 'ASSISTANT'}
              </span>
            </div>
            <div className={getMessageStyle(msg.type)}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && displayedText && (
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs text-gray-500 font-mono">
              <span>[{formatTime(new Date().toISOString())}]</span>
              <span className="text-primary-blue">ASSISTANT</span>
            </div>
            <div className="text-gray-300">
              {displayedText}
              <span className="animate-pulse">▊</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t border-primary-blue/30 p-4 bg-dark-surface">
        <div className="flex items-center space-x-2">
          <span className="text-primary-blue font-mono">$</span>
          <FaChevronRight className="text-primary-blue text-xs" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none outline-none text-gray-200 font-mono placeholder-gray-600"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="text-primary-blue hover:text-primary-blue/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-mono"
          >
            SEND
          </button>
        </div>
      </form>
    </Card>
  );
};
