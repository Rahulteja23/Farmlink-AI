import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Bell, User, Menu, X, Leaf, ChevronDown, Globe, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { translations } from '../../data/mockData';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, isLoggedIn, language, setLanguage, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav_home, path: '/' },
    { label: t.nav_marketplace, path: '/marketplace' },
    { label: t.nav_how, path: '/how-it-works' },
    { label: t.nav_ai, path: '/ai-intelligence' },
    { label: t.nav_logistics, path: '/logistics' },
    { label: t.nav_impact, path: '/impact' },
  ];

  const getDashboardPath = () => {
    if (!user) return '/auth';
    switch (user.role) {
      case 'farmer': case 'fpo': return '/farmer';
      case 'buyer': return '/buyer';
      case 'admin': return '/admin';
      default: return '/marketplace';
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-400/50 transition-shadow">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold gradient-text">FarmLink</span>
              <span className="text-xl font-bold text-gray-800"> AI</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-emerald-700 bg-emerald-50'
                    : scrolled ? 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50' : 'text-gray-700 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span>{language.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code as any); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-emerald-50 transition-colors ${language === l.code ? 'text-emerald-700 font-semibold' : 'text-gray-700'}`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 rounded-lg text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Notifications */}
            {isLoggedIn && (
              <Link to="/notifications" className="relative p-2 rounded-lg text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>
            )}

            {/* Auth */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-2 rounded-xl text-sm font-medium transition-all"
                >
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user?.name[0]}
                  </div>
                  <span className="hidden sm:block max-w-20 truncate">{user?.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                    </div>
                    <button
                      onClick={() => { navigate(getDashboardPath()); setProfileOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50"
                    >
                      <User className="w-4 h-4" /> Dashboard
                    </button>
                    <button
                      onClick={() => { logout(); navigate('/'); setProfileOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/auth" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-emerald-700 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-all">
                  {t.nav_login}
                </Link>
                <Link to="/auth?mode=register" className="btn-primary text-sm py-2 px-4 hidden sm:block">
                  {t.nav_get_started}
                </Link>
              </div>
            )}

            {/* Mobile menu */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50"
              >
                {link.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <div className="pt-2 flex gap-2">
                <Link to="/auth" onClick={() => setIsOpen(false)} className="flex-1 text-center btn-secondary text-sm py-2">Login</Link>
                <Link to="/auth?mode=register" onClick={() => setIsOpen(false)} className="flex-1 text-center btn-primary text-sm py-2">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
