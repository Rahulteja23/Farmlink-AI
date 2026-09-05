import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Zap, TrendingUp, TrendingDown, Minus, Upload, Check, X, Star } from 'lucide-react';
import { demandData, priceData, aiInsights } from '../data/mockData';

const qualityResults = [
  { label: 'Product', value: 'Tomato' },
  { label: 'Quality Grade', value: 'A', highlight: true },
  { label: 'Freshness', value: 'High' },
  { label: 'Visible Defects', value: 'Low' },
  { label: 'Shelf Life', value: '5–7 Days' },
  { label: 'Marketability', value: 'Excellent' },
];

function QualityCheck() {
  const [stage, setStage] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [imageUrl, setImageUrl] = useState('');

  const handleDrop = (url: string) => {
    setImageUrl(url);
    setStage('analyzing');
    setTimeout(() => setStage('result'), 2500);
  };

  return (
    <div className="space-y-6">
      {stage === 'upload' && (
        <div
          onClick={() => handleDrop('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80')}
          className="border-2 border-dashed border-purple-300 rounded-2xl p-12 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all bg-purple-50/30"
        >
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Upload Produce Image</h3>
          <p className="text-gray-500 mb-4">Take a photo of your produce for AI quality analysis</p>
          <span className="btn-primary text-sm py-2 px-6">Select Image</span>
          <p className="text-xs text-gray-400 mt-3">JPG, PNG • Simulated demo</p>
        </div>
      )}

      {stage === 'analyzing' && (
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-8 text-center">
          {imageUrl && <img src={imageUrl} alt="Produce" className="w-32 h-32 object-cover rounded-2xl mx-auto mb-4 shadow-lg" />}
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="font-bold text-gray-800 text-lg">AI Analyzing Produce Quality...</h3>
          <div className="mt-4 space-y-2">
            {['Detecting product type...', 'Analyzing color & texture...', 'Checking for defects...', 'Estimating freshness...'].map((step, i) => (
              <div key={i} className="flex items-center gap-2 justify-center text-sm text-gray-500">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {stage === 'result' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl p-6 text-white flex items-center gap-4">
            <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80" alt="Tomato" className="w-20 h-20 object-cover rounded-xl shadow-lg" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="font-bold text-lg">AI Quality Analysis Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 fill-yellow-300 text-yellow-300" />)}
                </div>
                <span className="text-purple-200 text-sm">Excellent Quality</span>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="grid grid-cols-2 gap-3">
              {qualityResults.map((r, i) => (
                <div key={i} className={`p-3 rounded-xl ${r.highlight ? 'bg-emerald-50 border-2 border-emerald-200' : 'bg-gray-50'}`}>
                  <p className="text-xs text-gray-500">{r.label}</p>
                  <p className={`font-bold text-lg ${r.highlight ? 'text-emerald-700 text-2xl' : 'text-gray-800'}`}>{r.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <p className="font-semibold text-emerald-800 mb-1">AI Recommendation</p>
            <p className="text-sm text-emerald-700">Your tomatoes are Grade A quality. List at ₹28–32/kg to maximize earnings. Demand is high (92%) in Vijayawada and Guntur regions this week.</p>
          </div>

          <button onClick={() => setStage('upload')} className="w-full btn-secondary">Analyze Another Product</button>
        </div>
      )}
    </div>
  );
}

function PriceIntelligence() {
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const crops = aiInsights.map((a) => a.crop);
  const insight = aiInsights.find((a) => a.crop === selectedCrop) || aiInsights[0];
  const confidence = 87;

  return (
    <div className="space-y-6">
      {/* Crop selector */}
      <div className="flex gap-2 flex-wrap">
        {crops.map((crop) => (
          <button
            key={crop}
            onClick={() => setSelectedCrop(crop)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              selectedCrop === crop
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-amber-300'
            }`}
          >
            {crop}
          </button>
        ))}
      </div>

      {/* Price cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5 text-center border-l-4 border-amber-400">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Farmer Price</p>
          <p className="text-3xl font-extrabold text-gray-800">₹{insight.price}</p>
          <p className="text-xs text-gray-400">per kg</p>
        </div>
        <div className="card p-5 text-center border-l-4 border-blue-400">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Market Average</p>
          <p className="text-3xl font-extrabold text-gray-800">₹{Math.round(insight.price * 1.2)}</p>
          <p className="text-xs text-gray-400">per kg</p>
        </div>
        <div className="card p-5 text-center border-l-4 border-red-400">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Consumer Price</p>
          <p className="text-3xl font-extrabold text-gray-800">₹{Math.round(insight.price * 1.6)}</p>
          <p className="text-xs text-gray-400">per kg</p>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="font-bold text-amber-900">AI Recommended Price Range</p>
              <span className="ai-badge">AI</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl font-extrabold gradient-text">₹{insight.price - 2}–₹{insight.price + 2}</span>
              <span className="text-gray-500 text-sm">per kg</span>
            </div>
            <p className="text-sm text-amber-800 mb-3">{insight.insight}</p>

            {/* Confidence meter */}
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>AI Confidence</span>
                <span className="font-bold text-emerald-700">{confidence}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-amber-500 to-emerald-500 h-2 rounded-full"
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">Based on demand, supply, location, transport costs & historical pricing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Price trend chart */}
      <div className="card p-5">
        <h4 className="font-bold text-gray-800 mb-4">6-Week Price Trend</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(val) => `₹${val}`} />
            <Legend />
            <Line type="monotone" dataKey="farmGate" stroke="#10b981" strokeWidth={2.5} name="Farm Gate" dot={{ fill: '#10b981' }} />
            <Line type="monotone" dataKey="market" stroke="#f59e0b" strokeWidth={2.5} name="Market" dot={{ fill: '#f59e0b' }} />
            <Line type="monotone" dataKey="consumer" stroke="#ef4444" strokeWidth={2} name="Consumer" strokeDasharray="4 4" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function AIIntelligence() {
  const [activeTab, setActiveTab] = useState('Demand Forecast');
  const tabs = ['Demand Forecast', 'Price Intelligence', 'Market Insights', 'Quality Check'];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-white">AI Market Intelligence</h1>
          </div>
          <p className="text-amber-100">Real-time demand forecasting, price recommendations, and quality analysis</p>
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
                activeTab === tab ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Demand Forecast */}
        {activeTab === 'Demand Forecast' && (
          <div className="space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {aiInsights.slice(0, 4).map((insight, i) => (
                <div key={i} className="card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-800">{insight.crop}</span>
                    {insight.trend === 'up' ? (
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                    ) : insight.trend === 'down' ? (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    ) : (
                      <Minus className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full ${insight.trend === 'up' ? 'bg-emerald-500' : insight.trend === 'down' ? 'bg-red-500' : 'bg-amber-500'}`}
                      style={{ width: `${insight.demand}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">Demand: <span className="font-bold text-gray-800">{insight.demand}%</span></p>
                  <p className="text-xs text-gray-400 mt-1">{insight.insight}</p>
                </div>
              ))}
            </div>

            {/* Demand chart */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Demand Forecast — March to October 2026</h3>
                <span className="ai-badge">AI Predicted</span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={demandData}>
                  <defs>
                    <linearGradient id="tomatoGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="onionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} unit="%" />
                  <Tooltip formatter={(val) => `${val}%`} />
                  <Legend />
                  <Area type="monotone" dataKey="tomato" stroke="#10b981" fill="url(#tomatoGrad)" strokeWidth={2.5} name="Tomato" />
                  <Area type="monotone" dataKey="onion" stroke="#f59e0b" fill="url(#onionGrad)" strokeWidth={2.5} name="Onion" />
                  <Area type="monotone" dataKey="potato" stroke="#6366f1" fill="none" strokeWidth={2} name="Potato" />
                  <Area type="monotone" dataKey="mango" stroke="#ef4444" fill="none" strokeWidth={2} name="Mango" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* AI Recommendations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aiInsights.map((insight, i) => (
                <div key={i} className={`p-4 rounded-2xl border-2 flex gap-3 ${insight.trend === 'up' ? 'bg-emerald-50 border-emerald-200' : insight.trend === 'down' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${insight.trend === 'up' ? 'bg-emerald-100' : insight.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'}`}>
                    {insight.trend === 'up' ? <TrendingUp className="w-5 h-5 text-emerald-600" /> : insight.trend === 'down' ? <TrendingDown className="w-5 h-5 text-red-600" /> : <Minus className="w-5 h-5 text-gray-600" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">{insight.crop}</span>
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${insight.trend === 'up' ? 'bg-emerald-200 text-emerald-700' : insight.trend === 'down' ? 'bg-red-200 text-red-700' : 'bg-gray-200 text-gray-700'}`}>{insight.change}</span>
                    </div>
                    <p className="text-sm text-gray-600">{insight.insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price Intelligence */}
        {activeTab === 'Price Intelligence' && <PriceIntelligence />}

        {/* Market Insights */}
        {activeTab === 'Market Insights' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="card p-5">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" /> High Demand Crops
                </h4>
                <ol className="space-y-2">
                  {aiInsights.filter((a) => a.trend === 'up').map((a, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <span className="font-semibold text-gray-700">{a.crop}</span>
                      <span className="ml-auto text-xs text-emerald-600 font-bold">{a.change}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card p-5">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Minus className="w-5 h-5 text-amber-500" /> Stable Markets
                </h4>
                <ol className="space-y-2">
                  {aiInsights.filter((a) => a.trend === 'stable').map((a, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <span className="font-semibold text-gray-700">{a.crop}</span>
                      <span className="ml-auto text-xs text-amber-600 font-bold">{a.change}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card p-5">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-500" /> Declining Demand
                </h4>
                <ol className="space-y-2">
                  {aiInsights.filter((a) => a.trend === 'down').map((a, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <span className="font-semibold text-gray-700">{a.crop}</span>
                      <span className="ml-auto text-xs text-red-600 font-bold">{a.change}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="card p-6">
              <h4 className="font-bold text-gray-800 mb-4">Demand vs Price Analysis</h4>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={aiInsights} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="crop" type="category" tick={{ fontSize: 12 }} width={60} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="demand" fill="#10b981" name="Demand %" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Quality Check */}
        {activeTab === 'Quality Check' && (
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">AI Produce Quality Check</h2>
              <p className="text-gray-500 text-sm">Upload a photo of your produce for instant AI quality grading</p>
            </div>
            <QualityCheck />
          </div>
        )}
      </div>
    </div>
  );
}
