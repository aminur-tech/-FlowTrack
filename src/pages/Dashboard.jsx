import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, CheckSquare, Calendar, BarChart3, Users,
    Settings, LogOut, Search, Bell, Mail, ArrowUpRight, Plus,
    Play, Pause, Square, X, MoreHorizontal
} from 'lucide-react';

// --- SUB-COMPONENTS ---

const IconButton = ({ icon }) => (
    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 hover:bg-gray-50 transition-colors">
        {icon}
    </button>
);

const NavItem = ({ icon, label, active, badge }) => (
    <div className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-200 group ${active ? 'bg-[#0F4C3A] text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-[#0F4C3A]'
        }`}>
        <div className="flex items-center gap-3">
            {icon} <span className="font-semibold text-sm">{label}</span>
        </div>
        {badge && <span className="bg-[#0F4C3A] text-white text-[10px] px-2 py-0.5 rounded-md group-hover:bg-white group-hover:text-[#0F4C3A]">{badge}</span>}
    </div>
);

const StatCard = ({ title, val, trend, dark }) => (
    <div className={`p-6 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden transition-transform hover:scale-[1.02] cursor-default ${dark ? 'bg-[#0F4C3A] text-white' : 'bg-white text-[#1A1C1E]'
        }`}>
        <div className="flex justify-between items-start mb-4">
            <p className={`text-xs font-bold ${dark ? 'opacity-60' : 'text-gray-400'}`}>{title}</p>
            <div className={`p-1.5 rounded-full border ${dark ? 'border-white/20' : 'border-gray-100'}`}>
                <ArrowUpRight size={14} />
            </div>
        </div>
        <h2 className="text-4xl font-black mb-2">{val}</h2>
        <p className={`text-[10px] font-bold ${dark ? 'text-green-300' : 'text-green-600'}`}>
            <span className="mr-1 inline-block bg-current w-1.5 h-1.5 rounded-full" /> {trend}
        </p>
    </div>
);

const TimeTracker = () => {
    const [isActive, setIsActive] = useState(false);
    const [seconds, setSeconds] = useState(5048); // Initial time 01:24:08

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => setSeconds((s) => s + 1), 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const formatTime = (s) => {
        const h = Math.floor(s / 3600).toString().padStart(2, '0');
        const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
        const sec = (s % 60).toString().padStart(2, '0');
        return `${h}:${m}:${sec}`;
    };

    return (
        <div className="bg-[#0F4C3A] p-6 rounded-[2.5rem] text-white relative overflow-hidden flex flex-col justify-between h-full group shadow-lg">
            <h3 className="text-xs font-bold opacity-60 relative z-10">Time Tracker</h3>
            <div className="text-center relative z-10">
                <span className="text-4xl font-black tracking-widest font-mono">{formatTime(seconds)}</span>
            </div>
            <div className="flex justify-center gap-3 relative z-10">
                <button
                    onClick={() => setIsActive(!isActive)}
                    className="bg-white text-[#0F4C3A] p-3 rounded-full hover:scale-110 transition-transform"
                >
                    {isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                </button>
                <button onClick={() => setSeconds(0)} className="bg-red-500/20 text-red-400 p-3 rounded-full hover:bg-red-500/40 transition-colors">
                    <Square size={20} fill="currentColor" />
                </button>
            </div>
            {/* Decorative SVG Wave Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full"><path fill="none" stroke="white" strokeWidth="0.5" d="M0,160 Q50,110 100,160 T200,160" /></svg>
            </div>
        </div>
    );
};

const AddProjectModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Create New Project</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                </div>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                    <input type="text" placeholder="Project Title" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#0F4C3A]" required />
                    <input type="date" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#0F4C3A]" required />
                    <button className="w-full bg-[#0F4C3A] text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity">Launch Project</button>
                </form>
            </div>
        </div>
    );
};

// --- MAIN DASHBOARD ---

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#F8F9FA] text-[#1A1C1E] font-sans p-4 gap-4">
            <AddProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* SIDEBAR */}
            <aside className="w-64 bg-white rounded-[2.5rem] p-6 flex flex-col shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-10 px-2">
                    <div className="w-10 h-10 bg-[#0F4C3A] rounded-2xl flex items-center justify-center text-white">
                        <div className="border-2 border-white rounded-full w-5 h-5" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">Donezo</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest px-3">Menu</p>
                    <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                    <NavItem icon={<CheckSquare size={20} />} label="Tasks" badge="12+" />
                    <NavItem icon={<Calendar size={20} />} label="Calendar" />
                    <NavItem icon={<BarChart3 size={20} />} label="Analytics" />
                    <NavItem icon={<Users size={20} />} label="Team" />

                    <div className="pt-8">
                        <p className="text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest px-3">General</p>
                        <NavItem icon={<Settings size={20} />} label="Settings" />
                        <NavItem icon={<LogOut size={20} />} label="Logout" />
                    </div>
                </nav>

                <div className="bg-[#0F4C3A] rounded-2xl p-4 mt-auto relative overflow-hidden group">
                    <p className="text-white text-xs font-medium mb-3 relative z-10">Download our Mobile App</p>
                    <button className="bg-[#1D634B] text-white text-[10px] py-2 px-4 rounded-lg relative z-10 hover:bg-white hover:text-[#0F4C3A] transition-colors">
                        Download
                    </button>
                    <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 px-4 overflow-y-auto">
                {/* HEADER */}
                <header className="flex justify-between items-center mb-8">
                    <div className="relative w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Search task" className="w-full bg-white border border-gray-100 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/10 transition-all" />
                    </div>
                    <div className="flex items-center gap-4">
                        <IconButton icon={<Mail size={20} />} />
                        <IconButton icon={<Bell size={20} />} />
                        <div className="flex items-center gap-3 ml-2">
                            <div className="text-right">
                                <p className="text-sm font-bold leading-none">Totok Michael</p>
                                <p className="text-[10px] text-gray-400">tmichael20@mail.com</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white shadow-sm overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* TITLE SECTION */}
                <section className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-4xl font-black mb-1">Dashboard</h1>
                        <p className="text-gray-400 text-sm">Plan, prioritize, and accomplish your tasks with ease.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#0F4C3A] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-md active:scale-95"
                        >
                            <Plus size={20} /> Add Project
                        </button>
                        <button className="bg-white border border-gray-200 px-6 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-colors">
                            Import Data
                        </button>
                    </div>
                </section>

                {/* BENTO STATS */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Projects" val="24" trend="Increased from last month" dark />
                    <StatCard title="Ended Projects" val="10" trend="Increased from last month" />
                    <StatCard title="Running Projects" val="12" trend="Increased from last month" />
                    <StatCard title="Pending Project" val="2" trend="On Discuss" />
                </div>

                {/* LOWER GRID */}
                <div className="grid grid-cols-12 gap-6 pb-4">
                    <div className="col-span-8 space-y-6">
                        {/* Analytics Card */}
                        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm h-72">
                            <h3 className="font-bold text-lg mb-8">Project Analytics</h3>
                            <div className="flex items-end justify-between h-32 px-4 gap-4">
                                {[45, 85, 70, 100, 65, 55, 40].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-3">
                                        <div className={`w-full max-w-[45px] rounded-2xl transition-all duration-700 ${i === 3 ? 'bg-[#0F4C3A]' : 'bg-[#0F4C3A]/15'}`} style={{ height: `${h}%` }} />
                                        <span className="text-[10px] font-bold text-gray-400">{'SMTWTFS'[i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Team List Card */}
                        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg">Team Collaboration</h3>
                                <button className="text-[10px] font-bold border px-4 py-2 rounded-full hover:bg-gray-50">+ Add Member</button>
                            </div>
                            <div className="space-y-5">
                                {[
                                    { name: "Alexandra Deff", role: "Github Project Repository", status: "Completed", color: "text-green-600 bg-green-50" },
                                    { name: "Edwin Adenike", role: "Integrate User Auth", status: "In Progress", color: "text-orange-600 bg-orange-50" }
                                ].map((member, i) => (
                                    <div key={i} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} className="w-10 h-10 rounded-full bg-gray-100" alt="" />
                                            <div>
                                                <p className="text-sm font-bold">{member.name}</p>
                                                <p className="text-xs text-gray-400">Working on <span className="text-[#1A1C1E]">{member.role}</span></p>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-xl ${member.color}`}>{member.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 space-y-6">
                        {/* Reminders Card */}
                        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Reminders</h3>
                            <div className="bg-[#0F4C3A] text-white p-6 rounded-[2.5rem] relative overflow-hidden group">
                                <p className="text-sm font-bold mb-1">Meeting with Arc Company</p>
                                <p className="text-[10px] opacity-60 mb-6 font-medium">Time: 02:00 pm - 04:00 pm</p>
                                <button className="bg-white/10 w-full py-3.5 rounded-2xl text-[10px] font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-[#0F4C3A] transition-all">
                                    <Play size={14} fill="currentColor" /> Start Meeting
                                </button>
                            </div>
                        </div>

                        {/* Time Tracker Section */}
                        <div className="h-64">
                            <TimeTracker />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;