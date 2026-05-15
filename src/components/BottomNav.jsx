import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, MessageCircle, User, Sparkles } from 'lucide-react';
import './BottomNav.css';

const navItems = [
  { path: '/discover', icon: Search, label: 'Discover' },
  { path: '/matches', icon: Sparkles, label: 'Matches' },
  { path: '/messages', icon: MessageCircle, label: 'Messages', badge: 3 },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav">
      {navItems.map(({ path, icon: Icon, label, badge }) => {
        const isActive = location.pathname.startsWith(path);
        return (
          <button
            key={path}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(path)}
          >
            <div className="nav-icon-wrap">
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              {badge && <span className="nav-badge">{badge}</span>}
            </div>
            <span className="nav-label">{label}</span>
            {isActive && <div className="nav-indicator" />}
          </button>
        );
      })}
    </nav>
  );
}
