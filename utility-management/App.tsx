
import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { NavTabs } from './components/layout/NavTabs';
import { Sidebar } from './components/layout/Sidebar';
import { WaterSystem } from './pages/WaterSystem';
import { ElectricitySystem } from './pages/ElectricitySystem';
import { HvacSystem } from './pages/HvacSystem';
import { FirefightingAlarm } from './pages/FirefightingAlarm';
import { ContractorTracker } from './pages/ContractorTracker';
import { StpPlant } from './pages/StpPlant';
import { Page } from './constants';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('Water System');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'Water System':
        return <WaterSystem />;
      case 'Electricity System':
        return <ElectricitySystem />;
      case 'HVAC System':
        return <HvacSystem />;
      case 'Firefighting & Alarm':
        return <FirefightingAlarm />;
      case 'Contractor Tracker':
        return <ContractorTracker />;
      case 'STP Plant':
        return <StpPlant />;
      default:
        return <WaterSystem />;
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen font-sans flex flex-col h-screen">
      <Header activePage={activePage} toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-y-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <Sidebar 
            isSidebarOpen={isSidebarOpen} 
            activePage={activePage} 
            onNavigate={setActivePage}
          />
        </div>

        <div className="flex flex-col flex-1 w-full overflow-hidden">
          {/* Mobile NavTabs */}
          <div className="block lg:hidden">
            <NavTabs activePage={activePage} onNavigate={setActivePage} />
          </div>
          
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;