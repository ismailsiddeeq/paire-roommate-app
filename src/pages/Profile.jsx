import { useNavigate } from 'react-router-dom';
import { Settings, Edit3, Shield, MapPin, ChevronRight, Crown, Bell, Lock, HelpCircle, LogOut } from 'lucide-react';
import Logo from '../components/Logo';
import BottomNav from '../components/BottomNav';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="profile-page page-enter">
      <div className="profile-header-bg">
        <div className="profile-header-orbs">
          <div className="p-orb p-orb-1" />
          <div className="p-orb p-orb-2" />
        </div>
      </div>

      <div className="profile-main">
        <div className="profile-card">
          <div className="profile-photo-section">
            <div className="profile-photo-wrap">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face"
                alt="Profile"
              />
              <button className="edit-photo-btn pressable">
                <Edit3 size={14} />
              </button>
            </div>
          </div>
          <h2 className="profile-name">Alex Chen</h2>
          <div className="profile-location">
            <MapPin size={12} />
            <span>New York, NY</span>
          </div>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-num">12</span>
              <span className="stat-label">Matches</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">89%</span>
              <span className="stat-label">Profile</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">5</span>
              <span className="stat-label">Chats</span>
            </div>
          </div>
        </div>

        <div className="profile-upgrade pressable">
          <div className="upgrade-icon">
            <Crown size={18} />
          </div>
          <div className="upgrade-text">
            <span className="upgrade-title">Upgrade to Paire+</span>
            <span className="upgrade-desc">See who liked you & unlimited swipes</span>
          </div>
          <ChevronRight size={18} />
        </div>

        <div className="profile-section">
          <h3 className="section-label">My Prompts</h3>
          <div className="prompt-preview">
            <span className="prompt-q">My ideal roommate...</span>
            <p>Is tidy in shared spaces but doesn't judge if my room is messy sometimes</p>
          </div>
          <div className="prompt-preview">
            <span className="prompt-q">On weekends you'll find me...</span>
            <p>At a coffee shop with a book or exploring a new neighborhood</p>
          </div>
        </div>

        <div className="profile-section">
          <h3 className="section-label">Settings</h3>
          <div className="settings-list stagger-children">
            {[
              { icon: Edit3, label: 'Edit Profile', desc: 'Photos, prompts, preferences' },
              { icon: Shield, label: 'Verification', desc: 'ID verified', accent: true },
              { icon: Bell, label: 'Notifications', desc: 'Push, email, in-app' },
              { icon: Lock, label: 'Privacy', desc: 'Visibility, blocking' },
              { icon: HelpCircle, label: 'Help & Support', desc: 'FAQ, contact us' },
            ].map(({ icon: Icon, label, desc, accent }) => (
              <button key={label} className="settings-item pressable">
                <div className={`settings-icon ${accent ? 'accent' : ''}`}>
                  <Icon size={17} />
                </div>
                <div className="settings-text">
                  <span className="settings-label">{label}</span>
                  <span className="settings-desc">{desc}</span>
                </div>
                <ChevronRight size={16} className="settings-arrow" />
              </button>
            ))}
          </div>
        </div>

        <button className="logout-btn pressable" onClick={() => navigate('/')}>
          <LogOut size={16} />
          Log Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
