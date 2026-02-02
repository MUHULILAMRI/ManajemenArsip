import React, { useState } from 'react'
import { Dashboard } from './pages/Dashboard';
import { Explorer } from './pages/Explorer';
import { UserManagement } from './pages/UserManagement';
import { Login } from './pages/Login';
import { Placeholder } from './pages/Placeholder';
import { StorageManagement } from './pages/StorageManagement';
import { Search } from './pages/Search';
import { Upload } from './pages/Upload';
import { Audit } from './pages/Audit';
import { Security } from './pages/Security';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutDashboard, FolderOpen, Users, UploadCloud, History } from 'lucide-react';
import { FileProvider } from './context/FileContext';

// ... (previous imports)

export type UserRole = 'admin' | 'user' | null;

function App() {
    const [currentPage, setCurrentPage] = useState('login');
    const [userRole, setUserRole] = useState<UserRole>(null);

    // ... (handlers remain same)
    const handleLogin = (role: UserRole) => {
        setUserRole(role);
        setCurrentPage('dashboard');
    };

    const handleLogout = () => {
        setUserRole(null);
        setCurrentPage('login');
    };

    const navigate = (page: string) => {
        setCurrentPage(page);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'login':
                return <Login onLogin={handleLogin} />;
            case 'dashboard':
                return <Dashboard userRole={userRole} onNavigate={navigate} currentTab="dashboard" />;
            case 'explorer':
                return <Explorer userRole={userRole} onNavigate={navigate} currentTab="explorer" />;
            case 'users':
                return <UserManagement userRole={userRole} onNavigate={navigate} currentTab="users" />;
            case 'search':
                return <Search userRole={userRole} onNavigate={navigate} currentTab="search" />;
            case 'upload':
                return <Upload userRole={userRole} onNavigate={navigate} currentTab="upload" />;
            case 'audit':
                return <Audit userRole={userRole} onNavigate={navigate} currentTab="audit" />;
            case 'storage':
                return <StorageManagement userRole={userRole} onNavigate={navigate} currentTab="storage" />;
            case 'security':
                return <Security userRole={userRole} onNavigate={navigate} currentTab="security" />;
            default:
                return <Dashboard userRole={userRole} onNavigate={navigate} currentTab="dashboard" />;
        }
    }

    const navItems = [
        { id: 'dashboard', icon: LayoutDashboard },
        { id: 'explorer', icon: FolderOpen },
        { id: 'users', icon: Users },
    ];

    return (
        <FileProvider>
            <div className="dark bg-background-dark min-h-screen relative text-slate-200 font-sans selection:bg-primary/30">
                {/* Mobile Navigation / Bottom Bar */}
                {currentPage !== 'login' && (
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-[#0b1219]/80 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-2xl">
                        {navItems.map((item) => {
                            // Hide Users menu for non-admin
                            if (item.id === 'users' && userRole !== 'admin') return null;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setCurrentPage(item.id)}
                                    className={`p-3 rounded-full transition-all ${currentPage === item.id ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
                                >
                                    <item.icon size={20} />
                                </button>
                            );
                        })}
                        <div className="w-px h-6 bg-white/10 mx-2" />
                        <button
                            onClick={handleLogout}
                            className="text-[10px] font-black uppercase tracking-[2px] text-rose-500 hover:text-rose-400 transition-colors px-2"
                        >
                            Lock
                        </button>
                    </div>
                )}

                {renderPage()}
            </div>
        </FileProvider>
    )
}

export default App
