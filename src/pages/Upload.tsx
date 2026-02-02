import React, { useState, useCallback } from 'react';
import { Sidebar } from '../components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, X, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useFiles, formatBytes } from '../context/FileContext';

interface UploadProps {
    userRole?: 'admin' | 'user' | null;
    onNavigate?: (page: string) => void;
    currentTab?: string;
}

interface FileItem {
    id: string;
    file: File;
    progress: number;
    status: 'uploading' | 'completed' | 'error';
}

export const Upload = ({ userRole, onNavigate, currentTab }: UploadProps) => {
    const { addFile } = useFiles();
    const [files, setFiles] = useState<FileItem[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            progress: 0,
            status: 'uploading' as const
        }));

        setFiles(prev => [...prev, ...newFiles]);

        // Simulate upload progress
        newFiles.forEach(fileItem => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 20; // Faster simulation
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, progress: 100, status: 'completed' } : f));

                    // Add to global store
                    addFile({
                        id: fileItem.id,
                        name: fileItem.file.name,
                        type: fileItem.file.name.split('.').pop()?.toUpperCase() || 'FILE',
                        size: formatBytes(fileItem.file.size),
                        sizeRaw: fileItem.file.size,
                        owner: userRole === 'admin' ? 'Admin' : 'User',
                        uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        status: 'success',
                        category: 'Uploads'
                    });

                } else {
                    setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, progress } : f));
                }
            }, 300);
        });
    }, [addFile, userRole]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="flex min-h-screen bg-background-dark text-white font-sans selection:bg-primary/30">
            <Sidebar userRole={userRole} onNavigate={onNavigate} activeTab={currentTab} />
            <main className="ml-64 flex-1 p-8 flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto w-full"
                >
                    <header className="mb-8">
                        <h2 className="text-3xl font-black text-white flex items-center gap-3">
                            <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                                <UploadCloud className="text-primary size-6" />
                            </div>
                            Batch Upload
                        </h2>
                        <p className="text-slate-500 mt-2 ml-14">Drag and drop files to securely encrypt and sync to mapped Google Drive.</p>
                    </header>

                    {/* Dropzone */}
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-[2rem] p-12 text-center transition-all cursor-pointer mb-8 relative group overflow-hidden ${isDragActive ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'}`}
                    >
                        <input {...getInputProps()} />
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className={`size-20 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300 ${isDragActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                                <UploadCloud className={`size-8 ${isDragActive ? 'text-primary' : 'text-slate-400'}`} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {isDragActive ? 'Drop files here' : 'Click or Drag files here'}
                                </h3>
                                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                                    Support for PDF, DOCX, XLSX, JPG, PNG, MP4. Max file size 500MB per file.
                                </p>
                            </div>
                        </div>

                        {/* Background Pulse */}
                        {isDragActive && (
                            <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                        )}
                    </div>

                    {/* File List */}
                    <div className="space-y-4">
                        <AnimatePresence>
                            {files.map(file => (
                                <motion.div
                                    key={file.id}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="glass-card p-4 rounded-xl border border-white/5 flex items-center gap-4 overflow-hidden"
                                >
                                    <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 shrink-0">
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between mb-1">
                                            <p className="text-sm font-bold text-white truncate">{file.file.name}</p>
                                            <span className="text-xs font-mono text-slate-400">{Math.round(file.progress)}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-300 ${file.status === 'error' ? 'bg-rose-500' : file.status === 'completed' ? 'bg-emerald-500' : 'bg-primary'}`}
                                                style={{ width: `${file.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="shrink-0">
                                        {file.status === 'completed' && <CheckCircle2 className="text-emerald-500" size={20} />}
                                        {file.status === 'error' && <AlertCircle className="text-rose-500" size={20} />}
                                        {file.status === 'uploading' && (
                                            <button onClick={(e) => { e.stopPropagation(); /* Mock cancel */ }} className="text-slate-500 hover:text-white">
                                                <X size={20} />
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                </motion.div>
            </main>
        </div>
    );
};
