
import React from 'react';

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  percentage: number;
  color: 'blue' | 'red' | 'green' | 'yellow' | 'primary';
}

export const Gauge: React.FC<GaugeProps> = ({ value, max, label, unit, percentage, color }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = max > 0 ? (value / max) * circumference : 0;
  const offset = circumference - progress;

  const colorClasses = {
    blue: 'text-blue-500',
    red: 'text-destructive',
    green: 'text-gain-green',
    yellow: 'text-warning',
    primary: 'text-primary'
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle
            className="text-secondary"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            className={colorClasses[color]}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{value.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
      </div>
      <div className="mt-2">
        <p className="font-semibold text-foreground">{label}</p>
        <p className={`text-lg font-bold ${colorClasses[color]}`}>{percentage.toFixed(0)}%</p>
      </div>
    </div>
  );
}
