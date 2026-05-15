import { useState } from 'react';
import { X, MapPin, DollarSign, Calendar, Sliders } from 'lucide-react';
import './FilterSheet.css';

const budgetOptions = ['Any', 'Under $1,000', '$1,000 - $1,500', '$1,500 - $2,000', '$2,000+'];
const moveInOptions = ['Any', 'ASAP', '1-3 months', '3+ months'];
const lifestyleOptions = ['Any', 'Early bird', 'Night owl', 'Very clean', 'Pet-friendly', 'Quiet'];

export default function FilterSheet({ isOpen, onClose, onApply }) {
  const [filters, setFilters] = useState({
    budget: 0,
    moveIn: 0,
    lifestyle: [],
    verifiedOnly: false,
  });

  const toggleLifestyle = (opt) => {
    setFilters(prev => ({
      ...prev,
      lifestyle: prev.lifestyle.includes(opt)
        ? prev.lifestyle.filter(l => l !== opt)
        : [...prev.lifestyle, opt]
    }));
  };

  const activeCount = (filters.budget > 0 ? 1 : 0) + (filters.moveIn > 0 ? 1 : 0) + filters.lifestyle.length + (filters.verifiedOnly ? 1 : 0);

  if (!isOpen) return null;

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-sheet" onClick={e => e.stopPropagation()}>
        <div className="filter-handle" />

        <div className="filter-header">
          <h3>
            <Sliders size={18} />
            Filters
          </h3>
          <button className="filter-close pressable" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="filter-content">
          <div className="filter-group">
            <label className="filter-label">
              <DollarSign size={15} />
              Budget range
            </label>
            <div className="filter-chips">
              {budgetOptions.map((opt, i) => (
                <button
                  key={opt}
                  className={`filter-chip pressable ${filters.budget === i ? 'active' : ''}`}
                  onClick={() => setFilters({ ...filters, budget: i })}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <Calendar size={15} />
              Move-in date
            </label>
            <div className="filter-chips">
              {moveInOptions.map((opt, i) => (
                <button
                  key={opt}
                  className={`filter-chip pressable ${filters.moveIn === i ? 'active' : ''}`}
                  onClick={() => setFilters({ ...filters, moveIn: i })}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <MapPin size={15} />
              Lifestyle
            </label>
            <div className="filter-chips">
              {lifestyleOptions.slice(1).map(opt => (
                <button
                  key={opt}
                  className={`filter-chip pressable ${filters.lifestyle.includes(opt) ? 'active' : ''}`}
                  onClick={() => toggleLifestyle(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-toggle-row">
            <span className="filter-toggle-label">Verified profiles only</span>
            <button
              className={`filter-toggle ${filters.verifiedOnly ? 'on' : ''}`}
              onClick={() => setFilters({ ...filters, verifiedOnly: !filters.verifiedOnly })}
            >
              <span className="toggle-knob" />
            </button>
          </div>
        </div>

        <div className="filter-footer">
          <button className="filter-reset" onClick={() => setFilters({ budget: 0, moveIn: 0, lifestyle: [], verifiedOnly: false })}>
            Reset all
          </button>
          <button className="filter-apply pressable" onClick={() => { onApply?.(filters); onClose(); }}>
            Show results{activeCount > 0 ? ` (${activeCount})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}
