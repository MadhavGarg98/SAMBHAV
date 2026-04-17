import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import Navbar from './components/Navbar';
import FixedInputBar from './components/FixedInputBar';
import HeroSection from './components/HeroSection';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [documentUrl, setDocumentUrl] = useState('');
  const [inputText, setInputText] = useState('');
  const [showUploadDevMessage, setShowUploadDevMessage] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);

  const formatTimestamp = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
  };

  const handleSendMessage = async (userMessage) => {
    if (!documentUrl.trim()) {
      alert('Please provide a document URL first');
      return;
    }

    setIsChatStarted(true);
    const userMsg = {
      role: 'user',
      content: userMessage,
      timestamp: formatTimestamp()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setInputText('');

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL,
        {
          documents: documentUrl,
          questions: [userMessage]
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const aiResponse = response.data?.answers?.[0] || 'Sorry, I could not process your request.';
      
      const aiMsg = {
        role: 'ai',
        content: aiResponse,
        timestamp: formatTimestamp()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('API Error:', error);
      
      const errorMsg = {
        role: 'ai',
        content: 'Sorry, there was an error processing your request. Please check your document URL and try again.',
        timestamp: formatTimestamp()
      };
      
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar />
      
      {!isChatStarted && <HeroSection onSuggestionClick={handleSuggestionClick} />}
      
      <div className="chat-container">
        <div className="chat-wrapper">
          <ChatWindow 
            messages={messages} 
            isLoading={isLoading} 
          />
        </div>
      </div>

      <div className="input-container">
        <FixedInputBar 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          documentUrl={documentUrl}
          setDocumentUrl={setDocumentUrl}
          inputText={inputText}
          setInputText={setInputText}
          onUploadModeClick={() => setShowUploadDevMessage(true)}
          showUploadDevMessage={showUploadDevMessage}
        />
      </div>
    </div>
  );
}

export default App;
