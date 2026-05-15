import { useState } from 'react';
import { MapPin, SlidersHorizontal, Bell } from 'lucide-react';
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
    setCurrentIdx((prev) => prev + 1);
  };

  const handlePass = () => {
    setCurrentIdx((prev) => prev + 1);
  };

  const currentRoommate = roommates[currentIdx % roommates.length];

  return (
    <div className="discover-page">
      <div className="discover-header">
        <div className="header-left">
          <h1 className="page-logo">paire</h1>
          <div className="location-pill">
            <MapPin size={12} />
            <span>New York</span>
          </div>
        </div>
        <div className="header-right">
          <button className="icon-btn">
            <SlidersHorizontal size={20} />
          </button>
          <button className="icon-btn has-notif">
            <Bell size={20} />
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
        <div className="like-toast animate-fade-in">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          You liked {likedToast}!
        </div>
      )}

      <BottomNav />
    </div>
  );
}
