import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, SlidersHorizontal, Bell, Search, RefreshCw } from 'lucide-react';
import Logo from '../components/Logo';
import RoommateCard from '../components/RoommateCard';
import FilterSheet from '../components/FilterSheet';
import BottomNav from '../components/BottomNav';
import { roommates } from '../data/mockData';
import './Discover.css';

export default function Discover() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [likedToast, setLikedToast] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const handleLike = (roommate) => {
    setLikedToast(roommate.name);
    setTimeout(() => setLikedToast(null), 2000);
    setTimeout(() => {
      if (currentIdx + 1 >= roommates.length) {
        setHasReachedEnd(true);
      } else {
        setCurrentIdx((prev) => prev + 1);
      }
    }, 300);
  };

  const handlePass = () => {
    setTimeout(() => {
      if (currentIdx + 1 >= roommates.length) {
        setHasReachedEnd(true);
      } else {
        setCurrentIdx((prev) => prev + 1);
      }
    }, 300);
  };

  const handleCardTap = (roommate) => {
    navigate(`/roommate/${roommate.id}`);
  };

  const resetStack = () => {
    setCurrentIdx(0);
    setHasReachedEnd(false);
  };

  const currentRoommate = roommates[currentIdx % roommates.length];

  return (
    <div className="discover-page page-enter">
      <div className="discover-header glass">
        <div className="header-left">
          <Logo size="sm" showText={false} />
          <div className="location-pill">
            <MapPin size={11} />
            <span>New York</span>
          </div>
        </div>
        <div className="header-right">
          <button className="icon-btn pressable" onClick={() => setShowFilters(true)}>
            <SlidersHorizontal size={19} />
          </button>
          <button className="icon-btn has-notif pressable">
            <Bell size={19} />
          </button>
        </div>
      </div>

      {!hasReachedEnd ? (
        <div className="discover-feed">
          <RoommateCard
            key={currentIdx}
            roommate={currentRoommate}
            onLike={handleLike}
            onPass={handlePass}
            onTap={handleCardTap}
          />
        </div>
      ) : (
        <div className="discover-empty">
          <div className="empty-icon-wrap">
            <Search size={40} strokeWidth={1.5} />
          </div>
          <h3>You've seen everyone!</h3>
          <p>That's all the roommates in your area for now. Check back soon or adjust your filters to see more people.</p>
          <button className="empty-refresh pressable" onClick={resetStack}>
            <RefreshCw size={16} />
            Start over
          </button>
          <button className="empty-filters" onClick={() => setShowFilters(true)}>
            Adjust filters
          </button>
        </div>
      )}

      {likedToast && (
        <div className="like-toast">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          You liked {likedToast}!
        </div>
      )}

      <FilterSheet
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={(filters) => console.log('Applied filters:', filters)}
      />

      <BottomNav />
    </div>
  );
}
