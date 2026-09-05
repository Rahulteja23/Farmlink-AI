import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { step: 1, title: 'Farmer Registers', desc: 'Farmer or FPO creates an account on FarmLink AI with their location, farm details, and produce types.', icon: '👨‍🌾', color: 'from-emerald-500 to-teal-600' },
  { step: 2, title: 'Add Produce via AI', desc: 'Farmer adds produce using the smart form or AI Voice Listing. AI auto-extracts product, quantity, and price.', icon: '🎤', color: 'from-purple-500 to-violet-600' },
  { step: 3, title: 'AI Analyzes Market', desc: 'AI analyzes demand, supply, and market trends to recommend the optimal price and best time to sell.', icon: '🤖', color: 'from-amber-500 to-orange-500' },
  { step: 4, title: 'Buyer Discovers Product', desc: 'Consumer or bulk buyer searches the marketplace with filters. AI recommends the best matches.', icon: '🔍', color: 'from-blue-500 to-indigo-600' },
  { step: 5, title: 'Order & Negotiate', desc: 'Buyer places order or initiates price negotiation directly with the farmer through the chat system.', icon: '🤝', color: 'from-teal-500 to-cyan-600' },
  { step: 6, title: 'AI Suggests Logistics', desc: 'AI groups nearby orders, optimizes the delivery route, and assigns the best vehicle to minimize cost.', icon: '🚚', color: 'from-rose-500 to-pink-600' },
  { step: 7, title: 'Route Optimized', desc: 'AI calculates the shortest multi-stop route, saving up to 27% on transportation costs.', icon: '🗺️', color: 'from-emerald-600 to-green-700' },
  { step: 8, title: 'Product Delivered', desc: 'Produce is delivered fresh, directly from farm to buyer. No unnecessary intermediaries.', icon: '📦', color: 'from-amber-600 to-orange-600' },
  { step: 9, title: 'Payment Completed', desc: 'Secure digital payment is processed. Farmer receives 85%+ of the final price, directly in their account.', icon: '💰', color: 'from-indigo-500 to-purple-600' },
  { step: 10, title: 'Impact Recorded', desc: 'Platform records the transaction. Farmer earnings, consumer savings, and transport efficiency are updated.', icon: '📊', color: 'from-teal-600 to-emerald-700' },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 py-14 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-3">How FarmLink AI Works</h1>
        <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
          A complete end-to-end journey from farmer registration to consumer delivery, powered by AI at every step.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Journey steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-300 to-teal-300 hidden sm:block"></div>

          {steps.map((step, i) => (
            <div key={i} className={`relative flex gap-6 mb-12 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} flex-col`}>
              {/* Content */}
              <div className={`flex-1 ${i % 2 === 0 ? 'sm:text-right sm:pr-12' : 'sm:text-left sm:pl-12'}`}>
                <div className={`card p-6 hover:shadow-lg transition-shadow ${i % 2 === 0 ? 'sm:ml-auto' : ''} max-w-sm`}>
                  <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-2xl mb-3 ${i % 2 === 0 ? 'sm:ml-auto' : ''}`}>
                    {step.icon}
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Step {step.step}</p>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>

              {/* Center node */}
              <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-6 w-10 h-10 bg-white border-4 border-emerald-500 rounded-full items-center justify-center z-10">
                <span className="text-xs font-extrabold text-emerald-700">{step.step}</span>
              </div>

              {/* Spacer */}
              <div className="flex-1"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-center text-white">
          <h2 className="text-2xl font-extrabold mb-3">Ready to Begin?</h2>
          <p className="text-emerald-100 mb-6">Join FarmLink AI and be part of the agricultural revolution.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/auth?mode=register&role=farmer" className="bg-white text-emerald-700 font-bold px-8 py-3 rounded-2xl hover:bg-emerald-50 transition-all hover:-translate-y-0.5">
              Register as Farmer
            </Link>
            <Link to="/marketplace" className="bg-emerald-700/60 border border-white/30 text-white font-bold px-8 py-3 rounded-2xl hover:bg-emerald-700 transition-all hover:-translate-y-0.5">
              Browse Marketplace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
