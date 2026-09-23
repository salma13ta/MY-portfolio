// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const hasSeenOnboarding = localStorage.getItem('onboarded');

      router.replace(hasSeenOnboarding ? '/dashboard/home' : '/onboarding');
    }, 2800);

    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <main className="splash-screen" aria-label="Loading portfolio">
      <div className="splash-logo" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="splash-hexagon"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 50, 5 L 11, 27 L 11, 72 L 50, 95 L 89, 73 L 89, 28 z"
          />
          <g className="splash-next-mark">
            <text className="splash-next-word" x="24" y="54">
              <tspan className="splash-next-letter">N</tspan>
              <tspan className="splash-next-letter">E</tspan>
              <tspan className="splash-next-letter">X</tspan>
              <tspan className="splash-next-letter">T</tspan>
            </text>
            <text className="splash-next-js" x="62" y="54">
              <tspan className="splash-next-letter">.</tspan>
              <tspan className="splash-next-letter">J</tspan>
              <tspan className="splash-next-letter">S</tspan>
            </text>
          </g>
        </svg>
      </div>
    </main>
  );
}