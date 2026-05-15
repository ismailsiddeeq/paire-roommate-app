import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageCircle } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { roommates } from '../data/mockData';
import './Matches.css';

export default function Matches() {
  const navigate = useNavigate();
  const matched = roommates.slice(0, 4);

  return (
    <div className="matches-page">
      <div className="matches-header">
        <h1 className="page-title">
          <Sparkles size={22} className="title-icon" />
          Your Matches
        </h1>
        <p className="matches-subtitle">People who also liked you back</p>
      </div>

      <div className="new-matches-section">
        <h3 className="sub-heading">New Matches</h3>
        <div className="new-matches-row">
          {matched.slice(0, 3).map((r) => (
            <div key={r.id} className="new-match-bubble" onClick={() => navigate(`/messages`)}>
              <div className="match-avatar-wrap">
                <img src={r.avatar} alt={r.name} />
                <div className="match-compat">{r.compatibility}%</div>
              </div>
              <span className="match-name">{r.name.split(' ')[0]}</span>
            </div>
          ))}
          <div className="new-match-bubble see-all">
            <div className="match-avatar-wrap placeholder">
              <span>+2</span>
            </div>
            <span className="match-name">See all</span>
          </div>
        </div>
      </div>

      <div className="match-list-section">
        <h3 className="sub-heading">All Matches</h3>
        {matched.map((r) => (
          <div key={r.id} className="match-list-card" onClick={() => navigate('/messages')}>
            <img src={r.avatar} alt={r.name} className="match-list-avatar" />
            <div className="match-list-info">
              <div className="match-list-name-row">
                <h4>{r.name}</h4>
                {r.verified && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--success)">
                    <path d="M12 2L14.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                )}
              </div>
              <p className="match-list-detail">{r.occupation}</p>
              <div className="match-list-tags">
                {r.tags.slice(0, 3).map((t) => (
                  <span key={t} className="mini-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="match-list-right">
              <div className="match-score">{r.compatibility}%</div>
              <button className="msg-btn" onClick={(e) => { e.stopPropagation(); navigate('/messages'); }}>
                <MessageCircle size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
