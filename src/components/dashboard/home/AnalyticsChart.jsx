import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsChart = ({ analytics }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border h-96 w-full">
      <h3 className="font-bold mb-6">Project Analytics</h3>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={analytics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="views" fill="#0F4C3A" />
          <Bar dataKey="clicks" fill="#2563EB" />
          <Bar dataKey="conversions" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;