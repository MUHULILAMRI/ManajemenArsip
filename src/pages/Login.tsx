import React from 'react';
import { Mail, Lock, ChevronRight, Fingerprint, ShieldAlert, Zap } from 'lucide-react';

export const Login = () => {
    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Decorative Circles */}
            <div className="absolute top-[-10%] right-[-5%] size-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
            <div className="absolute bottom-[-10%] left-[-5%] size-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

            <div className="w-full max-w-[440px] z-10">
                {/* Brand */}
                <div className="flex flex-col items-center mb-10">
                    <div className="size-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-primary/40 mb-6">
                        <Zap className="size-8" fill="currentColor" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight">ArciveMax</h1>
                    <p className="text-slate-500 text-sm font-medium mt-2">Enterprise Grade Document Management</p>
                </div>

                {/* Login Card */}
                <div className="bg-background-cardish/80 backdrop-blur-2xl border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-white mb-2">System Login</h2>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Authentication Proxy v4.1</p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-[2px] text-slate-500 ml-1">Email Endpoint</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="name@company.com"
                                        className="w-full bg-sidebar-active/30 border border-border-dark rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] font-black uppercase tracking-[2px] text-slate-500">Security Key</label>
                                    <a href="#" className="text-[9px] font-black uppercase tracking-wider text-primary hover:underline">Forgot Key?</a>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="password"
                                        placeholder="••••••••••••"
                                        className="w-full bg-sidebar-active/30 border border-border-dark rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 px-1">
                            <input type="checkbox" id="remember" className="rounded border-border-dark bg-background-dark text-primary focus:ring-primary/20" />
                            <label htmlFor="remember" className="text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer select-none">Trusted Device</label>
                        </div>

                        <button className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-black text-sm tracking-[2px] uppercase shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group transition-all active:scale-[0.98]">
                            <span>Authorize Access</span>
                            <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4">
                        <button className="w-full flex items-center justify-center gap-3 py-3 border border-border-dark rounded-2xl text-[10px] font-black uppercase tracking-[2px] text-slate-400 hover:bg-sidebar-hover transition-colors">
                            <Fingerprint className="size-4" />
                            <span>Biometric SSO</span>
                        </button>
                    </div>
                </div>

                {/* Security Footer */}
                <div className="mt-10 flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-[2px] text-slate-600 px-6 py-3 bg-white/5 rounded-full border border-white/5">
                    <ShieldAlert className="size-3 text-amber-500" />
                    <span>FIPS 140-2 Encrypted Session</span>
                    <div className="size-1 rounded-full bg-slate-700 mx-2" />
                    <span className="text-emerald-500">Node Secure</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
