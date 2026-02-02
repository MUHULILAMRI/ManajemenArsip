import React from 'react';
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
    ArrowLeft
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

const groups = [
    { id: 1, name: 'Finance & Accounting', items: 124, lastModified: '2 hours ago', color: 'bg-blue-500' },
    { id: 2, name: 'Human Resources', items: 85, lastModified: '1 day ago', color: 'bg-purple-500' },
    { id: 3, name: 'Legal Documents', items: 42, lastModified: '3 days ago', color: 'bg-emerald-500' },
    { id: 4, name: 'Marketing Assets', items: 210, lastModified: '5 hours ago', color: 'bg-rose-500' },
    { id: 5, name: 'Technical Docs', items: 156, lastModified: '1 week ago', color: 'bg-amber-500' },
];

const files = [
    { id: 1, name: 'Q4_Financial_Report.pdf', type: 'PDF', size: '2.4 MB', owner: 'Sarah Chen' },
    { id: 2, name: 'Employee_Handbook_2024.docx', type: 'DOCX', size: '1.1 MB', owner: 'Admin' },
    { id: 3, name: 'Product_Inventory_List.xlsx', type: 'XLSX', size: '4.5 MB', owner: 'Mike Ross' },
    { id: 4, name: 'Brand_Guidelines_v2.pdf', type: 'PDF', size: '12.8 MB', owner: 'Jane Doe' },
];

export const Explorer = () => {
    return (
        <div className="flex min-h-screen bg-background-dark text-white font-sans">
            <Sidebar />
            <main className="ml-64 flex-1 p-8 flex flex-col">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-background-cardish rounded-full transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <h2 className="text-2xl font-black">E-Archive Explorer</h2>
                    </div>
                    <div className="flex items-center gap-4 bg-background-cardish border border-border-dark px-4 py-2 rounded-2xl w-96">
                        <Search size={18} className="text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search across 12,450 documents..."
                            className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-slate-500"
                        />
                    </div>
                </header>

                {/* Categories / Folders */}
                <section className="mb-10">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h3 className="text-lg font-bold">Document Categories</h3>
                            <p className="text-slate-500 text-xs">Browse by organizational departments</p>
                        </div>
                        <button className="text-primary text-xs font-bold hover:underline">View All Folders</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {groups.map((group) => (
                            <div key={group.id} className="bg-background-cardish border border-border-dark p-4 rounded-2xl hover:border-primary/50 transition-all group cursor-pointer">
                                <div className={`size-12 rounded-xl ${group.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <Folder className={`size-6 ${group.color.replace('bg-', 'text-')}`} />
                                </div>
                                <h4 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{group.name}</h4>
                                <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">{group.items} Items</p>
                                <div className="mt-4 pt-4 border-t border-border-dark flex items-center justify-between">
                                    <span className="text-slate-600 text-[9px] font-bold uppercase tracking-widest">{group.lastModified}</span>
                                    <ChevronRight size={14} className="text-slate-600 group-hover:text-primary translate-x-0 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recent Files Table */}
                <section className="flex-1 bg-background-cardish border border-border-dark rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-border-dark flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <h3 className="font-bold">Recent Documents</h3>
                            <div className="flex bg-sidebar-active p-1 rounded-lg">
                                <button className="p-1 px-2 bg-primary/20 text-primary rounded-md"><Grid size={14} /></button>
                                <button className="p-1 px-2 text-slate-500 rounded-md hover:text-white"><List size={14} /></button>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-3 py-2 bg-sidebar-active text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-sidebar-hover transition-colors">
                                <Filter size={14} />
                                <span>Filter</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                                <PlusCircle size={14} />
                                <span>New Upload</span>
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#111a22] text-slate-500 text-[10px] font-black uppercase tracking-[2px]">
                                <tr>
                                    <th className="px-6 py-4">Filename</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Size</th>
                                    <th className="px-6 py-4">Owner</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark">
                                {files.map((file) => (
                                    <tr key={file.id} className="hover:bg-sidebar-hover transition-colors group">
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`size-10 rounded-lg flex items-center justify-center ${file.type === 'PDF' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                    <File size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">{file.name}</p>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <Clock size={10} className="text-slate-600" />
                                                        <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">Oct 24, 2023, 11:24 PM</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-black tracking-[1px]">VERIFIED</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">{file.type}</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">{file.size}</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="size-6 rounded-full bg-sidebar-active border border-border-dark" />
                                                <span className="text-xs font-medium text-slate-300">{file.owner}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors" title="Download">
                                                    <Download size={16} />
                                                </button>
                                                <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors" title="Share">
                                                    <Share2 size={16} />
                                                </button>
                                                <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors" title="Favorite">
                                                    <Star size={16} />
                                                </button>
                                                <button className="p-2 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-500 transition-colors" title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                                <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                                                    <MoreHorizontal size={16} />
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

export default Explorer;
