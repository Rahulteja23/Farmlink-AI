import React from 'react';
import { TrendingUp, Users, Package, IndianRupee, Truck } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { impactMetrics, adminStats } from '../data/mockData';

const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6'];

const comparisonData = [
  { metric: 'Farmer Earnings', traditional: 20, farmlink: 28, unit: '₹/kg' },
  { metric: 'Consumer Price', traditional: 50, farmlink: 35, unit: '₹/kg' },
  { metric: 'Intermediaries', traditional: 4, farmlink: 1, unit: 'count' },
  { metric: 'Delivery Days', traditional: 3, farmlink: 1, unit: 'days' },
];

const categoryData = [
  { name: 'Vegetables', value: 3200 },
  { name: 'Fruits', value: 1800 },
  { name: 'Grains', value: 1500 },
  { name: 'Spices', value: 900 },
  { name: 'Others', value: 1520 },
];

export default function Impact() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-700 to-teal-800 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="section-tag !bg-emerald-600/50 !text-emerald-100 mx-auto w-fit mb-4">🌱 Platform Impact</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Transforming Indian Agriculture
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Measurable outcomes for farmers, consumers, and the entire agricultural supply chain
          </p>

          {/* Big stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-6">
              <p className="text-5xl font-extrabold text-white">₹12.5L+</p>
              <p className="text-emerald-200 mt-2">Additional Farmer Earnings Generated</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-6">
              <p className="text-5xl font-extrabold text-white">18%</p>
              <p className="text-emerald-200 mt-2">Average Consumer Savings</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-6">
              <p className="text-5xl font-extrabold text-white">24%</p>
              <p className="text-emerald-200 mt-2">Transportation Cost Reduction</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Platform Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: 'Farmers Registered', value: impactMetrics.farmersRegistered.toLocaleString(), icon: Users, color: 'from-emerald-500 to-teal-600' },
            { label: 'Buyers Onboarded', value: impactMetrics.buyersRegistered.toLocaleString(), icon: Package, color: 'from-blue-500 to-indigo-600' },
            { label: 'Orders Completed', value: impactMetrics.ordersCompleted.toLocaleString(), icon: TrendingUp, color: 'from-purple-500 to-violet-600' },
            { label: 'Active Deliveries', value: impactMetrics.activeDeliveries.toString(), icon: Truck, color: 'from-amber-500 to-orange-500' },
          ].map((stat, i) => (
            <div key={i} className="card p-5">
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-extrabold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">Traditional vs FarmLink AI</h2>
            <p className="text-gray-500 text-sm">Side-by-side comparison of key metrics</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-gray-500 text-sm font-semibold">Metric</th>
                  <th className="text-center px-6 py-4 text-red-600 text-sm font-bold">❌ Traditional System</th>
                  <th className="text-center px-6 py-4 text-emerald-600 text-sm font-bold">✅ FarmLink AI</th>
                  <th className="text-center px-6 py-4 text-gray-500 text-sm font-semibold">Improvement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { metric: 'Farmer Earnings', traditional: '₹20/kg', farmlink: '₹28/kg', improvement: '+40%', good: true },
                  { metric: 'Consumer Price', traditional: '₹50/kg', farmlink: '₹35/kg', improvement: '-30%', good: true },
                  { metric: 'Number of Intermediaries', traditional: '4–5', farmlink: '0–1', improvement: '80% less', good: true },
                  { metric: 'Transport Efficiency', traditional: 'Low', farmlink: 'High', improvement: 'AI Optimized', good: true },
                  { metric: 'Price Transparency', traditional: 'Low', farmlink: 'High', improvement: '100% Visible', good: true },
                  { metric: 'Time from Farm to Consumer', traditional: '3–5 days', farmlink: '1–2 days', improvement: '60% faster', good: true },
                  { metric: 'Farmer Market Access', traditional: 'Local only', farmlink: 'Pan-India', improvement: '10x wider', good: true },
                  { metric: 'Quality Assurance', traditional: 'None', farmlink: 'AI Graded', improvement: 'AI-powered', good: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{row.metric}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium">{row.traditional}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">{row.farmlink}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-emerald-700 text-sm">{row.improvement}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue growth */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Transaction Growth</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={adminStats.monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                <Tooltip formatter={(v: any) => [`₹${(v / 100000).toFixed(2)}L`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Farmer growth */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Farmer Onboarding Growth</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={adminStats.monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="farmers" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', r: 4 }} name="Farmers" />
                <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} name="Orders" strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories pie + comparison bar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Products by Category</h3>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {categoryData.map((cat, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }}></div>
                    <span className="text-gray-700">{cat.name}</span>
                    <span className="font-bold text-gray-800 ml-auto">{cat.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Earnings Comparison (₹/kg)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={comparisonData.slice(0, 2)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="metric" type="category" tick={{ fontSize: 11 }} width={100} />
                <Tooltip formatter={(v) => `₹${v}`} />
                <Legend />
                <Bar dataKey="traditional" fill="#ef4444" name="Traditional" radius={[0, 4, 4, 0]} />
                <Bar dataKey="farmlink" fill="#10b981" name="FarmLink AI" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SDG Impact */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-2">🌍 Sustainable Development Goals</h3>
          <p className="text-emerald-100 mb-6">FarmLink AI directly contributes to the UN Sustainable Development Goals</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { goal: 'SDG 1', label: 'No Poverty', desc: 'Increasing farmer incomes', icon: '🏠' },
              { goal: 'SDG 2', label: 'Zero Hunger', desc: 'Reducing food waste & costs', icon: '🌾' },
              { goal: 'SDG 8', label: 'Economic Growth', desc: 'Creating rural livelihoods', icon: '📈' },
              { goal: 'SDG 12', label: 'Responsible Consumption', desc: 'Reducing supply chain waste', icon: '♻️' },
            ].map((sdg, i) => (
              <div key={i} className="bg-white/15 rounded-2xl p-4 text-center">
                <div className="text-3xl mb-2">{sdg.icon}</div>
                <p className="font-bold text-sm">{sdg.goal}</p>
                <p className="font-semibold text-emerald-200 text-xs">{sdg.label}</p>
                <p className="text-emerald-300 text-xs mt-1">{sdg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
