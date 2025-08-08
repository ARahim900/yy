import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-card text-card-foreground rounded-lg shadow-card p-4 sm:p-6 transition-shadow duration-200 hover:shadow-card-hover ${className}`}>
      {children}
    </div>
  );
};
