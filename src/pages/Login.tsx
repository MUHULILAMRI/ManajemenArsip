import React, { useState } from 'react';
import { Mail, Lock, Zap, AlertCircle, Fingerprint, ShieldAlert, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginProps {
    onLogin: (role: 'admin' | 'user') => void;
}

export const Login = ({ onLogin }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            if (email === 'admin' && password === 'admin') {
                setIsLoading(false);
                onLogin('admin');
            } else if (email === 'user' && password === 'user') {
                setIsLoading(false);
                onLogin('user');
            } else {
                setIsLoading(false);
                setError('Invalid credentials. Try "admin/admin" or "user/user"');
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-primary/30 selection:text-white">
            {/* Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent-violet/10 rounded-full blur-[100px] mix-blend-screen animate-float" />
                <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-accent-cyan/10 rounded-full blur-[80px] mix-blend-screen" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-[420px] z-10"
            >
                {/* Brand Header */}
                <div className="flex flex-col items-center mb-8">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="size-16 bg-gradient-to-br from-primary to-primary-hover rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-primary/40 mb-6 relative group"
                    >
                        <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Zap className="size-8 relative z-10" fill="currentColor" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl font-black text-white tracking-tight text-center"
                    >
                        Arcive<span className="text-primary text-glow">Max</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-400 text-sm font-medium mt-2 text-center"
                    >
                        Next-Gen Secure Document Vault
                    </motion.p>
                </div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="glass-card p-8 rounded-[2rem] border border-white/10 relative overflow-hidden"
                >
                    {/* Top Shine Effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

                    <div className="mb-8 text-center">
                        <h2 className="text-lg font-bold text-white mb-1">Welcome Back</h2>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Auth_Token: Required</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleLogin}>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold p-3 rounded-xl flex items-center gap-2"
                            >
                                <AlertCircle size={14} />
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-[2px] text-slate-500 ml-1">Identity</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-primary transition-colors duration-300" />
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Username or Email"
                                    className="w-full bg-background-dark/50 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 hover:bg-background-dark/70"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-black uppercase tracking-[2px] text-slate-500">Creds</label>
                                <a href="#" className="text-[10px] font-bold uppercase tracking-wider text-primary hover:text-primary-hover hover:underline decoration-primary/30 underline-offset-4 transition-all">Recover Key?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-primary transition-colors duration-300" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full bg-background-dark/50 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 hover:bg-background-dark/70"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/25 relative overflow-hidden group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <span className={`relative z-10 flex items-center justify-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                                <Zap size={18} fill="currentColor" />
                                <span>Biometric Handshake</span>
                            </span>
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4 text-center">
                        <div className="flex justify-center gap-6">
                            <div className="flex flex-col items-center">
                                <Fingerprint className="size-6 text-slate-600 mb-1" />
                                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Fingerprint</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <ShieldAlert className="size-6 text-slate-600 mb-1" />
                                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Face ID</span>
                            </div>
                        </div>
                        <div className="text-[10px] text-slate-700 font-mono flex items-center justify-center gap-2">
                            <span>TLS 1.3 Secured</span>
                            <span className="size-1 rounded-full bg-slate-700" />
                            <span>FIPS 140-2 Encrypted Session</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};
