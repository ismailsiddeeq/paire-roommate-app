import { useNavigate } from 'react-router-dom';
import { Settings, Edit3, Shield, MapPin, Briefcase, Calendar, Camera, ChevronRight, LogOut, Bell, Lock, HelpCircle, Star } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Edit3, label: 'Edit Profile', desc: 'Photos, prompts, preferences' },
    { icon: Shield, label: 'Verification', desc: 'ID verified', badge: 'Verified', badgeColor: 'green' },
    { icon: Bell, label: 'Notifications', desc: 'Push, email, in-app' },
    { icon: Lock, label: 'Privacy & Safety', desc: 'Block list, data, visibility' },
    { icon: Star, label: 'Upgrade to Premium', desc: 'Unlimited likes, priority matching', badge: 'Pro', badgeColor: 'purple' },
    { icon: HelpCircle, label: 'Help & Support', desc: 'FAQ, contact us' },
  ];

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="profile-hero-bg" />
        <button className="settings-btn">
          <Settings size={20} />
        </button>
        <div className="profile-avatar-section">
          <div className="profile-avatar-wrap">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face" alt="You" />
            <button className="avatar-edit-btn">
              <Camera size={14} />
            </button>
          </div>
          <h2 className="profile-name">You</h2>
          <div className="profile-details">
            <span className="profile-detail"><Briefcase size={13} /> Software Developer</span>
            <span className="profile-detail"><MapPin size={13} /> New York, NY</span>
            <span className="profile-detail"><Calendar size={13} /> Looking from July 2025</span>
          </div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat">
          <span className="stat-num">12</span>
          <span className="stat-label">Matches</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-num">94%</span>
          <span className="stat-label">Profile Score</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-num">3</span>
          <span className="stat-label">Chats</span>
        </div>
      </div>

      <div className="profile-prompts-preview">
        <h3 className="section-label">Your Prompts</h3>
        <div className="prompt-preview-card">
          <span className="prompt-q">My ideal Sunday looks like</span>
          <p className="prompt-a">Coffee, a good book, and maybe brunch with friends if I'm feeling social</p>
        </div>
        <div className="prompt-preview-card">
          <span className="prompt-q">I'm looking for a roommate who</span>
          <p className="prompt-a">Is respectful of shared spaces and down for the occasional movie night</p>
        </div>
      </div>

      <div className="profile-menu">
        {menuItems.map(({ icon: Icon, label, desc, badge, badgeColor }) => (
          <div key={label} className="menu-item">
            <div className="menu-icon">
              <Icon size={18} />
            </div>
            <div className="menu-info">
              <div className="menu-label-row">
                <span className="menu-label">{label}</span>
                {badge && <span className={`menu-badge ${badgeColor}`}>{badge}</span>}
              </div>
              <span className="menu-desc">{desc}</span>
            </div>
            <ChevronRight size={16} className="menu-arrow" />
          </div>
        ))}
      </div>

      <button className="logout-btn" onClick={() => navigate('/')}>
        <LogOut size={16} />
        Sign Out
      </button>

      <BottomNav />
    </div>
  );
}
