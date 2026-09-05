import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Star, MapPin, Leaf, ShoppingCart, Eye, ChevronDown, X } from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/mockData';

const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices', 'Dairy'];
const sortOptions = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Farmer Rating', 'Freshest First'];

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="card-hover overflow-hidden group">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.organic && (
            <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Leaf className="w-3 h-3" /> Organic
            </span>
          )}
          <span className={`text-white text-xs font-bold px-2 py-0.5 rounded-full ${
            product.qualityGrade === 'A+' ? 'bg-purple-500' : product.qualityGrade === 'A' ? 'bg-blue-500' : 'bg-amber-500'
          }`}>
            Grade {product.qualityGrade}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-bold text-emerald-700">
          {product.freshnessDays}d fresh
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">{product.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{product.farmerName}</p>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="text-xs font-semibold text-gray-700">{product.farmerRating}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3">
          <MapPin className="w-3 h-3" />
          <span>{product.location}</span>
          <span className="mx-1">•</span>
          <span>{product.quantity.toLocaleString()} kg available</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-extrabold text-emerald-700">₹{product.price}</span>
            <span className="text-gray-400 text-xs">/{product.unit}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 line-through">₹{product.consumerPrice}/kg market</p>
            <p className="text-xs text-emerald-600 font-semibold">
              Save {Math.round((1 - product.price / product.consumerPrice) * 100)}%
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/marketplace/${product.id}`}
            className="flex-1 flex items-center justify-center gap-1 border-2 border-emerald-200 text-emerald-700 text-sm font-semibold py-2 rounded-xl hover:bg-emerald-50 transition-all"
          >
            <Eye className="w-4 h-4" /> Details
          </Link>
          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-1 text-sm font-semibold py-2 rounded-xl transition-all ${
              added
                ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState('Relevance');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = products
    .filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.farmerName.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== 'All' && p.category !== category) return false;
      if (organicOnly && !p.organic) return false;
      if (p.price > maxPrice) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Farmer Rating') return b.farmerRating - a.farmerRating;
      if (sortBy === 'Freshest First') return a.freshnessDays - b.freshnessDays;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-white mb-2">🌿 Fresh Produce Marketplace</h1>
          <p className="text-emerald-100 mb-6">Directly from {products.length}+ verified farmers & FPOs across Andhra Pradesh & Telangana</p>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, farmers, locations..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-emerald-300 shadow-lg"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white/20 hover:bg-white/30 text-white px-5 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all border border-white/30"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:block">Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                category === cat
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Max Price (₹/kg)</label>
                <input
                  type="range"
                  min={10}
                  max={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <p className="text-sm text-emerald-700 font-semibold mt-1">Up to ₹{maxPrice}/kg</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field text-sm"
                >
                  {sortOptions.map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setOrganicOnly(!organicOnly)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${organicOnly ? 'bg-emerald-500' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${organicOnly ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </div>
                  <span className="font-semibold text-gray-700 text-sm">Organic Only</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 text-sm">
            Showing <span className="font-bold text-gray-800">{filtered.length}</span> products
            {organicOnly && <span className="ml-2 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">🌿 Organic</span>}
          </p>
        </div>

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
            <button onClick={() => { setSearch(''); setCategory('All'); setOrganicOnly(false); }} className="mt-4 btn-primary text-sm py-2">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
