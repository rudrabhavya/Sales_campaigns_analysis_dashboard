import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  TrendingUp, 
  Megaphone, 
  Bell,
  LogOut 
} from 'lucide-react';

export default function Layout() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-indigo-600">MarketMinds</h1>
          <p className="text-sm text-gray-600 mt-1">Welcome, {user?.name}</p>
        </div>
        
        <nav className="mt-8">
          <NavLink to="/" icon={<LayoutDashboard size={20} />}>Dashboard</NavLink>
          <NavLink to="/transactions" icon={<ShoppingCart size={20} />}>Transactions</NavLink>
          <NavLink to="/products" icon={<TrendingUp size={20} />}>Products</NavLink>
          <NavLink to="/campaigns" icon={<Megaphone size={20} />}>Campaigns</NavLink>
          <NavLink to="/notifications" icon={<Bell size={20} />}>Notifications</NavLink>
        </nav>

        <div className="absolute bottom-0 w-64 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function NavLink({ to, children, icon }: { to: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}