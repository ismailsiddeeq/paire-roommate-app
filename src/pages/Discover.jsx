import { useState } from 'react';
import { MapPin, SlidersHorizontal, Bell } from 'lucide-react';
import Logo from '../components/Logo';
import RoommateCard from '../components/RoommateCard';
import BottomNav from '../components/BottomNav';
import { roommates } from '../data/mockData';
import './Discover.css';

export default function Discover() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [likedToast, setLikedToast] = useState(null);

  const handleLike = (roommate) => {
    setLikedToast(roommate.name);
    setTimeout(() => setLikedToast(null), 2000);
    setTimeout(() => setCurrentIdx((prev) => prev + 1), 300);
  };

  const handlePass = () => {
    setTimeout(() => setCurrentIdx((prev) => prev + 1), 300);
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
          <button className="icon-btn pressable">
            <SlidersHorizontal size={19} />
          </button>
          <button className="icon-btn has-notif pressable">
            <Bell size={19} />
          </button>
        </div>
      </div>

      <div className="discover-feed">
        <RoommateCard
          key={currentIdx}
          roommate={currentRoommate}
          onLike={handleLike}
          onPass={handlePass}
        />
      </div>

      {likedToast && (
        <div className="like-toast">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          You liked {likedToast}!
        </div>
      )}

      <BottomNav />
    </div>
  );
}
