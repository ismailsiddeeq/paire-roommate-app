import { useState, useRef } from 'react';
import { MapPin, Briefcase, DollarSign, Calendar, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import './RoommateCard.css';

export default function RoommateCard({ roommate, onLike, onPass, style }) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [swipeDir, setSwipeDir] = useState(null);
  const startX = useRef(0);
  const cardRef = useRef(null);

  const handlePhotoTap = (e) => {
    if (Math.abs(dragX) > 5) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x > rect.width / 2) {
      setCurrentPhoto((p) => Math.min(p + 1, roommate.photos.length - 1));
    } else {
      setCurrentPhoto((p) => Math.max(p - 1, 0));
    }
  };

  const onPointerDown = (e) => {
    startX.current = e.clientX;
    setDragging(true);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    setDragX(dx);
    setSwipeDir(dx > 30 ? 'right' : dx < -30 ? 'left' : null);
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragX > 100) {
      setSwipeDir('right');
      setTimeout(() => { onLike?.(roommate); setDragX(0); setSwipeDir(null); }, 200);
    } else if (dragX < -100) {
      setSwipeDir('left');
      setTimeout(() => { onPass?.(roommate); setDragX(0); setSwipeDir(null); }, 200);
    } else {
      setDragX(0);
      setSwipeDir(null);
    }
  };

  const cardStyle = {
    ...style,
    transform: dragging ? `translateX(${dragX}px) rotate(${dragX * 0.04}deg)` : undefined,
    transition: dragging ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  return (
    <div
      ref={cardRef}
      className={`roommate-card ${swipeDir === 'right' ? 'swiping-right' : ''} ${swipeDir === 'left' ? 'swiping-left' : ''}`}
      style={cardStyle}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={() => { if (dragging) { setDragging(false); setDragX(0); setSwipeDir(null); } }}
    >
      {/* Swipe overlays */}
      <div className="swipe-overlay swipe-like" style={{ opacity: Math.max(0, dragX / 150) }}>
        <span>LIKE</span>
      </div>
      <div className="swipe-overlay swipe-nope" style={{ opacity: Math.max(0, -dragX / 150) }}>
        <span>NOPE</span>
      </div>

      <div className="card-photo-section" onClick={handlePhotoTap}>
        <img src={roommate.photos[currentPhoto]} alt={roommate.name} className="card-photo" draggable={false} />
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
                <Shield size={12} />
              </div>
            )}
          </div>
          <div className="card-detail">
            <Briefcase size={13} />
            <span>{roommate.occupation}</span>
          </div>
          <div className="card-detail">
            <MapPin size={13} />
            <span>{roommate.location}</span>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="compatibility-section">
          <div className="compat-ring">
            <svg viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" fill="none" stroke="var(--border-light)" strokeWidth="3" />
              <circle
                cx="22" cy="22" r="18" fill="none"
                stroke="url(#compatGrad)" strokeWidth="3" strokeLinecap="round"
                strokeDasharray={`${roommate.compatibility * 1.13} 113`}
                transform="rotate(-90 22 22)"
              />
              <defs>
                <linearGradient id="compatGrad" x1="0" y1="0" x2="44" y2="44">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
              </defs>
            </svg>
            <span className="compat-num">{roommate.compatibility}</span>
          </div>
          <div className="compat-info">
            <span className="compat-label">Compatibility Score</span>
            <span className="compat-desc">Based on your lifestyle quiz</span>
          </div>
        </div>

        <div className="card-meta">
          <div className="meta-chip">
            <DollarSign size={13} />
            <span>{roommate.budget}</span>
          </div>
          <div className="meta-chip">
            <Calendar size={13} />
            <span>{roommate.moveIn}</span>
          </div>
        </div>

        <div className="card-tags">
          {roommate.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {roommate.prompts.slice(0, expanded ? 3 : 1).map((prompt, i) => (
          <div key={i} className="prompt-card" style={{ animationDelay: `${i * 0.08}s` }}>
            <span className="prompt-question">{prompt.question}</span>
            <p className="prompt-answer">{prompt.answer}</p>
          </div>
        ))}

        <button className="expand-btn pressable" onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          {expanded ? 'Show less' : `Show more about ${roommate.name.split(' ')[0]}`}
        </button>
      </div>

      <div className="card-actions">
        <button className="action-btn pass pressable" onClick={() => onPass?.(roommate)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <button className="action-btn superlike pressable">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
        <button className="action-btn like pressable" onClick={() => onLike?.(roommate)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
