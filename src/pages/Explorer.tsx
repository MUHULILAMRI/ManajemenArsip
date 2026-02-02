import React, { useState } from 'react';
import { useFiles } from '../context/FileContext';
import {
    Folder,
    File,
    Search,
    Grid,
    List,
    Filter,
    MoreHorizontal,
    Star,
    Clock,
    ChevronRight,
    Download,
    Share2,
    Trash2,
    ArrowLeft,
    PlusCircle,
    ExternalLink,
    HardDrive
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'framer-motion';

const groups = [
    { id: 1, name: 'Finance & Accounting', items: 124, lastModified: '2 hours ago', color: 'bg-blue-500', text: 'text-blue-500' },
    { id: 2, name: 'Human Resources', items: 85, lastModified: '1 day ago', color: 'bg-accent-fuchsia', text: 'text-accent-fuchsia' },
    { id: 3, name: 'Legal Documents', items: 42, lastModified: '3 days ago', color: 'bg-emerald-500', text: 'text-emerald-500' },
    { id: 4, name: 'Marketing Assets', items: 210, lastModified: '5 hours ago', color: 'bg-rose-500', text: 'text-rose-500' },
    { id: 5, name: 'Technical Docs', items: 156, lastModified: '1 week ago', color: 'bg-amber-500', text: 'text-amber-500' },
];



const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
};

interface ExplorerProps {
    userRole?: 'admin' | 'user' | null;
    onNavigate?: (page: string) => void;
    currentTab?: string;
}

export const Explorer = ({ userRole, onNavigate, currentTab }: ExplorerProps) => {
    const { files } = useFiles();
    const driveLink = "https://drive.google.com/drive/folders/1IYNFQCewoFf64ybC7E2K0nAMdx05t7hS?usp=sharing";

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
                        <motion.div variants={item} className="flex items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/20 text-blue-500 rounded-lg">
                                        <HardDrive size={20} />
                                    </div>
                                    E-Archive
                                </h2>
                                <p className="text-slate-500 text-sm mt-1 ml-11">Linked to Google Drive Storage</p>
                            </div>
                        </motion.div>

                        <motion.div variants={item} className="flex gap-3">
                            <a
                                href={driveLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 bg-[#1F2937] hover:bg-[#374151] border border-white/10 rounded-xl text-sm font-bold transition-all text-white group"
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo_%282020%29.png" alt="Drive" className="w-4 h-4" />
                                <span>Open Drive Folder</span>
                                <ExternalLink size={14} className="text-slate-400 group-hover:text-white" />
                            </a>
                        </motion.div>
                    </header>

                    {/* Categories / Folders */}
                    <section className="mb-10">
                        <motion.div variants={item} className="flex justify-between items-end mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">Document Categories</h3>
                                <p className="text-slate-500 text-xs">Browse by organizational departments</p>
                            </div>
                            <button className="text-primary text-[10px] font-black uppercase tracking-wider hover:text-primary-hover hover:underline">View All Folders</button>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {groups.map((group) => (
                                <motion.div
                                    variants={item}
                                    key={group.id}
                                    className="glass-card p-5 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer border border-white/5 hover:border-white/10 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <div className={`size-12 rounded-2xl ${group.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <Folder className={`size-6 ${group.text}`} />
                                    </div>
                                    <h4 className="font-bold text-sm mb-1 text-white group-hover:text-primary transition-colors">{group.name}</h4>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{group.items} Items</p>
                                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={10} className="text-slate-600" />
                                            <span className="text-slate-600 text-[9px] font-bold uppercase tracking-widest">{group.lastModified}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Recent Files Table */}
                    <motion.section variants={item} className="flex-1 glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/5 flex flex-col">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <h3 className="font-bold text-lg text-white">Recent Documents</h3>
                                <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
                                    <button className="p-1.5 px-2.5 bg-white/10 text-white rounded-lg shadow-sm"><List size={14} /></button>
                                    <button className="p-1.5 px-2.5 text-slate-500 rounded-lg hover:text-white transition-colors"><Grid size={14} /></button>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
                                    <Filter size={14} />
                                    <span>Filter</span>
                                </button>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 group">
                                    <PlusCircle size={14} className="group-hover:rotate-90 transition-transform" />
                                    <span>New Upload</span>
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left">
                                <thead className="bg-[#111a22]/80 backdrop-blur-sm text-slate-500 text-[10px] font-black uppercase tracking-[2px] sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4">Filename</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Size</th>
                                        <th className="px-6 py-4">Owner</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {files.map((file) => (
                                        <tr key={file.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className={`size-11 rounded-xl flex items-center justify-center ${file.type === 'PDF' ? 'bg-rose-500/10 text-rose-500' : file.type === 'XLSX' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                        <File size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-slate-200 group-hover:text-primary transition-colors">{file.name}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Clock size={10} className="text-slate-600" />
                                                            <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">{file.uploadDate}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[10px] font-black tracking-[1px] shadow-[0_0_10px_rgba(16,185,129,0.1)]">VERIFIED</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase bg-white/5 px-2 py-1 rounded-md">{file.type}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">{file.size}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="size-6 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center text-[9px] font-bold">
                                                        {file.owner.charAt(0)}
                                                    </div>
                                                    <span className="text-xs font-medium text-slate-300">{file.owner}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                                                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors" title="Download">
                                                        <Download size={16} />
                                                    </button>
                                                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors" title="Share">
                                                        <Share2 size={16} />
                                                    </button>
                                                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors" title="Favorite">
                                                        <Star size={16} />
                                                    </button>
                                                    <button className="p-2 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-500 transition-colors" title="Delete">
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                                                        <MoreHorizontal size={16} />
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

export default Explorer;
