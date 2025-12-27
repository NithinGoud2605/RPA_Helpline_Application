import { useState, useRef, useEffect } from 'react';
import { useMockChat } from '../../hooks/useMockChat';
import { FaPaperPlane } from 'react-icons/fa';

export const HeroChat = () => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isTyping, displayedText } = useMockChat();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check if we have any user or bot messages (excluding initial system message)
  const hasMessages = messages.filter(m => m.type === 'user' || m.type === 'bot').length > 0;

  useEffect(() => {
    if (hasMessages) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, displayedText, hasMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    sendMessage(input);
    setInput('');
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <div className="bg-dark-surface/80 backdrop-blur-sm border border-primary-blue/30 rounded-lg overflow-hidden">
        {/* Messages Area with Fade Effect - Only show if there are messages */}
        {hasMessages && (
          <div className="relative h-[400px] overflow-hidden">
            <div className="h-full overflow-y-auto p-4 space-y-4 scrollbar-custom">
              {messages.map((msg, index) => {
                // Skip system messages in the chat display
                if (msg.type === 'system') {
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
                          : 'bg-dark-bg border border-primary-blue/20 text-gray-200'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{msg.text}</div>
                    </div>
                  </div>
                );
              })}
              
              {isTyping && displayedText && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-3 bg-dark-bg border border-primary-blue/20 text-gray-200">
                    <div className="text-sm whitespace-pre-wrap">
                      {displayedText}
                      <span className="animate-pulse">▊</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Fade gradient overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-surface via-dark-surface/80 to-transparent pointer-events-none"></div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-primary-blue/30 p-4 bg-dark-surface">
          <form onSubmit={handleSubmit} className="flex items-end gap-3">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Ask about RPA services, developers, or projects..."
                className="w-full px-4 py-3 bg-dark-bg border border-primary-blue/30 rounded-lg text-white placeholder-gray-500 resize-none focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue font-mono text-sm"
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
        </div>
      </div>
    </div>
  );
};

