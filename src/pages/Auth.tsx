import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Leaf, Eye, EyeOff, User, Phone, Mail, MapPin, Lock, ChevronRight, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const roles = [
  { id: 'farmer', label: 'Farmer', icon: '👨‍🌾', desc: 'Sell your produce directly' },
  { id: 'fpo', label: 'FPO', icon: '🏛️', desc: 'Farmer producer organization' },
  { id: 'consumer', label: 'Consumer', icon: '🛒', desc: 'Buy fresh produce directly' },
  { id: 'buyer', label: 'Bulk Buyer', icon: '🏨', desc: 'Hotels, restaurants, retailers' },
  { id: 'logistics', label: 'Logistics', icon: '🚚', desc: 'Transport & delivery services' },
];

const demoLogins = [
  { role: 'farmer', name: 'Raju Reddy (Farmer)', icon: '👨‍🌾', color: 'from-green-500 to-emerald-600' },
  { role: 'consumer', name: 'Priya Sharma (Consumer)', icon: '🛒', color: 'from-blue-500 to-cyan-600' },
  { role: 'buyer', name: 'Hotel Grand (Buyer)', icon: '🏨', color: 'from-purple-500 to-violet-600' },
  { role: 'admin', name: 'Admin Dashboard', icon: '⚙️', color: 'from-gray-600 to-gray-800' },
];

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<'login' | 'register'>(searchParams.get('mode') === 'register' ? 'register' : 'login');
  const [selectedRole, setSelectedRole] = useState<string>(searchParams.get('role') || 'farmer');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', location: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(selectedRole as any, form.name || undefined);
      navigate(selectedRole === 'farmer' || selectedRole === 'fpo' ? '/farmer' : selectedRole === 'buyer' ? '/buyer' : selectedRole === 'admin' ? '/admin' : '/marketplace');
    }, 1200);
  };

  const handleDemo = (role: string) => {
    setLoading(true);
    setTimeout(() => {
      login(role as any);
      navigate(role === 'farmer' || role === 'fpo' ? '/farmer' : role === 'buyer' ? '/buyer' : role === 'admin' ? '/admin' : '/marketplace');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-800 flex items-center justify-center p-4 pt-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left branding */}
        <div className="hidden lg:block text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold">FarmLink AI</span>
              <p className="text-emerald-300 text-sm">Smart Agricultural Platform</p>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 leading-tight">
            Join the Future of<br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Indian Agriculture
            </span>
          </h1>
          <p className="text-emerald-200/80 text-lg mb-8">
            Connect directly. Earn more. Pay less. Powered by AI.
          </p>
          <div className="space-y-4">
            {[
              '🌿 Direct farmer-to-buyer marketplace',
              '🤖 AI-powered price intelligence',
              '🚚 Smart logistics & route optimization',
              '📊 Real-time demand forecasting',
            ].map((f) => (
              <div key={f} className="flex items-center gap-3 text-emerald-200">
                <span>{f}</span>
              </div>
            ))}
          </div>
          
          {/* Demo login section */}
          <div className="mt-10">
            <p className="text-emerald-300 text-sm font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Quick Demo Login
            </p>
            <div className="grid grid-cols-2 gap-2">
              {demoLogins.map((demo) => (
                <button
                  key={demo.role}
                  onClick={() => handleDemo(demo.role)}
                  disabled={loading}
                  className={`bg-gradient-to-r ${demo.color} text-white text-xs font-semibold p-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg`}
                >
                  <span className="text-base">{demo.icon}</span>
                  <span className="text-left leading-tight">{demo.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Mode toggle */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${mode === 'login' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${mode === 'register' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Register
            </button>
          </div>

          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
            {mode === 'login' ? 'Welcome Back! 👋' : 'Create Account 🌱'}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {mode === 'login' ? 'Sign in to your FarmLink AI account' : 'Join the smart agricultural revolution'}
          </p>

          {/* Role selection (register only) */}
          {mode === 'register' && (
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Select Your Role</label>
              <div className="grid grid-cols-3 gap-2">
                {roles.slice(0, 5).map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                      selectedRole === role.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="text-xl mb-1">{role.icon}</div>
                    <div className="text-xs font-semibold text-gray-700">{role.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field pl-10"
                  required
                />
              </div>
            )}

            {mode === 'register' && (
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-field pl-10"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field pl-10"
                required
              />
            </div>

            {mode === 'register' && (
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location (e.g. Guntur, AP)"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="input-field pl-10"
                />
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-field pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-base disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Mobile demo logins */}
          <div className="mt-6 lg:hidden">
            <p className="text-xs text-gray-500 text-center mb-3">— Quick Demo Login —</p>
            <div className="grid grid-cols-2 gap-2">
              {demoLogins.map((demo) => (
                <button
                  key={demo.role}
                  onClick={() => handleDemo(demo.role)}
                  disabled={loading}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold p-2 rounded-lg flex items-center gap-1.5 transition-all"
                >
                  <span>{demo.icon}</span>
                  <span>{demo.name.split(' (')[1]?.replace(')', '') || demo.role}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-gray-500 text-xs mt-6">
            By continuing, you agree to FarmLink AI's{' '}
            <span className="text-emerald-600 cursor-pointer hover:underline">Terms of Service</span>
            {' '}and{' '}
            <span className="text-emerald-600 cursor-pointer hover:underline">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
