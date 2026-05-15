import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, DollarSign, Calendar, Cigarette, Dog, Volume2, Users, Moon } from 'lucide-react';
import Logo from '../components/Logo';
import './Preferences.css';

const budgetRanges = ['Under $800', '$800 - $1,200', '$1,200 - $1,600', '$1,600 - $2,000', '$2,000+'];
const moveInOptions = ['ASAP', 'Within 1 month', '1-3 months', '3+ months', 'Flexible'];

export default function Preferences() {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState({
    location: 'New York, NY',
    budget: null,
    moveIn: null,
    dealbreakers: {},
  });

  const dealbreakers = [
    { id: 'smoking', icon: Cigarette, label: 'Smoking', options: ['No smoking', 'Outside only', "Don't mind"] },
    { id: 'pets', icon: Dog, label: 'Pets', options: ['No pets', 'Cats OK', 'Dogs OK', 'All pets OK'] },
    { id: 'noise', icon: Volume2, label: 'Noise level', options: ['Very quiet', 'Moderate', 'Lively'] },
    { id: 'guests', icon: Users, label: 'Guests', options: ['Rarely', 'Sometimes', 'Often'] },
    { id: 'schedule', icon: Moon, label: 'Sleep schedule', options: ['Early bird', 'Normal', 'Night owl'] },
  ];

  const isComplete = prefs.budget !== null && prefs.moveIn !== null;

  return (
    <div className="preferences-page page-enter">
      <div className="pref-header">
        <button className="pref-back pressable" onClick={() => navigate('/quiz')}>
          <ArrowLeft size={20} />
        </button>
        <Logo size="sm" showText={false} />
        <div style={{ width: 28 }} />
      </div>

      <div className="pref-intro">
        <span className="pref-badge">Almost there!</span>
        <h2>Set your preferences</h2>
        <p>Tell us your must-haves so we only show you relevant matches. You can change these anytime.</p>
      </div>

      <div className="pref-sections">
        <div className="pref-section">
          <h3 className="pref-section-title">
            <MapPin size={16} />
            Location
          </h3>
          <div className="pref-location-input">
            <MapPin size={16} className="loc-icon" />
            <input
              type="text"
              value={prefs.location}
              onChange={(e) => setPrefs({ ...prefs, location: e.target.value })}
              placeholder="Enter your city..."
            />
          </div>
        </div>

        <div className="pref-section">
          <h3 className="pref-section-title">
            <DollarSign size={16} />
            Monthly budget
          </h3>
          <div className="pref-chips">
            {budgetRanges.map((range, i) => (
              <button
                key={range}
                className={`pref-chip pressable ${prefs.budget === i ? 'selected' : ''}`}
                onClick={() => setPrefs({ ...prefs, budget: i })}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="pref-section">
          <h3 className="pref-section-title">
            <Calendar size={16} />
            Move-in timeline
          </h3>
          <div className="pref-chips">
            {moveInOptions.map((opt, i) => (
              <button
                key={opt}
                className={`pref-chip pressable ${prefs.moveIn === i ? 'selected' : ''}`}
                onClick={() => setPrefs({ ...prefs, moveIn: i })}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="pref-divider">
          <span>Deal-breakers</span>
        </div>

        {dealbreakers.map(({ id, icon: Icon, label, options }) => (
          <div key={id} className="pref-section">
            <h3 className="pref-section-title">
              <Icon size={16} />
              {label}
            </h3>
            <div className="pref-chips">
              {options.map((opt, i) => (
                <button
                  key={opt}
                  className={`pref-chip pressable ${prefs.dealbreakers[id] === i ? 'selected' : ''}`}
                  onClick={() => setPrefs({
                    ...prefs,
                    dealbreakers: { ...prefs.dealbreakers, [id]: i }
                  })}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pref-footer">
        <button
          className={`pref-save pressable ${isComplete ? 'active' : ''}`}
          onClick={() => isComplete && navigate('/discover')}
          disabled={!isComplete}
        >
          Show my matches
          <ArrowRight size={17} />
        </button>
        <button className="pref-skip" onClick={() => navigate('/discover')}>
          Skip for now — show everyone
        </button>
      </div>
    </div>
  );
}
