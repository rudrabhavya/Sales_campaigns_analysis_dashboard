import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import StatCard from '../components/StatCard';

const data = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your retail analytics overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value="$54,350"
          icon={<DollarSign size={24} />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Products Sold"
          value="1,245"
          icon={<ShoppingBag size={24} />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Active Customers"
          value="892"
          icon={<Users size={24} />}
          trend={{ value: 3.1, isPositive: true }}
        />
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          icon={<TrendingUp size={24} />}
          trend={{ value: 1.2, isPositive: false }}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#4F46E5" 
                strokeWidth={2}
                dot={{ fill: '#4F46E5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}