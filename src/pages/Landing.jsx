import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Sparkles, Heart, Users, Star, ChevronRight } from 'lucide-react';
import Logo from '../components/Logo';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing page-enter">
      <div className="landing-hero">
        <div className="hero-bg">
          <div className="hero-orb orb-1" />
          <div className="hero-orb orb-2" />
          <div className="hero-orb orb-3" />
          <div className="hero-grid" />
        </div>

        <div className="hero-content">
          <Logo size="lg" variant="white" />

          <h2 className="hero-headline">
            Find your<br />
            <span className="highlight">perfect</span> roommate
          </h2>
          <p className="hero-sub">
            Smart matching based on lifestyle,<br />
            not just budget.
          </p>

          <button className="cta-primary" onClick={() => navigate('/onboarding')}>
            Get Started
            <ArrowRight size={18} />
          </button>

          <button className="cta-ghost" onClick={() => navigate('/discover')}>
            Explore profiles first
            <ChevronRight size={16} />
          </button>

          <div className="social-proof">
            <div className="avatar-stack">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt="" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" alt="" />
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" alt="" />
              <div className="avatar-count">+2k</div>
            </div>
            <div className="proof-text">
              <span className="proof-highlight">2,400+</span> matched this month
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="section-header">
          <span className="section-eyebrow">Why Paire?</span>
          <h3 className="section-title">Everything you need to<br />find your person</h3>
        </div>
        <div className="features-grid stagger-children">
          {[
            { icon: Sparkles, title: 'AI Matching', desc: 'Compatibility scores from 50+ lifestyle factors', color: '#7C5CFC', bg: '#F5F3FF' },
            { icon: Shield, title: 'Verified Only', desc: 'ID verification & background checks built in', color: '#34D399', bg: '#D1FAE5' },
            { icon: Heart, title: 'Vibe Check', desc: 'Personality prompts that show who you really are', color: '#FF6B6B', bg: '#FFF1F1' },
            { icon: Users, title: 'Real People', desc: 'No bots, no scams — just people looking for a home', color: '#FBBF24', bg: '#FEF9C3' },
          ].map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="feature-card pressable">
              <div className="feature-icon" style={{ background: bg, color }}>
                <Icon size={20} />
              </div>
              <div className="feature-text">
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="how-section">
        <div className="section-header">
          <span className="section-eyebrow">How it works</span>
          <h3 className="section-title">Three steps to your<br />new roommate</h3>
        </div>
        <div className="steps stagger-children">
          {[
            { num: '01', title: 'Take the quiz', desc: 'Answer lifestyle questions so we can find your match' },
            { num: '02', title: 'Browse matches', desc: 'Swipe through compatible roommates in your area' },
            { num: '03', title: 'Connect & move in', desc: 'Chat, meet up, and find your perfect place together' },
          ].map(({ num, title, desc }) => (
            <div key={num} className="step-card">
              <span className="step-num">{num}</span>
              <div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonial-section">
        <div className="testimonial-card">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#FBBF24" stroke="#FBBF24" />
            ))}
          </div>
          <p className="testimonial-text">
            "Found my roommate in 3 days. We've been living together for 6 months and it's been amazing. The compatibility quiz actually works."
          </p>
          <div className="testimonial-author">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face" alt="" />
            <div>
              <span className="author-name">Sarah K.</span>
              <span className="author-loc">Brooklyn, NY</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-cta">
        <h3>Ready to find<br />your person?</h3>
        <button className="cta-primary" onClick={() => navigate('/onboarding')}>
          Take the Quiz
          <ArrowRight size={18} />
        </button>
        <p className="bottom-note">Free to use · No credit card required</p>
      </div>
    </div>
  );
}
