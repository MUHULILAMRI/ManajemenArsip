import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

interface PlaceholderProps {
    title: string;
    description?: string;
    userRole?: 'admin' | 'user' | null;
    onNavigate?: (page: string) => void;
    currentTab?: string;
}

export const Placeholder = ({ title, description, userRole, onNavigate, currentTab }: PlaceholderProps) => {
    return (
        <div className="flex min-h-screen bg-background-dark text-white font-sans selection:bg-primary/30">
            <Sidebar userRole={userRole} onNavigate={onNavigate} activeTab={currentTab} />
            <main className="ml-64 flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="z-10 text-center"
                >
                    <div className="size-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-2xl glass-card relative group">
                        <Construction className="size-10 text-slate-500 group-hover:text-primary transition-colors" />
                        <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">{title}</h2>
                    <p className="text-slate-400 max-w-md mx-auto">{description || "This module is currently under active development. Check back later for updates."}</p>

                    <div className="mt-8">
                        <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20">Work in Progress</span>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};
