import { useState, useRef, useEffect } from 'react';
import { useMockChat } from '../../hooks/useMockChat';
import { FaPaperPlane } from 'react-icons/fa';

export const ChatGPTStyleChat = () => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isTyping, displayedText } = useMockChat();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [isMinimized, setIsMinimized] = useState(false);

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

  if (isMinimized) {
    return (
      <div className="fixed bottom-0 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-primary-red text-white px-6 py-3 rounded-t-lg font-mono uppercase tracking-wide hover:bg-primary-red/90 transition-colors shadow-lg"
        >
          Open Chat
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-surface border-t-2 border-primary-blue shadow-2xl">
      <div className="max-w-4xl mx-auto flex flex-col h-[600px]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-dark-border bg-dark-surface">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-status-green"></div>
            <span className="text-white font-mono text-sm uppercase tracking-wide">RPA HELPLINE ASSISTANT</span>
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-white hover:text-primary-red transition-colors font-mono text-sm"
          >
            Minimize
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-custom">
          {messages.map((msg, index) => {
            // Show only the first system message (operational status)
            if (msg.type === 'system') {
              if (index === 0) {
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-dark-surface border border-primary-blue/30 rounded-full">
                      <div className="w-2 h-2 bg-status-green rounded-full"></div>
                      <span className="text-primary-blue text-xs font-mono uppercase">{msg.text}</span>
                    </div>
                  </div>
                );
              }
              return null;
            }

            return (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    msg.type === 'user'
                      ? 'bg-primary-blue text-white'
                      : 'bg-dark-surface border border-dark-border text-gray-200'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{msg.text}</div>
                  <div className={`text-xs mt-2 ${
                    msg.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            );
          })}
          
          {isTyping && displayedText && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-3 bg-dark-surface border border-dark-border text-gray-200">
                <div className="text-sm whitespace-pre-wrap">
                  {displayedText}
                  <span className="animate-pulse">▊</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-dark-border p-4 bg-dark-surface">
          <form onSubmit={handleSubmit} className="flex items-end gap-3">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Ask about RPA services, developers, or projects..."
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white font-mono placeholder-gray-500 resize-none focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
                rows={1}
                disabled={isTyping}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-primary-red text-white p-3 rounded-lg hover:bg-primary-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center font-mono">
            RPA Helpline Assistant can help you find developers, post projects, and get answers about automation.
          </p>
        </div>
      </div>
    </div>
  );
};

