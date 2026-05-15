import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';
import Logo from '../components/Logo';
import BottomNav from '../components/BottomNav';
import { roommates } from '../data/mockData';
import './Matches.css';

export default function Matches() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('matches');
  const matches = roommates.slice(0, 3);
  const liked = roommates.slice(3);

  return (
    <div className="matches-page page-enter">
      <div className="matches-header glass">
        <Logo size="sm" showText={false} />
        <h1 className="page-title">Matches</h1>
        <div style={{ width: 28 }} />
      </div>

      <div className="matches-tabs">
        <button className={`tab-btn ${tab === 'matches' ? 'active' : ''}`} onClick={() => setTab('matches')}>
          <Sparkles size={14} />
          Matches
          <span className="tab-count">{matches.length}</span>
        </button>
        <button className={`tab-btn ${tab === 'liked' ? 'active' : ''}`} onClick={() => setTab('liked')}>
          <Heart size={14} />
          Liked You
          <span className="tab-count">{liked.length}</span>
        </button>
      </div>

      {tab === 'matches' && (
        <div className="match-content stagger-children">
          <p className="match-subtitle">People you both liked</p>
          <div className="match-grid">
            {matches.map((m) => (
              <button key={m.id} className="match-card pressable" onClick={() => navigate('/messages')}>
                <div className="match-photo-wrap">
                  <img src={m.photos[0]} alt={m.name} />
                  <div className="match-compat-badge">{m.compatibility}%</div>
                </div>
                <span className="match-name">{m.name.split(' ')[0]}</span>
                <span className="match-meta">{m.age} · {m.occupation.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {tab === 'liked' && (
        <div className="match-content stagger-children">
          <div className="liked-banner">
            <div className="liked-banner-icon">
              <Heart size={20} fill="white" />
            </div>
            <div>
              <p className="liked-banner-title">{liked.length} people liked you</p>
              <p className="liked-banner-desc">Upgrade to Paire+ to see who</p>
            </div>
          </div>
          <div className="liked-grid">
            {liked.map((m) => (
              <div key={m.id} className="liked-card">
                <div className="liked-photo-wrap">
                  <img src={m.photos[0]} alt={m.name} />
                  <div className="liked-blur" />
                </div>
                <span className="liked-name">{m.name.split(' ')[0]}, {m.age}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
