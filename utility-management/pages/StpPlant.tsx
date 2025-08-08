
import React from 'react';
import { Card } from '../components/ui/Card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const waterVolumeData = [
  { name: 'Jul 2024', sewage: 18000, tse: 15000 },
  { name: 'Aug 2024', sewage: 19000, tse: 16000 },
  { name: 'Sep 2024', sewage: 22000, tse: 19000 },
  { name: 'Oct 2024', sewage: 21000, tse: 18000 },
  { name: 'Nov 2024', sewage: 23000, tse: 20000 },
  { name: 'Dec 2024', sewage: 25000, tse: 22000 },
  { name: 'Jan 2025', sewage: 24000, tse: 21000 },
  { name: 'Feb 2025', sewage: 22000, tse: 19000 },
  { name: 'Mar 2025', sewage: 26000, tse: 23000 },
  { name: 'Apr 2025', sewage: 27000, tse: 24000 },
  { name: 'May 2025', sewage: 28000, tse: 25000 },
  { name: 'Jun 2025', sewage: 30000, tse: 27000 },
  { name: 'Jul 2025', sewage: 29000, tse: 26000 },
];

const financialsData = waterVolumeData.map(d => ({ name: d.name, income: Math.random() * 1000 + 1500, savings: Math.random() * 800 + 1200 }));
const tankerTripsData = waterVolumeData.map(d => ({ name: d.name, trips: Math.floor(Math.random() * 200 + 200) }));

const dailyLogData = [
    { date: '01/07/2025', inlet: 498, tse: 260, tankers: 8, income: 56.50, savings: 343.20, total: 579.20 },
    { date: '02/07/2025', inlet: 544, tse: 528, tankers: 13, income: 58.50, savings: 696.96, total: 755.46 },
    { date: '04/07/2025', inlet: 621, tse: 576, tankers: 12, income: 54.00, savings: 760.32, total: 814.32 },
    { date: '05/07/2025', inlet: 520, tse: 530, tankers: 15, income: 67.50, savings: 699.60, total: 936.06 },
    { date: '06/07/2025', inlet: 520, tse: 530, tankers: 9, income: 40.50, savings: 699.60, total: 740.10 },
];

interface SummaryCardProps {
    value: string;
    label: string;
    sublabel: string;
    unit: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ value, label, sublabel, unit }) => {
    return (
        <Card className="p-6">
            <p className="text-3xl font-bold text-foreground">{value} <span className="text-xl text-muted-foreground">{unit}</span></p>
            <p className="font-semibold text-card-foreground text-base mt-2">{label}</p>
            <p className="text-sm text-muted-foreground">{sublabel}</p>
        </Card>
    );
};

export const StpPlant: React.FC = () => {
    return (
        <div className="space-y-6">
            <Card>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="font-semibold text-muted-foreground">Select Period Range</p>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-2">
                             <input type="month" defaultValue="2024-07" className="p-2 border rounded-lg w-full sm:w-auto bg-input" />
                             <span className="text-center sm:text-left">to</span>
                             <input type="month" defaultValue="2025-07" className="p-2 border rounded-lg w-full sm:w-auto bg-input" />
                        </div>
                    </div>
                    <button className="bg-secondary text-secondary-foreground font-semibold py-2 px-4 rounded-lg self-center sm:self-end">Reset Range</button>
                </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <SummaryCard value="211,075" unit="m³" label="INLET SEWAGE" sublabel="For July 2024 - July 2025" />
                <SummaryCard value="201,906" unit="m³" label="TSE FOR IRRIGATION" sublabel="Recycled water" />
                <SummaryCard value="3,375" unit="trips" label="TANKER TRIPS" sublabel="For July 2024 - July 2025" />
            </div>

            <Card>
                <h3 className="text-lg font-semibold mb-4">Monthly Water Volume (m³)</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={waterVolumeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="gradSewage" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="gradTse" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                            <YAxis stroke="hsl(var(--muted-foreground))" />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
                            <Legend />
                            <Area type="monotone" dataKey="sewage" stroke="hsl(var(--primary))" fill="url(#gradSewage)" name="Inlet Sewage" />
                            <Area type="monotone" dataKey="tse" stroke="hsl(var(--chart-2))" fill="url(#gradTse)" name="TSE for Irrigation" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-lg font-semibold mb-4">Monthly Financials (OMR)</h3>
                    <div className="h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={financialsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                <YAxis stroke="hsl(var(--muted-foreground))" />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
                                <Legend />
                                <Bar dataKey="income" stackId="a" fill="hsl(var(--primary))" name="Income" />
                                <Bar dataKey="savings" stackId="a" fill="hsl(var(--chart-2))" name="Savings" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold mb-4">Monthly Tanker Trips</h3>
                    <div className="h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={tankerTripsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                <YAxis stroke="hsl(var(--muted-foreground))" />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
                                <Legend />
                                <Bar dataKey="trips" fill="hsl(var(--accent))" name="Tanker Trips" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
            
            <Card>
                <h3 className="text-lg font-semibold mb-4">Daily Log - July 2025</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-secondary">
                            <tr>
                                <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Date</th>
                                <th className="p-3 text-right text-xs font-semibold uppercase text-muted-foreground">Inlet (m³)</th>
                                <th className="p-3 text-right text-xs font-semibold uppercase text-muted-foreground">TSE (m³)</th>
                                <th className="p-3 text-right text-xs font-semibold uppercase text-muted-foreground">Tankers (Trips)</th>
                                <th className="p-3 text-right text-xs font-semibold uppercase text-muted-foreground">Income (OMR)</th>
                                <th className="p-3 text-right text-xs font-semibold uppercase text-muted-foreground">Savings (OMR)</th>
                                <th className="p-3 text-right text-xs font-semibold uppercase text-muted-foreground">Total (OMR)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {dailyLogData.map((row, index) => (
                                <tr key={index} className="hover:bg-secondary">
                                    <td className="p-3 text-sm text-foreground">{row.date}</td>
                                    <td className="p-3 text-sm text-right text-muted-foreground">{row.inlet.toLocaleString()}</td>
                                    <td className="p-3 text-sm text-right text-muted-foreground">{row.tse.toLocaleString()}</td>
                                    <td className="p-3 text-sm text-right text-muted-foreground">{row.tankers}</td>
                                    <td className="p-3 text-sm text-right text-chart-2">{row.income.toFixed(2)}</td>
                                    <td className="p-3 text-sm text-right text-chart-2">{row.savings.toFixed(2)}</td>
                                    <td className="p-3 text-sm text-right font-bold text-foreground">{row.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
