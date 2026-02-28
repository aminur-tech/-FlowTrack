import React, { useEffect, useState, useMemo } from 'react';
import { MoreVertical, Filter, Download, Plus, Tag } from 'lucide-react';
import { getProduct } from '../../../services/dashboardApi';
import toast from 'react-hot-toast';
import { useOutletContext } from 'react-router';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("default");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { searchTerm } = useOutletContext();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const isFormValid =
        formData.title.trim() !== "" &&
        formData.description.trim() !== "" &&
        formData.category.trim() !== "" &&
        formData.price !== "" &&
        Number(formData.price) > 0;

    const handleSubmit = () => {
        console.log("New Product:", formData);
        toast.success(`Product "${formData.title}" added successfully!`);
        setFormData({
            title: "",
            description: "",
            category: "",
            price: ""
        });
        setIsModalOpen(false);
    };

    const handleExport = () => {
        console.log("Exporting Products:", products);
        toast.success("Products exported successfully!");
    };

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

    // ✅ Sorting Logic
    const sortedProducts = useMemo(() => {
        let sorted = [...products];
        if (sortOrder === "low-high") sorted.sort((a, b) => a.price - b.price);
        else if (sortOrder === "high-low") sorted.sort((a, b) => b.price - a.price);
        return sorted;
    }, [products, sortOrder]);

    // ✅ Filter + Search Logic
    const filteredProducts = useMemo(() => {
        return sortedProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [sortedProducts, searchTerm, categoryFilter]);

    if (loading) return (
        <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-900"></div>
        </div>
    );

    return (
        <div className="space-y-6 text-gray-900 dark:text-gray-100">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-400">
                        Products
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage your subscription plans and digital add-ons.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold 
                     text-gray-600 dark:text-gray-300
                     bg-white dark:bg-gray-800
                     border border-gray-200 dark:border-gray-700
                     rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                        <Download size={18} />
                        Export
                    </button>

                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white
                   bg-emerald-900 hover:bg-emerald-950
                   dark:bg-emerald-600 dark:hover:bg-emerald-500
                    rounded-xl transition-all shadow-lg">
                        <Plus size={18} />
                        Add Product
                    </button>

                    {/* MODAL */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
                            <div className="bg-white dark:bg-slate-900 w-full max-w-md p-8 rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-300">

                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                                >
                                    ✕
                                </button>

                                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                                    Add New Product
                                </h2>

                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Product Title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                    <textarea
                                        name="description"
                                        placeholder="Product Description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                    <input
                                        type="text"
                                        name="category"
                                        placeholder="Category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!isFormValid}
                                        className={`w-full py-3 rounded-xl font-bold transition-all 
                                         ${isFormValid
                                                ? "bg-emerald-900 dark:bg-emerald-600 text-white hover:scale-[1.02]"
                                                : "bg-gray-300 dark:bg-slate-700 text-gray-500 cursor-not-allowed"
                                            }
  `}
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* FILTER BAR */}
            <div className="flex items-center justify-between p-4 
             bg-white dark:bg-gray-900
             border border-gray-100 dark:border-gray-800
             rounded-2xl">

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 
                  bg-emerald-50 dark:bg-emerald-900/30
                  text-emerald-700 dark:text-emerald-400
                     rounded-lg text-sm font-medium">
                        <Filter size={14} />
                        <span>Filter</span>
                    </div>

                    <span className="text-sm text-gray-400 dark:text-gray-500">
                        Showing {filteredProducts.length} products
                    </span>
                </div>

                <div className="flex gap-2">
                    {/* Category Filter */}
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2 text-sm font-semibold 
                        bg-gray-50 dark:bg-gray-800
                        border border-gray-200 dark:border-gray-700
                        rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                        <option value="all">All Categories</option>
                        {Array.from(new Set(products.map(p => p.category))).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    {/* Price Sort */}
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-4 py-2 text-sm font-semibold 
                        bg-gray-50 dark:bg-gray-800
                        border border-gray-200 dark:border-gray-700
                        rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                        <option value="default">Sort by Price</option>
                        <option value="low-high">Price: Low to High</option>
                        <option value="high-low">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white dark:bg-gray-950
             border border-gray-100 dark:border-gray-800
             rounded-3xl overflow-hidden shadow-sm">

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Product Name</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Category</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Price</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Total Sales</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400 dark:text-gray-500 text-lg">
                                        No items found.
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 
                                                bg-emerald-100 dark:bg-emerald-900/40
                                                rounded-xl flex items-center justify-center 
                                                text-emerald-700 dark:text-emerald-400">
                                                    <Tag size={20} />
                                                </div>
                                                <span className="font-semibold">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{product.category}</td>
                                        <td className="px-6 py-4 text-sm font-bold">${product.price}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-lg font-medium">
                                                {product.sales} sales
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide${product.status === 'Active'
                                                ? ' bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                                                : ' bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'
                                                }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-400 hover:text-emerald-900 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-lg transition-all">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default Products;