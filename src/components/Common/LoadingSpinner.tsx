import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullPage?: boolean;
}

export default function LoadingSpinner({ size = 'md', text, fullPage = false }: LoadingSpinnerProps) {
  const sizes = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizes[size]} relative`}>
        <div className={`${sizes[size]} rounded-full border-2 border-orange/20 border-t-orange animate-spin`} />
        <div className={`${sizes[size]} rounded-full border-2 border-transparent border-b-orange-light animate-spin absolute inset-0`} style={{ animationDuration: '0.6s', animationDirection: 'reverse' }} />
      </div>
      {text && <p className="text-peach/60 text-sm font-montserrat animate-pulse">{text}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}
