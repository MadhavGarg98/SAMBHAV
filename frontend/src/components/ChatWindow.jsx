import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import './ChatWindow.css';

const ChatWindow = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="chat-window">
      {messages.length === 0 && !isLoading && (
        <div className="welcome-container">
          <div className="welcome-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="welcome-title">Welcome to Sambhav AI</h3>
          <p className="welcome-text">
            Ask anything about your document. Provide a document URL and your question to get started.
          </p>
        </div>
      )}
      
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}
      
      {isLoading && (
        <MessageBubble message={{ type: 'ai', content: '' }} isLoading={true} />
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
