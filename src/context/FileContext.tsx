import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of a file in our system
export interface ArchiveFile {
    id: string;
    name: string;
    type: string;
    size: string;
    sizeRaw: number; // in bytes for calculation
    owner: string;
    uploadDate: string;
    status: 'success' | 'processing' | 'error';
    category?: string;
}

// Initial mock data to populate the system
const initialFiles: ArchiveFile[] = [
    { id: '1', name: 'Q4_Financial_Report.pdf', type: 'PDF', size: '2.4 MB', sizeRaw: 2400000, owner: 'Sarah Chen', uploadDate: 'Oct 24, 2023', status: 'success', category: 'Finance' },
    { id: '2', name: 'Employee_Handbook_2024.docx', type: 'DOCX', size: '1.1 MB', sizeRaw: 1100000, owner: 'Admin', uploadDate: 'Oct 24, 2023', status: 'success', category: 'HR' },
    { id: '3', name: 'Product_Inventory_List.xlsx', type: 'XLSX', size: '4.5 MB', sizeRaw: 4500000, owner: 'Mike Ross', uploadDate: 'Oct 24, 2023', status: 'success', category: 'Operations' },
    { id: '4', name: 'Brand_Guidelines_v2.pdf', type: 'PDF', size: '12.8 MB', sizeRaw: 12800000, owner: 'Jane Doe', uploadDate: 'Oct 24, 2023', status: 'success', category: 'Marketing' },
];

interface FileContextType {
    files: ArchiveFile[];
    addFile: (file: ArchiveFile) => void;
    deleteFile: (id: string) => void;
    totalUsage: number; // in bytes
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: ReactNode }) => {
    const [files, setFiles] = useState<ArchiveFile[]>(initialFiles);

    const addFile = (file: ArchiveFile) => {
        setFiles(prev => [file, ...prev]);
    };

    const deleteFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const totalUsage = files.reduce((acc, file) => acc + file.sizeRaw, 0);

    return (
        <FileContext.Provider value={{ files, addFile, deleteFile, totalUsage }}>
            {children}
        </FileContext.Provider>
    );
};

export const useFiles = () => {
    const context = useContext(FileContext);
    if (context === undefined) {
        throw new Error('useFiles must be used within a FileProvider');
    }
    return context;
};

// Helper to format bytes
export const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
