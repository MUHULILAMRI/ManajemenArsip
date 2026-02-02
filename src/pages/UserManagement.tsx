import React from 'react';
import {
    Users,
    UserPlus,
    Search,
    Filter,
    MoreVertical,
    Shield,
    Mail,
    CheckCircle2,
    XCircle,
    Clock,
    Settings2,
    Trash2
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'framer-motion';

const employees = [
    { id: 1, name: 'Alex Rivera', email: 'alex.rivera@archivemax.com', role: 'System Admin', status: 'Active', lastActive: '2 mins ago', avatar: 'AR' },
    { id: 2, name: 'Sarah Chen', email: 's.chen@archivemax.com', role: 'Department Manager', status: 'Active', lastActive: '15 mins ago', avatar: 'SC' },
    { id: 3, name: 'Mike Ross', email: 'mike.ross@archivemax.com', role: 'Archive Officer', status: 'Inactive', lastActive: '2 days ago', avatar: 'MR' },
    { id: 4, name: 'Jessica Pearson', email: 'jess.p@archivemax.com', role: 'Compliance Lead', status: 'Active', lastActive: '1 hour ago', avatar: 'JP' },
    { id: 5, name: 'Harvey Specter', email: 'harvey@archivemax.com', role: 'Legal Partner', status: 'Maintenance', lastActive: '5 hours ago', avatar: 'HS' },
];

const RoleBadge = ({ role }: { role: string }) => {
    const colors: Record<string, string> = {
        'System Admin': 'bg-primary/20 text-primary border-primary/20 shadow-[0_0_10px_rgba(19,127,236,0.2)]',
        'Department Manager': 'bg-accent-violet/20 text-accent-violet border-accent-violet/20',
        'Archive Officer': 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20',
        'Compliance Lead': 'bg-amber-500/20 text-amber-500 border-amber-500/20',
        'Legal Partner': 'bg-rose-500/20 text-rose-500 border-rose-500/20',
    };

    return (
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border tracking-wider ${colors[role] || 'bg-slate-500/20 text-slate-400 border-slate-500/20'}`}>
            {role.toUpperCase()}
        </span>
    );
};

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

interface UserManagementProps {
    userRole?: 'admin' | 'user' | null;
    onNavigate?: (page: string) => void;
    currentTab?: string;
}

export const UserManagement = ({ userRole, onNavigate, currentTab }: UserManagementProps) => {
    return (
        <div className="flex min-h-screen bg-background-dark text-white font-sans selection:bg-primary/30">
            <Sidebar userRole={userRole} onNavigate={onNavigate} activeTab={currentTab} />
            <main className="ml-64 flex-1 p-8 flex flex-col">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={container}
                    className="flex-1 flex flex-col"
                >
                    {/* Header */}
                    <header className="flex justify-between items-center mb-10">
                        <motion.div variants={item}>
                            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3 text-white">
                                <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(19,127,236,0.15)]">
                                    <Users className="text-primary size-6" />
                                </div>
                                Identity & Access
                            </h2>
                            <p className="text-slate-500 text-sm mt-1 ml-14">Manage user roles, permissions, and security policies.</p>
                        </motion.div>
                        <motion.div variants={item} className="flex gap-3">
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all text-sm font-bold shadow-lg shadow-primary/20 group">
                                <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
                                <span>Provision User</span>
                            </button>
                        </motion.div>
                    </header>

                    {/* Filters/Stats */}
                    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Total Members', val: '842', sub: 'Across 12 depts', icon: Users, color: 'primary' },
                            { label: 'Active Now', val: '124', sub: 'Online sessions', icon: CheckCircle2, color: 'emerald' },
                            { label: 'Pending Access', val: '12', sub: 'Awaiting approval', icon: Clock, color: 'amber' },
                            { label: 'System Roles', val: '8', sub: 'Custom definitions', icon: Shield, color: 'accent-violet' },
                        ].map((s, i) => (
                            <motion.div
                                variants={item}
                                key={i}
                                className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[10px] font-black tracking-[2px] text-slate-500 uppercase">{s.label}</span>
                                    <s.icon className={`size-4 ${s.color === 'primary' ? 'text-primary' : s.color === 'accent-violet' ? 'text-accent-violet' : `text-${s.color}-500`}`} />
                                </div>
                                <h4 className="text-2xl font-black text-white group-hover:scale-105 transition-transform origin-left">{s.val}</h4>
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-1">{s.sub}</p>

                                <div className={`absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500`}>
                                    <s.icon size={80} />
                                </div>
                            </motion.div>
                        ))}
                    </section>

                    {/* User Table */}
                    <motion.section variants={item} className="flex-1 glass-card border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                            <div className="flex bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 w-96 items-center gap-3 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                                <Search size={16} className="text-slate-500" />
                                <input type="text" placeholder="Search by name, email, or role..." className="bg-transparent border-none outline-none text-xs w-full text-white placeholder:text-slate-500 font-medium" />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2.5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                                    <Filter size={18} />
                                </button>
                                <button className="p-2.5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                                    <Settings2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#111a22]/50 text-slate-500 text-[10px] font-black uppercase tracking-[2px]">
                                    <tr>
                                        <th className="px-6 py-5">Identity</th>
                                        <th className="px-6 py-5">Auth Status</th>
                                        <th className="px-6 py-5">RBAC Role</th>
                                        <th className="px-6 py-5">Activity Log</th>
                                        <th className="px-6 py-5 text-right">Settings</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {employees.map((emp) => (
                                        <tr key={emp.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-5 font-bold text-sm">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center font-black text-primary text-xs tracking-tighter shadow-inner ring-1 ring-white/5">
                                                        {emp.avatar}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-slate-200 group-hover:text-primary transition-colors">{emp.name}</span>
                                                        <span className="text-slate-500 font-medium text-[10px] mt-0.5">{emp.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    {emp.status === 'Active' ?
                                                        <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" /> :
                                                        <div className="size-2 rounded-full bg-slate-600 border border-slate-500" />
                                                    }
                                                    <span className={`text-[10px] font-black tracking-widest ${emp.status === 'Active' ? 'text-emerald-500' : 'text-slate-600'}`}>
                                                        {emp.status.toUpperCase()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <RoleBadge role={emp.role} />
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={12} className="text-slate-600" />
                                                    <span className="text-[10px] font-bold text-slate-500">{emp.lastActive}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
                                                    <button className="p-2 hover:bg-white/10 rounded-xl text-slate-500 hover:text-white transition-colors">
                                                        <Mail size={16} />
                                                    </button>
                                                    <button className="p-2 hover:bg-emerald-500/10 rounded-xl text-slate-500 hover:text-emerald-500 transition-colors">
                                                        <CheckCircle2 size={16} />
                                                    </button>
                                                    <button className="p-2 hover:bg-rose-500/10 rounded-xl text-slate-500 hover:text-rose-500 transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <button className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors">
                                                        <MoreVertical size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.section>
                </motion.div>
            </main>
        </div>
    );
};

export default UserManagement;
