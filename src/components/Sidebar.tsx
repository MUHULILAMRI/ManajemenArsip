import React from 'react';
import {
    LayoutDashboard,
    FolderOpen,
    Users,
    History,
    Database,
    ShieldCheck,
    Settings,
    UploadCloud,
    Search,
    ChevronRight,
    PlusCircle,
    HardDrive
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface NavItemProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    count?: string | number;
    onClick?: () => void;
}

const NavItem = ({ icon: Icon, label, active, count, onClick }: NavItemProps) => (
    <button
        onClick={onClick}
        className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group text-sm font-medium relative overflow-hidden",
            active
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
        )}
    >
        {active && <div className="absolute inset-0 bg-primary opacity-100 z-[-1]" />}
        <Icon className={cn("size-5 transition-colors", active ? "text-white" : "text-slate-400 group-hover:text-primary")} />
        <span className="flex-1 text-left">{label}</span>
        {count && (
            <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-md font-bold transition-colors",
                active ? "bg-white/20 text-white" : "bg-white/5 text-slate-400 group-hover:text-white"
            )}>
                {count}
            </span>
        )}
    </button>
);

interface SidebarProps {
    userRole?: 'admin' | 'user' | null;
    onNavigate?: (page: string) => void;
    activeTab?: string;
}

export const Sidebar = ({ userRole, onNavigate, activeTab = 'dashboard' }: SidebarProps) => {

    // Helper to handle navigation
    const handleNav = (page: string) => {
        if (onNavigate) {
            onNavigate(page);
        }
    };

    return (
        <aside className="w-64 h-screen bg-[#0b1219]/90 backdrop-blur-xl border-r border-white/5 flex flex-col p-4 fixed left-0 top-0 z-50">
            {/* Brand */}
            <div className="flex items-center gap-3 px-3 mb-10 mt-2">
                <div className="size-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 relative">
                    <div className="absolute inset-0 rounded-xl bg-white/20 blur-sm"></div>
                    <FolderOpen className="size-6 relative z-10" />
                </div>
                <div>
                    <h1 className="text-white font-black text-lg leading-tight tracking-tight">ArciveMax</h1>
                    <p className="text-primary text-[10px] font-bold uppercase tracking-widest">
                        {userRole === 'admin' ? 'Admin Console' : 'Enterprise v2.0'}
                    </p>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-8 overflow-y-auto custom-scrollbar pr-2">
                {/* Main Menu */}
                <div>
                    <p className="px-3 mb-3 text-[10px] font-black text-slate-500 uppercase tracking-[2px]">Sistem Menu</p>
                    <nav className="flex flex-col gap-1">
                        <NavItem
                            icon={LayoutDashboard}
                            label="Dashboard"
                            active={activeTab === 'dashboard'}
                            onClick={() => handleNav('dashboard')}
                        />
                        <NavItem
                            icon={FolderOpen}
                            label="E-Archive"
                            count="1.2k"
                            active={activeTab === 'explorer'}
                            onClick={() => handleNav('explorer')}
                        />
                        <NavItem
                            icon={Search}
                            label="AI Smart Search"
                            active={activeTab === 'search'}
                            onClick={() => handleNav('search')}
                        />
                        <NavItem
                            icon={UploadCloud}
                            label="Batch Upload"
                            active={activeTab === 'upload'}
                            onClick={() => handleNav('upload')}
                        />
                        <NavItem
                            icon={History}
                            label="Audit Timeline"
                            active={activeTab === 'audit'}
                            onClick={() => handleNav('audit')}
                        />
                    </nav>
                </div>

                {/* Management - Only active for Admin or partial for User */}
                <div>
                    <p className="px-3 mb-3 text-[10px] font-black text-slate-500 uppercase tracking-[2px]">Management</p>
                    <nav className="flex flex-col gap-1">
                        {userRole === 'admin' && (
                            <NavItem
                                icon={Users}
                                label="User Roles"
                                active={activeTab === 'users'}
                                onClick={() => handleNav('users')}
                            />
                        )}
                        <NavItem
                            icon={Database}
                            label="Storage Analytics"
                            active={activeTab === 'storage'}
                            onClick={() => handleNav('storage')}
                        />
                        <NavItem
                            icon={ShieldCheck}
                            label="Security Engine"
                            active={activeTab === 'security'}
                            onClick={() => handleNav('security')}
                        />
                    </nav>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                    <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 text-primary py-3 rounded-xl border border-primary/20 transition-all font-bold text-sm mb-4 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                        <PlusCircle className="size-4" />
                        <span>New Archive</span>
                    </button>
                    {/* User Info / Logout hint */}
                    <div className="px-2 pb-2 text-center">
                        <span className="text-[10px] text-slate-500 font-medium">Logged in as {userRole || 'Guest'}</span>
                    </div>
                </div>
            </div>

            {/* Storage Indicator */}
            <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <HardDrive size={60} />
                </div>
                <div className="flex justify-between items-center mb-2 relative z-10">
                    <div className="flex items-center gap-2">
                        <HardDrive className="size-3 text-primary" />
                        <span className="text-[10px] font-bold text-slate-400">Cloud Storage</span>
                    </div>
                    <span className="text-[10px] font-bold text-primary">78%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative z-10">
                    <div className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(19,127,236,0.5)]" style={{ width: '78%' }} />
                </div>
                <p className="mt-2 text-[9px] text-slate-500 font-medium relative z-10">8.4 TB of 10 TB used</p>
            </div>
        </aside>
    );
};
