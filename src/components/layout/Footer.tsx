import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Share2, ExternalLink, Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FarmLink AI</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Connecting farmers directly to buyers. Powered by AI to create a fairer, more transparent agricultural supply chain.
            </p>
            <div className="flex gap-3">
              {[Share2, ExternalLink, Heart].map((Icon, i) => (
                <button key={i} className="w-8 h-8 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {[
                ['Marketplace', '/marketplace'],
                ['Farmer Dashboard', '/farmer'],
                ['Buyer Portal', '/buyer'],
                ['AI Intelligence', '/ai-intelligence'],
                ['Logistics', '/logistics'],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                ['How It Works', '/how-it-works'],
                ['Impact', '/impact'],
                ['About Us', '#'],
                ['Careers', '#'],
                ['Privacy Policy', '#'],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link to={path} className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                hello@farmlink.ai
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                1800-FARMLINK
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                Amaravati Technology Hub, Andhra Pradesh, India
              </li>
            </ul>
            <div className="mt-4 p-3 bg-emerald-900/30 rounded-xl border border-emerald-800/50">
              <p className="text-xs text-emerald-300 font-medium">🌱 Smart India Hackathon 2026</p>
              <p className="text-xs text-gray-500 mt-0.5">AgriTech Innovation Track</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 FarmLink AI. All rights reserved. Built for Smart India Hackathon.</p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>Made with</span>
            <span className="text-red-400">❤️</span>
            <span>for Indian Farmers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
