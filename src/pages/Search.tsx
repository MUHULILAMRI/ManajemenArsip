import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, Sparkles, FileText, File, Calendar, MoreHorizontal, ArrowRight } from 'lucide-react';

interface SearchProps {
    userRole?: 'admin' | 'user' | null;
    onNavigate?: (page: string) => void;
    currentTab?: string;
}

const mockResults = [
    { id: 1, title: 'Q3 Financial Overview.pdf', snippet: '...summary of the <b class="text-primary">Q3 financial performance</b> indicates a 15% growth in...', type: 'PDF', date: 'Oct 24, 2023', relevance: 98 },
    { id: 2, title: 'Project Titan Proposal.docx', snippet: '...budget allocation for <b class="text-primary">Project Titan</b> phase 1...', type: 'DOCX', date: 'Sep 12, 2023', relevance: 85 },
    { id: 3, title: 'Meeting Notes 2023-10-01.txt', snippet: '...discussed the <b class="text-primary">financial</b> implications of the new strategy...', type: 'TXT', date: 'Oct 01, 2023', relevance: 72 },
];

export const Search = ({ userRole, onNavigate, currentTab }: SearchProps) => {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    return (
        <div className="flex min-h-screen bg-background-dark text-white font-sans selection:bg-primary/30">
            <Sidebar userRole={userRole} onNavigate={onNavigate} activeTab={currentTab} />
            <main className="ml-64 flex-1 p-8 flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-5xl mx-auto w-full"
                >
                    <header className="mb-12 text-center">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4"
                        >
                            <Sparkles size={14} />
                            <span>Powered by Gemini AI</span>
                        </motion.div>
                        <h2 className="text-4xl font-black text-white mb-4">Semantic Archive Search</h2>
                        <p className="text-slate-400 max-w-lg mx-auto">Ask questions in natural language. The AI understands context, not just keywords.</p>
                    </header>

                    {/* Search Bar */}
                    <div className="relative mb-12 group z-20">
                        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-focus-within:bg-primary/30 transition-all opacity-50" />
                        <div className="relative bg-[#0b1219]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center shadow-2xl">
                            <SearchIcon className="text-slate-400 ml-4 mr-4" size={24} />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ex: 'Find all contracts related to Project Titan signed last year'"
                                className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder:text-slate-600 font-medium h-12"
                            />
                            <button className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-all flex items-center gap-2">
                                <span>Search</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Filters */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="glass-card p-5 rounded-2xl border border-white/5">
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                    <Filter size={16} className="text-primary" />
                                    Smart Filters
                                </h3>
                                <div className="space-y-3">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">File Type</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['PDF', 'DOCX', 'XLSX', 'Images'].map(type => (
                                                <button key={type} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 transition-colors border border-white/5">
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date Range</label>
                                        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300">
                                            <span>All Time</span>
                                            <Calendar size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent / Results */}
                        <div className="lg:col-span-2">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                                {query ? 'Top Results' : 'Suggested Searches'}
                            </h3>

                            <div className="space-y-4">
                                {(query ? mockResults : mockResults.slice(0, 2)).map((res) => (
                                    <motion.div
                                        key={res.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="glass-card p-4 rounded-2xl border border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white/5 rounded-lg text-slate-300 group-hover:text-primary transition-colors">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white group-hover:text-primary transition-colors">{res.title}</h4>
                                                    <p className="text-[10px] text-slate-500">{res.type} • {res.date}</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                                                {res.relevance}% Match
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-400 pl-11" dangerouslySetInnerHTML={{ __html: res.snippet }} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                </motion.div>
            </main>
        </div>
    );
};
