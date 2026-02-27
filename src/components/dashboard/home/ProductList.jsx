import React from "react";


const ProductList = ({ products }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border w-80">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Product</h3>
        <button className="text-green-600 font-semibold border border-green-600 px-3 py-1 rounded-full hover:bg-green-50 transition">
          + New
        </button>
      </div>

      <div className="space-y-4">
        {products?.map((product) => (
          <div key={product.id} className="flex items-center gap-4">
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-xs text-gray-400">
                Due date: {new Date(product.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;