import React, { useState } from 'react';
import './FixedInputBar.css';
import { uploadFileToCloudinary } from '../utils/cloudinary';

const FixedInputBar = ({ onSendMessage, isLoading, documentUrl, setDocumentUrl, inputText, setInputText, onUploadModeClick, showUploadDevMessage }) => {
  const [inputMode, setInputMode] = useState('url'); // 'url' or 'upload'
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadError, setUploadError] = useState('');

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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type (PDF only)
    if (file.type !== 'application/pdf') {
      setUploadError('Please upload a PDF file only');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    setUploadError('');
    setUploadedFileName('');

    try {
      const uploadedUrl = await uploadFileToCloudinary(file);
      setDocumentUrl(uploadedUrl);
      setUploadedFileName(file.name);
    } catch (error) {
      setUploadError(error.message || 'Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleModeChange = (mode) => {
    setInputMode(mode);
    if (mode === 'url') {
      setUploadedFileName('');
      setUploadError('');
    } else if (mode === 'upload' && onUploadModeClick) {
      onUploadModeClick();
    }
  };

  return (
    <div className="fixed-input-bar">
      <div className="input-card">
        {/* Mode Toggle */}
        <div className="mode-toggle">
          <button
            onClick={() => setInputMode('url')}
            className={`mode-button ${inputMode === 'url' ? 'active' : ''}`}
          >
            URL Mode
          </button>
          <button
            onClick={() => handleModeChange('upload')}
            className={`mode-button ${inputMode === 'upload' ? 'active' : ''}`}
          >
            Upload
          </button>
        </div>

        {/* Document Input */}
        <div className="document-input-section">
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
          
          {inputMode === 'upload' && (
            <div className="upload-section">
              {showUploadDevMessage && (
                <div className="development-message">
                  ⚠️ Upload functionality is currently under development
                </div>
              )}
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={uploading || isLoading}
                className="file-input"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="file-input-label">
                {uploading ? 'Uploading...' : uploadedFileName || 'Drag and drop your document here or click to upload'}
              </label>
              {uploadError && (
                <div className="upload-error">{uploadError}</div>
              )}
              {uploadedFileName && !uploadError && (
                <div className="upload-success">
                  ✓ {uploadedFileName} uploaded successfully
                </div>
              )}
            </div>
          )}
        </div>

        {/* Prompt Input */}
        <form onSubmit={handleSubmit} className="prompt-form">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything about document..."
            className="prompt-input"
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading || uploading || (inputMode === 'url' && !documentUrl.trim())}
            className="send-button"
          >
            {isLoading ? (
              <svg className="spinner" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3.7.938l3-2.647z"></path>
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

export default FixedInputBar;
