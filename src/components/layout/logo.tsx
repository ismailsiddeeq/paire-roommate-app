export function Logo({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id="logo-grad-1"
          x1="8"
          y1="4"
          x2="28"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#7C5CFC" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
        <linearGradient
          id="logo-grad-2"
          x1="20"
          y1="4"
          x2="40"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FFA07A" />
        </linearGradient>
      </defs>
      <path
        d="M18 6C11.373 6 6 11.373 6 18C6 30 18 38 18 38C18 38 30 30 30 18C30 11.373 24.627 6 18 6Z"
        fill="url(#logo-grad-1)"
        opacity="0.9"
      />
      <path
        d="M30 10C23.373 10 18 15.373 18 22C18 34 30 42 30 42C30 42 42 34 42 22C42 15.373 36.627 10 30 10Z"
        fill="url(#logo-grad-2)"
        opacity="0.9"
      />
    </svg>
  );
}
