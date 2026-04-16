import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [documentUrl, setDocumentUrl] = useState('');

  const formatTimestamp = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleSendMessage = async (userMessage) => {
    if (!documentUrl.trim()) {
      alert('Please provide a document URL first');
      return;
    }

    // Add user message
    const userMsg = {
      type: 'user',
      content: userMessage,
      timestamp: formatTimestamp()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

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
        type: 'ai',
        content: aiResponse,
        timestamp: formatTimestamp()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('API Error:', error);
      
      const errorMsg = {
        type: 'ai',
        content: 'Sorry, there was an error processing your request. Please check your document URL and try again.',
        timestamp: formatTimestamp()
      };
      
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Sambhav AI</h1>
          <p className="app-subtitle">AI-powered document Q&A</p>
        </div>
      </header>

      {/* Chat Window */}
      <ChatWindow messages={messages} isLoading={isLoading} />

      {/* Input Bar */}
      <InputBar 
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        documentUrl={documentUrl}
        setDocumentUrl={setDocumentUrl}
      />
    </div>
  );
}

export default App;
