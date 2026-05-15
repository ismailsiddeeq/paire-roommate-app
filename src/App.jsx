import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Landing from './pages/Landing';
import Quiz from './pages/Quiz';
import Discover from './pages/Discover';
import Matches from './pages/Matches';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

export default function App() {
  const [showSplash, setShowSplash] = useState(() => {
    if (sessionStorage.getItem('paire_splash_shown')) return false;
    return window.location.pathname === '/';
  });

  const handleSplashDone = useCallback(() => {
    sessionStorage.setItem('paire_splash_shown', '1');
    setShowSplash(false);
  }, []);

  return (
    <BrowserRouter>
      {showSplash && <SplashScreen onFinish={handleSplashDone} />}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
