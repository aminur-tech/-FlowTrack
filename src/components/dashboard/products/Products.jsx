import React, { useEffect, useState } from 'react';
import { MoreVertical, Filter, Download, Plus, Tag } from 'lucide-react';
import { getProduct } from '../../../services/dashboardApi';



const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
        <div className="space-y-6">
            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-emerald-950">Products</h2>
                    <p className="text-sm text-gray-500">Manage your subscription plans and digital add-ons.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                        <Download size={18} />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-900 rounded-xl hover:bg-emerald-950 transition-all shadow-lg shadow-emerald-900/20">
                        <Plus size={18} />
                        Add Product
                    </button>
                </div>
            </div>

            {/* --- FILTER BAR --- */}
            <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
                        <Filter size={14} />
                        <span>Filter</span>
                    </div>
                    <span className="text-sm text-gray-400">Showing {products.length} products</span>
                </div>
            </div>

            {/* --- TABLE SECTION --- */}
            <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Product Name</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Category</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Price</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Total Sales</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
                                                <Tag size={20} />
                                            </div>
                                            <span className="font-semibold text-gray-900">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">${product.price}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <span className="bg-gray-100 px-2.5 py-1 rounded-lg font-medium">{product.sales} sales</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${product.status === 'Active'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-gray-400 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition-all">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
                    <button className="text-sm font-medium text-gray-500 hover:text-emerald-700 disabled:opacity-50">Previous</button>
                    <div className="flex gap-2">
                        {[1, 2, 3].map(page => (
                            <button key={page} className={`w-8 h-8 text-xs font-bold rounded-lg ${page === 1 ? 'bg-emerald-900 text-white' : 'text-gray-400 hover:bg-gray-100'}`}>
                                {page}
                            </button>
                        ))}
                    </div>
                    <button className="text-sm font-medium text-emerald-900 hover:text-emerald-700">Next</button>
                </div>
            </div>
        </div>
    );
};

export default Products;