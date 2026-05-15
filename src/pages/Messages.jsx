import { useState } from 'react';
import { ArrowLeft, Send, Image, Smile, Phone, MoreVertical, CheckCheck } from 'lucide-react';
import Logo from '../components/Logo';
import BottomNav from '../components/BottomNav';
import { conversations } from '../data/mockData';
import './Messages.css';

export default function Messages() {
  const [activeChat, setActiveChat] = useState(null);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState({});

  const openChat = (convo) => {
    setActiveChat(convo);
    if (!messages[convo.id]) {
      setMessages({ ...messages, [convo.id]: convo.messages });
    }
  };

  const sendMessage = () => {
    if (!inputVal.trim() || !activeChat) return;
    const newMsg = { id: Date.now(), text: inputVal, sender: 'me', time: 'Just now' };
    setMessages({
      ...messages,
      [activeChat.id]: [...(messages[activeChat.id] || activeChat.messages), newMsg],
    });
    setInputVal('');
  };

  if (activeChat) {
    const chatMsgs = messages[activeChat.id] || activeChat.messages;
    return (
      <div className="chat-view page-enter">
        <div className="chat-header glass">
          <button className="chat-back pressable" onClick={() => setActiveChat(null)}>
            <ArrowLeft size={20} />
          </button>
          <div className="chat-user-info" onClick={() => {}}>
            <img src={activeChat.avatar} alt="" className="chat-avatar" />
            <div>
              <span className="chat-name">{activeChat.name}</span>
              <span className="chat-status">
                <span className="status-dot" />
                Active now
              </span>
            </div>
          </div>
          <div className="chat-header-actions">
            <button className="icon-btn-sm pressable"><Phone size={17} /></button>
            <button className="icon-btn-sm pressable"><MoreVertical size={17} /></button>
          </div>
        </div>

        <div className="chat-messages">
          <div className="chat-date-label">Today</div>
          {chatMsgs.map((msg, i) => (
            <div key={msg.id || i} className={`msg-row ${msg.sender === 'me' ? 'sent' : 'received'}`}>
              {msg.sender !== 'me' && (
                <img src={activeChat.avatar} alt="" className="msg-avatar" />
              )}
              <div className="msg-bubble">
                <p>{msg.text}</p>
                <span className="msg-time">
                  {msg.time}
                  {msg.sender === 'me' && <CheckCheck size={12} />}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-bar glass">
          <button className="input-icon pressable"><Image size={18} /></button>
          <div className="chat-input-wrap">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="input-icon-inner pressable"><Smile size={17} /></button>
          </div>
          <button
            className={`send-btn pressable ${inputVal.trim() ? 'active' : ''}`}
            onClick={sendMessage}
          >
            <Send size={17} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-page page-enter">
      <div className="messages-header glass">
        <Logo size="sm" showText={false} />
        <h1 className="page-title">Messages</h1>
        <div style={{ width: 28 }} />
      </div>

      <div className="messages-list stagger-children">
        {conversations.map((convo) => (
          <button key={convo.id} className="convo-item pressable" onClick={() => openChat(convo)}>
            <div className="convo-avatar-wrap">
              <img src={convo.avatar} alt="" className="convo-avatar" />
              {convo.online && <span className="online-dot" />}
            </div>
            <div className="convo-content">
              <div className="convo-top">
                <span className="convo-name">{convo.name}</span>
                <span className="convo-time">{convo.lastTime}</span>
              </div>
              <div className="convo-bottom">
                <span className={`convo-preview ${convo.unread ? 'unread' : ''}`}>
                  {convo.lastMessage}
                </span>
                {convo.unread > 0 && (
                  <span className="unread-badge">{convo.unread}</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
