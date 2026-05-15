import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Shield, MapPin, Briefcase, DollarSign, Calendar, Heart, X, Star, MessageCircle, Share2, Flag, Moon, Volume2, Users, Sparkles, Home } from 'lucide-react';
import { roommates } from '../data/mockData';
import './RoommateDetail.css';

const lifestyleLabels = {
  cleanliness: { icon: Sparkles, label: 'Cleanliness', levels: ['Relaxed', 'Casual', 'Average', 'Tidy', 'Spotless'] },
  noise: { icon: Volume2, label: 'Noise', levels: ['Silent', 'Quiet', 'Moderate', 'Lively', 'Party'] },
  social: { icon: Users, label: 'Social', levels: ['Very private', 'Introverted', 'Balanced', 'Social', 'Super social'] },
};

export default function RoommateDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const roommate = roommates.find(r => r.id === parseInt(id)) || roommates[0];

  const userLifestyle = { cleanliness: 5, noise: 2, social: 3 };

  return (
    <div className="detail-page page-enter">
      <div className="detail-header">
        <button className="detail-back pressable" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div className="detail-header-actions">
          <button className="detail-action-sm pressable">
            <Share2 size={18} />
          </button>
          <button className="detail-action-sm pressable">
            <Flag size={18} />
          </button>
        </div>
      </div>

      <div className="detail-photos">
        {roommate.photos.map((photo, i) => (
          <div key={i} className={`detail-photo-card ${i === 0 ? 'hero' : ''}`}>
            <img src={photo} alt={`${roommate.name} photo ${i + 1}`} draggable={false} />
            {i === 0 && (
              <div className="detail-photo-overlay">
                <div className="detail-name-block">
                  <h1>{roommate.name}, {roommate.age}</h1>
                  <div className="detail-badges">
                    {roommate.verified && (
                      <span className="verified-pill">
                        <Shield size={12} />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="detail-body">
        <div className="detail-info-row">
          <div className="detail-info-chip">
            <Briefcase size={14} />
            <span>{roommate.occupation}</span>
          </div>
          <div className="detail-info-chip">
            <MapPin size={14} />
            <span>{roommate.location}</span>
          </div>
          <div className="detail-info-chip">
            <DollarSign size={14} />
            <span>{roommate.budget}</span>
          </div>
          <div className="detail-info-chip">
            <Calendar size={14} />
            <span>{roommate.moveIn}</span>
          </div>
        </div>

        <div className="detail-compat-section">
          <div className="compat-header-row">
            <div className="compat-score-large">
              <svg viewBox="0 0 80 80" className="compat-ring-lg">
                <circle cx="40" cy="40" r="34" fill="none" stroke="var(--border-light)" strokeWidth="5" />
                <circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke="url(#compatGradLg)" strokeWidth="5" strokeLinecap="round"
                  strokeDasharray={`${roommate.compatibility * 2.136} 213.6`}
                  transform="rotate(-90 40 40)"
                />
                <defs>
                  <linearGradient id="compatGradLg" x1="0" y1="0" x2="80" y2="80">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--accent)" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="compat-score-num">{roommate.compatibility}%</span>
            </div>
            <div className="compat-text-block">
              <h3>Compatibility Score</h3>
              <p>Based on your lifestyle quiz answers. Here's how you compare:</p>
            </div>
          </div>

          <div className="compat-breakdown">
            {Object.entries(lifestyleLabels).map(([key, { icon: Icon, label, levels }]) => {
              const theirVal = roommate.lifestyle[key];
              const myVal = userLifestyle[key];
              const match = 100 - Math.abs(theirVal - myVal) * 20;
              return (
                <div key={key} className="compat-bar-row">
                  <div className="compat-bar-label">
                    <Icon size={14} />
                    <span>{label}</span>
                  </div>
                  <div className="compat-bar-track">
                    <div className="compat-bar-you" style={{ left: `${(myVal - 1) * 25}%` }}>
                      <span className="bar-dot you-dot" />
                      <span className="bar-tag">You</span>
                    </div>
                    <div className="compat-bar-them" style={{ left: `${(theirVal - 1) * 25}%` }}>
                      <span className="bar-dot them-dot" />
                      <span className="bar-tag">{roommate.name.split(' ')[0]}</span>
                    </div>
                  </div>
                  <span className={`compat-match-tag ${match >= 80 ? 'great' : match >= 60 ? 'good' : 'ok'}`}>
                    {match >= 80 ? 'Great match' : match >= 60 ? 'Good' : 'Differs'}
                  </span>
                </div>
              );
            })}
            <div className="compat-bar-row">
              <div className="compat-bar-label">
                <Moon size={14} />
                <span>Sleep</span>
              </div>
              <div className="compat-sleep-compare">
                <span className="sleep-pill you-pill">You: 10pm-6am</span>
                <span className="sleep-pill them-pill">{roommate.name.split(' ')[0]}: {roommate.lifestyle.sleep}</span>
              </div>
            </div>
            <div className="compat-bar-row">
              <div className="compat-bar-label">
                <Home size={14} />
                <span>Guests</span>
              </div>
              <div className="compat-sleep-compare">
                <span className="sleep-pill you-pill">You: Sometimes</span>
                <span className="sleep-pill them-pill">{roommate.name.split(' ')[0]}: {roommate.lifestyle.guests}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-tags">
          {roommate.tags.map(tag => (
            <span key={tag} className="detail-tag">{tag}</span>
          ))}
        </div>

        <div className="detail-prompts">
          {roommate.prompts.map((prompt, i) => (
            <div key={i} className="detail-prompt-card">
              <span className="detail-prompt-q">{prompt.question}</span>
              <p className="detail-prompt-a">{prompt.answer}</p>
              <button className="prompt-like-btn pressable">
                <Heart size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="detail-safety-note">
          <Shield size={16} />
          <div>
            <strong>Safety first</strong>
            <p>Always meet in a public place. Never share financial info before meeting in person.</p>
          </div>
        </div>
      </div>

      <div className="detail-bottom-bar">
        <button className="detail-btn-pass pressable" onClick={() => navigate(-1)}>
          <X size={24} />
        </button>
        <button className="detail-btn-star pressable">
          <Star size={22} />
        </button>
        <button className="detail-btn-like pressable">
          <Heart size={24} fill="white" />
        </button>
        <button className="detail-btn-msg pressable" onClick={() => navigate('/messages')}>
          <MessageCircle size={22} />
        </button>
      </div>
    </div>
  );
}
