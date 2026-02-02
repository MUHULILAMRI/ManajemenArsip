import React from 'react';
import {
    Database,
    HardDrive,
    Cloud,
    Server,
    FileVideo,
    FileImage,
    FileText,
    Archive,
    Trash2,
    AlertTriangle,
    RefreshCw,
    PieChart as PieChartIcon,
    DownloadCloud,
    Settings2,
    History as HistoryIcon
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'framer-motion';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

const storageData = [
    { name: 'Video Assets', value: 450, color: '#f59e0b', icon: FileVideo }, // Amber
    { name: 'High-Res Images', value: 320, color: '#10b981', icon: FileImage }, // Emerald
    { name: 'Documents', value: 150, color: '#137fec', icon: FileText }, // Blue
    { name: 'Archives/Backups', value: 80, color: '#6366f1', icon: Archive }, // Indigo
];

const usageHistory = [
    { name: 'Jan', used: 6.2 },
    { name: 'Feb', used: 6.8 },
    { name: 'Mar', used: 7.1 },
    { name: 'Apr', used: 7.5 },
    { name: 'May', used: 8.2 },
    { name: 'Jun', used: 8.4 },
];

const largeFiles = [
    { name: 'Project_Titan_Raw_01.mp4', size: '2.4 GB', date: '2 days ago', type: 'Video' },
    { name: 'Global_Conf_Recording.mkv', size: '1.8 GB', date: '1 week ago', type: 'Video' },
    { name: 'Marketing_Assets_Q3.zip', size: '950 MB', date: '3 weeks ago', type: 'Archive' },
    { name: 'Backup_DB_2023_Final.sql', size: '850 MB', date: '1 month ago', type: 'Database' },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

interface StorageManagementProps {
    userRole?: 'admin' | 'user' | null;
    onNavigate?: (page: string) => void;
    currentTab?: string;
}

export const StorageManagement = ({ userRole, onNavigate, currentTab }: StorageManagementProps) => {
    return (
        <div className="flex min-h-screen bg-background-dark text-white font-sans selection:bg-primary/30">
            <Sidebar userRole={userRole} onNavigate={onNavigate} activeTab={currentTab} />
            <main className="ml-64 flex-1 p-8 flex flex-col">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={container}
                    className="flex-1 flex flex-col max-w-7xl mx-auto w-full"
                >
                    {/* Header */}
                    <header className="flex justify-between items-center mb-10">
                        <motion.div variants={item}>
                            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3 text-white">
                                <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(19,127,236,0.15)]">
                                    <Database className="text-primary size-6" />
                                </div>
                                Storage Analytics
                            </h2>
                            <p className="text-slate-500 text-sm mt-1 ml-14">Capacity planning and usage optimization.</p>
                        </motion.div>
                        <motion.div variants={item} className="flex gap-3">
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-background-cardish border border-border-dark text-slate-300 rounded-xl hover:bg-white/5 hover:text-white transition-all text-sm font-bold shadow-lg">
                                <RefreshCw size={16} />
                                <span>Scan Now</span>
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all text-sm font-bold shadow-lg shadow-primary/20">
                                <Cloud size={18} />
                                <span>Upgrade Plan</span>
                            </button>
                        </motion.div>
                    </header>

                    {/* Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <motion.div variants={item} className="glass-card p-6 rounded-3xl relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Capacity</p>
                                    <h3 className="text-3xl font-black text-white mt-1">10.0 TB</h3>
                                </div>
                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                    <Server size={20} />
                                </div>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5 mb-2">
                                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                            <p className="text-[10px] text-slate-500">Enterprise Tier Plan</p>
                        </motion.div>

                        <motion.div variants={item} className="glass-card p-6 rounded-3xl relative overflow-hidden ring-1 ring-primary/50 shadow-[0_0_30px_rgba(19,127,236,0.1)]">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Database size={100} />
                            </div>
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                    <p className="text-primary text-xs font-bold uppercase tracking-wider">Used Space</p>
                                    <h3 className="text-3xl font-black text-white mt-1">8.4 TB</h3>
                                </div>
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <HardDrive size={20} />
                                </div>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-2 mb-2 relative z-10">
                                <div className="bg-primary h-2 rounded-full shadow-[0_0_10px_rgba(19,127,236,0.5)]" style={{ width: '84%' }}></div>
                            </div>
                            <p className="text-[10px] text-primary font-bold relative z-10">84% Utilized - Warning Threshold</p>
                        </motion.div>

                        <motion.div variants={item} className="glass-card p-6 rounded-3xl relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-emerald-500 text-xs font-bold uppercase tracking-wider">Available</p>
                                    <h3 className="text-3xl font-black text-white mt-1">1.6 TB</h3>
                                </div>
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                    <Cloud size={20} />
                                </div>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5 mb-2">
                                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '16%' }}></div>
                            </div>
                            <p className="text-[10px] text-slate-500">Sufficient for ~45 days</p>
                        </motion.div>
                    </div>

                    {/* Main Charts & Breakdown */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Breakdown Chart */}
                        <motion.div variants={item} className="glass-card p-8 rounded-3xl border border-white/5 lg:col-span-1 flex flex-col">
                            <h4 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
                                <PieChartIcon size={18} className="text-slate-400" />
                                Storage Breakdown
                            </h4>
                            <div className="h-[250px] w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={storageData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {storageData.map((entry, index) => (
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
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-black text-white">1000</span>
                                    <span className="text-[10px] text-slate-500 uppercase font-bold">Files Analyzed</span>
                                </div>
                            </div>

                            <div className="space-y-4 mt-4">
                                {storageData.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${item.color}20` }}>
                                                <item.icon size={14} style={{ color: item.color }} />
                                            </div>
                                            <span className="text-sm font-medium text-slate-300">{item.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-bold text-white block">{item.value} GB</span>
                                            <span className="text-[10px] text-slate-500 block">{Math.round((item.value / 1000) * 100)}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Usage Trend */}
                        <motion.div variants={item} className="glass-card p-8 rounded-3xl border border-white/5 lg:col-span-2">
                            <div className="flex justify-between items-center mb-8">
                                <h4 className="font-bold text-lg text-white">Usage Growth Trend</h4>
                                <div className="flex gap-2">
                                    <select className="bg-black/20 border border-white/10 text-xs text-slate-300 rounded-lg px-3 py-1.5 outline-none focus:border-primary/50">
                                        <option>Last 6 Months</option>
                                        <option>Last Year</option>
                                    </select>
                                </div>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={usageHistory} barSize={40}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#64748b"
                                            fontSize={12}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <YAxis
                                            stroke="#64748b"
                                            fontSize={12}
                                            axisLine={false}
                                            tickLine={false}
                                            tickFormatter={(value) => `${value}TB`}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                            contentStyle={{
                                                backgroundColor: '#18212f',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '12px',
                                                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                                            }}
                                            itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                        />
                                        <Bar dataKey="used" fill="#137fec" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>

                    {/* Cleanup Suggestions */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <motion.div variants={item} className="glass-card p-6 rounded-3xl border border-white/5">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="font-bold text-white flex items-center gap-2">
                                    <AlertTriangle size={18} className="text-rose-500" />
                                    Large Files Detected
                                </h4>
                                <button className="text-[10px] text-primary font-black uppercase tracking-wider hover:underline">View All</button>
                            </div>
                            <div className="space-y-3">
                                {largeFiles.map((file, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                                                <FileVideo size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-200 truncate max-w-[200px]">{file.name}</p>
                                                <p className="text-[10px] text-slate-500">{file.date} • {file.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-mono font-bold text-slate-300">{file.size}</span>
                                            <button className="p-2 hover:bg-rose-500/20 rounded-lg text-slate-500 hover:text-rose-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={item} className="p-6 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center bg-white/[0.01]">
                            <div className="size-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 animate-pulse">
                                <DownloadCloud size={24} />
                            </div>
                            <h4 className="font-bold text-white text-lg mb-2">Optimization Opportunity</h4>
                            <p className="text-sm text-slate-400 max-w-sm mb-6">
                                We found roughly <span className="text-white font-bold">14.2 GB</span> of duplicate files and cached assets that can be safely archived or removed to free up space.
                            </p>
                            <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-105">
                                Start Optimization Wizard
                            </button>
                        </motion.div>
                    </div>

                    {/* Admin Management Section */}
                    {userRole === 'admin' && (
                        <motion.section variants={item} className="mt-8">
                            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                                    <Settings2 size={20} />
                                </div>
                                Admin Storage Control
                            </h3>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Department Quotas */}
                                <div className="glass-card p-6 rounded-3xl border border-white/5">
                                    <h4 className="font-bold text-white mb-6">Department Quotas</h4>
                                    <div className="space-y-6">
                                        {[
                                            { dept: 'Finance & Accounting', used: 65, limit: 100 },
                                            { dept: 'Marketing Assets', used: 85, limit: 100 },
                                            { dept: 'Engineering', used: 40, limit: 150 },
                                        ].map((dept, i) => (
                                            <div key={i} className="space-y-2">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-sm font-bold text-slate-300">{dept.dept}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-slate-500 font-mono">{dept.used}TB / {dept.limit}TB</span>
                                                        <button className="text-primary hover:text-white transition-colors">
                                                            <Settings2 size={12} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden relative group cursor-pointer">
                                                    <div
                                                        className={`h-full rounded-full ${dept.used > 80 ? 'bg-rose-500' : 'bg-primary'}`}
                                                        style={{ width: `${(dept.used / dept.limit) * 100}%` }}
                                                    />
                                                    {/* Hover Interaction to simulate setting limit */}
                                                    <div className="absolute top-0 right-0 h-full w-1 bg-white opacity-0 group-hover:opacity-50" style={{ left: '80%' }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-6 py-3 rounded-xl border border-dashed border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
                                        + Add Allocation Policy
                                    </button>
                                </div>

                                {/* Retention & Maintenance */}
                                <div className="glass-card p-6 rounded-3xl border border-white/5 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-bold text-white mb-6">Retention Policy Controls</h4>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                                                        <HistoryIcon size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">Auto-Archive Logs</p>
                                                        <p className="text-[10px] text-slate-500">Move logs &gt; 90 days to Cold Storage</p>
                                                    </div>
                                                </div>
                                                <div className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                                                        <Trash2 size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">Recycle Bin Auto-Purge</p>
                                                        <p className="text-[10px] text-slate-500">Delete bin items after 30 days</p>
                                                    </div>
                                                </div>
                                                <div className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-white/5">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs font-bold text-slate-400">System Maintenance Mode</span>
                                            <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded">HEALTHY</span>
                                        </div>
                                        <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                                            <Settings2 size={16} />
                                            <span>Access Advanced Config</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    )}

                </motion.div>
            </main>
        </div>
    );
};
