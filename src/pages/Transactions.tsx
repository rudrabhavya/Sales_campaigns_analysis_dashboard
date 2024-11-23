import React from 'react';
import { format } from 'date-fns';
import { Search, Filter } from 'lucide-react';
import DataTable from '../components/DataTable';

interface Transaction {
  id: string;
  date: Date;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  items: number;
}

const transactions: Transaction[] = [
  {
    id: 'TRX-001',
    date: new Date('2024-03-10'),
    customer: 'John Doe',
    amount: 299.99,
    status: 'completed',
    items: 3,
  },
  {
    id: 'TRX-002',
    date: new Date('2024-03-09'),
    customer: 'Jane Smith',
    amount: 149.50,
    status: 'completed',
    items: 2,
  },
  {
    id: 'TRX-003',
    date: new Date('2024-03-09'),
    customer: 'Bob Johnson',
    amount: 599.99,
    status: 'pending',
    items: 5,
  },
  {
    id: 'TRX-004',
    date: new Date('2024-03-08'),
    customer: 'Alice Brown',
    amount: 79.99,
    status: 'failed',
    items: 1,
  },
];

const columns = [
  { header: 'ID', accessor: 'id' as const },
  {
    header: 'Date',
    accessor: 'date' as const,
    render: (value: Date) => format(value, 'MMM dd, yyyy'),
  },
  { header: 'Customer', accessor: 'customer' as const },
  {
    header: 'Amount',
    accessor: 'amount' as const,
    render: (value: number) => `$${value.toFixed(2)}`,
  },
  {
    header: 'Status',
    accessor: 'status' as const,
    render: (value: string) => (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${
          value === 'completed'
            ? 'bg-green-100 text-green-800'
            : value === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {value}
      </span>
    ),
  },
  { header: 'Items', accessor: 'items' as const },
];

export default function Transactions() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">Manage and track your sales transactions</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <DataTable columns={columns} data={transactions} />
      </div>
    </div>
  );
}