import React, { useState } from 'react';
import { Bell, ShoppingCart, Target, AlertCircle, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'transaction' | 'campaign' | 'alert' | 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 'N001',
    type: 'transaction',
    title: 'Large Order Received',
    message: 'New order #4851 worth $1,200 has been placed',
    timestamp: new Date('2024-03-10T14:30:00'),
    read: false,
  },
  {
    id: 'N002',
    type: 'campaign',
    title: 'Campaign Goal Reached',
    message: 'Summer Sale 2024 campaign has reached its conversion goal',
    timestamp: new Date('2024-03-10T12:15:00'),
    read: false,
  },
  {
    id: 'N003',
    type: 'alert',
    title: 'Low Stock Alert',
    message: 'Wireless Earbuds (SKU: P001) stock is below threshold',
    timestamp: new Date('2024-03-10T10:45:00'),
    read: true,
  },
];

const alertTypeIcons = {
  transaction: ShoppingCart,
  campaign: Target,
  alert: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

const alertTypeColors = {
  transaction: 'text-blue-500 bg-blue-50',
  campaign: 'text-green-500 bg-green-50',
  alert: 'text-red-500 bg-red-50',
  success: 'text-green-500 bg-green-50',
  warning: 'text-yellow-500 bg-yellow-50',
  error: 'text-red-500 bg-red-50',
  info: 'text-blue-500 bg-blue-50',
};

function NotificationIcon({ type }: { type: string }) {
  const Icon = alertTypeIcons[type] || Bell;
  const colorClass = alertTypeColors[type] || 'text-gray-500 bg-gray-100';
  return (
    <div className={`p-2 rounded-full ${colorClass}`}>
      <Icon className="w-5 h-5" />
    </div>
  );
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">You have {unreadCount} unread notifications</p>
        </div>
        <button
          onClick={markAllAsRead}
          className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm divide-y">
        {notifications.map((notification) => {
          const timestamp = new Date(notification.timestamp);

          return (
            <div
              key={notification.id}
              className={`p-4 flex items-start space-x-4 hover:bg-gray-50 transition-colors ${
                !notification.read ? 'bg-indigo-50' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <NotificationIcon type={notification.type} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    <time dateTime={notification.timestamp.toISOString()} title={format(timestamp, 'PPpp')}>
                      {formatDistanceToNow(timestamp, { addSuffix: true })}
                    </time>
                  </span>
                </div>
                {!notification.read && (
                  <span className="mt-1 text-xs font-medium text-indigo-600">Unread</span>
                )}
              </div>
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={(e) => {
                  e.stopPropagation();
                  markAsRead(notification.id);
                }}
              >
                <span className="sr-only">Dismiss</span>
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
