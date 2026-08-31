import { type SVGProps } from 'react';

export function RoadTracks(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Base (inactive) route track */}
      <path
        id="route-base"
        d="M 200,800 C 200,450 450,550 500,500 C 550,450 800,550 800,200"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
      />
      {/* Active animated route */}
      <path
        id="route-active"
        d="M 200,800 C 200,450 450,550 500,500 C 550,450 800,550 800,200"
        fill="none"
        stroke="#00B14F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(0, 177, 79, 0.4))',
        }}
      />
      {/* Start node */}
      <circle cx="200" cy="800" r="16" fill="#0A0D0B" stroke="#00B14F" strokeWidth="6" />
      {/* End node */}
      <circle cx="800" cy="200" r="16" fill="#0A0D0B" stroke="#00B14F" strokeWidth="6" />
    </svg>
  );
}
