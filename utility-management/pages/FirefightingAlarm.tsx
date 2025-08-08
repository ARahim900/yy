import React from 'react';
import { Card } from '../components/ui/Card';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const statusData = [
  { name: 'Operational', value: 5, color: 'hsl(var(--chart-2))' },
  { name: 'Needs Attention', value: 1, color: 'hsl(var(--warning))' },
  { name: 'Maintenance Due', value: 1, color: 'hsl(var(--chart-3))' },
  { name: 'Critical Priority', value: 1, color: 'hsl(var(--destructive))' },
];

const equipmentTypeData = [
  { name: 'Fire Alarm Panel', value: 2 },
  { name: 'Smoke Detector', value: 1.5 },
  { name: 'Extinguisher', value: 1.8 },
  { name: 'Emergency Light', value: 1.2 },
  { name: 'Addressable Panel', value: 2.2 },
  { name: 'Pump', value: 1 },
  { name: 'Heat Detector', value: 0.8 },
];

const fireSafetyData = [
  { equipment: 'Main Fire Alarm Control Panel', location: 'FM Building', status: 'Operational', priority: 'Critical', battery: 95, signal: 'Strong', nextMaintenance: '01/03/2025', inspector: 'Balwan Engineering' },
  { equipment: 'Optical Smoke Detector', location: 'B1 Building', status: 'Needs Attention', priority: 'High', battery: 78, signal: 'Weak', nextMaintenance: '15/02/2025', inspector: 'Balwan Engineering' },
  { equipment: 'Sprinkler System Zone 1', location: 'B2 Building', status: 'Operational', priority: 'Critical', battery: 100, signal: 'Strong', nextMaintenance: '10/08/2025', inspector: 'Balwan Engineering' },
  { equipment: 'CO2 Fire Extinguisher', location: 'D44 Building', status: 'Expired', priority: 'Medium', battery: null, signal: 'N/A', nextMaintenance: '01/03/2025', inspector: 'ProLine Sec' },
  { equipment: 'LED Emergency Exit Sign', location: 'D45 Building', status: 'Operational', priority: 'Medium', battery: 88, signal: 'Strong', nextMaintenance: '20/01/2025', inspector: 'Balwan Engineering' },
  { equipment: 'Addressable Fire Panel', location: 'Sales Center', status: 'Operational', priority: 'Critical', battery: 92, signal: 'Strong', nextMaintenance: '28/02/2025', inspector: 'Balwan Engineering' },
  { equipment: 'Diesel Fire Pump', location: 'Pump Room', status: 'Operational', priority: 'Critical', battery: 100, signal: 'Strong', nextMaintenance: '05/03/2025', inspector: 'Balwan Engineering' },
  { equipment: 'Rate of Rise Heat Detector', location: 'B5 Building', status: 'Maintenance Due', priority: 'High', battery: 65, signal: 'Moderate', nextMaintenance: '15/02/2025', inspector: 'Balwan Engineering' },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const statusClasses: { [key: string]: string } = {
        Operational: 'bg-chart-2/20 text-chart-2',
        'Needs Attention': 'bg-warning/20 text-warning',
        Expired: 'bg-destructive/20 text-destructive',
        'Maintenance Due': 'bg-chart-3/20 text-chart-3',
        Critical: 'bg-destructive text-destructive-foreground',
        High: 'bg-red-500/80 text-white',
        Medium: 'bg-yellow-500/80 text-yellow-900',
        Strong: 'text-chart-2',
        Moderate: 'text-warning',
        Weak: 'text-destructive',
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClasses[status] || 'bg-secondary text-secondary-foreground'}`}>{status}</span>;
}

export const FirefightingAlarm: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <InfoCard value="8" label="Total Equipment" sublabel="All fire safety systems" color="blue" />
                <InfoCard value="62.5%" label="Operational" sublabel="5 of 8 systems" color="green" />
                <InfoCard value="1" label="Critical Priority" sublabel="system needs immediate attention" color="red" />
                <InfoCard value="1" label="Maintenance Due" sublabel="system needs scheduled maintenance" color="orange" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h4 className="text-lg font-semibold mb-2">System Status Distribution</h4>
                    <p className="text-sm text-muted-foreground mb-4">Current status of all fire safety systems</p>
                    <div className="h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card>
                    <h4 className="text-lg font-semibold mb-2">Equipment by Type</h4>
                    <p className="text-sm text-muted-foreground mb-4">Distribution of fire safety equipment types</p>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={equipmentTypeData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))"/>
                                <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} interval={0}/>
                                <YAxis stroke="hsl(var(--muted-foreground))" />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
                                <Bar dataKey="value" fill="hsl(var(--destructive))" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <Card>
                <h4 className="text-lg font-semibold mb-4">Fire Safety Equipment</h4>
                {/* Filters could go here */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-card">
                        <thead className="bg-secondary">
                            <tr>
                                {['Equipment', 'Location', 'Status', 'Priority', 'Battery', 'Signal', 'Next Maintenance', 'Inspector'].map(header => (
                                    <th key={header} className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {fireSafetyData.map((item, index) => (
                                <tr key={index} className="hover:bg-secondary">
                                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium">{item.equipment}</td>
                                    <td className="py-4 px-4 whitespace-nowrap text-sm text-muted-foreground">{item.location}</td>
                                    <td className="py-4 px-4 whitespace-nowrap text-sm"><StatusBadge status={item.status} /></td>
                                    <td className="py-4 px-4 whitespace-nowrap text-sm"><StatusBadge status={item.priority} /></td>
                                    <td className="py-4 px-4 whitespace-nowrap text-sm text-muted-foreground">{item.battery ? `${item.battery}%` : 'N/A'}</td>
                                    <td className="py-4 px-4 whitespace-nowrap text-sm"><StatusBadge status={item.signal} /></td>
                                    <td className="py-4 px-4 whitespace-nowrap text-sm text-muted-foreground">{item.nextMaintenance}</td>
                                    <td className="py-4 px-4 whitespace-nowrap text-sm text-muted-foreground">{item.inspector}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

interface InfoCardProps {
    value: string;
    label: string;
    sublabel: string;
    color: 'blue' | 'green' | 'red' | 'orange';
}

const InfoCard: React.FC<InfoCardProps> = ({ value, label, sublabel, color }) => {
    const colors = {
        blue: 'border-chart-5 text-chart-5',
        green: 'border-chart-2 text-chart-2',
        red: 'border-destructive text-destructive',
        orange: 'border-warning text-warning'
    }
    return (
        <Card className={`border-l-4 ${colors[color].split(' ')[0]}`}>
            <p className={`text-3xl font-bold ${colors[color].split(' ')[1]}`}>{value}</p>
            <p className="font-semibold text-card-foreground text-base">{label}</p>
            <p className="text-sm text-muted-foreground">{sublabel}</p>
        </Card>
    );
}