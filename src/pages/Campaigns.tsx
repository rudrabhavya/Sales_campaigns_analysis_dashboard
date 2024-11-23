import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Users, DollarSign, TrendingUp } from 'lucide-react';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'scheduled';
  startDate: Date;
  endDate: Date;
  budget: number;
  spent: number;
  reach: number;
  conversions: number;
}

const campaigns: Campaign[] = [
  {
    id: 'C001',
    name: 'Summer Sale 2024',
    status: 'active',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-06-30'),
    budget: 5000,
    spent: 2150,
    reach: 45000,
    conversions: 380,
  },
  {
    id: 'C002',
    name: 'Back to School',
    status: 'scheduled',
    startDate: new Date('2024-08-15'),
    endDate: new Date('2024-09-15'),
    budget: 7500,
    spent: 0,
    reach: 0,
    conversions: 0,
  },
  {
    id: 'C003',
    name: 'Spring Collection',
    status: 'completed',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-31'),
    budget: 4000,
    spent: 3950,
    reach: 38000,
    conversions: 425,
  },
];

const roiData = [
  { campaign: 'Email', roi: 320 },
  { campaign: 'Social', roi: 280 },
  { campaign: 'Display', roi: 180 },
  { campaign: 'Search', roi: 420 },
];

const columns = [
  { header: 'Name', accessor: 'name' as const },
  {
    header: 'Status',
    accessor: 'status' as const,
    render: (value: string) => (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${
          value === 'active'
            ? 'bg-green-100 text-green-800'
            : value === 'scheduled'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    header: 'Budget',
    accessor: 'budget' as const,
    render: (value: number) => `$${value.toLocaleString()}`,
  },
  {
    header: 'Spent',
    accessor: 'spent' as const,
    render: (value: number) => `$${value.toLocaleString()}`,
  },
  {
    header: 'Reach',
    accessor: 'reach' as const,
    render: (value: number) => value.toLocaleString(),
  },
  {
    header: 'Conversions',
    accessor: 'conversions' as const,
    render: (value: number) => value.toLocaleString(),
  },
];

export default function Campaigns() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Marketing Campaigns</h1>
        <p className="text-gray-600">Track and analyze your marketing efforts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Campaigns"
          value="4"
          icon={<Target size={24} />}
          trend={{ value: 33.3, isPositive: true }}
        />
        <StatCard
          title="Total Reach"
          value="83,000"
          icon={<Users size={24} />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Budget Spent"
          value="$6,100"
          icon={<DollarSign size={24} />}
          trend={{ value: 8.7, isPositive: true }}
        />
        <StatCard
          title="Avg. ROI"
          value="285%"
          icon={<TrendingUp size={24} />}
          trend={{ value: 5.2, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">ROI by Channel</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="campaign" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="roi" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Campaign Performance</h2>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{campaign.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      campaign.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : campaign.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {campaign.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>Budget: ${campaign.budget.toLocaleString()}</div>
                  <div>Spent: ${campaign.spent.toLocaleString()}</div>
                  <div>Reach: {campaign.reach.toLocaleString()}</div>
                  <div>Conversions: {campaign.conversions.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">All Campaigns</h2>
        </div>
        <DataTable columns={columns} data={campaigns} />
      </div>
    </div>
  );
}