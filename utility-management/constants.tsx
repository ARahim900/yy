
import React from 'react';
import { NavItem } from './types';

// SVG Icons as React Components
const WaterIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.75 16.25c-1.3-1.3-2.1-3.1-2.1-5.25 0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5c0 2.15-.8 3.95-2.1 5.25" opacity="0.4"/>
    </svg>
);
const ElectricityIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);
const HvacIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M12 6h.01M6.343 17.657l.007-.007M17.657 6.343l-.007.007M17.657 17.657l-.007-.007M6.343 6.343l.007.007m11.306 5.31h.01M6.343 12h.01m5.303-5.657l.007-.007m0 11.314l-.007.007" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity="0.4"/>
    </svg>
);
const FireIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14.5 5 16 7.333 16 10c0 .333 0 .667-.028 1m-2.288 8.028C11.95 20.168 10 22 10 22s-3-2-3-6c0-2 2-4 4-4s4 2 4 4a4.23 4.23 0 01-.343 1.657z" />
    </svg>
);
const ContractorIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);
const StpIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6m4-4h4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6" opacity="0.4"/>
    </svg>
);

export type Page = 'Water System' | 'Electricity System' | 'HVAC System' | 'Firefighting & Alarm' | 'Contractor Tracker' | 'STP Plant';

export const NAVIGATION_ITEMS: NavItem[] = [
  { name: 'Water System', icon: WaterIcon },
  { name: 'Electricity System', icon: ElectricityIcon },
  { name: 'HVAC System', icon: HvacIcon },
  { name: 'Firefighting & Alarm', icon: FireIcon },
  { name: 'Contractor Tracker', icon: ContractorIcon },
  { name: 'STP Plant', icon: StpIcon },
];

export const BOTTOM_NAV_ITEMS: NavItem[] = [
    { name: 'Water System', icon: WaterIcon },
    { name: 'Electricity System', icon: ElectricityIcon },
    { name: 'HVAC System', icon: HvacIcon },
    { name: 'Firefighting & Alarm', icon: FireIcon },
    { name: 'Contractor Tracker', icon: ContractorIcon },
    { name: 'STP Plant', icon: StpIcon },
];