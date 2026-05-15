import { useEffect, useState } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 400);
    const t2 = setTimeout(() => setPhase('exit'), 1800);
    const t3 = setTimeout(() => onFinish(), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinish]);

  return (
    <div className={`splash splash-${phase}`}>
      <div className="splash-bg">
        <div className="splash-orb orb-1" />
        <div className="splash-orb orb-2" />
        <div className="splash-orb orb-3" />
      </div>
      <div className="splash-content">
        <div className="splash-logo-mark">
          <svg viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="sg1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7C5CFC" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
              <linearGradient id="sg2" x1="24" y1="8" x2="24" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="100%" stopColor="#FFA07A" />
              </linearGradient>
            </defs>
            <rect width="48" height="48" rx="14" fill="url(#sg1)" />
            <path d="M18 14C14 14 11 17.5 11 21C11 26 16 30 18 32C20 30 25 26 25 21C25 17.5 22 14 18 14Z" fill="white" fillOpacity="0.9" />
            <path d="M30 14C26 14 23 17.5 23 21C23 26 28 30 30 32C32 30 37 26 37 21C37 17.5 34 14 30 14Z" fill="url(#sg2)" fillOpacity="0.85" />
            <circle cx="24" cy="21" r="2.5" fill="white" />
          </svg>
        </div>
        <h1 className="splash-title">paire</h1>
        <p className="splash-tagline">find your perfect roommate</p>
      </div>
    </div>
  );
}
