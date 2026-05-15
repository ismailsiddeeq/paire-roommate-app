import { useState } from 'react';
import { ArrowLeft, Send, Image, Smile, Phone, Video } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { conversations } from '../data/mockData';
import './Messages.css';

function ConversationList({ onSelect }) {
  return (
    <div className="messages-page">
      <div className="messages-header">
        <h1 className="page-title">Messages</h1>
      </div>

      <div className="conversations-list">
        {conversations.map((conv) => (
          <div key={conv.id} className="conv-item" onClick={() => onSelect(conv)}>
            <div className="conv-avatar-wrap">
              <img src={conv.roommate.avatar} alt={conv.roommate.name} />
              {conv.unread > 0 && <span className="conv-unread">{conv.unread}</span>}
            </div>
            <div className="conv-info">
              <div className="conv-top-row">
                <h4>{conv.roommate.name}</h4>
                <span className="conv-time">{conv.time}</span>
              </div>
              <p className="conv-preview">{conv.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

function ChatView({ conversation, onBack }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(conversation.messages);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, {
      id: messages.length + 1,
      sender: 'me',
      text: message,
      time: 'Just now',
    }]);
    setMessage('');
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <div className="chat-header-info">
          <img src={conversation.roommate.avatar} alt="" className="chat-avatar" />
          <div>
            <h3>{conversation.roommate.name}</h3>
            <span className="chat-status">Online</span>
          </div>
        </div>
        <div className="chat-header-actions">
          <button className="icon-btn-sm"><Phone size={18} /></button>
          <button className="icon-btn-sm"><Video size={18} /></button>
        </div>
      </div>

      <div className="chat-compat-banner">
        <span className="compat-percent">{conversation.roommate.compatibility}% match</span>
        <span className="compat-note">Based on your lifestyle quiz</span>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
            <p>{msg.text}</p>
            <span className="bubble-time">{msg.time}</span>
          </div>
        ))}
      </div>

      <div className="chat-input-bar">
        <button className="input-action"><Image size={20} /></button>
        <div className="input-wrap">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="input-action emoji"><Smile size={18} /></button>
        </div>
        <button
          className={`send-btn ${message.trim() ? 'active' : ''}`}
          onClick={sendMessage}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default function Messages() {
  const [activeConv, setActiveConv] = useState(null);

  if (activeConv) {
    return <ChatView conversation={activeConv} onBack={() => setActiveConv(null)} />;
  }

  return <ConversationList onSelect={setActiveConv} />;
}
