import { useState } from 'react';
import { MapPin, Briefcase, DollarSign, Calendar, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import './RoommateCard.css';

export default function RoommateCard({ roommate, onLike, onPass, style }) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handlePhotoTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x > rect.width / 2) {
      setCurrentPhoto((p) => Math.min(p + 1, roommate.photos.length - 1));
    } else {
      setCurrentPhoto((p) => Math.max(p - 1, 0));
    }
  };

  return (
    <div className="roommate-card" style={style}>
      <div className="card-photo-section" onClick={handlePhotoTap}>
        <img
          src={roommate.photos[currentPhoto]}
          alt={roommate.name}
          className="card-photo"
        />
        <div className="photo-indicators">
          {roommate.photos.map((_, i) => (
            <div key={i} className={`photo-dot ${i === currentPhoto ? 'active' : ''}`} />
          ))}
        </div>
        <div className="card-gradient" />
        <div className="card-header-info">
          <div className="card-name-row">
            <h2>{roommate.name}, {roommate.age}</h2>
            {roommate.verified && (
              <div className="verified-badge">
                <Shield size={14} />
                <span>Verified</span>
              </div>
            )}
          </div>
          <div className="card-detail">
            <Briefcase size={14} />
            <span>{roommate.occupation}</span>
          </div>
          <div className="card-detail">
            <MapPin size={14} />
            <span>{roommate.location}</span>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="compatibility-bar">
          <div className="compat-header">
            <span className="compat-label">Compatibility</span>
            <span className="compat-score">{roommate.compatibility}%</span>
          </div>
          <div className="compat-track">
            <div
              className="compat-fill"
              style={{ width: `${roommate.compatibility}%` }}
            />
          </div>
        </div>

        <div className="card-meta">
          <div className="meta-chip">
            <DollarSign size={14} />
            <span>{roommate.budget}</span>
          </div>
          <div className="meta-chip">
            <Calendar size={14} />
            <span>{roommate.moveIn}</span>
          </div>
        </div>

        <div className="card-tags">
          {roommate.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {roommate.prompts.slice(0, expanded ? 3 : 1).map((prompt, i) => (
          <div key={i} className="prompt-card">
            <span className="prompt-question">{prompt.question}</span>
            <p className="prompt-answer">{prompt.answer}</p>
          </div>
        ))}

        <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {expanded ? 'Show less' : 'Show more'}
        </button>
      </div>

      <div className="card-actions">
        <button className="action-btn pass" onClick={() => onPass?.(roommate)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <button className="action-btn superlike">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
        <button className="action-btn like" onClick={() => onLike?.(roommate)}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
