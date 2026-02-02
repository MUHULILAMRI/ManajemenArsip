import React from 'react';
import {
    TrendingUp,
    Users,
    FileText,
    AlertCircle,
    MoreVertical,
    Eye,
    CheckCircle2,
    Download,
    Calendar
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const data = [
    { name: 'Mon', uploads: 400 },
    { name: 'Tue', uploads: 300 },
    { name: 'Wed', uploads: 600 },
    { name: 'Thu', uploads: 800 },
    { name: 'Fri', uploads: 500 },
    { name: 'Sat', uploads: 900 },
    { name: 'Sun', uploads: 1100 },
];

const pieData = [
    { name: 'PDF', value: 45, color: '#137fec' },
    { name: 'Images', value: 25, color: '#10b981' },
    { name: 'Video', value: 20, color: '#f59e0b' },
    { name: 'Others', value: 10, color: '#6366f1' },
];

const StatCard = ({ title, value, trend, icon: Icon, color }: any) => (
    <div className="bg-background-cardish border border-border-dark p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden group">
        <div className="flex justify-between items-start z-10">
            <p className="text-slate-400 text-sm font-medium">{title}</p>
            <div className={`p-2 rounded-lg bg-${color}/10 text-${color}`}>
                <Icon size={20} className={color === 'primary' ? 'text-primary' : `text-${color}-500`} />
            </div>
        </div>
        <div className="mt-2 z-10">
            <h3 className="text-white text-3xl font-black">{value}</h3>
            <div className="flex items-center gap-1 mt-1">
                <TrendingUp size={12} className="text-emerald-500" />
                <span className="text-emerald-500 text-xs font-bold">{trend}</span>
                <span className="text-slate-500 text-[10px] ml-1">last 30 days</span>
            </div>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
            <Icon size={120} />
        </div>
    </div>
);

export const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-background-dark text-white font-sans">
            <Sidebar />
            <main className="ml-64 flex-1 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight">Executive Dashboard</h2>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                            <Calendar size={14} />
                            <span>Real-time analytical data for February 1, 2026</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-background-cardish border border-border-dark text-slate-300 rounded-xl hover:bg-sidebar-hover transition-all text-sm font-bold">
                            <Download size={16} />
                            <span>Export Report</span>
                        </button>
                        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                            <MoreVertical size={20} />
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Documents" value="1.2M+" trend="+12.4%" icon={FileText} color="primary" />
                    <StatCard title="Active Users" value="842" trend="+5.2%" icon={Users} color="emerald" />
                    <StatCard title="Security Score" value="98%" trend="+0.5%" icon={ShieldCheck} color="amber" />
                    <StatCard title="Sync Failure" value="0.04%" trend="-1.2%" icon={AlertCircle} color="rose" />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Main Growth Chart */}
                    <div className="lg:col-span-2 bg-background-cardish border border-border-dark p-6 rounded-3xl">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h4 className="font-bold text-lg">System Growth</h4>
                                <p className="text-slate-500 text-xs">Upload volume across all departments</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full">Weekly</span>
                                <span className="px-3 py-1 bg-sidebar-active text-slate-400 text-[10px] font-bold rounded-full cursor-pointer hover:bg-sidebar-hover">Monthly</span>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#137fec" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#137fec" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#233648" vertical={false} />
                                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1a2632', border: '1px solid #233648', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="uploads" stroke="#137fec" strokeWidth={4} fillOpacity={1} fill="url(#colorUploads)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Type Distribution */}
                    <div className="bg-background-cardish border border-border-dark p-6 rounded-3xl flex flex-col">
                        <h4 className="font-bold text-lg mb-6">Storage Distribution</h4>
                        <div className="h-[200px] w-full flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            {pieData.map((item) => (
                                <div key={item.name} className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-black text-white ml-4">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Alerts Table */}
                <div className="bg-background-cardish border border-border-dark rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-border-dark flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-rose-500/10 text-rose-500 p-2 rounded-xl">
                                <AlertCircle size={20} />
                            </div>
                            <h4 className="font-bold text-lg">Critical System Alerts</h4>
                        </div>
                        <button className="text-primary text-sm font-bold hover:underline">View Intelligence Logs</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#111a22] text-slate-500 text-[10px] font-black uppercase tracking-[2px]">
                                <tr>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Alert Source</th>
                                    <th className="px-6 py-4">Log Message</th>
                                    <th className="px-6 py-4">Timestamp</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark">
                                {[
                                    { status: 'CRITICAL', source: 'Storage Node #4', msg: 'Capacity reached 98.2%. Auto-archiving paused.', time: '12 mins ago', icon: AlertCircle, color: 'rose' },
                                    { status: 'WARNING', source: 'Auth Engine', msg: 'Multiple unauthorized login attempts from IP: 192.168.1.104', time: '45 mins ago', icon: AlertCircle, color: 'amber' },
                                    { status: 'SUCCESS', source: 'Backup Worker', msg: 'Scheduled weekly system backup completed successfully.', time: '3 hours ago', icon: CheckCircle2, color: 'emerald' },
                                ].map((alert, i) => (
                                    <tr key={i} className="hover:bg-sidebar-hover transition-colors group">
                                        <td className="px-6 py-6 font-mono">
                                            <span className={`px-2 py-1 rounded-lg text-[10px] font-black bg-${alert.color}-500/10 text-${alert.color}-500`}>
                                                {alert.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 font-bold text-sm">{alert.source}</td>
                                        <td className="px-6 py-6 text-slate-400 text-sm">{alert.msg}</td>
                                        <td className="px-6 py-6 text-slate-500 text-xs">{alert.time}</td>
                                        <td className="px-6 py-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="p-2 hover:bg-emerald-500/10 rounded-lg text-slate-400 hover:text-emerald-500 transition-colors">
                                                    <CheckCircle2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Simplified export for the unified App component later
export default Dashboard;
