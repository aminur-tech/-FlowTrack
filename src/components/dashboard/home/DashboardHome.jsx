import React, { useEffect, useState } from "react";
import AnalyticsChart from "./AnalyticsChart";
import TimeTracker from "./TimeTracker";
import { getAnalytics, getOverview, getProduct, getUsers } from "../../../services/dashboardApi";
import OverviewCard from "./OverviewCard";
import UserList from "./UserList";
import ProductList from "./ProductList";


const DashboardHome = () => {
    const [overview, setOverview] = useState(null);
    const [analytics, setAnalytics] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const overviewData = await getOverview();
                setOverview(overviewData);

                const analyticsData = await getAnalytics();
                setAnalytics(analyticsData);

                const usersData = await getUsers();
                setUsers(usersData);

                const productsData = await getProduct();
                setProducts(productsData);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className="p-10">Loading...</p>;

    return (
        <div className="flex min-h-screen  p-4 gap-4">
            <main className="flex-1 px-4">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-emerald-950">Dashboard</h2>
                        <p className="text-gray-400 mt-1 text-sm md:text-base">Plan, prioritize, and accomplish your tasks.</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none bg-emerald-900 hover:bg-emerald-950 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-lg shadow-emerald-900/10">
                            + Add Project
                        </button>
                        <button className="flex-1 md:flex-none bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors">
                            Import
                        </button>
                    </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <OverviewCard title="Total Users" value={overview?.totalUsers || 0} />
                    <OverviewCard title="Active Users" value={overview?.activeUsers || 0} />
                    <OverviewCard title="Revenue" value={overview?.revenue || 0} />
                    <OverviewCard title="Growth" value={overview?.growth || 0} />
                </div>



                <div className="flex gap-6 w-full">
                    {/* Analytics Chart */}
                    <AnalyticsChart analytics={analytics} className="flex-1" />

                    {/* Product List */}
                    <ProductList products={products} className="flex-1" />

                </div>


                {/* Time Tracker */}
                <div className="mt-8 grid grid-cols-2 gap-6">
                    <UserList users={users} />
                    <TimeTracker />
                </div>
            </main>
        </div>
    );
};

export default DashboardHome;