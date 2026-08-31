import { type SVGProps } from 'react';

export function GrabMotorcycle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Main body of the motorcycle */}
      <path
        d="M20 42 C20 42 35 30 55 28 C75 26 90 35 95 35"
        fill="none"
        stroke="#00B14F"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wheels */}
      <circle cx="30" cy="44" r="8" fill="#00B14F" />
      <circle cx="80" cy="44" r="8" fill="#00B14F" />
      {/* Rider */}
      <path
        d="M55 28 C58 25 65 23 72 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Handlebars */}
      <path
        d="M88 35 C92 32 96 34 100 32"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
