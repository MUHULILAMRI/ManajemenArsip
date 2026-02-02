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
    Calendar,
    ShieldCheck
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
import { motion } from 'framer-motion';

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

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const StatCard = ({ title, value, trend, icon: Icon, color }: any) => (
    <motion.div
        variants={item}
        className="glass-card p-6 rounded-3xl flex flex-col gap-3 relative overflow-hidden group hover:border-white/10 transition-colors"
    >
        <div className="flex justify-between items-start z-10">
            <p className="text-slate-400 text-sm font-medium">{title}</p>
            <div className={`p-2.5 rounded-xl bg-${color === 'primary' ? 'blue' : color}-500/10 text-${color === 'primary' ? 'blue' : color}-500 ring-1 ring-${color === 'primary' ? 'blue' : color}-500/20`}>
                <Icon size={20} className={color === 'primary' ? 'text-primary' : `text-${color}-500`} />
            </div>
        </div>
        <div className="mt-2 z-10">
            <h3 className="text-white text-3xl font-black tracking-tight">{value}</h3>
            <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/10">
                    <TrendingUp size={10} className="text-emerald-500" />
                    <span className="text-emerald-500 text-[10px] font-black">{trend}</span>
                </div>
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">vs last 30 days</span>
            </div>
        </div>

        {/* Decorative Background Icon */}
        <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 ease-out">
            <Icon size={140} />
        </div>

        {/* Glossy Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
);

interface DashboardProps {
    userRole?: 'admin' | 'user' | null;
    onNavigate?: (page: string) => void;
    currentTab?: string;
}

export const Dashboard = ({ userRole, onNavigate, currentTab }: DashboardProps) => {
    return (
        <div className="flex min-h-screen bg-background-dark text-white font-sans selection:bg-primary/30">
            <Sidebar userRole={userRole} onNavigate={onNavigate} activeTab={currentTab} />
            <main className="ml-64 flex-1 p-8">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={container}
                >
                    {/* Header */}
                    <header className="flex justify-between items-end mb-10">
                        <motion.div variants={item}>
                            <h2 className="text-3xl font-black tracking-tight text-white mb-1">Executive Dashboard</h2>
                            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                <Calendar size={14} className="text-primary" />
                                <span>Real-time analytics for <span className="text-slate-300">February 1, 2026</span></span>
                            </div>
                        </motion.div>
                        <motion.div variants={item} className="flex gap-3">
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-background-cardish border border-border-dark text-slate-300 rounded-xl hover:bg-white/5 hover:text-white transition-all text-sm font-bold shadow-lg">
                                <Download size={16} />
                                <span>Export Report</span>
                            </button>
                            <div className="h-11 w-11 rounded-xl bg-primary flex items-center justify-center cursor-pointer hover:bg-primary-hover hover:scale-105 transition-all shadow-lg shadow-primary/20">
                                <MoreVertical size={20} className="text-white" />
                            </div>
                        </motion.div>
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
                        <motion.div variants={item} className="lg:col-span-2 glass-card p-8 rounded-3xl border border-white/5 relative">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h4 className="font-bold text-lg text-white">System Growth</h4>
                                    <p className="text-slate-500 text-xs mt-1">Upload volume across all departments</p>
                                </div>
                                <div className="flex bg-background-dark/50 p-1 rounded-lg border border-white/5">
                                    <span className="px-4 py-1.5 bg-primary text-white text-[10px] font-bold rounded-md shadow-md">Weekly</span>
                                    <span className="px-4 py-1.5 text-slate-400 text-[10px] font-bold rounded-md cursor-pointer hover:text-white transition-colors">Monthly</span>
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
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#64748b"
                                            fontSize={11}
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: '#64748b' }}
                                            dy={10}
                                        />
                                        <YAxis
                                            stroke="#64748b"
                                            fontSize={11}
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: '#64748b' }}
                                            dx={-10}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#18212f',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '12px',
                                                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                                            }}
                                            itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                            cursor={{ stroke: '#137fec', strokeWidth: 1, strokeDasharray: '4 4' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="uploads"
                                            stroke="#137fec"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorUploads)"
                                            activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2, fill: '#137fec' }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Type Distribution */}
                        <motion.div variants={item} className="glass-card p-8 rounded-3xl border border-white/5 flex flex-col relative">
                            <h4 className="font-bold text-lg mb-2 text-white">Storage Distribution</h4>
                            <p className="text-slate-500 text-xs mb-6">File types by storage usage</p>

                            <div className="h-[200px] w-full flex-1 relative">
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
                                            stroke="none"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#18212f',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '12px'
                                            }}
                                            itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                {/* Center Text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-3xl font-black text-white">84%</span>
                                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Used</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {pieData.map((item) => (
                                    <div key={item.name} className="flex flex-col gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <div className="size-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: item.color, color: item.color }} />
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.name}</span>
                                        </div>
                                        <span className="text-sm font-black text-white ml-4">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Alerts Table */}
                    <motion.div variants={item} className="glass-card rounded-3xl overflow-hidden border border-white/5">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="bg-rose-500/10 text-rose-500 p-2.5 rounded-xl animate-pulse-slow">
                                    <AlertCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white">Critical System Alerts</h4>
                                    <p className="text-slate-500 text-xs">Recent security and performance events</p>
                                </div>
                            </div>
                            <button className="text-primary text-[11px] font-black uppercase tracking-[1px] hover:text-primary-hover hover:underline transition-all">View Intelligence Logs</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#111a22]/50 text-slate-500 text-[10px] font-black uppercase tracking-[2px]">
                                    <tr>
                                        <th className="px-6 py-5">Status</th>
                                        <th className="px-6 py-5">Alert Source</th>
                                        <th className="px-6 py-5">Log Message</th>
                                        <th className="px-6 py-5">Timestamp</th>
                                        <th className="px-6 py-5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[
                                        { status: 'CRITICAL', source: 'Storage Node #4', msg: 'Capacity reached 98.2%. Auto-archiving paused.', time: '12 mins ago', icon: AlertCircle, color: 'rose' },
                                        { status: 'WARNING', source: 'Auth Engine', msg: 'Multiple unauthorized login attempts from IP: 192.168.1.104', time: '45 mins ago', icon: AlertCircle, color: 'amber' },
                                        { status: 'SUCCESS', source: 'Backup Worker', msg: 'Scheduled weekly system backup completed successfully.', time: '3 hours ago', icon: CheckCircle2, color: 'emerald' },
                                    ].map((alert, i) => (
                                        <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-default">
                                            <td className="px-6 py-5 font-mono">
                                                <span className={`px-2.5 py-1.5 rounded-lg text-[10px] font-black tracking-wider bg-${alert.color}-500/10 text-${alert.color}-500 border border-${alert.color}-500/20`}>
                                                    {alert.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 font-bold text-sm text-slate-200">{alert.source}</td>
                                            <td className="px-6 py-5 text-slate-400 text-sm">{alert.msg}</td>
                                            <td className="px-6 py-5 text-slate-500 text-xs font-bold font-mono">{alert.time}</td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
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
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
};

// Simplified export
export default Dashboard;
