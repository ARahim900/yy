import React from 'react';
import { Card } from '../components/ui/Card';

const contractData = [
  { contractor: 'Advanced Technology and Iraq SCC Company', service: 'BMS Non-Comprehensive Annual Maintenance', status: 'Expired', type: 'PO', startDate: 'Mar 26, 2023', endDate: 'Mar 25, 2024', annualValue: 'N/A', note: '' },
  { contractor: 'Al Naba Services LLC', service: 'Garbage Removal Services', status: 'Expired', type: 'Contract', startDate: 'Apr 2, 2023', endDate: 'Apr 1, 2024', annualValue: 'N/A', note: 'Nearing expiration, review for r...' },
  { contractor: 'Muscat Electronics LLC', service: 'Daikin AC Chillers (Gale Brand) Maintenance Services', status: 'Expired', type: 'Contract', startDate: 'Mar 26, 2021', endDate: 'Mar 25, 2022', annualValue: 'N/A', note: 'Transitioned to DWATCO before...' },
  { contractor: 'Cedar Water', service: 'Comprehensive STP Operation and Maintenance', status: 'Expired', type: 'Contract', startDate: 'Jan 16, 2021', endDate: 'Jan 15, 2025', annualValue: 'N/A', note: '' },
  { contractor: 'COMO', service: 'Facility Management (FM)', status: 'Active', type: 'Contract', startDate: 'Mar 1, 2022', endDate: 'Feb 28, 2025', annualValue: 'N/A', note: 'Transitioned to Kaihat before c...' },
  { contractor: 'Oman Pumps Manufacturing Co.', service: 'Supply, Installation, and Commissioning of Pumps', status: 'Active', type: 'Contract', startDate: 'Jun 20, 2020', endDate: 'Jun 20, 2025', annualValue: 'N/A', note: '' },
  { contractor: 'Balwan Engineering Company LLC', service: 'Maintenance of Fire Alarm & Fire Fighting Equipment', status: 'Active', type: 'Contract', startDate: 'Nov 1, 2024', endDate: 'Oct 31, 2025 Expires Soon', annualValue: '8,925.00', note: '' },
  { contractor: 'KONE Assarain LLC', service: 'Lift Maintenance Services', status: 'Active', type: 'Contract', startDate: 'Jan 1, 2023', endDate: 'Dec 31, 2025', annualValue: '11,550.00', note: '' },
  { contractor: 'Iron mountain ARAMEX', service: 'Offsite record storage', status: 'Active', type: 'Contract', startDate: 'Jan 1, 2025', endDate: 'Dec 31, 2025', annualValue: 'N/A', note: '' },
  { contractor: 'Gulf Expert', service: 'Chillers, BMS & Pressurisation Units', status: 'Active', type: 'Contract', startDate: 'Jun 3, 2024', endDate: 'Jun 2, 2025', annualValue: '7,234.50', note: '' },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const statusClasses: { [key: string]: string } = {
        Active: 'bg-chart-2/20 text-chart-2',
        Expired: 'bg-destructive/20 text-destructive',
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusClasses[status] || 'bg-secondary text-secondary-foreground'}`}>{status}</span>;
}

export const ContractorTracker: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard value="20" label="Total Contracts" sublabel="All registered contracts" color="blue" />
                <SummaryCard value="11" label="Active Contracts" sublabel="Currently ongoing" color="green" />
                <SummaryCard value="9" label="Expired Contracts" sublabel="Past due date" color="red" />
                <SummaryCard value="467,548" label="Total Annual Value (OMR)" sublabel="Sum of yearly values" color="yellow" />
            </div>

            <Card>
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4">
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <input type="text" placeholder="Search Contractor/Service" className="p-2 border rounded-lg w-full sm:w-64 bg-input" />
                            <select className="p-2 border rounded-lg bg-input w-full sm:w-auto"><option>Filter by Status</option><option>Active</option><option>Expired</option></select>
                        </div>
                        <button className="bg-secondary text-secondary-foreground font-semibold py-2 px-4 rounded-lg w-full sm:w-auto">Reset</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-card">
                            <thead className="bg-secondary">
                                <tr>
                                    {['Contractor', 'Service Provided', 'Status', 'Type', 'Start Date', 'End Date', 'Annual Value (OMR)'].map(header => (
                                        <th key={header} className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {contractData.map((item, index) => (
                                    <tr key={index} className="hover:bg-secondary">
                                        <td className="py-4 px-4 whitespace-nowrap text-sm font-medium">{item.contractor}</td>
                                        <td className="py-4 px-4 text-sm text-muted-foreground max-w-xs">{item.service}</td>
                                        <td className="py-4 px-4 whitespace-nowrap text-sm"><StatusBadge status={item.status} /></td>
                                        <td className="py-4 px-4 whitespace-nowrap text-sm text-muted-foreground">{item.type}</td>
                                        <td className="py-4 px-4 whitespace-nowrap text-sm text-muted-foreground">{item.startDate}</td>
                                        <td className="py-4 px-4 whitespace-nowrap text-sm text-muted-foreground">{item.endDate}</td>
                                        <td className="py-4 px-4 whitespace-nowrap text-sm text-muted-foreground text-right">{item.annualValue}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <span className="text-sm text-muted-foreground">Page 1 of 2</span>
                        <div className="flex space-x-2">
                            <button className="bg-secondary text-secondary-foreground py-2 px-4 rounded-lg disabled:opacity-50">Previous</button>
                            <button className="bg-primary text-primary-foreground py-2 px-4 rounded-lg">Next</button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const ICONS = {
    blue: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    green: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    red: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    yellow: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
}

interface SummaryCardProps {
    value: string;
    label: string;
    sublabel: string;
    color: 'blue' | 'green' | 'red' | 'yellow';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ value, label, sublabel, color }) => {
    const IconComponent = ICONS[color];
    const colors = {
        blue: 'bg-chart-5/20 text-chart-5',
        green: 'bg-chart-2/20 text-chart-2',
        red: 'bg-destructive/20 text-destructive',
        yellow: 'bg-warning/20 text-warning',
    };
    return (
        <Card className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${colors[color]}`}>
                <IconComponent />
            </div>
            <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="font-semibold text-base">{label}</p>
                <p className="text-sm text-muted-foreground">{sublabel}</p>
            </div>
        </Card>
    );
}