import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

// Recharts imports
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: deliveryStatusStats = [] } = useQuery({
    queryKey: ['delivery-status-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels/delivery-status/stats');
      return res.data;
    }
  });

  return (
    <div className="p-5 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard Home</h2>

      {/* Stats Cards */}
      <div className="stats shadow py-5 mb-10">
        {deliveryStatusStats.map(stat => (
          <div key={stat._id} className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-xl">{stat.deliveryStatus}</div>
            <div className="stat-value">{stat.count}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Pie Chart */}
        <div className="bg-base-100 shadow-md p-5 rounded-lg">
          <h3 className="text-xl font-semibold text-center mb-4">
            Delivery Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deliveryStatusStats}
                dataKey="count"
                nameKey="deliveryStatus"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {deliveryStatusStats.map((entry, index) => (
                  <Cell key={entry._id} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-base-100 shadow-md p-5 rounded-lg">
          <h3 className="text-xl font-semibold text-center mb-4">
            Delivery Status Bar Chart
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deliveryStatusStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="deliveryStatus" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardHome;
