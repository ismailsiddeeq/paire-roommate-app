import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Home, Shield, Heart, Users, Sparkles } from 'lucide-react';
import Logo from '../components/Logo';
import './Onboarding.css';

const slides = [
  {
    icon: Home,
    color: '#7C5CFC',
    bg: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
    title: 'Find your perfect\nroommate match',
    desc: 'We match you based on lifestyle, habits, and personality — not just budget. No more guessing if you\'ll get along.',
    visual: 'home',
  },
  {
    icon: Shield,
    color: '#34D399',
    bg: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
    title: 'Safety you can\nactually trust',
    desc: 'Every profile is verified. Background checks, ID verification, and a community that looks out for each other.',
    visual: 'safety',
  },
  {
    icon: Heart,
    color: '#FF6B6B',
    bg: 'linear-gradient(135deg, #FFF1F1 0%, #FFE4E6 100%)',
    title: 'Connect with\nreal people',
    desc: 'See compatibility breakdowns, chat safely in-app, and find someone you\'d actually enjoy living with.',
    visual: 'connect',
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  const isLast = current === slides.length - 1;

  const next = () => {
    if (isLast) {
      sessionStorage.setItem('paire_onboarded', '1');
      navigate('/quiz');
    } else {
      setCurrent(current + 1);
    }
  };

  const skip = () => {
    sessionStorage.setItem('paire_onboarded', '1');
    navigate('/quiz');
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-header">
        <Logo size="sm" />
        {!isLast && (
          <button className="skip-btn" onClick={skip}>
            Skip
          </button>
        )}
      </div>

      <div className="onboarding-content" key={current}>
        <div className="onboarding-visual" style={{ background: slide.bg }}>
          <div className="visual-icon-wrap" style={{ background: slide.color }}>
            <slide.icon size={40} color="white" strokeWidth={1.5} />
          </div>
          <div className="visual-orbs">
            <div className="v-orb v-orb-1" style={{ background: slide.color }} />
            <div className="v-orb v-orb-2" style={{ background: slide.color }} />
            <div className="v-orb v-orb-3" style={{ background: slide.color }} />
          </div>
        </div>

        <div className="onboarding-text">
          <h2>{slide.title}</h2>
          <p>{slide.desc}</p>
        </div>
      </div>

      <div className="onboarding-footer">
        <div className="onboarding-dots">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`ob-dot ${i === current ? 'active' : ''} ${i < current ? 'done' : ''}`}
              style={i === current ? { background: slide.color } : undefined}
            />
          ))}
        </div>

        <button className="onboarding-next" onClick={next} style={{ background: slide.color }}>
          {isLast ? "Let's find your match" : 'Continue'}
          <ArrowRight size={18} />
        </button>

        {isLast && (
          <p className="onboarding-note">Takes about 2 minutes. Totally free.</p>
        )}
      </div>
    </div>
  );
}
