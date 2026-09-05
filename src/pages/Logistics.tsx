import React, { useState } from 'react';
import { Truck, MapPin, Users, Leaf, Zap, CheckCircle, Navigation, Package } from 'lucide-react';
import { vehicles } from '../data/mockData';

const routeNodes = [
  { id: 'fa', label: 'Farmer A\nRaju Reddy', x: 80, y: 80, type: 'farmer', color: '#10b981' },
  { id: 'fb', label: 'Farmer B\nLakshmi FPO', x: 80, y: 200, type: 'farmer', color: '#10b981' },
  { id: 'fc', label: 'Farmer C\nSrinivas', x: 80, y: 320, type: 'farmer', color: '#10b981' },
  { id: 'hub', label: 'AI Hub\nVijayawada', x: 260, y: 200, type: 'hub', color: '#f59e0b' },
  { id: 'ba', label: 'Buyer A\nHotel Grand', x: 440, y: 100, type: 'buyer', color: '#6366f1' },
  { id: 'bb', label: 'Buyer B\nMORE Store', x: 440, y: 220, type: 'buyer', color: '#6366f1' },
  { id: 'bc', label: 'Buyer C\nParadise', x: 440, y: 340, type: 'buyer', color: '#6366f1' },
];

const traditionalRoutes = [
  { from: 'fa', to: 'ba', direct: true },
  { from: 'fb', to: 'ba', direct: true },
  { from: 'fc', to: 'bb', direct: true },
  { from: 'fa', to: 'bc', direct: true },
];

const optimizedRoutes = [
  { from: 'fa', to: 'hub' },
  { from: 'fb', to: 'hub' },
  { from: 'fc', to: 'hub' },
  { from: 'hub', to: 'ba' },
  { from: 'hub', to: 'bb' },
  { from: 'hub', to: 'bc' },
];

function RouteMap({ routes, title, distance, cost, color }: any) {
  const getPos = (id: string) => routeNodes.find((n) => n.id === id)!;

  return (
    <div className="card p-5">
      <h4 className="font-bold text-gray-800 mb-1">{title}</h4>
      <div className="flex gap-4 text-sm mb-3">
        <span className="text-gray-500">Distance: <strong>{distance} km</strong></span>
        <span className="text-gray-500">Cost: <strong>₹{cost}</strong></span>
      </div>
      <div className="relative bg-gray-50 rounded-xl overflow-hidden" style={{ height: 420 }}>
        <svg width="100%" height="420" viewBox="0 0 540 420">
          {routes.map((r: any, i: number) => {
            const from = getPos(r.from);
            const to = getPos(r.to);
            return (
              <line
                key={i}
                x1={from.x + 40}
                y1={from.y + 20}
                x2={to.x + 40}
                y2={to.y + 20}
                stroke={color}
                strokeWidth={2}
                strokeDasharray={r.direct ? '6 3' : 'none'}
                opacity={0.7}
              />
            );
          })}
          {routeNodes.map((node) => (
            <g key={node.id}>
              <circle cx={node.x + 40} cy={node.y + 20} r={28} fill={node.color} opacity={0.15} />
              <circle cx={node.x + 40} cy={node.y + 20} r={18} fill={node.color} />
              <text x={node.x + 40} y={node.y + 24} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">
                {node.type === 'farmer' ? '🌾' : node.type === 'hub' ? '🤖' : '🏢'}
              </text>
              {node.label.split('\n').map((line: string, li: number) => (
                <text key={li} x={node.x + 40} y={node.y + 50 + li * 12} textAnchor="middle" fill="#374151" fontSize={9}>
                  {line}
                </text>
              ))}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default function Logistics() {
  const [activeTab, setActiveTab] = useState('Route Optimization');
  const tabs = ['Route Optimization', 'Load Sharing', 'Delivery Tracking', 'Order Timeline'];

  const trackingSteps = [
    { label: 'Order Confirmed', icon: '✅', done: true },
    { label: 'Pickup Scheduled', icon: '📅', done: true },
    { label: 'Collected from Farmer', icon: '📦', done: true },
    { label: 'In Transit', icon: '🚚', done: true, active: true },
    { label: 'Out for Delivery', icon: '🏃', done: false },
    { label: 'Delivered', icon: '🏠', done: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-cyan-700 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Truck className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-extrabold text-white">Smart Logistics</h1>
          </div>
          <p className="text-teal-100">AI-optimized routes, shared loads, and real-time delivery tracking</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto scrollbar-hide bg-white rounded-2xl p-1.5 border border-gray-200 shadow-sm mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Route Optimization */}
        {activeTab === 'Route Optimization' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-emerald-600" />
                <h3 className="text-xl font-bold text-gray-800">AI Route Optimization Result</h3>
                <span className="ai-badge ml-auto">27.5% Savings</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                  <p className="text-xs text-gray-500">Traditional Distance</p>
                  <p className="text-2xl font-extrabold text-gray-800">120 km</p>
                </div>
                <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                  <p className="text-xs text-gray-500">AI Optimized</p>
                  <p className="text-2xl font-extrabold text-emerald-600">87 km</p>
                </div>
                <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                  <p className="text-xs text-gray-500">Old Cost</p>
                  <p className="text-2xl font-extrabold text-gray-800">₹3,600</p>
                </div>
                <div className="text-center p-3 bg-emerald-100 rounded-xl shadow-sm border border-emerald-200">
                  <p className="text-xs text-emerald-600 font-semibold">AI Cost</p>
                  <p className="text-2xl font-extrabold text-emerald-700">₹2,610</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RouteMap
                routes={traditionalRoutes}
                title="❌ Traditional Routes (Unoptimized)"
                distance="120"
                cost="3,600"
                color="#ef4444"
              />
              <RouteMap
                routes={optimizedRoutes}
                title="✅ AI Optimized Routes"
                distance="87"
                cost="2,610"
                color="#10b981"
              />
            </div>

            <div className="card p-5 bg-emerald-50 border border-emerald-200">
              <p className="font-semibold text-emerald-800 text-lg">🤖 AI Explanation</p>
              <p className="text-emerald-700 mt-1 text-sm">By consolidating all farmer pickups through the Vijayawada AI Hub, we reduced total route distance by 27.5% and enabled efficient last-mile delivery to all 3 buyers in a single optimized pass. Estimated CO₂ savings: 8.2 kg.</p>
            </div>
          </div>
        )}

        {/* Load Sharing */}
        {activeTab === 'Load Sharing' && (
          <div className="space-y-6">
            <div className="text-center mb-2">
              <h2 className="text-2xl font-bold text-gray-800">Smart Load Sharing</h2>
              <p className="text-gray-500 text-sm">AI groups nearby farmers with similar destinations into shared vehicles</p>
            </div>

            {vehicles.map((v) => {
              const pct = (v.currentLoad / v.capacity) * 100;
              return (
                <div key={v.id} className="card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">🚛</span>
                        <h3 className="font-bold text-gray-800">{v.type}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          v.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                          v.status === 'Loading' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>{v.status}</span>
                      </div>
                      <p className="text-gray-500 text-sm flex items-center gap-1"><Navigation className="w-3 h-3" />{v.route}</p>
                      <p className="text-gray-500 text-sm">Driver: {v.driver}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Cost Savings</p>
                      <p className="text-2xl font-extrabold text-emerald-600">{v.savings}%</p>
                    </div>
                  </div>

                  {/* Load bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 font-semibold">Vehicle Load</span>
                      <span className="font-bold text-gray-800">{v.currentLoad} / {v.capacity} kg</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-4 rounded-full bg-gradient-to-r ${pct > 80 ? 'from-amber-400 to-orange-500' : 'from-emerald-500 to-teal-500'} transition-all`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Remaining: {v.capacity - v.currentLoad} kg capacity</p>
                  </div>

                  {/* Farmers */}
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Farmers in this load:</p>
                    <div className="flex flex-wrap gap-2">
                      {v.farmers.map((farmer, i) => (
                        <span key={i} className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
                          <Leaf className="w-3 h-3" /> {farmer}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-900 mb-1">AI Load Sharing Benefit</p>
                  <p className="text-amber-800 text-sm">By combining Farmer A (200 kg), Farmer B (300 kg), and Farmer C (500 kg) into one vehicle, the total cost is reduced by 35% vs individual trips. Each farmer pays proportionally to their load.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Tracking */}
        {activeTab === 'Delivery Tracking' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Order #FL20260045</h3>
                  <p className="text-gray-500 text-sm">Organic Bananas • 100 kg • Sri Durga Catering</p>
                </div>
                <span className="bg-blue-100 text-blue-700 font-semibold text-sm px-3 py-1.5 rounded-xl">In Transit</span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-blue-800">Current Location</span>
                </div>
                <p className="text-blue-700">Vijayawada Distribution Center</p>
                <p className="text-sm text-blue-600 mt-1">Expected Delivery: Today, 6:30 PM</p>
              </div>

              {/* Timeline */}
              <div className="relative">
                {trackingSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 mb-4 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 ${
                        step.active ? 'border-blue-500 bg-blue-50 animate-pulse' :
                        step.done ? 'border-emerald-500 bg-emerald-50' :
                        'border-gray-200 bg-gray-50'
                      }`}>
                        {step.icon}
                      </div>
                      {i < trackingSteps.length - 1 && (
                        <div className={`w-0.5 h-8 mt-1 ${step.done ? 'bg-emerald-300' : 'bg-gray-200'}`}></div>
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      <p className={`font-semibold ${step.active ? 'text-blue-700' : step.done ? 'text-gray-800' : 'text-gray-400'}`}>
                        {step.label}
                        {step.active && <span className="ml-2 text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">Current</span>}
                      </p>
                      {step.done && <p className="text-xs text-gray-400">Completed</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Order Timeline */}
        {activeTab === 'Order Timeline' && (
          <div className="space-y-4">
            {[
              { id: 'FL20260001', product: 'Fresh Tomatoes', buyer: 'Hotel Taj Mahal', status: 'In Transit', step: 4, total: 6000 },
              { id: 'FL20260002', product: 'Organic Onions', buyer: 'Reliance Fresh', status: 'Delivered', step: 6, total: 11000 },
              { id: 'FL20260003', product: 'Fresh Potatoes', buyer: 'Paradise Restaurant', status: 'Order Confirmed', step: 1, total: 2700 },
            ].map((order) => (
              <div key={order.id} className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-bold text-gray-800">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.product} → {order.buyer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-gray-800">₹{order.total.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                      order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>{order.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5,6].map((s) => (
                    <div
                      key={s}
                      className={`flex-1 h-2 rounded-full ${s <= order.step ? 'bg-emerald-500' : 'bg-gray-200'}`}
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">Step {order.step} of 6</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
