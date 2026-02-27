import React, { useEffect, useState } from 'react';
import {
    Plus,
    ArrowUpRight,
    Pause,
    Square,
    Video,
    MoreHorizontal,
    Circle
} from 'lucide-react';
// Import Recharts components for dynamic analysis
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getAnalytics, getOverview, getUsers } from '../../../services/dashboardApi';

const DashboardHome = () => {
    const [overview, setOverview] = useState(null);
    const [analytics, setAnalytics] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [overviewData, analyticsData, usersData] = await Promise.all([
                    getOverview(),
                    getAnalytics(),
                    getUsers(),
                ]);
                
                setOverview(overviewData);
                setAnalytics(analyticsData);
                setUsers(usersData);
               
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-900"></div>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-700 pb-10">
            {/* --- TOP HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Real-time dynamic analysis of your ecosystem.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-emerald-900 dark:bg-emerald-600 text-white px-5 py-2.5 rounded-full font-bold hover:opacity-90 transition-all text-sm">
                        <Plus size={18} /> Add Project
                    </button>
                </div>
            </div>

            {/* --- DYNAMIC STAT CARDS --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Users" value={overview?.totalUsers || 0} growth="+12% vs last month" primary />
                <StatCard title="Active Users" value={overview?.activeUsers || 0} growth="8% higher than avg" />
                <StatCard title="Revenue" value={`$${overview?.revenue?.toLocaleString() || 0}`} growth="+2.4% weekly" />
                <StatCard title="Platform Growth" value={`${overview?.growth || 0}%`} growth="On Track" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* --- DYNAMIC ANALYSIS (RECHARTS) --- */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Dynamic Traffic Analysis</h3>
                        <div className="text-xs font-semibold text-gray-400">Last 5 Days</div>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analytics}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="date" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#94a3b8', fontSize: 10}}
                                    tickFormatter={(str) => str.split('-').slice(2).join('')} // Shows only day
                                />
                                <YAxis hide />
                                <Tooltip 
                                    cursor={{fill: '#f8fafc'}}
                                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                                />
                                <Bar dataKey="views" radius={[10, 10, 10, 10]} barSize={35}>
                                    {analytics.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 2 ? '#34d399' : '#064e3b'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* --- REMINDERS --- */}
                <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Reminders</h3>
                        <h4 className="text-2xl font-bold text-emerald-900 dark:text-emerald-400 leading-tight">System Performance Review</h4>
                        <p className="text-gray-400 text-sm mt-2">Time : 04.00 pm Today</p>
                    </div>
                    <button className="mt-8 flex items-center justify-center gap-3 w-full bg-emerald-900 dark:bg-emerald-700 text-white py-4 rounded-3xl font-bold hover:scale-[1.02] transition-all">
                        <Video size={20} /> Start Meeting
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* --- DYNAMIC TEAM/USERS LIST --- */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Users Activity</h3>
                        <button className="text-xs font-bold text-emerald-900 dark:text-emerald-400 border border-emerald-900/20 px-4 py-1.5 rounded-full hover:bg-emerald-50 transition-all">
                            View All {users.length}
                        </button>
                    </div>
                    <div className="space-y-6">
                        {users.slice(0, 4).map((user) => (
                            <TeamMember 
                                key={user.id}
                                name={user.name} 
                                task={user.email} 
                                status={user.status === 'active' ? 'Active' : 'Offline'} 
                                img={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                            />
                        ))}
                    </div>
                </div>

                {/* --- TIME TRACKER --- */}
                <div className="bg-emerald-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <h3 className="text-lg font-bold opacity-80">Project Timer</h3>
                        <div className="my-8">
                            <span className="text-5xl font-black tracking-tighter">01:24:08</span>
                        </div>
                        <div className="flex gap-4">
                            <button className="bg-white text-emerald-950 p-4 rounded-full hover:scale-110 transition-all"><Pause fill="currentColor" size={20} /></button>
                            <button className="bg-red-500 text-white p-4 rounded-full hover:scale-110 transition-all"><Square fill="currentColor" size={20} /></button>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 border-[20px] border-emerald-800/30 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

/* --- SUB-COMPONENTS --- */

const StatCard = ({ title, value, growth, primary = false }) => (
    <div className={`p-6 rounded-[2rem] shadow-sm relative overflow-hidden transition-transform hover:scale-[1.02] ${primary ? 'bg-emerald-900 text-white' : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-gray-900 dark:text-white'}`}>
        <div className="flex justify-between items-start relative z-10">
            <h4 className="text-sm font-semibold opacity-80">{title}</h4>
            <div className={`p-1.5 rounded-full border ${primary ? 'border-white/20' : 'border-gray-200 dark:border-slate-700'}`}>
                <ArrowUpRight size={16} />
            </div>
        </div>
        <div className="mt-4 mb-2 relative z-10">
            <span className="text-4xl font-black">{value}</span>
        </div>
        <p className={`text-[10px] font-bold relative z-10 ${primary ? 'text-emerald-100' : 'text-emerald-600 dark:text-emerald-400'}`}>
            {growth}
        </p>
        {primary && <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-800 rounded-full blur-2xl opacity-50"></div>}
    </div>
);

const TeamMember = ({ name, task, status, img }) => (
    <div className="flex items-center justify-between group cursor-default">
        <div className="flex items-center gap-4">
            <img src={img} alt={name} className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-slate-800 border-2 border-white dark:border-slate-700 transition-transform group-hover:scale-105" />
            <div>
                <p className="font-bold text-sm text-gray-900 dark:text-white">{name}</p>
                <p className="text-xs text-gray-400 truncate max-w-[150px]">{task}</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <Circle size={8} fill={status === 'Active' ? '#10b981' : '#94a3b8'} className={status === 'Active' ? 'text-emerald-500' : 'text-gray-400'} />
            <span className={`text-[10px] font-bold uppercase tracking-widest ${status === 'Active' ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-400'}`}>
                {status}
            </span>
        </div>
    </div>
);

export default DashboardHome;