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
import toast from 'react-hot-toast';

const Users = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        status: "active"
    });

    const isFormValid =
        formData.name.trim() !== "" &&
        formData.email.trim() !== "" &&
        /\S+@\S+\.\S+/.test(formData.email) &&
        formData.role.trim() !== "";

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // handle form submission
    const handleSubmit = () => {
        if (!isFormValid) return;
        console.log("New User:", formData);
        toast.success(`User "${formData.name}" added successfully!`);

        const newUser = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status,
            joinDate: new Date().toLocaleDateString()
        };

        setUsers([...users, newUser]);

        setFormData({
            name: "",
            email: "",
            role: "",
            status: "active"
        });

        setIsModalOpen(false);
    };

    // fetch users on component mount

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

   
    // ✅ Filter users by global searchTerm
    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (statusFilter === "all" || user.status === statusFilter)
        );
    }, [users, searchTerm, statusFilter]);

    if (loading) return (
        <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-900"></div>
        </div>
    );

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
                <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 bg-emerald-900 dark:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-950 dark:hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/10">
                    <UserPlus size={18} />
                    Add New User
                </button>
                {/* modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-slate-900 w-full max-w-md p-6 rounded-2xl shadow-xl relative border border-gray-100 dark:border-slate-800">

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-3 right-4 text-gray-400 hover:text-red-500"
                            >
                                ✕
                            </button>

                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                                Add New User
                            </h3>

                            <div className="space-y-4">

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />

                                <input
                                    type="text"
                                    name="role"
                                    placeholder="Role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>

                                <button
                                    onClick={handleSubmit}
                                    disabled={!isFormValid}
                                    className={`w-full py-2 rounded-xl font-bold transition-all
                                    ${isFormValid
                                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                            : "bg-gray-300 dark:bg-slate-700 text-gray-500 cursor-not-allowed"}`}
                                >
                                    Add User
                                </button>

                            </div>
                        </div>
                    </div>
                )}
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
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${user.status === 'active'
                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                : 'bg-red-100 text-red-500 dark:bg-red-900/20 dark:text-red-400'
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