import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, TrendingUp, Users, Truck, ShieldCheck, Star, ChevronRight,
  Leaf, Zap, BarChart2, MapPin, CheckCircle, AlertCircle, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { translations, impactMetrics, aiInsights } from '../data/mockData';

function AnimatedCounter({ end, prefix = '', suffix = '', duration = 2000 }: { end: number; prefix?: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let startTime: number;
        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  const formatted = count >= 100000
    ? `${(count / 100000).toFixed(1)}L`
    : count >= 1000
    ? `${(count / 1000).toFixed(0)}K`
    : count.toString();

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

export default function Home() {
  const { language } = useAuth();
  const t = translations[language];
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'traditional' | 'farmlink'>('traditional');

  const problems = [
    { icon: '👨‍🌾', title: 'Farmers Suffer', points: ['Low selling prices', 'Limited market access', 'Dependence on intermediaries', 'Difficulty finding buyers'] },
    { icon: '🛒', title: 'Consumers Pay More', points: ['Higher prices', 'No price transparency', 'No origin information', 'Quality uncertainty'] },
    { icon: '🚚', title: 'Logistics Waste', points: ['Inefficient transportation', 'Empty vehicle capacity', 'High transportation costs', 'Delayed deliveries'] },
  ];

  const solutions = [
    { icon: '🤝', title: 'Direct Connection', desc: 'Connect farmers directly with consumers and bulk buyers, eliminating costly intermediaries.' },
    { icon: '🤖', title: 'AI Intelligence', desc: 'Predict demand trends and recommend fair pricing based on real market data.' },
    { icon: '🚚', title: 'Smart Logistics', desc: 'Optimize transportation routes and enable shared vehicle loads for small farmers.' },
    { icon: '🔍', title: 'Full Transparency', desc: 'Know exactly where your food comes from, from farm to doorstep.' },
  ];

  const stats = [
    { label: 'Farmers Registered', value: impactMetrics.farmersRegistered, suffix: '+' },
    { label: 'Buyers Onboarded', value: impactMetrics.buyersRegistered, suffix: '+' },
    { label: 'Orders Completed', value: impactMetrics.ordersCompleted, suffix: '+' },
    { label: 'Extra Farmer Earnings', value: impactMetrics.additionalFarmerEarnings, prefix: '₹' },
  ];

  const testimonials = [
    { name: 'Raju Reddy', role: 'Tomato Farmer, Guntur', text: 'FarmLink AI helped me get ₹8/kg more for my tomatoes by connecting me directly with hotel buyers. My income grew by 35% in 3 months!', rating: 5, avatar: '👨‍🌾' },
    { name: 'Priya Sharma', role: 'Consumer, Hyderabad', text: 'I get fresh organic vegetables at 25% less than supermarket prices, and I can see exactly which farmer grew them. Amazing!', rating: 5, avatar: '👩' },
    { name: 'Hotel Grand Manager', role: 'Bulk Buyer, Vijayawada', text: 'Our procurement costs reduced by 22%. Fresh produce, transparent pricing, reliable supply — everything a hospitality business needs.', rating: 5, avatar: '🏨' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-800 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 left-1/3 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-emerald-800/60 backdrop-blur-sm border border-emerald-600/50 text-emerald-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4 text-amber-400" />
                Smart India Hackathon 2026 — AgriTech Innovation
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                {language === 'en' ? (
                  <>
                    From Farm to Market,{' '}
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                      Without Middlemen
                    </span>
                  </>
                ) : (
                  t.hero_title
                )}
              </h1>

              <p className="text-lg text-emerald-100/80 leading-relaxed mb-8 max-w-xl">
                {t.hero_sub}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={() => navigate('/auth?mode=register&role=farmer')}
                  className="group flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
                >
                  <Leaf className="w-5 h-5" />
                  {t.hero_cta1}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/marketplace')}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:-translate-y-0.5"
                >
                  {t.hero_cta2}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Mini stats */}
              <div className="flex items-center gap-6 flex-wrap">
                {[
                  { icon: '👨‍🌾', label: '2,847 Farmers' },
                  { icon: '⭐', label: '4.8/5 Rating' },
                  { icon: '🌿', label: '100% Transparent' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2 text-sm text-emerald-200">
                    <span>{stat.icon}</span>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Supply chain comparison */}
            <div className="animate-slide-up">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setActiveTab('traditional')}
                    className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition-all ${activeTab === 'traditional' ? 'bg-red-500/80 text-white' : 'bg-white/10 text-emerald-200 hover:bg-white/20'}`}
                  >
                    ❌ Traditional
                  </button>
                  <button
                    onClick={() => setActiveTab('farmlink')}
                    className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition-all ${activeTab === 'farmlink' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-emerald-200 hover:bg-white/20'}`}
                  >
                    ✅ FarmLink AI
                  </button>
                </div>

                {activeTab === 'traditional' ? (
                  <div className="space-y-3">
                    <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">Traditional Supply Chain — 4-5 Intermediaries</p>
                    {[
                      { label: 'Farmer', price: '₹20/kg', icon: '👨‍🌾', loss: false },
                      { label: 'Local Agent', price: '+15%', icon: '🧑‍💼', loss: true },
                      { label: 'Wholesaler', price: '+12%', icon: '🏭', loss: true },
                      { label: 'Distributor', price: '+10%', icon: '📦', loss: true },
                      { label: 'Retailer', price: '+20%', icon: '🏪', loss: true },
                      { label: 'Consumer', price: '₹50/kg', icon: '🏠', loss: false },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${step.loss ? 'bg-red-500/20' : 'bg-white/20'}`}>
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{step.label}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${step.loss ? 'bg-red-500/30 text-red-300' : 'bg-white/20 text-white'}`}>
                          {step.price}
                        </span>
                        {i < 5 && <div className="absolute ml-4 mt-8 text-gray-500 text-xs">↓</div>}
                      </div>
                    ))}
                    <div className="mt-4 p-3 bg-red-500/20 rounded-xl border border-red-500/30">
                      <p className="text-red-300 text-sm font-medium">😔 Farmer earns only 40% of consumer price</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">FarmLink AI — Direct Connection</p>
                    {[
                      { label: 'Farmer / FPO', price: '₹28/kg', icon: '👨‍🌾' },
                      { label: 'FarmLink AI Platform', price: '2% fee', icon: '🤖', special: true },
                      { label: 'Consumer / Buyer', price: '₹35/kg', icon: '🏠' },
                    ].map((step, i) => (
                      <div key={i}>
                        <div className={`flex items-center gap-3 p-3 rounded-xl ${step.special ? 'bg-emerald-500/30 border border-emerald-400/50' : 'bg-white/10'}`}>
                          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-base">
                            {step.icon}
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium">{step.label}</p>
                            {step.special && <p className="text-emerald-300 text-xs">AI • Transparent • Fair</p>}
                          </div>
                          <span className="text-xs font-bold bg-emerald-500/40 text-emerald-200 px-2 py-0.5 rounded-full">
                            {step.price}
                          </span>
                        </div>
                        {i < 2 && (
                          <div className="flex justify-center my-1">
                            <div className="w-0.5 h-4 bg-emerald-400/50"></div>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="mt-4 p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                      <p className="text-emerald-300 text-sm font-medium">🎉 Farmer earns 80%+ • Consumer saves 30%!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl sm:text-4xl font-extrabold gradient-text mb-1">
                  <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-tag"><AlertCircle className="w-4 h-4" /> The Problem</div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              The Traditional System is <span className="text-red-500">Broken</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Every intermediary in the supply chain adds cost and reduces transparency. Farmers earn less, consumers pay more.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((problem, i) => (
              <div key={i} className="card p-6 border-l-4 border-red-400">
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{problem.title}</h3>
                <ul className="space-y-2">
                  {problem.points.map((point, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-600 text-sm">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-tag"><CheckCircle className="w-4 h-4" /> Our Solution</div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              FarmLink AI <span className="gradient-text">Solves Everything</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              One intelligent platform that connects, optimizes, and empowers every participant in the agricultural supply chain.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((sol, i) => (
              <div key={i} className="card-hover p-6 text-center group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{sol.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{sol.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{sol.desc}</p>
                <div className="mt-4 w-8 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Highlight */}
      <section className="py-20 bg-gradient-to-br from-emerald-950 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <Zap className="w-4 h-4" /> Powered by AI
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4">Intelligence at Every Step</h2>
            <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
              AI doesn't just power one feature — it's embedded throughout the entire platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Demand Forecasting', desc: 'Predict crop demand 2–4 weeks ahead using historical data, seasonality, and market trends.', icon: BarChart2, badge: '92% Accuracy' },
              { title: 'Price Intelligence', desc: 'Real-time price recommendations based on supply, demand, location and transport costs.', icon: TrendingUp, badge: 'Fair Pricing' },
              { title: 'Route Optimization', desc: 'AI finds the optimal delivery route, saving 27% on average transport costs.', icon: MapPin, badge: '27% Savings' },
              { title: 'Shared Logistics', desc: 'Group nearby farmers with similar destinations into shared transport loads.', icon: Truck, badge: 'Cost Sharing' },
              { title: 'Quality Analysis', desc: 'AI analyzes produce images to grade quality and estimate freshness.', icon: Star, badge: 'Grade A–F' },
              { title: 'Smart Matching', desc: 'AI matches buyer requirements with the most suitable farmers in real-time.', icon: Users, badge: 'Instant Match' },
            ].map((feature, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-emerald-500/30 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/50 transition-colors">
                    <feature.icon className="w-5 h-5 text-emerald-300" />
                  </div>
                  <span className="ai-badge">{feature.badge}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-emerald-200/70 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/ai-intelligence" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-xl shadow-amber-500/30">
              <Zap className="w-5 h-5" />
              Explore AI Intelligence
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Top AI Insights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="section-tag"><TrendingUp className="w-4 h-4" /> Market Intelligence</div>
              <h2 className="text-3xl font-extrabold text-gray-900">Live AI Crop Insights</h2>
            </div>
            <Link to="/ai-intelligence" className="text-emerald-600 font-semibold text-sm hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiInsights.slice(0, 6).map((insight, i) => (
              <div key={i} className="card p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800">{insight.crop}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{insight.insight}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${insight.trend === 'up' ? 'bg-green-100 text-green-700' : insight.trend === 'down' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                    {insight.change}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold gradient-text">₹{insight.price}/kg</span>
                  <div className="flex items-center gap-1">
                    <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${insight.trend === 'up' ? 'bg-emerald-500' : insight.trend === 'down' ? 'bg-red-500' : 'bg-amber-500'}`}
                        style={{ width: `${insight.demand}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{insight.demand}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-tag"><Star className="w-4 h-4" /> Testimonials</div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Success Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card-hover p-6">
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-xl">{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Ready to Transform Agriculture?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Join thousands of farmers, buyers, and consumers building a fairer food system together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/auth?mode=register')}
              className="bg-white text-emerald-700 font-bold px-10 py-4 rounded-2xl hover:bg-emerald-50 transition-all hover:-translate-y-0.5 shadow-xl text-lg"
            >
              Join FarmLink AI — It's Free
            </button>
            <button
              onClick={() => navigate('/marketplace')}
              className="bg-emerald-700/50 hover:bg-emerald-700 text-white font-bold px-10 py-4 rounded-2xl border border-white/30 transition-all hover:-translate-y-0.5 text-lg"
            >
              Browse Marketplace
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
