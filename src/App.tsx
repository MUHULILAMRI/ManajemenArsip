import React, { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Explorer from './pages/Explorer'
import UserManagement from './pages/UserManagement'
import Login from './pages/Login'

function App() {
    const [currentPage, setCurrentPage] = useState('login');

    const renderPage = () => {
        switch (currentPage) {
            case 'login': return <Login />;
            case 'dashboard': return <Dashboard />;
            case 'explorer': return <Explorer />;
            case 'users': return <UserManagement />;
            default: return <Dashboard />;
        }
    }

    return (
        <div className="dark bg-background-dark min-h-screen relative text-slate-200">
            {currentPage !== 'login' && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-background-cardish/90 backdrop-blur-xl border border-border-dark px-6 py-3 rounded-full z-[100] shadow-2xl flex gap-6 items-center">
                    <button
                        onClick={() => setCurrentPage('dashboard')}
                        className={`text-[10px] font-black uppercase tracking-[2px] ${currentPage === 'dashboard' ? 'text-primary' : 'text-slate-500 hover:text-white transition-colors'}`}
                    >
                        Terminal
                    </button>
                    <div className="h-4 w-px bg-border-dark" />
                    <button
                        onClick={() => setCurrentPage('explorer')}
                        className={`text-[10px] font-black uppercase tracking-[2px] ${currentPage === 'explorer' ? 'text-primary' : 'text-slate-500 hover:text-white transition-colors'}`}
                    >
                        Archive
                    </button>
                    <div className="h-4 w-px bg-border-dark" />
                    <button
                        onClick={() => setCurrentPage('users')}
                        className={`text-[10px] font-black uppercase tracking-[2px] ${currentPage === 'users' ? 'text-primary' : 'text-slate-500 hover:text-white transition-colors'}`}
                    >
                        Identity
                    </button>
                    <div className="h-4 w-px bg-border-dark ml-4 mr-2" />
                    <button
                        onClick={() => setCurrentPage('login')}
                        className="text-[10px] font-black uppercase tracking-[2px] text-rose-500 hover:text-rose-400 transition-colors"
                    >
                        Lock
                    </button>
                </div>
            )}

            {currentPage === 'login' && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
                    <button
                        onClick={() => setCurrentPage('dashboard')}
                        className="bg-primary/20 backdrop-blur-xl border border-primary/30 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[2px] text-primary hover:bg-primary/30 transition-all shadow-xl shadow-primary/20"
                    >
                        Bypass Auth (Demo Mode)
                    </button>
                </div>
            )}

            {renderPage()}
        </div>
    )
}

export default App
