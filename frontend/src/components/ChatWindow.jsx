import React, { useEffect, useRef } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      // Fallback for immediate scroll
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ block: 'end' });
      }, 50);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="chat-container">
      {messages.map((msg, i) => (
        <div key={i} className={`message-wrapper ${msg.role === 'user' ? 'user-wrapper' : 'ai-wrapper'}`}>
          <div className={msg.role === 'user' ? 'user-msg' : 'ai-msg'}>
            <div className="message-content">{msg.content}</div>
            {msg.timestamp && (
              <div className="message-time">{msg.timestamp}</div>
            )}
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="message-wrapper ai-wrapper">
          <div className="ai-msg loading">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
