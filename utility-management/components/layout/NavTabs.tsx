import React from 'react';
import { NAVIGATION_ITEMS, Page } from '../../constants';

interface NavTabsProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

export const NavTabs: React.FC<NavTabsProps> = ({ activePage, onNavigate }) => {
  return (
    <div className="bg-card border-b border-border shadow-sm lg:hidden">
      <nav className="flex space-x-2 sm:space-x-4 px-4 sm:px-6 lg:px-8 -mb-px overflow-x-auto">
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate(item.name)}
            className={`whitespace-nowrap flex items-center py-3 px-2 border-b-2 font-semibold text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              activePage === item.name
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
            }`}
            aria-current={activePage === item.name ? 'page' : undefined}
          >
            <item.icon className="w-5 h-5 mr-2" />
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
};
