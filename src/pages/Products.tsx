import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  sales: number;
}

const products: Product[] = [
  {
    id: 'P001',
    name: 'Wireless Earbuds',
    category: 'Electronics',
    stock: 45,
    price: 99.99,
    sales: 156,
  },
  {
    id: 'P002',
    name: 'Smart Watch',
    category: 'Electronics',
    stock: 28,
    price: 199.99,
    sales: 89,
  },
  {
    id: 'P003',
    name: 'Running Shoes',
    category: 'Sports',
    stock: 64,
    price: 79.99,
    sales: 212,
  },
  {
    id: 'P004',
    name: 'Coffee Maker',
    category: 'Home',
    stock: 12,
    price: 149.99,
    sales: 67,
  },
];

const salesData = [
  { category: 'Electronics', sales: 245 },
  { category: 'Sports', sales: 212 },
  { category: 'Home', sales: 67 },
  { category: 'Fashion', sales: 156 },
  { category: 'Books', sales: 98 },
];

const columns = [
  { header: 'ID', accessor: 'id' as const },
  { header: 'Name', accessor: 'name' as const },
  { header: 'Category', accessor: 'category' as const },
  {
    header: 'Stock',
    accessor: 'stock' as const,
    render: (value: number) => (
      <span className={value < 20 ? 'text-red-600 font-semibold' : ''}>
        {value}
      </span>
    ),
  },
  {
    header: 'Price',
    accessor: 'price' as const,
    render: (value: number) => `$${value.toFixed(2)}`,
  },
  { header: 'Sales', accessor: 'sales' as const },
];

export default function Products() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-600">Monitor your product performance and inventory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value="486"
          icon={<Package size={24} />}
          trend={{ value: 5.8, isPositive: true }}
        />
        <StatCard
          title="Top Selling"
          value="Electronics"
          icon={<TrendingUp size={24} />}
        />
        <StatCard
          title="Average Price"
          value="$89.99"
          icon={<DollarSign size={24} />}
        />
        <StatCard
          title="Low Stock Items"
          value="12"
          icon={<AlertCircle size={24} />}
          trend={{ value: 2.4, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          <div className="space-y-4">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${product.price}</p>
                  <p className="text-sm text-gray-600">{product.sales} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Product Inventory</h2>
        </div>
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
}