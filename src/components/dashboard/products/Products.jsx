import React, { useEffect, useState, useMemo } from 'react';
import { MoreVertical, Filter, Download, Plus, Tag } from 'lucide-react';
import { getProduct } from '../../../services/dashboardApi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");

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

    if (sortOrder === "low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [products, sortOrder]);

  if (loading)
    return <p className="p-10 text-gray-600 dark:text-gray-400">Loading...</p>;

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
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold 
          text-gray-600 dark:text-gray-300
          bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700
          rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            <Download size={18} />
            Export
          </button>

          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white
          bg-emerald-900 hover:bg-emerald-950
          dark:bg-emerald-600 dark:hover:bg-emerald-500
          rounded-xl transition-all shadow-lg">
            <Plus size={18} />
            Add Product
          </button>
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
            Showing {sortedProducts.length} products
          </span>
        </div>

        {/* ✅ Price Sort Dropdown */}
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
              {sortedProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-900 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 
                      bg-emerald-100 dark:bg-emerald-900/40
                      rounded-xl flex items-center justify-center 
                      text-emerald-700 dark:text-emerald-400">
                        <Tag size={20} />
                      </div>
                      <span className="font-semibold">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-sm font-bold">
                    ${product.price}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-lg font-medium">
                      {product.sales} sales
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide
                    ${product.status === 'Active'
                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                        : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'
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
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default Products;