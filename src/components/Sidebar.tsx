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
}

const NavItem = ({ icon: Icon, label, active, count }: NavItemProps) => (
    <a
        href="#"
        className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-sm font-medium",
            active
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-slate-400 hover:bg-sidebar-hover hover:text-white"
        )}
    >
        <Icon className={cn("size-5", active ? "text-white" : "text-slate-400 group-hover:text-primary")} />
        <span className="flex-1">{label}</span>
        {count && (
            <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                active ? "bg-white/20 text-white" : "bg-sidebar-active text-slate-400"
            )}>
                {count}
            </span>
        )}
    </a>
);

export const Sidebar = () => {
    return (
        <aside className="w-64 h-screen bg-background-dark border-r border-border-dark flex flex-col p-4 fixed left-0 top-0 z-50">
            {/* Brand */}
            <div className="flex items-center gap-3 px-3 mb-10">
                <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                    <FolderOpen className="size-6" />
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg leading-tight tracking-tight">ArciveMax</h1>
                    <p className="text-primary text-[10px] font-bold uppercase tracking-widest">Enterprise v2.0</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-8 overflow-y-auto custom-scrollbar pr-2">
                {/* Main Menu */}
                <div>
                    <p className="px-3 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-[2px]">Sistem Menu</p>
                    <nav className="flex flex-col gap-1">
                        <NavItem icon={LayoutDashboard} label="Dashboard" active />
                        <NavItem icon={FolderOpen} label="E-Archive" count="1.2k" />
                        <NavItem icon={Search} label="AI Smart Search" />
                        <NavItem icon={UploadCloud} label="Batch Upload" />
                        <NavItem icon={History} label="Audit Timeline" />
                    </nav>
                </div>

                {/* Management */}
                <div>
                    <p className="px-3 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-[2px]">Management</p>
                    <nav className="flex flex-col gap-1">
                        <NavItem icon={Users} label="User Roles" />
                        <NavItem icon={Database} label="Storage Analytics" />
                        <NavItem icon={ShieldCheck} label="Security Engine" />
                    </nav>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                    <button className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary py-3 rounded-xl border border-primary/20 transition-all font-bold text-sm mb-4">
                        <PlusCircle className="size-4" />
                        <span>New Archive</span>
                    </button>
                </div>
            </div>

            {/* Storage Indicator */}
            <div className="p-4 bg-background-cardish rounded-2xl border border-border-dark">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <HardDrive className="size-3 text-primary" />
                        <span className="text-[10px] font-bold text-slate-400">Cloud Storage</span>
                    </div>
                    <span className="text-[10px] font-bold text-primary">78%</span>
                </div>
                <div className="w-full h-1.5 bg-sidebar-active rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '78%' }} />
                </div>
                <p className="mt-2 text-[9px] text-slate-500 font-medium">8.4 TB of 10 TB used</p>
            </div>
        </aside>
    );
};
