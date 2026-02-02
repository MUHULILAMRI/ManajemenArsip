import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'framer-motion';
import { History, FileText, User, ShieldAlert, Download, Trash2, LogIn, Filter, Calendar, Search, ArrowDownCircle } from 'lucide-react';

interface AuditProps {
    userRole?: 'admin' | 'user' | null;
    onNavigate?: (page: string) => void;
    currentTab?: string;
}

const auditLogs = [
    { id: 1, action: 'File Deleted', target: 'Project_Alpha_Specs.pdf', user: 'Sarah Chen', role: 'Manager', time: '10:42 AM', date: 'Today', type: 'danger', icon: Trash2 },
    { id: 2, action: 'File Accessed', target: 'Employee_Contract_JDOE.docx', user: 'Mike Ross', role: 'HR Officer', time: '09:15 AM', date: 'Today', type: 'info', icon: FileText },
    { id: 3, action: 'System Login', target: 'Admin Console', user: 'Alex Rivera', role: 'SysAdmin', time: '08:50 AM', date: 'Today', type: 'warning', icon: LogIn },
    { id: 4, action: 'Bulk Export', target: 'Q3_Financials.zip', user: 'Jessica Pearson', role: 'Director', time: '04:30 PM', date: 'Yesterday', type: 'success', icon: Download },
    { id: 5, action: 'Security Alert', target: 'Failed Login Attempt (IP: 192.168.1.45)', user: 'Unknown', role: 'N/A', time: '02:15 AM', date: 'Yesterday', type: 'critical', icon: ShieldAlert },
    { id: 6, action: 'File Uploaded', target: 'New_Policy_Draft_v2.pdf', user: 'Sarah Chen', role: 'Manager', time: '11:20 AM', date: 'Oct 24', type: 'info', icon: ArrowDownCircle },
];

export const Audit = ({ userRole, onNavigate, currentTab }: AuditProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="flex min-h-screen bg-background-dark text-white font-sans selection:bg-primary/30">
            <Sidebar userRole={userRole} onNavigate={onNavigate} activeTab={currentTab} />
            <main className="ml-64 flex-1 p-8 flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-6xl mx-auto w-full"
                >
                    <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h2 className="text-3xl font-black text-white flex items-center gap-3">
                                <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                                    <History className="text-primary size-6" />
                                </div>
                                Audit Timeline
                            </h2>
                            <p className="text-slate-500 mt-2 ml-14">Comprehensive immutable log of all system activities.</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold text-slate-300 transition-colors">
                                <Download size={14} />
                                <span>Export CSV</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold text-slate-300 transition-colors">
                                <Calendar size={14} />
                                <span>Date Range</span>
                            </button>
                        </div>
                    </header>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Total Events', val: '24.5k', change: '+12%', color: 'text-white' },
                            { label: 'File Operations', val: '12.2k', change: '+5%', color: 'text-blue-400' },
                            { label: 'Security Alerts', val: '14', change: '-2%', color: 'text-rose-500' },
                            { label: 'Active Users', val: '842', change: '+8%', color: 'text-emerald-500' },
                        ].map((stat, i) => (
                            <div key={i} className="glass-card p-5 rounded-2xl border border-white/5">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                                <div className="flex items-end gap-2">
                                    <h4 className={`text-2xl font-black ${stat.color}`}>{stat.val}</h4>
                                    <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{stat.change}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search by user, action, or filename..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#0b1219] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                        <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                            <Filter size={20} />
                        </button>
                    </div>

                    {/* Timeline */}
                    <div className="glass-card rounded-3xl border border-white/5 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/[0.02] text-slate-500 text-[10px] font-black uppercase tracking-[2px] border-b border-white/5">
                                    <tr>
                                        <th className="px-6 py-4 w-48">Timestamp</th>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Action</th>
                                        <th className="px-6 py-4">Target Resource</th>
                                        <th className="px-6 py-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {auditLogs.map((log) => (
                                        <motion.tr
                                            key={log.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-white/[0.02] transition-colors group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white">{log.time}</span>
                                                    <span className="text-xs text-slate-500">{log.date}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 text-xs font-bold border border-white/5">
                                                        {log.user.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-200">{log.user}</p>
                                                        <p className="text-[10px] text-slate-500">{log.role}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <log.icon size={16} className={`
                                                        ${log.type === 'danger' || log.type === 'critical' ? 'text-rose-500' :
                                                            log.type === 'warning' ? 'text-amber-500' :
                                                                log.type === 'success' ? 'text-emerald-500' : 'text-blue-500'}
                                                    `} />
                                                    <span className="text-sm text-slate-300 font-medium">{log.action}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-xs text-slate-400 bg-black/20 px-2 py-1 rounded border border-white/5">{log.target}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {log.type === 'critical' ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-wider">
                                                        <ShieldAlert size={12} /> ALERTS
                                                    </span>
                                                ) : (
                                                    <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-wider">
                                                        Logged
                                                    </span>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-white/5 flex justify-center">
                            <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Load More Events</button>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};
