import React from 'react';
import { Bell, ShoppingCart, Star, TrendingUp, Truck, DollarSign, Check } from 'lucide-react';
import { notifications } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function Notifications() {
  const navigate = useNavigate();
  const iconMap: Record<string, React.ReactNode> = {
    '🛒': <ShoppingCart className="w-4 h-4" />,
    '🤖': <Star className="w-4 h-4" />,
    '💰': <TrendingUp className="w-4 h-4" />,
    '🚚': <Truck className="w-4 h-4" />,
    '📈': <TrendingUp className="w-4 h-4" />,
    '✅': <Check className="w-4 h-4" />,
  };

  const colorMap: Record<string, string> = {
    order: 'bg-blue-100 text-blue-600',
    ai: 'bg-amber-100 text-amber-600',
    payment: 'bg-emerald-100 text-emerald-600',
    delivery: 'bg-purple-100 text-purple-600',
    price: 'bg-red-100 text-red-600',
    quality: 'bg-teal-100 text-teal-600',
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <Bell className="w-6 h-6 text-emerald-600" /> Notifications
          </h1>
          <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {notifications.filter((n) => !n.read).length} new
          </span>
        </div>

        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`card p-4 flex gap-4 items-start cursor-pointer hover:shadow-md transition-all ${!notif.read ? 'border-l-4 border-emerald-500' : ''}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${colorMap[notif.type] || 'bg-gray-100'}`}>
                {notif.icon}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${!notif.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                  {notif.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
              </div>
              {!notif.read && <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-1.5"></div>}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => navigate(-1)} className="btn-secondary py-2 px-6 text-sm">
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
