
import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { SubNav } from '../components/ui/SubNav';
import { Gauge } from '../components/ui/Gauge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { calculateWaterMetrics, getMonthColumns, allMonthColumns, getConsumptionByType, waterData } from '../data/water';
import { GoogleGenAI } from '@google/genai';
import { DualRangeSlider } from '../components/ui/DualRangeSlider';

type WaterSystemSubPage = 'Overview' | 'Water Loss Analysis' | 'Zone Analysis' | 'Consumption by Type' | 'Main Database';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>
);

// #region Icons
const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);
const DropletIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C5 11.1 4 13 4 15a7 7 0 0 0 7 7z"/></svg>
);
const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
);
const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
// #endregion

// #region Month Navigator Component
const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6"/></svg>
);

const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>
);

interface MonthNavigatorProps {
    availableMonths: string[];
    selectedMonth: string;
    onMonthChange: (month: string) => void;
    className?: string;
}

const MonthNavigator: React.FC<MonthNavigatorProps> = ({ availableMonths, selectedMonth, onMonthChange, className = '' }) => {
    const currentIndex = availableMonths.indexOf(selectedMonth);

    const handlePrevious = () => {
        if (currentIndex > 0) {
            onMonthChange(availableMonths[currentIndex - 1]);
        }
    };

    const handleNext = () => {
        if (currentIndex < availableMonths.length - 1) {
            onMonthChange(availableMonths[currentIndex + 1]);
        }
    };

    return (
        <div className={`flex items-center justify-center gap-2 bg-input p-1 rounded-lg ${className}`}>
            <button onClick={handlePrevious} disabled={currentIndex === 0} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring">
                <ChevronLeftIcon className="h-5 w-5 text-muted-foreground" />
            </button>
            <span className="font-semibold text-base text-foreground w-24 text-center select-none">{selectedMonth}</span>
            <button onClick={handleNext} disabled={currentIndex >= availableMonths.length - 1} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring">
                <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
            </button>
        </div>
    );
};
// #endregion

export const WaterSystem: React.FC = () => {
    const [activeSubPage, setActiveSubPage] = useState<WaterSystemSubPage>('Overview');
    
    const renderContent = () => {
        switch(activeSubPage) {
            case 'Overview': return <Overview/>;
            case 'Water Loss Analysis': return <WaterLossAnalysis/>;
            case 'Zone Analysis': return <ZoneAnalysis/>;
            case 'Consumption by Type': return <ConsumptionByType/>;
            case 'Main Database': return <MainDatabase/>;
            default: return <Overview/>;
        }
    }

    return (
        <div className="space-y-6">
            <SubNav 
                items={['Overview', 'Water Loss Analysis', 'Zone Analysis', 'Consumption by Type', 'Main Database']}
                activeItem={activeSubPage}
                onItemClick={(page) => setActiveSubPage(page as WaterSystemSubPage)}
            />
            {renderContent()}
        </div>
    );
};

// #region Sub-pages

const monthNameToMonthInput = (monthName: string): string => {
    if (!monthName) return '';
    const [monthStr, yearStr] = monthName.split('-');
    if (!monthStr || !yearStr) return '';
    const year = 2000 + parseInt(yearStr, 10);
    const monthMap: { [key: string]: string } = { 'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12' };
    return `${year}-${monthMap[monthStr]}`;
};

const monthInputToDateRange = (start: string, end: string) => {
    if (!start || !end) return { start: '', end: '' };
    const [startYear, startMonth] = start.split('-').map(Number);
    const [endYear, endMonth] = end.split('-').map(Number);

    const first = new Date(Date.UTC(startYear, startMonth - 1, 1));
    const last = new Date(Date.UTC(endYear, endMonth, 0));

    return {
        start: first.toISOString().split('T')[0],
        end: last.toISOString().split('T')[0]
    };
}

const Overview: React.FC = () => {
    const availableMonths = useMemo(() => allMonthColumns, []);
    const [monthRangeIndices, setMonthRangeIndices] = useState<[number, number]>([0, availableMonths.length > 1 ? availableMonths.length - 1 : 0]);

    const { startMonth, endMonth } = useMemo(() => ({
        startMonth: availableMonths[monthRangeIndices[0]],
        endMonth: availableMonths[monthRangeIndices[1]]
    }), [monthRangeIndices, availableMonths]);

    const startMonthForInput = useMemo(() => monthNameToMonthInput(startMonth), [startMonth]);
    const endMonthForInput = useMemo(() => monthNameToMonthInput(endMonth), [endMonth]);
    
    const [dateRange, setDateRange] = useState(() => monthInputToDateRange(startMonthForInput, endMonthForInput));
    
    useEffect(() => {
        if(startMonthForInput && endMonthForInput) {
            setDateRange(monthInputToDateRange(startMonthForInput, endMonthForInput));
        }
    }, [startMonthForInput, endMonthForInput]);
    
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    
    const {data, loading, error, formattedPeriod} = useWaterMetrics(dateRange.start, dateRange.end);
    
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
                            <p className="font-semibold text-lg text-primary">{loading ? 'Calculating...' : formattedPeriod}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <button onClick={handleResetRange} className="bg-secondary text-secondary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-border disabled:opacity-50" disabled={availableMonths.length <= 1}>Reset Range</button>
                            <button onClick={() => setIsAiModalOpen(true)} className="bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 disabled:bg-muted" disabled={!data || loading}>AI Analysis</button>
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

            {loading && <Card><LoadingSpinner/></Card>}
            {error && <Card><p className="text-destructive text-center py-4">{error}</p></Card>}

            {data && !loading && !error && (
                <>
                    <h3 className="text-lg font-semibold text-muted-foreground">4-Level Water Distribution Totals for <span className="text-primary">{formattedPeriod}</span></h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <DistributionCard icon="a1" title="MAIN SOURCE (L1)" value={data.totals.A1} unit="m³" desc="Main Bulk (NAMA)" color="blue" />
                        <DistributionCard icon="a2" title="PRIMARY DIST. (L2+DC)" value={data.totals.A2} unit="m³" desc="Zone Bulks + Direct" color="green" />
                        <DistributionCard icon="a3" title="BUILDING LEVEL (A3)" value={data.totals.A3_Individual} unit="m³" desc="L3 Villas + L4 + DC" color="indigo" />
                        <DistributionCard icon="a4" title="END USERS (L4)" value={data.totals.L4} unit="m³" desc="Apartments + End" color="purple" />
                    </div>

                    <h3 className="text-lg font-semibold text-muted-foreground">Multi-Stage Water Loss Totals for <span className="text-primary">{formattedPeriod}</span></h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <LossCard title="STAGE 1 LOSS (A1-A2)" value={data.totals.Stage1_Loss} unit="m³" desc={`Main Distribution: ${data.totals.stage1LossPercentage.toFixed(1)}%`} />
                        <LossCard title="STAGE 2 LOSS (A2-A3I)" value={data.totals.Stage2_Loss_Individual} unit="m³" desc={`Zone Networks: ${data.totals.stage2LossPercentage.toFixed(1)}%`} />
                        <LossCard title="STAGE 3 LOSS (L3B-L4)" value={data.totals.Stage3_Loss} unit="m³" desc={`Building Networks: ${data.totals.stage3LossPercentage.toFixed(1)}%`} />
                        <LossCard title="TOTAL SYSTEM LOSS" value={data.totals.Total_Loss} unit="m³" desc={`Overall: ${data.totals.totalLossPercentage.toFixed(1)}% | Efficiency: ${data.totals.efficiency.toFixed(1)}%`} isTotal={true}/>
                    </div>

                    <Card>
                        <h4 className="text-lg font-semibold mb-4">Monthly Consumption Trend</h4>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data.monthly} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="gradL1" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="gradL2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="gradL3" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
                                    <Legend />
                                    <Area type="monotone" dataKey="L1 - Main Source" stroke="hsl(var(--chart-4))" fill="url(#gradL1)" strokeWidth={2} />
                                    <Area type="monotone" dataKey="L2 - Zone Bulk Meters" stroke="hsl(var(--chart-2))" fill="url(#gradL2)" strokeWidth={2} />
                                    <Area type="monotone" dataKey="L3 - Building/Villa Meters" stroke="hsl(var(--chart-1))" fill="url(#gradL3)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card>
                        <h4 className="text-lg font-semibold mb-4">Monthly Water Loss Trend</h4>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data.monthly} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="gradLoss1" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="gradLoss2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="gradLoss3" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
                                    <Legend />
                                    <Area type="monotone" dataKey="Stage 1 Loss" stackId="1" stroke="hsl(var(--destructive))" fill="url(#gradLoss1)"/>
                                    <Area type="monotone" dataKey="Stage 2 Loss" stackId="1" stroke="hsl(var(--chart-3))" fill="url(#gradLoss2)"/>
                                    <Area type="monotone" dataKey="Stage 3 Loss" stackId="1" stroke="hsl(var(--warning))" fill="url(#gradLoss3)"/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                    
                    <AiAnalysisModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} data={data} dateRange={dateRange}/>
                </>
            )}
        </div>
    );
}

const WaterLossAnalysis: React.FC = () => {
    const {data, loading, error} = useWaterMetrics('2025-01-01', '2025-05-31');

    if (loading) return <Card><LoadingSpinner/></Card>;
    if (error) return <Card><p className="text-destructive text-center py-4">{error}</p></Card>;
    if (!data) return null;
    
    const { A1, A2, A3_Individual, Stage1_Loss, Stage2_Loss_Individual, Stage3_Loss, efficiency, L3_Building_Bulks } = data.totals;

    return (
        <Card>
             <div className="mb-6">
                <h3 className="text-xl font-bold">4-Level Water System Balance</h3>
                <p className="text-muted-foreground">Hierarchical flow analysis for May-25</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h4 className="text-lg font-semibold mb-2">Monthly Water Distribution Trend</h4>
                    <p className="text-sm text-muted-foreground mb-4">Consumption at each level of the hierarchy</p>
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.monthly} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="gradDist1" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="gradDist2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="gradDist3" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))"/>
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))"/>
                                <YAxis stroke="hsl(var(--muted-foreground))"/>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
                                <Legend verticalAlign="bottom" height={36}/>
                                <Area type="monotone" dataKey="L1 - Main Source" stroke="hsl(var(--chart-4))" fill="url(#gradDist1)"/>
                                <Area type="monotone" dataKey="L2 - Zone Bulk Meters" stroke="hsl(var(--chart-2))" fill="url(#gradDist2)"/>
                                <Area type="monotone" dataKey="L3 - Building/Villa Meters" stroke="hsl(var(--chart-1))" fill="url(#gradDist3)"/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                 <div className="grid grid-cols-2 gap-6">
                    <Gauge value={Stage1_Loss} max={A1} label="Stage 1 Loss" unit="m³" percentage={(A1 > 0 ? (Stage1_Loss/A1)*100 : 0)} color="red" />
                    <Gauge value={Stage2_Loss_Individual} max={A2} label="Stage 2 Loss" unit="m³" percentage={(A2 > 0 ? (Stage2_Loss_Individual/A2)*100 : 0)} color="red" />
                    <Gauge value={Stage3_Loss} max={L3_Building_Bulks} label="Stage 3 Loss" unit="m³" percentage={data.totals.stage3LossPercentage} color="yellow" />
                    <Gauge value={A3_Individual} max={A1} label="System Efficiency" unit="m³" percentage={efficiency} color="green" />
                </div>
            </div>
        </Card>
    );
}
const ZoneAnalysis: React.FC = () => {
    // ---- STATE ----
    const [selectedMonth, setSelectedMonth] = useState('May-25');
    const [selectedZone, setSelectedZone] = useState('Zone_03_(A)');
    const [tablePage, setTablePage] = useState(1);
    const tableRowsPerPage = 10;
    const [rangeSelection, setRangeSelection] = useState(false);

    // ---- DATA DERIVATION ----
    const zones = useMemo(() => {
        const zoneSet = new Set<string>();
        waterData.forEach(row => {
            if (row['Zone'] && row['Zone'] !== 'N/A' && row['Zone'] !== 'Direct Connection' && row['Zone'] !== 'Main Bulk') {
                zoneSet.add(row['Zone'] as string);
            }
        });
        return Array.from(zoneSet);
    }, []);

    const months = useMemo(() => allMonthColumns, []);

    const zoneAnalysisData = useMemo(() => {
        if (!selectedZone || !selectedMonth) return null;

        const zoneMeters = waterData.filter(r => r['Zone'] === selectedZone);

        // --- Calculations for cards and gauges ---
        const zoneBulkMeter = zoneMeters.find(r => r['Label'] === 'L2');
        const zoneBulkConsumption = zoneBulkMeter ? Number(zoneBulkMeter[selectedMonth] || 0) : 0;
        
        const individualMeters = zoneMeters.filter(r => (r['Label'] === 'L3' && (r['Type'] as string).includes('Villa')) || r['Label'] === 'L4');
        const individualMetersConsumption = individualMeters.reduce((sum, r) => sum + Number(r[selectedMonth] || 0), 0);

        const waterLoss = zoneBulkConsumption - individualMetersConsumption;
        
        const zoneEfficiency = zoneBulkConsumption > 0 ? (individualMetersConsumption / zoneBulkConsumption) * 100 : 0;

        const buildingCount = new Set(zoneMeters.filter(r => r['Type'] === 'D_Building_Bulk').map(r => r['Meter Label'])).size;
        const villaCount = new Set(zoneMeters.filter(r => r['Type'] === 'Residential (Villa)').map(r => r['Meter Label'])).size;
        
        // --- Calculation for trend chart ---
        const trendMonths = allMonthColumns.slice(0, allMonthColumns.indexOf(selectedMonth) + 1);
        
        const consumptionTrend = trendMonths.map(month => {
            const bulk = zoneBulkMeter ? Number(zoneBulkMeter[month] || 0) : 0;
            const individual = zoneMeters
                .filter(r => (r['Label'] === 'L3' && (r['Type'] as string).includes('Villa')) || r['Label'] === 'L4')
                .reduce((sum, r) => sum + Number(r[month] || 0), 0);
            const loss = bulk - individual;

            return {
                name: month,
                'Individual Total': individual > 0 ? individual : 0,
                'Water Loss': loss > 0 ? loss : 0,
                'Zone Bulk': bulk,
            };
        });
        
        // --- Data for table ---
        const tableData = zoneMeters.map(meter => {
            const total = trendMonths.reduce((sum, month) => sum + Number(meter[month] || 0), 0);
            return { ...meter, total };
        }).sort((a,b) => (a['Label'] as string).localeCompare(b['Label'] as string) || (a['Type'] as string).localeCompare(b['Type'] as string));

        const paginatedTableData = tableData.slice((tablePage - 1) * tableRowsPerPage, tablePage * tableRowsPerPage);
        
        return {
            zoneBulkConsumption,
            individualMetersConsumption,
            waterLoss,
            zoneEfficiency,
            buildingCount,
            villaCount,
            consumptionTrend,
            table: {
                data: paginatedTableData,
                totalRows: tableData.length,
                totalPages: Math.ceil(tableData.length / tableRowsPerPage)
            },
            allMetersInZone: tableData
        };
    }, [selectedZone, selectedMonth, tablePage]);
    
    if (!zoneAnalysisData) {
        return <Card><p>Please select a zone and month.</p></Card>;
    }

    // ---- RENDER ----
    return (
        <div className="space-y-6">
            <Card>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 flex-wrap items-end">
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Select Month</label>
                            <MonthNavigator 
                                availableMonths={months}
                                selectedMonth={selectedMonth}
                                onMonthChange={setSelectedMonth}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Filter by Zone</label>
                            <select value={selectedZone} onChange={e => setSelectedZone(e.target.value)} className="w-full mt-1 p-2 border rounded-md bg-input text-foreground">
                                {zones.map(z => <option key={z} value={z}>{z.replace(/_/g, ' ').replace(/\(A\)/, ' (A)').replace(/\(B\)/, ' (B)')}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                         <div className="flex items-center space-x-2">
                            <label htmlFor="range-selection" className="text-sm font-medium text-muted-foreground">Range Selection</label>
                            <Switch checked={rangeSelection} onChange={setRangeSelection} />
                        </div>
                        <button className="bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg flex items-center gap-2"><FilterIcon className="h-4 w-4"/> Reset Filters</button>
                    </div>
                </div>
            </Card>

            <div className="text-center">
                <h2 className="text-2xl font-bold">Zone {selectedZone.replace('Zone_', '').replace(/_/g, ' ').replace(/\(A\)/, ' (A)')} Analysis for {selectedMonth}</h2>
                <p className="text-muted-foreground">Zone with building bulk meters and individual villas</p>
            </div>

            <Card>
                <h3 className="text-xl font-semibold mb-6">Water Consumption Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <DonutMetric value={zoneAnalysisData.zoneBulkConsumption} title="Zone Bulk Meter" subtitle={`Zone ${selectedZone.replace('Zone_', '').replace(/_/g, ' ').replace(/\(A\)/, ' (A)')} Total`} percentage={100} color="hsl(var(--chart-4))" />
                    <DonutMetric value={zoneAnalysisData.individualMetersConsumption} title="Individual Meters Sum" subtitle="Total Consumption" percentage={zoneAnalysisData.zoneEfficiency} color="hsl(var(--chart-2))" faded={true} />
                    <DonutMetric value={zoneAnalysisData.waterLoss} title="Water Loss" subtitle="Distribution Loss" percentage={100 - zoneAnalysisData.zoneEfficiency} color="hsl(var(--destructive))" />
                </div>
            </Card>

            <Card>
                <h3 className="text-xl font-semibold">Zone Consumption Trend</h3>
                <p className="text-muted-foreground mb-4">Monthly comparison of zone bulk meter vs individual meters total</p>
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={zoneAnalysisData.consumptionTrend} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorIndividual" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                            <YAxis stroke="hsl(var(--muted-foreground))" />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
                            <Legend />
                            <Area type="monotone" dataKey="Individual Total" stackId="1" stroke="hsl(var(--chart-2))" fill="url(#colorIndividual)" />
                            <Area type="monotone" dataKey="Water Loss" stackId="1" stroke="hsl(var(--destructive))" fill="url(#colorLoss)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <SummaryStatCard 
                    icon={DropletIcon} 
                    title="ZONE BULK METER" 
                    value={`${zoneAnalysisData.zoneBulkConsumption.toLocaleString()} m³`} 
                    subtitle={`Zone ${selectedZone.replace('Zone_', '').replace(/_/g, ' ')}`}
                    color="blue"
                 />
                 <SummaryStatCard 
                    icon={FileTextIcon} 
                    title="INDIVIDUAL METERS TOTAL" 
                    value={`${zoneAnalysisData.individualMetersConsumption.toLocaleString()} m³`} 
                    subtitle={`${zoneAnalysisData.buildingCount} buildings, ${zoneAnalysisData.villaCount} villas`}
                    color="green"
                 />
                 <SummaryStatCard 
                    icon={TrendingUpIcon} 
                    title="WATER LOSS/VARIANCE" 
                    value={`${zoneAnalysisData.waterLoss.toLocaleString()} m³`} 
                    subtitle={`${(zoneAnalysisData.waterLoss / (zoneAnalysisData.zoneBulkConsumption || 1) * 100).toFixed(1)}% variance`}
                    color="red"
                 />
                 <SummaryStatCard 
                    icon={CheckCircleIcon} 
                    title="ZONE EFFICIENCY" 
                    value={`${zoneAnalysisData.zoneEfficiency.toFixed(1)}%`} 
                    subtitle="Meter coverage"
                    color="yellow"
                 />
            </div>
            
            <Card>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <div>
                        <h3 className="text-xl font-semibold">Individual Meters - Zone {selectedZone.replace('Zone_', '').replace(/_/g, ' ')}</h3>
                        <p className="text-muted-foreground">All individual meters in this zone with monthly consumption data</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="text-left bg-secondary">
                             <tr>
                                {['Account #', 'Type', ...zoneAnalysisData.consumptionTrend.map(m=>m.name), 'Total', 'Status'].map(h => 
                                    <th key={h} className="p-3 text-xs font-semibold uppercase text-muted-foreground whitespace-nowrap">{h.replace('-25','')}</th>)}
                             </tr>
                        </thead>
                        <tbody>
                             {zoneAnalysisData.table.data.map((row, index) => (
                                <tr key={row['Acct #']} className="border-b border-border last:border-0 hover:bg-secondary">
                                    <td className="p-3 text-sm font-medium text-blue-600 dark:text-blue-400">{row['Acct #']}</td>
                                    <td className="p-3 text-sm text-muted-foreground whitespace-nowrap">{row['Type']}</td>
                                    {zoneAnalysisData.consumptionTrend.map(m => <td key={m.name} className="p-3 text-sm text-right text-muted-foreground">{Number(row[m.name] || 0).toLocaleString()}</td>)}
                                    <td className="p-3 text-sm text-right font-bold text-foreground">{row.total.toLocaleString()}</td>
                                    <td className="p-3 text-sm"><StatusTag label={row['Label'] as string} /></td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="border-t-2 border-primary">
                            <tr className="font-bold">
                                <td colSpan={2} className="p-3 text-right">Totals</td>
                                {zoneAnalysisData.consumptionTrend.map(month => (
                                    <td key={month.name} className="p-3 text-right">
                                        {(month['Zone Bulk'] || 0).toLocaleString()}
                                    </td>
                                ))}
                                <td className="p-3 text-right">
                                    {zoneAnalysisData.allMetersInZone.find(m => m['Label'] === 'L2')?.total.toLocaleString() || 0}
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="flex justify-between items-center pt-4 flex-wrap gap-4">
                    <p className="text-sm text-muted-foreground">
                        Showing {Math.min((tablePage - 1) * tableRowsPerPage + 1, zoneAnalysisData.table.totalRows)} to {Math.min(tablePage * tableRowsPerPage, zoneAnalysisData.table.totalRows)} of {zoneAnalysisData.table.totalRows} meters
                    </p>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setTablePage(p => p - 1)} disabled={tablePage === 1} className="p-2 disabled:opacity-50 bg-secondary rounded-md hover:bg-border">Previous</button>
                        <button onClick={() => setTablePage(p => p + 1)} disabled={tablePage === zoneAnalysisData.table.totalPages} className="p-2 disabled:opacity-50 bg-secondary rounded-md hover:bg-border">Next</button>
                    </div>
                </div>
            </Card>

        </div>
    )
};


const ConsumptionByType: React.FC = () => {
    const analysisMonths = useMemo(() => ['Jan-25', 'Feb-25', 'Mar-25'], []);
    const { data, months } = useMemo(() => getConsumptionByType(analysisMonths), [analysisMonths]);

    const pieChartData = useMemo(() => {
        const totalConsumptionOfTypes = data.reduce((sum, item) => sum + item.total, 0);
        return data.map(item => ({
            name: item.name,
            value: item.total,
            percentage: totalConsumptionOfTypes > 0 ? (item.total / totalConsumptionOfTypes) * 100 : 0
        }));
    }, [data]);
    
    const COLORS: {[key:string]: string} = {
        'Commercial': 'hsl(var(--chart-1))',
        'Residential': 'hsl(var(--chart-2))',
        'Irrigation': 'hsl(var(--chart-4))',
        'Common': 'hsl(var(--chart-5))',
    };

    const latestMonthForTitle = "Mar 2025";

    const ExportIcon = (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    );

    return (
        <div className="space-y-6">
            <Card>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">Consumption by Type</h2>
                        <p className="text-muted-foreground">Analysis of water consumption based on usage type for {latestMonthForTitle}.</p>
                    </div>
                    <button className="bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
                        <ExportIcon className="h-4 w-4"/>
                        Export
                    </button>
                </div>
            </Card>

            <Card>
                <h3 className="font-semibold mb-2">Consumption by Type</h3>
                <p className="text-sm text-muted-foreground mb-4">Monthly and total consumption for each category.</p>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                {months.map(m => (
                                    <th key={m} className="py-3 px-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">{m.replace('-25', '-25 (M³)')}</th>
                                ))}
                                <th className="py-3 px-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total (M³)</th>
                                <th className="py-3 px-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">% of L1</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.name} className="border-b border-border last:border-b-0">
                                    <td className="py-3 px-4 text-sm font-medium text-foreground whitespace-nowrap">{row.name}</td>
                                    {months.map(m => (
                                        <td key={m} className="py-3 px-4 text-sm text-right text-muted-foreground">{Number(row[m] || 0).toLocaleString()}</td>
                                    ))}
                                    <td className="py-3 px-4 text-sm text-right font-bold text-foreground">{row.total.toLocaleString()}</td>
                                    <td className="py-3 px-4 text-sm text-right text-muted-foreground">{row['% OF L1']}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="flex flex-col">
                    <h4 className="font-semibold mb-2">Monthly Consumption by Type</h4>
                    <p className="text-sm text-muted-foreground mb-4">Total consumption for each category.</p>
                    <div className="flex-grow h-80">
                       <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))"/>
                                <XAxis type="number" stroke="hsl(var(--muted-foreground))" domain={[0, 'dataMax + 10000']} />
                                <YAxis dataKey="name" type="category" width={80} stroke="hsl(var(--muted-foreground))" axisLine={false} tickLine={false}/>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} cursor={{fill: 'hsl(var(--secondary))'}}/>
                                <Legend verticalAlign="bottom" wrapperStyle={{paddingTop: '20px'}} />
                                <Bar dataKey="total" name="Total Consumption" legendType="square">
                                    {data.map((entry) => (
                                        <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card className="flex flex-col">
                    <h4 className="font-semibold mb-2">Consumption Distribution</h4>
                    <p className="text-sm text-muted-foreground mb-4">Percentage of total consumption by type.</p>
                    <div className="flex-grow h-80">
                        <ResponsiveContainer width="100%" height="100%">
                             <PieChart>
                                <Pie 
                                    data={pieChartData} 
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="45%" 
                                    innerRadius="70%" 
                                    outerRadius="90%" 
                                    fill="#8884d8" 
                                    paddingAngle={5}
                                    labelLine={false}
                                >
                                    {pieChartData.map((entry) => (
                                        <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
                                <Legend 
                                    iconType="square"
                                    layout="horizontal"
                                    verticalAlign="bottom"
                                    align="center"
                                    wrapperStyle={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', bottom: 0, paddingLeft: "10px", paddingRight: "10px" }}
                                    formatter={(value, entry) => {
                                        const correspondingData = pieChartData.find(d => d.name === value);
                                        return <span className="text-foreground text-sm ml-2 mr-4">{value} {correspondingData?.percentage.toFixed(1)}%</span>
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
}

const MainDatabase: React.FC = () => {
    const meterCounts = waterData.reduce((acc, row) => {
        const level = row['Label'] as string;
        if(level.startsWith('L')) {
            acc[level] = Number(acc[level] || 0) + 1;
        }
        return acc;
    }, {} as {[key: string]: number});

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const totalPages = Math.ceil(waterData.length / rowsPerPage);
    const paginatedData = waterData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="space-y-6">
             <Card>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">Water System Main Database</h2>
                        <p className="text-muted-foreground">Complete meter inventory with consumption data for all months</p>
                    </div>
                    <button className="bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg">Export to CSV</button>
                </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <SummaryCard title="TOTAL METERS" value={waterData.length.toString()} subtext="All levels" color="blue"/>
                <SummaryCard title="L1 METERS" value={(meterCounts['L1'] || 0).toString()} subtext="Main source" color="indigo"/>
                <SummaryCard title="L2 METERS" value={(meterCounts['L2'] || 0).toString()} subtext="Zone bulk" color="yellow"/>
                <SummaryCard title="L3 METERS" value={(meterCounts['L3'] || 0).toString()} subtext="Buildings & Villas" color="green"/>
                <SummaryCard title="L4 METERS" value={(meterCounts['L4'] || 0).toString()} subtext="Apartments" color="purple"/>
            </div>

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                         <thead className="bg-secondary">
                            <tr>
                                {Object.keys(paginatedData[0]).slice(0, 6).map(key => <th key={key} className="p-2 text-left text-xs font-semibold uppercase text-muted-foreground">{key}</th>)}
                                <th className="p-2 text-right text-xs font-semibold uppercase text-muted-foreground">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {paginatedData.map((row, index) => {
                                const total = allMonthColumns.reduce((sum: number, month) => sum + (Number(row[month]) || 0), 0);
                                return (
                                    <tr key={index} className="hover:bg-secondary">
                                        {Object.values(row).slice(0, 6).map((val, i) => <td key={i} className="p-2 text-sm text-muted-foreground whitespace-nowrap">{val as any}</td>)}
                                        <td className="p-2 text-right text-sm font-semibold whitespace-nowrap">{total.toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center pt-4">
                    <span className="text-sm text-muted-foreground">Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, waterData.length)} of {waterData.length}</span>
                    <div className="flex space-x-2">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="bg-secondary text-secondary-foreground py-2 px-4 rounded-lg disabled:opacity-50">Previous</button>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className="bg-primary text-primary-foreground py-2 px-4 rounded-lg disabled:opacity-50">Next</button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

// #endregion

// #region Hooks and Components

const useWaterMetrics = (startDate: string, endDate: string) => {
    const [data, setData] = useState<ReturnType<typeof calculateWaterMetrics> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const monthColumns = useMemo(() => getMonthColumns(startDate, endDate), [startDate, endDate]);

    useEffect(() => {
        try {
            setLoading(true);
            if (monthColumns.length === 0 && (startDate || endDate)) {
                setData(null);
                setError("No data available for the selected date range.");
                return;
            }
            const metrics = calculateWaterMetrics(monthColumns);
            setData(metrics);
            setError(null);
        } catch (e: any) {
            setError('Failed to calculate water metrics: ' + e.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [monthColumns, startDate, endDate]);
    
    const formattedPeriod = useMemo(() => {
        if (!data || error) return 'Select a valid range';
        const months = monthColumns;
        if (months.length === 0) return 'No data available';
        if (months.length === 1) return months[0];
        return `${months[0]} to ${months[months.length - 1]}`;
    }, [data, monthColumns, error]);

    return { data, loading, error, formattedPeriod };
}

const AiAnalysisModal: React.FC<{ isOpen: boolean; onClose: () => void; data: any; dateRange: any; }> = ({ isOpen, onClose, data, dateRange }) => {
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [aiError, setAiError] = useState('');

    const handleAiAnalysis = async () => {
        if (!data) return;
        setAiLoading(true);
        setAiError('');
        setAiResponse('');

        const { totals } = data;
        const period = `${dateRange.start} to ${dateRange.end}`;
        
        const systemPrompt = `You are an expert analyst for a water distribution system. Your analysis should be concise, insightful, and easy to understand for a facility manager. Based on the following data for the period ${period}, provide a brief analysis covering: 1. Overall System Performance, 2. Key Findings, and 3. Recommendations.`;
        const dataSummary = `Data: A1(Source): ${totals.A1}m³, Stage 1 Loss: ${totals.Stage1_Loss}m³ (${totals.stage1LossPercentage.toFixed(1)}%), Stage 2 Loss: ${totals.Stage2_Loss_Individual}m³ (${totals.stage2LossPercentage.toFixed(1)}%), Total Loss: ${totals.Total_Loss}m³, Efficiency: ${totals.efficiency.toFixed(1)}%`;
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: dataSummary,
                config: { systemInstruction: systemPrompt }
            });
            setAiResponse(response.text);
        } catch (e: any) {
            setAiError(`Failed to get analysis. Error: ${e.message}`);
        } finally {
            setAiLoading(false);
        }
    };
    
    React.useEffect(() => {
        if(isOpen) {
            handleAiAnalysis();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" aria-modal="true" role="dialog">
            <Card className="w-full max-w-2xl !p-0">
                 <div className="flex justify-between items-center p-4 border-b border-border">
                    <h3 className="text-lg font-bold">AI Water System Analysis</h3>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">&times;</button>
                </div>
                <div className="p-6 min-h-[20rem]">
                    {aiLoading && <LoadingSpinner />}
                    {aiError && <p className="text-destructive">{aiError}</p>}
                    {aiResponse && <div className="prose dark:prose-invert max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\n/g, '<br />') }}></div>}
                </div>
                 <div className="p-4 border-t border-border text-right">
                    <button onClick={onClose} className="bg-secondary text-secondary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-border">Close</button>
                </div>
            </Card>
        </div>
    );
}

const ICONS: {[key:string]: React.FC<{className?:string}>} = {
    a1: ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V7.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 00-.75.75v3.75m0 0H3.375m0 0a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v7.5c0 .621-.504 1.125-1.125-1.125h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5m1.125 0a1.125 1.125 0 00-1.125 1.125v1.5m12-1.5a1.125 1.125 0 00-1.125 1.125v1.5a1.125 1.125 0 001.125 1.125h1.5a1.125 1.125 0 001.125-1.125v-7.5a1.125 1.125 0 00-1.125-1.125h-1.5a1.125 1.125 0 00-1.125 1.125v1.5m-3.75 0a1.125 1.125 0 00-1.125 1.125v1.5a1.125 1.125 0 001.125 1.125h1.5a1.125 1.125 0 001.125-1.125v-1.5a1.125 1.125 0 00-1.125-1.125h-1.5Z" /></svg>,
    a2: ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c1.356 0 2.673-.11 3.955-.322M12 21c-1.356 0-2.673-.11-3.955-.322m0 0a9.006 9.006 0 01-4.34-1.916M15.955 18.002a9.006 9.006 0 004.34-1.916m0 0a9.006 9.006 0 00-4.34-1.917m0 0a9.006 9.006 0 01-4.34 1.917m0 0a9.006 9.006 0 00-4.34 1.916m5.66-4.344a3 3 0 10-5.658 0 3 3 0 005.658 0z" /></svg>,
    a3: ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 11.25h6M9 15.75h6" /></svg>,
    a4: ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
    loss: ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>,
};

const DistributionCard: React.FC<{ icon: string; title: string; value: number; unit: string; desc: string; color: 'blue' | 'green' | 'indigo' | 'purple'; }> = ({ icon, title, value, unit, desc, color }) => {
    const colors = {
        blue: 'bg-chart-5/20 text-chart-5',
        green: 'bg-chart-2/20 text-chart-2',
        indigo: 'bg-primary/20 text-primary',
        purple: 'bg-chart-1/20 text-chart-1',
    };
    const IconComponent = ICONS[icon];
    return (
        <Card className="!p-0 overflow-hidden">
            <div className="p-5">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-base font-bold text-muted-foreground">{title}</p>
                        <p className="text-3xl font-bold mt-2">{value.toLocaleString()} <span className="text-xl">{unit}</span></p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors[color]}`}><IconComponent className="w-8 h-8"/></div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">{desc}</p>
            </div>
            <div className={`h-2 ${color === 'green' ? 'bg-chart-2' : color === 'blue' ? 'bg-chart-5' : color === 'purple' ? 'bg-chart-1' : 'bg-primary'}`}></div>
        </Card>
    );
}

const LossCard: React.FC<{ title: string; value: number; unit: string; desc: string; isTotal?:boolean }> = ({ title, value, unit, desc, isTotal=false }) => {
    const valueColor = value > 0 ? 'text-destructive' : 'text-accent';
    const iconColor = value > 0 ? 'bg-destructive/20 text-destructive' : 'bg-accent/20 text-accent';
    return (
        <Card className="flex flex-col">
            <div className="flex-1 space-y-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColor}`}>
                    <ICONS.loss className="w-6 h-6"/>
                </div>
                <p className="text-base font-semibold text-muted-foreground">{title}</p>
                <p className={`text-2xl font-bold ${isTotal ? 'text-destructive' : valueColor}`}>{value.toLocaleString()} <span className="text-lg">{unit}</span></p>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{desc}</p>
        </Card>
    );
}

const SummaryCard:React.FC<{title:string, value: string, subtext:string, color: 'blue'|'indigo'|'yellow'|'green'|'purple'}> = ({title, value, subtext, color}) => {
    const colors = {
        blue: 'text-chart-5',
        indigo: 'text-primary',
        yellow: 'text-warning',
        green: 'text-chart-2',
        purple: 'text-chart-1',
    }
    return (
        <Card className="text-center">
            <p className="font-semibold text-base text-muted-foreground">{title}</p>
            <p className={`text-4xl font-bold ${colors[color]}`}>{value}</p>
            <p className="text-sm text-muted-foreground">{subtext}</p>
        </Card>
    )
}

const Switch: React.FC<{checked: boolean; onChange: (checked: boolean) => void;}> = ({ checked, onChange }) => (
    <button
        type="button"
        className={`${checked ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
    >
        <span className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}/>
    </button>
)

const DonutMetric: React.FC<{value: number; title: string; subtitle: string; percentage: number; color: string; faded?: boolean;}> = ({ value, title, subtitle, percentage, color, faded = false }) => {
    const data = [ { name: 'value', value: percentage }, { name: 'empty', value: 100 - percentage }];
    const trackColor = 'hsl(var(--secondary))';
    const mainTextColor = 'hsl(var(--card-foreground))';
    const percentageColor = color;
    
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="relative w-40 h-40">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie 
                            data={data}
                            dataKey="value"
                            cx="50%" cy="50%"
                            innerRadius="80%"
                            outerRadius="100%"
                            startAngle={90}
                            endAngle={450}
                            stroke="none"
                        >
                            <Cell fill={color} />
                            <Cell fill={trackColor} />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold" style={{ color: mainTextColor }}>{value.toLocaleString()}</span>
                    <span className="text-lg text-muted-foreground">m³</span>
                </div>
            </div>
            <div className="mt-4">
                <p className="font-semibold text-lg" style={{ color: mainTextColor }}>{title}</p>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
                <p className={`text-2xl font-bold mt-1`} style={{ color: percentageColor }}>{percentage.toFixed(0)}%</p>
            </div>
        </div>
    );
}

const SummaryStatCard: React.FC<{icon: React.FC<any>, title: string, value: string, subtitle: string, color: 'blue' | 'green' | 'red' | 'yellow'}> = ({icon: Icon, title, value, subtitle, color}) => {
    const colors = {
        blue: 'bg-chart-5/20 text-chart-5',
        green: 'bg-chart-2/20 text-chart-2',
        red: 'bg-destructive/20 text-destructive',
        yellow: 'bg-warning/20 text-warning',
    }
    return (
        <Card className="flex items-start gap-4 p-4">
            <div className={`p-3 rounded-lg ${colors[color]}`}>
                <Icon className="w-6 h-6"/>
            </div>
            <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
        </Card>
    );
}

const StatusTag: React.FC<{label: string}> = ({label}) => {
    const styles: { [key: string]: string } = {
        'L2': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        'L3': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
        'L4': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    }
    const textMap: { [key: string]: string } = {
        'L2': 'L2 - Zone Bulk',
        'L3': 'L3 - Building',
        'L4': 'L4 - Apartment',
    }
    const style = styles[label as keyof typeof styles] || 'bg-gray-100 text-gray-800';
    const text = textMap[label as keyof typeof textMap] || label;
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${style}`}>{text}</span>
}

// #endregion