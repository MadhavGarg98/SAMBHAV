import React from 'react';
import './HeroSection.css';

const HeroSection = ({ onSuggestionClick }) => {
  const suggestions = [
    "Summarize this document",
    "What are the key points?",
    "Explain the main idea",
    "Find important dates"
  ];

  const handleSuggestionClick = (suggestion) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Sambhav AI</h1>
        <p className="hero-subtitle">AI-powered document intelligence</p>
        <p className="hero-description">
          Ask questions about any document by providing a URL or uploading a file.
        </p>
        
        <div className="suggestions-container">
          <div className="suggestions-grid">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion-button"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
