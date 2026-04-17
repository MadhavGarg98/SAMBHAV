import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FixedInputBar from './FixedInputBar';
import './MainLayout.css';

const MainLayout = ({ children, onSuggestionClick, isChatStarted, ...inputBarProps }) => {
  return (
    <div className="main-layout">
      <Navbar />
      {!isChatStarted && <HeroSection onSuggestionClick={onSuggestionClick} />}
      <div className="content-container">
        {children}
      </div>
      <FixedInputBar {...inputBarProps} />
    </div>
  );
};

export default MainLayout;
