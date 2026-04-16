import React, { useState } from 'react';
import './InputBar.css';

const InputBar = ({ onSendMessage, isLoading, documentUrl, setDocumentUrl }) => {
  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState('url'); // 'url' or 'upload'

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputText.trim() || isLoading) return;
    
    if (inputMode === 'url' && !documentUrl.trim()) {
      alert('Please provide a document URL first');
      return;
    }
    
    onSendMessage(inputText);
    setInputText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="input-bar">
      <div className="input-container">
        {/* Document URL Input */}
        <div className="document-section">
          <div className="mode-toggle">
            <button
              onClick={() => setInputMode('url')}
              className={`mode-button ${inputMode === 'url' ? 'active' : 'inactive'}`}
            >
              URL Mode
            </button>
            <button
              onClick={() => setInputMode('upload')}
              className={`mode-button ${inputMode === 'upload' ? 'active' : 'inactive'}`}
              disabled
            >
              Upload Mode (Coming Soon)
            </button>
          </div>
          
          {inputMode === 'url' && (
            <input
              type="url"
              value={documentUrl}
              onChange={(e) => setDocumentUrl(e.target.value)}
              placeholder="Enter document URL..."
              className="document-input"
              disabled={isLoading}
            />
          )}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSubmit} className="message-form">
          <div className="message-input-wrapper">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything about the document..."
              className="message-input"
              rows={1}
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading || (inputMode === 'url' && !documentUrl.trim())}
            className="send-button"
          >
            {isLoading ? (
              <svg className="spinner" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputBar;
