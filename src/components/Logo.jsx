import './Logo.css';

export default function Logo({ size = 'md', variant = 'default', showText = true }) {
  const sizes = { sm: 28, md: 36, lg: 48, xl: 64 };
  const s = sizes[size] || sizes.md;

  return (
    <div className={`paire-logo logo-${size} logo-${variant}`}>
      <div className="logo-mark" style={{ width: s, height: s }}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGrad1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7C5CFC" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
            <linearGradient id="logoGrad2" x1="24" y1="8" x2="24" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="100%" stopColor="#FFA07A" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="14" fill="url(#logoGrad1)" />
          {/* Two overlapping drops forming a pair/connection */}
          <path d="M18 14C14 14 11 17.5 11 21C11 26 16 30 18 32C20 30 25 26 25 21C25 17.5 22 14 18 14Z" fill="white" fillOpacity="0.9" />
          <path d="M30 14C26 14 23 17.5 23 21C23 26 28 30 30 32C32 30 37 26 37 21C37 17.5 34 14 30 14Z" fill="url(#logoGrad2)" fillOpacity="0.85" />
          {/* Connection dot */}
          <circle cx="24" cy="21" r="2.5" fill="white" />
        </svg>
      </div>
      {showText && <span className="logo-wordmark">paire</span>}
    </div>
  );
}
