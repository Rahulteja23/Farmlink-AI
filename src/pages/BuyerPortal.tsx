import React, { useState } from 'react';
import { MapPin, Clock, Users, ChevronRight, Star, Filter, Plus, Send, Check, Building2, Zap } from 'lucide-react';
import { buyerRequirements, products } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const negotiationHistory = [
  { from: 'buyer', message: 'I need 500 kg of tomatoes. My budget is ₹25/kg.', time: '10:00 AM' },
  { from: 'farmer', message: 'Hello! I can offer fresh tomatoes at ₹30/kg. Very good quality.', time: '10:05 AM' },
  { from: 'buyer', message: 'Can you do ₹27/kg? I\'ll place a recurring order.', time: '10:10 AM' },
  { from: 'farmer', message: 'For a recurring order, I can do ₹28/kg. Final offer.', time: '10:15 AM' },
  { from: 'buyer', message: 'Deal! ₹28/kg for 500 kg weekly. Let\'s proceed.', time: '10:18 AM', accepted: true },
];

function NegotiationChat() {
  const [messages, setMessages] = useState(negotiationHistory);
  const [newMsg, setNewMsg] = useState('');

  return (
    <div className="card overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4">
        <h3 className="text-white font-bold">Price Negotiation — Tomatoes (Hotel Grand)</h3>
        <p className="text-emerald-200 text-sm">Active negotiation • Real-time chat</p>
      </div>
      <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === 'buyer' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-xs rounded-2xl p-3 text-sm ${
              msg.from === 'buyer'
                ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                : 'bg-emerald-600 text-white rounded-tr-sm'
            } ${msg.accepted ? 'border-2 border-emerald-500 bg-emerald-50 text-emerald-800' : ''}`}>
              <p>{msg.message}</p>
              {msg.accepted && (
                <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Deal Accepted!
                </div>
              )}
              <p className={`text-xs mt-1 ${msg.from === 'buyer' ? 'text-gray-400' : 'text-emerald-200'} ${msg.accepted ? 'text-emerald-500' : ''}`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your offer or message..."
          className="flex-1 input-field text-sm"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && newMsg.trim()) {
              setMessages([...messages, { from: 'farmer', message: newMsg, time: 'Just now' }]);
              setNewMsg('');
            }
          }}
        />
        <button
          onClick={() => {
            if (newMsg.trim()) {
              setMessages([...messages, { from: 'farmer', message: newMsg, time: 'Just now' }]);
              setNewMsg('');
            }
          }}
          className="btn-primary px-4 py-2"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function BuyerPortal() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Requirements Board');
  const [showAddRequirement, setShowAddRequirement] = useState(false);
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [responded, setResponded] = useState<string[]>([]);

  const tabs = ['Requirements Board', 'Supplier Discovery', 'Negotiations', 'My Orders'];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Please login to access the Buyer Portal</p>
          <button onClick={() => navigate('/auth')} className="btn-primary">Login Now</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">🏢</div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">Bulk Buyer Portal</h1>
                <p className="text-blue-200 text-sm">Find suppliers, post requirements, negotiate prices</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddRequirement(true)}
              className="bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-50 transition-all shadow-lg"
            >
              <Plus className="w-4 h-4" /> Post Requirement
            </button>
          </div>
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
                activeTab === tab ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Requirements Board */}
        {activeTab === 'Requirements Board' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Active Buyer Requirements</h2>
              <span className="text-sm text-gray-500">{buyerRequirements.length} active requirements</span>
            </div>

            {buyerRequirements.map((req) => (
              <div key={req.id} className={`card p-5 border-l-4 ${req.urgent ? 'border-red-400' : 'border-blue-400'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{req.buyerType === 'Hotel' ? '🏨' : req.buyerType === 'Supermarket' ? '🏪' : req.buyerType === 'Restaurant' ? '🍽️' : req.buyerType === 'Retailer' ? '🛍️' : '🏭'}</span>
                      <h3 className="font-bold text-gray-800">{req.buyerName}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{req.buyerType}</span>
                      {req.urgent && <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">🔴 Urgent</span>}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 flex-wrap">
                      <span className="font-semibold text-gray-800 text-base">{req.product} — {req.quantity.toLocaleString()} {req.unit}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{req.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Required by {req.requiredBy}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{req.responses} responses</span>
                    </div>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <p className="text-xs text-gray-500">Target Price</p>
                    <p className="text-2xl font-extrabold text-emerald-700">₹{req.targetPrice}</p>
                    <p className="text-xs text-gray-400">per kg</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  {responded.includes(req.id) ? (
                    <span className="flex items-center gap-1 text-emerald-700 text-sm font-semibold bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
                      <Check className="w-4 h-4" /> Response Submitted
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        setRespondingTo(req.id);
                        setTimeout(() => {
                          setResponded([...responded, req.id]);
                          setRespondingTo(null);
                        }, 1000);
                      }}
                      disabled={respondingTo === req.id}
                      className="btn-primary text-sm py-2 flex items-center gap-2"
                    >
                      {respondingTo === req.id ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      Respond to Requirement
                    </button>
                  )}
                  <button className="btn-secondary text-sm py-2">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Supplier Discovery */}
        {activeTab === 'Supplier Discovery' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Find Verified Suppliers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((p) => (
                <div key={p.id} className="card p-5 hover:shadow-md transition-shadow">
                  <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-xl mb-4" />
                  <h3 className="font-bold text-gray-800">{p.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{p.farmerName} • {p.location}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-extrabold text-emerald-700">₹{p.price}/kg</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold">{p.farmerRating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">Available: {p.quantity.toLocaleString()} kg • Min: {p.minOrder} kg</p>
                  <button className="w-full btn-primary text-sm py-2">Request Quotation</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Negotiations */}
        {activeTab === 'Negotiations' && (
          <div className="max-w-2xl mx-auto">
            <NegotiationChat />
          </div>
        )}

        {/* My Orders */}
        {activeTab === 'My Orders' && (
          <div className="space-y-3">
            {[
              { product: 'Organic Onions', qty: '500 kg', vendor: 'Lakshmi Devi FPO', total: 11000, status: 'Delivered', date: '2026-08-24' },
              { product: 'Fresh Tomatoes', qty: '200 kg', vendor: 'Raju Reddy', total: 6000, status: 'In Transit', date: '2026-08-27' },
              { product: 'Basmati Rice', qty: '300 kg', vendor: 'Krishna Delta FPO', total: 19500, status: 'Confirmed', date: '2026-08-29' },
            ].map((order, i) => (
              <div key={i} className="card p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📦</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{order.product}</p>
                  <p className="text-sm text-gray-500">{order.qty} from {order.vendor}</p>
                  <p className="text-xs text-gray-400">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-gray-800">₹{order.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                    order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
