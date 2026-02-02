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

const employees = [
    { id: 1, name: 'Alex Rivera', email: 'alex.rivera@archivemax.com', role: 'System Admin', status: 'Active', lastActive: '2 mins ago', avatar: 'AR' },
    { id: 2, name: 'Sarah Chen', email: 's.chen@archivemax.com', role: 'Department Manager', status: 'Active', lastActive: '15 mins ago', avatar: 'SC' },
    { id: 3, name: 'Mike Ross', email: 'mike.ross@archivemax.com', role: 'Archive Officer', status: 'Inactive', lastActive: '2 days ago', avatar: 'MR' },
    { id: 4, name: 'Jessica Pearson', email: 'jess.p@archivemax.com', role: 'Compliance Lead', status: 'Active', lastActive: '1 hour ago', avatar: 'JP' },
    { id: 5, name: 'Harvey Specter', email: 'harvey@archivemax.com', role: 'Legal Partner', status: 'Maintenance', lastActive: '5 hours ago', avatar: 'HS' },
];

const RoleBadge = ({ role }: { role: string }) => {
    const colors: Record<string, string> = {
        'System Admin': 'bg-primary/20 text-primary border-primary/20',
        'Department Manager': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/20',
        'Archive Officer': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20',
        'Compliance Lead': 'bg-amber-500/20 text-amber-400 border-amber-500/20',
        'Legal Partner': 'bg-rose-500/20 text-rose-400 border-rose-500/20',
    };

    return (
        <span className={`px-2 py-1 rounded-md text-[10px] font-black border ${colors[role] || 'bg-slate-500/20 text-slate-400 border-slate-500/20'}`}>
            {role.toUpperCase()}
        </span>
    );
};

export const UserManagement = () => {
    return (
        <div className="flex min-h-screen bg-background-dark text-white font-sans">
            <Sidebar />
            <main className="ml-64 flex-1 p-8 flex flex-col">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <Users className="text-primary size-6" />
                            </div>
                            Identity & Access
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">Manage user roles, permissions, and security policies.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all text-sm font-bold shadow-lg shadow-primary/20">
                            <UserPlus size={18} />
                            <span>Provision User</span>
                        </button>
                    </div>
                </header>

                {/* Filters/Stats */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Total Members', val: '842', sub: 'Across 12 depts', icon: Users, color: 'primary' },
                        { label: 'Active Now', val: '124', sub: 'Online sessions', icon: CheckCircle2, color: 'emerald' },
                        { label: 'Pending Access', val: '12', sub: 'Awaiting approval', icon: Clock, color: 'amber' },
                        { label: 'System Roles', val: '8', sub: 'Custom definitions', icon: Shield, color: 'indigo' },
                    ].map((s, i) => (
                        <div key={i} className="bg-background-cardish border border-border-dark p-6 rounded-2xl relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-black tracking-[2px] text-slate-500 uppercase">{s.label}</span>
                                <s.icon className={`size-4 text-${s.color === 'primary' ? 'primary' : s.color + '-500'}`} />
                            </div>
                            <h4 className="text-2xl font-black">{s.val}</h4>
                            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-1">{s.sub}</p>
                        </div>
                    ))}
                </section>

                {/* User Table */}
                <section className="flex-1 bg-background-cardish border border-border-dark rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-border-dark flex justify-between items-center">
                        <div className="flex bg-sidebar-active/30 border border-border-dark rounded-xl px-4 py-2 w-96 items-center gap-3">
                            <Search size={16} className="text-slate-500" />
                            <input type="text" placeholder="Search by name, email, or role..." className="bg-transparent border-none outline-none text-xs w-full placeholder:text-slate-500" />
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 border border-border-dark rounded-xl text-slate-400 hover:text-white transition-colors">
                                <Filter size={18} />
                            </button>
                            <button className="p-2 border border-border-dark rounded-xl text-slate-400 hover:text-white transition-colors">
                                <Settings2 size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#111a22] text-slate-500 text-[10px] font-black uppercase tracking-[2px]">
                                <tr>
                                    <th className="px-6 py-4">Identity</th>
                                    <th className="px-6 py-4">Auth Status</th>
                                    <th className="px-6 py-4">RBAC Role</th>
                                    <th className="px-6 py-4">Activity Log</th>
                                    <th className="px-6 py-4 text-right">Settings</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark">
                                {employees.map((emp) => (
                                    <tr key={emp.id} className="hover:bg-sidebar-hover/40 transition-colors group">
                                        <td className="px-6 py-6 font-bold text-sm">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary text-xs tracking-tighter shadow-inner">
                                                    {emp.avatar}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-white group-hover:text-primary transition-colors">{emp.name}</span>
                                                    <span className="text-slate-500 font-medium text-[10px] mt-0.5">{emp.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                {emp.status === 'Active' ? <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> : <div className="size-1.5 rounded-full bg-slate-600" />}
                                                <span className={`text-[10px] font-black tracking-widest ${emp.status === 'Active' ? 'text-emerald-500' : 'text-slate-600'}`}>
                                                    {emp.status.toUpperCase()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <RoleBadge role={emp.role} />
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                <Clock size={12} className="text-slate-600" />
                                                <span className="text-[10px] font-bold text-slate-500">{emp.lastActive}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button className="p-2 hover:bg-primary/10 rounded-xl text-slate-500 hover:text-primary transition-colors">
                                                    <Mail size={16} />
                                                </button>
                                                <button className="p-2 hover:bg-emerald-500/10 rounded-xl text-slate-500 hover:text-emerald-500 transition-colors">
                                                    <CheckCircle2 size={16} />
                                                </button>
                                                <button className="p-2 hover:bg-rose-500/10 rounded-xl text-slate-500 hover:text-rose-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                                <button className="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserManagement;
