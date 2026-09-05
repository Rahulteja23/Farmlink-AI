import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package, ShoppingBag, IndianRupee, Clock, TrendingUp, Plus, Mic, MicOff,
  BarChart2, Bell, Star, MapPin, Check, X, Upload, Zap, Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { farmers, products, orders, aiInsights } from '../data/mockData';

const tabs = ['Overview', 'My Products', 'Orders', 'Add Produce', 'AI Voice Listing', 'Analytics'];

function VoiceListing() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [parsed, setParsed] = useState<{ product: string; quantity: string; price: string } | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const demoTexts = [
    "I have 500 kilograms of tomatoes available for 30 rupees per kilogram",
    "I want to sell 200 kg of onions at 22 rupees",
    "I have 100 kg of fresh mangoes at 120 rupees per kg",
  ];

  const startListening = () => {
    setListening(true);
    setTranscript('');
    setParsed(null);
    setConfirmed(false);
    
    const text = demoTexts[Math.floor(Math.random() * demoTexts.length)];
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setTranscript(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setListening(false);
        // Parse
        const qtyMatch = text.match(/(\d+)\s*(?:kilograms?|kg)/i);
        const priceMatch = text.match(/(\d+)\s*rupees?/i);
        const productWords = text.split(' ');
        const productIdx = productWords.findIndex((w) => ['tomatoes', 'onions', 'mangoes', 'potatoes', 'rice'].includes(w.toLowerCase()));
        setParsed({
          product: productIdx >= 0 ? productWords[productIdx] : 'Tomatoes',
          quantity: qtyMatch ? `${qtyMatch[1]} kg` : '500 kg',
          price: priceMatch ? `₹${priceMatch[1]}/kg` : '₹30/kg',
        });
      }
    }, 40);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">AI Voice Product Listing</h3>
            <p className="text-sm text-gray-500">Speak naturally to list your produce</p>
          </div>
          <span className="ai-badge ml-auto">AI-Powered</span>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Example: <em>"I have 500 kilograms of tomatoes available for 30 rupees per kilogram"</em>
        </p>

        <button
          onClick={startListening}
          disabled={listening}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-lg transition-all ${
            listening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/30'
          }`}
        >
          {listening ? <><MicOff className="w-6 h-6" /> Listening...</> : <><Mic className="w-6 h-6" /> Start Speaking</>}
        </button>
      </div>

      {transcript && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Transcript</p>
          <p className="text-gray-800 text-lg italic">"{transcript}"</p>
        </div>
      )}

      {parsed && !confirmed && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <p className="text-sm font-semibold text-emerald-700 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4" /> AI Extracted Information — Please Confirm
          </p>
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <p className="text-xs text-gray-500">Product</p>
              <p className="font-bold text-gray-800 text-lg capitalize">{parsed.product}</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <p className="text-xs text-gray-500">Quantity</p>
              <p className="font-bold text-gray-800 text-lg">{parsed.quantity}</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <p className="text-xs text-gray-500">Price</p>
              <p className="font-bold text-emerald-600 text-lg">{parsed.price}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setConfirmed(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-all hover:bg-emerald-500"
            >
              <Check className="w-5 h-5" /> Confirm & Publish
            </button>
            <button
              onClick={() => { setParsed(null); setTranscript(''); }}
              className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold py-3 px-5 rounded-xl hover:bg-gray-200 transition-all"
            >
              <X className="w-5 h-5" /> Retry
            </button>
          </div>
        </div>
      )}

      {confirmed && (
        <div className="bg-emerald-500 text-white rounded-2xl p-5 text-center">
          <Check className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full p-2" />
          <p className="text-xl font-bold mb-1">Product Published Successfully! 🎉</p>
          <p className="text-emerald-100 text-sm">Your {parsed?.product} listing is now live in the marketplace</p>
        </div>
      )}
    </div>
  );
}

function AddProduceForm() {
  const [form, setForm] = useState({
    name: '', category: 'Vegetables', quantity: '', unit: 'kg', price: '', minOrder: '',
    harvestDate: '', description: '', location: '', organic: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const categories = ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices', 'Dairy', 'Organic Products'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 rounded-2xl p-10 text-center border border-emerald-200">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Product Published! 🎉</h3>
        <p className="text-gray-600 mb-4">Your product is now live in the FarmLink AI marketplace.</p>
        <button onClick={() => setSubmitted(false)} className="btn-primary">Add Another Product</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Product Name *</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" className="input-field" placeholder="e.g. Fresh Tomatoes" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category *</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Quantity *</label>
          <input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} type="number" className="input-field" placeholder="500" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price per kg (₹) *</label>
          <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} type="number" className="input-field" placeholder="30" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Minimum Order (kg)</label>
          <input value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: e.target.value })} type="number" className="input-field" placeholder="10" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Harvest Date</label>
          <input value={form.harvestDate} onChange={(e) => setForm({ ...form, harvestDate: e.target.value })} type="date" className="input-field" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} type="text" className="input-field" placeholder="e.g. Guntur, AP" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" rows={3} placeholder="Describe your produce quality, farming methods, etc." />
        </div>
      </div>

      {/* Image upload */}
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-emerald-300 transition-colors cursor-pointer">
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500 text-sm">Click to upload product images</p>
        <p className="text-gray-400 text-xs">JPG, PNG up to 10MB</p>
      </div>

      {/* Organic toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          onClick={() => setForm({ ...form, organic: !form.organic })}
          className={`w-12 h-6 rounded-full transition-colors relative ${form.organic ? 'bg-emerald-500' : 'bg-gray-200'}`}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.organic ? 'translate-x-7' : 'translate-x-1'}`}></div>
        </div>
        <span className="font-semibold text-gray-700">This is an Organic Product</span>
        {form.organic && <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">🌿 Organic Badge</span>}
      </label>

      <button type="submit" className="w-full btn-primary py-4 text-base">
        <span className="flex items-center justify-center gap-2">
          <Package className="w-5 h-5" />
          Publish Product to Marketplace
        </span>
      </button>
    </form>
  );
}

export default function FarmerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const farmer = farmers[0];
  const myOrders = orders.slice(0, 3);

  const statCards = [
    { label: 'Total Products', value: farmer.totalProducts, icon: Package, color: 'from-emerald-500 to-teal-600', change: '+2 this month' },
    { label: 'Active Orders', value: farmer.activeOrders, icon: ShoppingBag, color: 'from-blue-500 to-cyan-600', change: '3 pending' },
    { label: 'Monthly Earnings', value: `₹${farmer.monthlyEarnings.toLocaleString()}`, icon: IndianRupee, color: 'from-purple-500 to-violet-600', change: '+18% vs last month' },
    { label: 'Pending Payment', value: `₹${farmer.pendingPayment.toLocaleString()}`, icon: Clock, color: 'from-amber-500 to-orange-500', change: '2 invoices' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Please login to access your dashboard</p>
          <button onClick={() => navigate('/auth')} className="btn-primary">Login Now</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">👨‍🌾</div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">{user.name}'s Dashboard</h1>
                <p className="text-emerald-200 flex items-center gap-1.5 text-sm">
                  <MapPin className="w-3.5 h-3.5" />{user.location || 'Guntur, AP'}
                  <span className="bg-emerald-400/30 text-emerald-100 text-xs px-2 py-0.5 rounded-full ml-2">✓ Verified Farmer</span>
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-white font-bold text-xl">{farmer.rating}</span>
              <span className="text-emerald-200 text-sm">/ 5.0</span>
            </div>
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
                activeTab === tab ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === 'Overview' && (
          <div className="space-y-8">
            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {statCards.map((card, i) => (
                <div key={i} className="card p-5">
                  <div className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center mb-3`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-500 text-sm">{card.label}</p>
                  <p className="text-2xl font-extrabold text-gray-800 my-1">{card.value}</p>
                  <p className="text-xs text-emerald-600 font-medium">{card.change}</p>
                </div>
              ))}
            </div>

            {/* AI Insights */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">AI Market Insights for You</h3>
                <span className="ai-badge ml-auto">Live Data</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {aiInsights.slice(0, 3).map((insight, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${insight.trend === 'up' ? 'bg-emerald-50 border-emerald-200' : insight.trend === 'down' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-800">{insight.crop}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${insight.trend === 'up' ? 'bg-emerald-200 text-emerald-700' : insight.trend === 'down' ? 'bg-red-200 text-red-700' : 'bg-gray-200 text-gray-700'}`}>
                        {insight.change}
                      </span>
                    </div>
                    <p className="text-2xl font-extrabold text-gray-900">₹{insight.price}<span className="text-sm font-normal text-gray-500">/kg</span></p>
                    <p className="text-xs text-gray-500 mt-1">{insight.insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent orders */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-5">Recent Orders</h3>
              <div className="space-y-3">
                {myOrders.map((order) => (
                  <div key={order.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-lg flex-shrink-0">📦</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">{order.buyerName}</p>
                      <p className="text-xs text-gray-500">{order.product} • {order.quantity} kg</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-800">₹{order.total.toLocaleString()}</p>
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
            </div>
          </div>
        )}

        {activeTab === 'My Products' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter((p) => p.farmerId === 'f1').concat(products.slice(0, 3)).map((p) => (
              <div key={p.id} className="card p-4">
                <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-xl mb-3" />
                <h4 className="font-bold text-gray-800">{p.name}</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-emerald-700 font-bold">₹{p.price}/kg</span>
                  <span className="text-sm text-gray-500">{p.quantity} kg left</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.quantity > 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {p.quantity > 100 ? '✓ In Stock' : '⚠ Low Stock'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Add Produce' && (
          <div className="max-w-2xl mx-auto card p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Add New Product</h3>
            <p className="text-gray-500 text-sm mb-6">List your produce directly in the FarmLink AI marketplace</p>
            <AddProduceForm />
          </div>
        )}

        {activeTab === 'AI Voice Listing' && (
          <div className="max-w-lg mx-auto">
            <VoiceListing />
          </div>
        )}

        {activeTab === 'Orders' && (
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">All Orders</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {orders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.buyerName} • {order.product}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{order.quantity} kg • {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">₹{order.total.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Analytics' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {aiInsights.map((insight, i) => (
              <div key={i} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-800">{insight.crop} Demand</h4>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${insight.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {insight.change}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all" style={{ width: `${insight.demand}%` }}></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Demand: {insight.demand}%</span>
                  <span className="font-semibold text-gray-800">₹{insight.price}/kg</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">{insight.insight}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
