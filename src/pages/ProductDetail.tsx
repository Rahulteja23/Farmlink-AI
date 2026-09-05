import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Leaf, ShoppingCart, Minus, Plus, ArrowLeft, Shield, Truck, Zap, Calendar, Package } from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id) || products[0];
  const [qty, setQty] = useState(product.minOrder);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-emerald-700 text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video lg:aspect-square">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex gap-2">
                {product.organic && (
                  <span className="bg-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Leaf className="w-4 h-4" /> Organic
                  </span>
                )}
                <span className="bg-purple-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Grade {product.qualityGrade}
                </span>
              </div>
            </div>

            {/* AI quality card */}
            <div className="mt-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-amber-800">AI Quality Analysis</span>
                <span className="ai-badge ml-auto">Auto-analyzed</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div><p className="text-xs text-gray-500">Quality Grade</p><p className="font-bold text-gray-800 text-lg">{product.qualityGrade}</p></div>
                <div><p className="text-xs text-gray-500">Freshness</p><p className="font-bold text-emerald-600 text-lg">High</p></div>
                <div><p className="text-xs text-gray-500">Shelf Life</p><p className="font-bold text-gray-800 text-lg">{product.freshnessDays}d</p></div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4">{product.description}</p>

            {/* Farmer info */}
            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">👨‍🌾</div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">{product.farmerName}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{product.location}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-gray-700">{product.farmerRating}</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-extrabold gradient-text">₹{product.price}</span>
                <span className="text-gray-500 text-lg">/{product.unit}</span>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-400 line-through">Consumer price: ₹{product.consumerPrice}/kg</span>
                <span className="text-emerald-600 font-semibold">
                  You save {Math.round((1 - product.price / product.consumerPrice) * 100)}%
                </span>
              </div>
            </div>

            {/* AI price intel */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-800 text-sm">AI Fair Price Range</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center"><p className="text-gray-500 text-xs">Min</p><p className="font-bold text-gray-800">₹{product.aiRecommendedMin}</p></div>
                <div className="flex-1 h-2 bg-blue-200 rounded-full relative">
                  <div
                    className="absolute h-full bg-blue-500 rounded-full"
                    style={{ width: `${((product.price - product.aiRecommendedMin) / (product.aiRecommendedMax - product.aiRecommendedMin)) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center"><p className="text-gray-500 text-xs">Max</p><p className="font-bold text-gray-800">₹{product.aiRecommendedMax}</p></div>
              </div>
              <p className="text-xs text-blue-600 mt-2">Current price is within AI recommended range ✓</p>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: Calendar, label: 'Harvest Date', value: product.harvestDate },
                { icon: Package, label: 'Available Qty', value: `${product.quantity.toLocaleString()} kg` },
                { icon: Package, label: 'Min Order', value: `${product.minOrder} ${product.unit}` },
                { icon: Truck, label: 'Delivery', value: 'Within 24 hours' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <item.icon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="font-semibold text-gray-800 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Qty selector */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-semibold text-gray-700">Quantity ({product.unit}):</span>
              <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setQty(Math.max(product.minOrder, qty - product.minOrder))}
                  className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm hover:bg-emerald-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-gray-800 w-12 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + product.minOrder)}
                  className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm hover:bg-emerald-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-gray-500 text-sm">Min: {product.minOrder} {product.unit}</span>
            </div>

            <div className="text-2xl font-extrabold text-gray-900 mb-4">
              Total: <span className="gradient-text">₹{(product.price * qty).toLocaleString()}</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3.5 rounded-2xl transition-all ${
                  added
                    ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300'
                    : 'btn-primary'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => { addToCart(product, qty); navigate('/cart'); }}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-2xl transition-all"
              >
                Buy Now
              </button>
            </div>

            <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
              <Shield className="w-4 h-4 text-emerald-500" />
              Quality guaranteed. 100% refund if not satisfied.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
