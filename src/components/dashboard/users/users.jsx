import React, { useEffect, useState, useMemo } from 'react';
import {
    MoreVertical,
    UserPlus,
    Search,
    Mail,
    Calendar as CalendarIcon,
    ShieldCheck,
    Circle
} from 'lucide-react';
import { getUsers } from '../../../services/dashboardApi';

const Users = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // ✅ Search + Filter Logic
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === "all" || user.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [users, searchTerm, statusFilter]);

    if (loading) return <p className="p-10">Loading...</p>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-emerald-950 dark:text-white">
                        User Management
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage your team members and their account permissions.
                    </p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-emerald-900 dark:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-950 dark:hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/10">
                    <UserPlus size={18} />
                    Add New User
                </button>
            </div>

            {/* --- FILTER SECTION --- */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm">
                
                {/* Search */}
                <div className="relative w-full md:w-96">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white"
                    />
                </div>

                {/* Status Filter */}
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                    <option value="all">All Users</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {/* --- USERS TABLE --- */}
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">User Details</th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Status</th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Role</th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Joined Date</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white text-sm">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                                                user.status === 'active'
                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                    : 'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-gray-400'
                                            }`}>
                                                <Circle size={8} fill="currentColor" />
                                                {user.status}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                            <ShieldCheck size={14} className="text-blue-500" />
                                            {user.role}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                            {user.joinDate}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-400 hover:text-emerald-900 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-all">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-gray-400">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;