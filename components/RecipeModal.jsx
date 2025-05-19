import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../recipe.css';

function RecipeModal({ isOpen, onClose, recipe, isLoading }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      const starter = [
        { type: 'user', content: 'Tolong berikan resep untuk masakan ini.' }
      ];

      if (recipe && !isLoading) {
        starter.push({ type: 'assistant', content: recipe });
      } else if (isLoading) {
        starter.push({ type: 'streaming', content: ' ' });
      }

      setMessages(starter);
    } else {
      setMessages([]);
      setInputValue('');
      setIsStreaming(false);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    }
  }, [isOpen, recipe, isLoading]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const question = inputValue.trim();
    const newMessages = [...messages, { type: 'user', content: question }];
    setMessages(newMessages);
    setInputValue('');
    setIsStreaming(true);

    // Tambahkan pesan streaming kosong
    setMessages((prev) => [...prev, { type: 'streaming', content: '' }]);

    const eventSource = new EventSource(
      `http://localhost:5000/api/chat_stream?question=${encodeURIComponent(question)}&history=${encodeURIComponent(
        JSON.stringify(
          newMessages.map((m) => ({
            role: m.type === 'user' ? 'user' : 'assistant',
            content: m.content
          }))
        )
      )}`
    );

    eventSourceRef.current = eventSource;
    let streamedAnswer = '';

    eventSource.onmessage = (event) => {
      const token = event.data;

      if (token === '[DONE]') {
        eventSource.close();
        setIsStreaming(false);

        // Ubah pesan terakhir yang 'streaming' menjadi 'assistant'
        setMessages((prev) =>
          prev.map((msg, index) =>
            index === prev.length - 1 && msg.type === 'streaming'
              ? { ...msg, type: 'assistant' }
              : msg
          )
        );
        return;
      }

      streamedAnswer += token;

      // Update pesan terakhir dengan token yang sudah terkumpul
      setMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1 && msg.type === 'streaming'
            ? { ...msg, content: streamedAnswer }
            : msg
        )
      );
    };

    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      eventSource.close();
      setIsStreaming(false);

      // Ubah streaming jadi assistant walau error
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 && msg.type === 'streaming'
            ? { ...msg, type: 'assistant', content: streamedAnswer || 'Maaf, terjadi kesalahan dalam memproses permintaan Anda.' }
            : msg
        )
      );
    };
  };

  // Function to render message content with proper markdown
  const renderMessageContent = (content, isStreaming = false) => {
    return (
      <>
        <div className="message-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
        {isStreaming && (
          <div className="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="chat-modal">
        <div className="chat-header">
          <h2>Asisten Kuliner</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <div className="message-avatar">
                {message.type === 'user' ? '👤' : '👨‍🍳'}
              </div>
              <div className="message-bubble">
                {message.type === 'streaming' 
                  ? renderMessageContent(message.content, true)
                  : renderMessageContent(message.content)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Tanya tentang resep ini..."
            className="input-field"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isStreaming || isLoading}
          />
          <button
            className="send-button"
            onClick={handleSend}
            disabled={!inputValue.trim() || isStreaming || isLoading}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;