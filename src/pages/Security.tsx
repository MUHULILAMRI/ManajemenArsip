import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Lock, Globe, Key, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

interface SecurityProps {
    userRole?: 'admin' | 'user' | null;
    onNavigate?: (page: string) => void;
    currentTab?: string;
}

const threatData = [
    { time: '00:00', threats: 12 },
    { time: '04:00', threats: 8 },
    { time: '08:00', threats: 25 },
    { time: '12:00', threats: 45 },
    { time: '16:00', threats: 32 },
    { time: '20:00', threats: 18 },
    { time: '23:59', threats: 15 },
];

export const Security = ({ userRole, onNavigate, currentTab }: SecurityProps) => {
    return (
        <div className="flex min-h-screen bg-background-dark text-white font-sans selection:bg-primary/30">
            <Sidebar userRole={userRole} onNavigate={onNavigate} activeTab={currentTab} />
            <main className="ml-64 flex-1 p-8 flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-6xl mx-auto w-full"
                >
                    <header className="mb-10 flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-black text-white flex items-center gap-3">
                                <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                                    <ShieldCheck className="text-primary size-6" />
                                </div>
                                Security Engine
                            </h2>
                            <p className="text-slate-500 mt-2 ml-14">Active threat monitoring and encryption standards.</p>
                        </div>
                        <div className="flex items-center gap-3 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <span className="text-sm font-bold text-emerald-500 uppercase tracking-wide">System Secure</span>
                        </div>
                    </header>

                    {/* Threat Map / Graph */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-white/5 relative overflow-hidden">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <Globe size={18} className="text-blue-400" />
                                    Global Threat Traffic
                                </h3>
                                <select className="bg-black/20 border border-white/10 text-xs text-slate-300 rounded-lg px-3 py-1.5 outline-none">
                                    <option>Live (Real-time)</option>
                                    <option>Last 24 Hours</option>
                                </select>
                            </div>
                            <div className="h-[280px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={threatData}>
                                        <defs>
                                            <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                        <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#18212f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Area type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorThreats)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="lg:col-span-1 space-y-6">
                            {/* AES Status */}
                            <div className="glass-card p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Lock className="size-8 text-primary mb-4" />
                                <h4 className="text-2xl font-black text-white mb-1">AES-256</h4>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">Encryption Standard</p>
                                <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-lg w-fit">
                                    <CheckCircle2 size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Active & Valid</span>
                                </div>
                            </div>

                            {/* Key Rotation */}
                            <div className="glass-card p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                                <Key className="size-8 text-amber-500 mb-4" />
                                <h4 className="text-lg font-bold text-white mb-1">Key Rotation</h4>
                                <p className="text-xs text-slate-400 mb-4">Next automated rotation scheduled in 14 days.</p>
                                <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold text-white transition-colors flex items-center justify-center gap-2">
                                    <RefreshCw size={14} />
                                    <span>Rotate Now</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Security Checklist */}
                    <div className="glass-card p-8 rounded-3xl border border-white/5">
                        <h3 className="font-bold text-lg text-white mb-6">Security Compliance Checklist</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {[
                                { title: 'Two-Factor Authentication Enforced', status: 'pass' },
                                { title: 'Database Encryption at Rest', status: 'pass' },
                                { title: 'Role-Based Access Control (RBAC)', status: 'pass' },
                                { title: 'Suspicious IP Blocking', status: 'warning', msg: '2 IPs flagged' },
                                { title: 'Audit Logging Integrity', status: 'pass' },
                                { title: 'API Rate Limiting', status: 'pass' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                                    <span className="font-medium text-slate-300 text-sm">{item.title}</span>
                                    {item.status === 'pass' ? (
                                        <CheckCircle2 className="text-emerald-500" size={20} />
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-amber-500 uppercase">{item.msg}</span>
                                            <AlertTriangle className="text-amber-500" size={20} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};
