
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Card } from '../components/ui/Card';
import { SubNav } from '../components/ui/SubNav';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from 'recharts';
import { getElectricityDatabase, getElectricityOverviewData, getElectricityTypes, getAnalysisByType } from '../data/electricity';
import { DualRangeSlider } from '../components/ui/DualRangeSlider';

type ElectricitySystemSubPage = 'Overview' | 'Analysis by Type' | 'Database';

const chartColors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))', 'hsl(var(--chart-6))'];

// #region Icons
const PowerIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const CostIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0 10v1m0-11a2 2 0 00-2 2v10a2 2 0 002 2h.01a2 2 0 002-2V8a2 2 0 00-2-2h-.01z" /></svg>;
const MetersIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
const ConsumerIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>
);
const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);
const ICONS: {[key: string]: React.FC<{className?:string}>} = {
    power: PowerIcon,
    cost: CostIcon,
    meters: MetersIcon,
    consumer: ConsumerIcon,
}
// #endregion

export const ElectricitySystem: React.FC = () => {
    const [activeSubPage, setActiveSubPage] = useState<ElectricitySystemSubPage>('Analysis by Type');

    const renderContent = () => {
        switch (activeSubPage) {
            case 'Overview': return <Overview />;
            case 'Analysis by Type': return <AnalysisByType />;
            case 'Database': return <Database />;
            default: return <AnalysisByType />;
        }
    };

    return (
        <div className="space-y-6">
            <SubNav
                items={['Overview', 'Analysis by Type', 'Database']}
                activeItem={activeSubPage}
                onItemClick={(page) => setActiveSubPage(page as ElectricitySystemSubPage)}
            />
            {renderContent()}
        </div>
    );
}


const Overview: React.FC = () => {
    const availableMonths = useMemo(() => allMonthColumns, []);
    const [monthRangeIndices, setMonthRangeIndices] = useState<[number, number]>([0, availableMonths.length > 1 ? availableMonths.length - 1 : 0]);

    const selectedMonths = useMemo(() => {
        return availableMonths.slice(monthRangeIndices[0], monthRangeIndices[1] + 1);
    }, [monthRangeIndices, availableMonths]);

    const { totalConsumptionKwh, totalCost, meterCount, highestConsumer, monthlyTrendData, consumptionByTypeData } = getElectricityOverviewData(selectedMonths);

    const formattedPeriod = useMemo(() => {
        if (selectedMonths.length === 0) return 'No data available';
        if (selectedMonths.length === 1) return selectedMonths[0];
        return `${selectedMonths[0]} to ${selectedMonths[selectedMonths.length - 1]}`;
    }, [selectedMonths]);

    const handleResetRange = () => {
        if (availableMonths.length > 1) {
            setMonthRangeIndices([0, availableMonths.length - 1]);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">Period Range</p>
                            <p className="font-semibold text-lg text-primary">{formattedPeriod}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <button onClick={handleResetRange} className="bg-secondary text-secondary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-border disabled:opacity-50" disabled={availableMonths.length <= 1}>Reset Range</button>
                        </div>
                    </div>
                    <div className="w-full px-4 pt-2">
                        <DualRangeSlider
                            min={0}
                            max={availableMonths.length > 1 ? availableMonths.length - 1 : 0}
                            step={1}
                            value={monthRangeIndices}
                            onValueChange={(value) => setMonthRangeIndices(value as [number, number])}
                            label={(index) => availableMonths[index]}
                            labelPosition="top"
                            disabled={availableMonths.length <= 1}
                        />
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <InfoCard icon="power" title="TOTAL CONSUMPTION" value={(totalConsumptionKwh / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })} unit="MWh" subValue={`${totalConsumptionKwh.toLocaleString(undefined, { maximumFractionDigits: 0 })} kWh`} color="yellow" />
                <InfoCard icon="cost" title="TOTAL COST" value={totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} unit="OMR" subValue="Based on total consumption" color="green" />
                <InfoCard icon="meters" title="TOTAL METERS" value={meterCount.toString()} unit="meters" subValue="All meter types" color="blue" />
                <InfoCard icon="consumer" title="HIGHEST CONSUMER" value={highestConsumer?.['Name'] as string || 'N/A'} unit="" subValue={`${(highestConsumer?.totalConsumption || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })} kWh / ${(highestConsumer?.totalCost || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })} OMR`} color="red" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-3">
                    <h4 className="text-lg font-semibold mb-4">Monthly Consumption Trend (kWh)</h4>
                    <div className="h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorKwh" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))"/>
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `${Number(value) / 1000}k`} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
                                <Area type="monotone" dataKey="kWh" stroke="hsl(var(--warning))" fillOpacity={1} fill="url(#colorKwh)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card className="lg:col-span-2">
                    <h4 className="text-lg font-semibold mb-4">Consumption by Type</h4>
                     <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={consumptionByTypeData} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                                <XAxis type="number" stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `${Number(value) / 1000}k`}/>
                                <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}}/>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
                                <Bar dataKey="value" name="kWh">
                                     {consumptionByTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const AnalysisByType: React.FC = () => {
    const allTypes = useMemo(() => getElectricityTypes(), []);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const analysisData = useMemo(() => getAnalysisByType(selectedTypes), [selectedTypes]);
    const { database, totalConsumptionKwh, totalCost, meterCount, highestConsumer, monthlyTrendData } = analysisData;

    const totalPages = Math.ceil((database.length || 0) / rowsPerPage);
    const paginatedData = useMemo(() => {
        return database.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    }, [database, currentPage, rowsPerPage]);

    const handleTypeToggle = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleSelectAll = () => setSelectedTypes(allTypes);
    const handleDeselectAll = () => setSelectedTypes([]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTypes]);

    return (
        <div className="space-y-6">
            <Card>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h3 className="text-xl font-bold">Analysis by Type</h3>
                        <p className="text-muted-foreground mt-1">Select one or more meter types to filter the data below.</p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div ref={dropdownRef} className="relative w-full sm:w-64">
                            <button
                                onClick={() => setDropdownOpen(!isDropdownOpen)}
                                className="w-full bg-input border border-border p-2 rounded-lg flex justify-between items-center text-left"
                            >
                                <span className="truncate">{selectedTypes.length > 0 ? `${selectedTypes.length} Types Selected` : 'Select Meter Types...'}</span>
                                <ChevronDownIcon className={`transform transition-transform flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute top-full mt-1 w-full bg-card border border-border rounded-lg shadow-lg z-20 max-h-72 overflow-y-auto">
                                    <div className="p-2 border-b border-border flex justify-between">
                                        <button onClick={handleSelectAll} className="text-sm font-semibold text-primary hover:underline">Select All</button>
                                        <button onClick={handleDeselectAll} className="text-sm font-semibold text-primary hover:underline">Deselect All</button>
                                    </div>
                                    <ul>
                                        {allTypes.map(type => (
                                            <li key={type}>
                                                <label className="flex items-center space-x-2 w-full cursor-pointer p-2 hover:bg-accent">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-4 w-4 text-primary rounded border-border focus:ring-primary bg-background"
                                                        checked={selectedTypes.includes(type)}
                                                        onChange={() => handleTypeToggle(type)}
                                                    />
                                                    <span className="text-sm text-foreground">{type}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => setSelectedTypes([])}
                            className="bg-secondary text-secondary-foreground font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
                        >
                            <FilterIcon className="h-4 w-4"/> Reset
                        </button>
                    </div>
                </div>
            </Card>

            {database.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <InfoCard icon="power" title="TOTAL CONSUMPTION" value={(totalConsumptionKwh / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })} unit="MWh" subValue={`${totalConsumptionKwh.toLocaleString(undefined, { maximumFractionDigits: 0 })} kWh`} color="yellow" />
                        <InfoCard icon="cost" title="TOTAL COST" value={totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} unit="OMR" subValue="Based on total consumption" color="green" />
                        <InfoCard icon="meters" title="TOTAL METERS" value={meterCount.toString()} unit="meters" subValue={`Filtered from ${getElectricityDatabase().length}`} color="blue" />
                        <InfoCard icon="consumer" title="HIGHEST CONSUMER" value={highestConsumer?.['Name'] as string} unit="" subValue={`${(highestConsumer?.totalConsumption || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })} kWh`} color="red" />
                    </div>

                    <Card>
                        <h4 className="text-lg font-semibold mb-4">Monthly Consumption Trend (kWh) for Selected Types</h4>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                                    <defs><linearGradient id="colorKwhFiltered" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.8}/><stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0}/></linearGradient></defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))"/>
                                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `${Number(value) / 1000}k`} />
                                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
                                    <Area type="monotone" dataKey="kWh" stroke="hsl(var(--warning))" fillOpacity={1} fill="url(#colorKwhFiltered)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card>
                         <h2 className="text-xl font-bold mb-4">Filtered Meter Database ({database.length} meters)</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-secondary">
                                    <tr>
                                        <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Name</th>
                                        <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Type</th>
                                        <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Account #</th>
                                        <th className="p-3 text-right text-xs font-semibold uppercase text-muted-foreground">Total Consumption (kWh)</th>
                                        <th className="p-3 text-right text-xs font-semibold uppercase text-muted-foreground">Total Cost (OMR)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {paginatedData.map((row, index) => (
                                        <tr key={index} className="hover:bg-accent">
                                            <td className="p-3 text-sm font-medium whitespace-nowrap">{row['Name'] as string}</td>
                                            <td className="p-3 text-sm text-muted-foreground whitespace-nowrap">{row['Type'] as string}</td>
                                            <td className="p-3 text-sm text-muted-foreground whitespace-nowrap">{row['Meter Account No.'] as string}</td>
                                            <td className="p-3 text-sm text-muted-foreground text-right whitespace-nowrap">{row.totalConsumption.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                                            <td className="p-3 text-sm font-semibold text-chart-2 text-right whitespace-nowrap">{row.totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
                            <div className="flex space-x-2">
                                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="bg-secondary text-secondary-foreground py-2 px-4 rounded-lg disabled:opacity-50">Previous</button>
                                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="bg-primary text-primary-foreground py-2 px-4 rounded-lg disabled:opacity-50">Next</button>
                            </div>
                        </div>
                    </Card>
                </>
            ) : (
                <Card>
                    <p className="text-center text-muted-foreground py-10">No data available for the selected types. Please select at least one meter type to see the analysis.</p>
                </Card>
            )}
        </div>
    );
}

const Database: React.FC = () => {
    const data = getElectricityDatabase();
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <Card>
            <div className="mb-4">
                 <h2 className="text-xl font-bold">Electricity Meter Database</h2>
                <p className="text-muted-foreground">All Meters ({data.length})</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-secondary">
                        <tr>
                            <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Name</th>
                            <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Type</th>
                            <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Account #</th>
                            <th className="p-3 text-right text-xs font-semibold uppercase text-muted-foreground">Total Consumption (kWh)</th>
                            <th className="p-3 text-right text-xs font-semibold uppercase text-muted-foreground">Total Cost (OMR)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {paginatedData.map((row, index) => (
                            <tr key={index} className="hover:bg-accent">
                                <td className="p-3 text-sm font-medium whitespace-nowrap">{row['Name'] as string}</td>
                                <td className="p-3 text-sm text-muted-foreground whitespace-nowrap">{row['Type'] as string}</td>
                                <td className="p-3 text-sm text-muted-foreground whitespace-nowrap">{row['Meter Account No.'] as string}</td>
                                <td className="p-3 text-sm text-muted-foreground text-right whitespace-nowrap">{row.totalConsumption.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                                <td className="p-3 text-sm font-semibold text-chart-2 text-right whitespace-nowrap">{row.totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <div className="flex justify-between items-center pt-4">
                <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
                <div className="flex space-x-2">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="bg-secondary text-secondary-foreground py-2 px-4 rounded-lg disabled:opacity-50">Previous</button>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="bg-primary text-primary-foreground py-2 px-4 rounded-lg disabled:opacity-50">Next</button>
                </div>
            </div>
        </Card>
    )
}

interface InfoCardProps {
    icon: string;
    title: string;
    value: string;
    unit: string;
    subValue: string;
    color: 'green' | 'blue' | 'red' | 'yellow';
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value, unit, subValue, color }) => {
    const IconComponent = ICONS[icon];
    const colors = {
        yellow: 'bg-warning/20 text-warning',
        green: 'bg-chart-2/20 text-chart-2',
        blue: 'bg-chart-5/20 text-chart-5',
        red: 'bg-destructive/20 text-destructive',
    }
    return (
        <Card className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${colors[color]}`}>
                <IconComponent className="w-6 h-6"/>
            </div>
            <div>
                <p className="text-base text-muted-foreground font-semibold">{title}</p>
                <p className="text-2xl font-bold">{value} <span className="text-lg text-muted-foreground">{unit}</span></p>
                <p className="text-sm text-muted-foreground">{subValue}</p>
            </div>
        </Card>
    );
}

const allMonthColumns = Object.keys(getElectricityDatabase()[0]).filter(key => /^[A-Za-z]{3}-\d{2}$/.test(key));
