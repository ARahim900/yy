import React from 'react';
import { NAVIGATION_ITEMS, Page } from '../../constants';

interface SidebarProps {
  isSidebarOpen: boolean;
  activePage: Page;
  onNavigate: (page: Page) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, activePage, onNavigate }) => {
  return (
    <aside
      className={`bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2 mt-4">
          <ul className="space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => onNavigate(item.name)}
                  className={`flex items-center w-full h-12 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    activePage === item.name
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
                  }`}
                  title={item.name}
                  aria-label={item.name}
                >
                  <item.icon className="h-6 w-6 flex-shrink-0" />
                  <span
                    className={`ml-4 overflow-hidden whitespace-nowrap transition-all duration-200 ${
                      isSidebarOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};