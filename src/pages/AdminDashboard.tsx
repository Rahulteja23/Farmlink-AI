import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, Package, ShoppingBag, IndianRupee, Truck, TrendingUp, Activity } from 'lucide-react';
import { adminStats, impactMetrics } from '../data/mockData';

export default function AdminDashboard() {
  const statCards = [
    { label: 'Total Farmers', value: adminStats.totalFarmers.toLocaleString(), icon: Users, color: 'from-emerald-500 to-teal-600', change: '+247 this month' },
    { label: 'Total Buyers', value: adminStats.totalBuyers.toLocaleString(), icon: ShoppingBag, color: 'from-blue-500 to-indigo-600', change: '+82 this month' },
    { label: 'Total Orders', value: adminStats.totalOrders.toLocaleString(), icon: Package, color: 'from-purple-500 to-violet-600', change: '+1,234 this week' },
    { label: 'Total Transactions', value: `₹${(adminStats.totalTransactions / 100000).toFixed(1)}L`, icon: IndianRupee, color: 'from-amber-500 to-orange-500', change: '+22% vs last month' },
    { label: 'Products Listed', value: adminStats.productsListed.toLocaleString(), icon: Package, color: 'from-cyan-500 to-teal-500', change: '+320 products' },
    { label: 'Active Deliveries', value: adminStats.activeDeliveries.toString(), icon: Truck, color: 'from-rose-500 to-pink-600', change: 'Live right now' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">FarmLink AI — Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Platform-wide analytics and monitoring</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-sm font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {statCards.map((card, i) => (
            <div key={i} className="card p-5">
              <div className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center mb-3`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-extrabold text-gray-800">{card.value}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-xs text-emerald-600 font-medium mt-1">{card.change}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="font-bold text-gray-800 mb-4">Monthly Revenue (₹)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={adminStats.monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: any) => [`₹${(v / 100000).toFixed(1)}L`]} />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-6">
            <h3 className="font-bold text-gray-800 mb-4">Farmer & Order Growth</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={adminStats.monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="farmers" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} name="Farmers" />
                <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional transactions */}
        <div className="card p-6">
          <h3 className="font-bold text-gray-800 mb-5">Regional Transaction Distribution</h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              { city: 'Vijayawada', pct: 32, amount: '₹13.6L' },
              { city: 'Guntur', pct: 25, amount: '₹10.6L' },
              { city: 'Hyderabad', pct: 22, amount: '₹9.4L' },
              { city: 'Visakhapatnam', pct: 14, amount: '₹5.9L' },
              { city: 'Amaravati', pct: 7, amount: '₹3.0L' },
            ].map((r, i) => (
              <div key={i} className="text-center">
                <p className="text-sm font-semibold text-gray-700 mb-2">{r.city}</p>
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="transform -rotate-90 w-20 h-20">
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#10b981" strokeWidth="8"
                      strokeDasharray={`${r.pct * 1.885} ${188.5}`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-extrabold text-gray-800">{r.pct}%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{r.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Pending Verifications', value: '23', desc: 'New farmer applications', action: 'Review All', color: 'amber' },
            { label: 'Disputed Orders', value: '5', desc: 'Require admin resolution', action: 'Resolve Now', color: 'red' },
            { label: 'AI Model Accuracy', value: '94.2%', desc: 'Demand forecast accuracy', action: 'View Report', color: 'emerald' },
          ].map((card, i) => (
            <div key={i} className={`card p-5 border-l-4 ${card.color === 'amber' ? 'border-amber-400' : card.color === 'red' ? 'border-red-400' : 'border-emerald-400'}`}>
              <p className="text-2xl font-extrabold text-gray-800">{card.value}</p>
              <p className="font-semibold text-gray-700 text-sm">{card.label}</p>
              <p className="text-xs text-gray-500 mb-3">{card.desc}</p>
              <button className={`text-sm font-semibold px-4 py-1.5 rounded-lg ${
                card.color === 'amber' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' :
                card.color === 'red' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
              } transition-colors`}>
                {card.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
