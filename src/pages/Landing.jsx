import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Sparkles, Heart, Users } from 'lucide-react';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing-hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>

        <div className="hero-content">
          <div className="logo-mark">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4C10 4 6 8.5 6 13.5C6 18 9 21 12 23L16 28L20 23C23 21 26 18 26 13.5C26 8.5 22 4 16 4Z" fill="white" fillOpacity="0.9"/>
                <circle cx="12.5" cy="13" r="2.5" fill="#7C5CFC"/>
                <circle cx="19.5" cy="13" r="2.5" fill="#FF6B6B"/>
                <path d="M13 18C13 18 14.5 20 16 20C17.5 20 19 18 19 18" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="logo-text">paire</h1>
          </div>

          <h2 className="hero-headline">
            Find your <span className="highlight">perfect</span><br />
            roommate
          </h2>
          <p className="hero-sub">
            Smart matching. Verified profiles.<br />
            No more Craigslist nightmares.
          </p>

          <button className="cta-primary" onClick={() => navigate('/quiz')}>
            Get Started
            <ArrowRight size={18} />
          </button>

          <button className="cta-secondary" onClick={() => navigate('/discover')}>
            Explore First
          </button>

          <div className="social-proof">
            <div className="avatar-stack">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt="" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" alt="" />
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" alt="" />
            </div>
            <span className="proof-text">2,400+ matched this month</span>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h3 className="section-title">Why Paire?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #7C5CFC, #A78BFA)' }}>
              <Sparkles size={20} color="white" />
            </div>
            <h4>AI Matching</h4>
            <p>Compatibility scores based on 50+ lifestyle factors</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #34D399, #6EE7B7)' }}>
              <Shield size={20} color="white" />
            </div>
            <h4>Verified Profiles</h4>
            <p>ID verification & background checks for peace of mind</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #FF6B6B, #FFA07A)' }}>
              <Heart size={20} color="white" />
            </div>
            <h4>Vibe Check</h4>
            <p>Personality prompts that show who you really are</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #FBBF24, #F59E0B)' }}>
              <Users size={20} color="white" />
            </div>
            <h4>Real People</h4>
            <p>No bots, no scams — just people looking for a home</p>
          </div>
        </div>
      </div>

      <div className="testimonials-section">
        <h3 className="section-title">Real Stories</h3>
        <div className="testimonial-card">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
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
        <h3>Ready to find your person?</h3>
        <button className="cta-primary" onClick={() => navigate('/quiz')}>
          Take the Quiz
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
