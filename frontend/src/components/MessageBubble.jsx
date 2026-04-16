import React from 'react';
import './MessageBubble.css';

const MessageBubble = ({ message, isLoading = false }) => {
  const isUser = message.type === 'user';

  if (isLoading) {
    return (
      <div className="message-container ai">
        <div className="chat-bubble ai-bubble">
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`message-container ${isUser ? 'user' : 'ai'}`}>
      <div className={`chat-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}>
        <p className="message-text">
          {message.content}
        </p>
        <div className={`message-timestamp ${isUser ? 'user-timestamp' : 'ai-timestamp'}`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
