import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, Shield, CreditCard, Smartphone, Home, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [stage, setStage] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [address, setAddress] = useState('');

  const deliveryCharge = total > 500 ? 0 : 50;
  const platformFee = Math.round(total * 0.02);
  const grandTotal = total + deliveryCharge + platformFee;

  if (stage === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full mx-4">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Order Placed! 🎉</h2>
          <p className="text-gray-500 mb-2">Your order has been confirmed and will be delivered fresh from the farm.</p>
          <p className="text-3xl font-extrabold gradient-text mb-6">₹{grandTotal.toLocaleString()}</p>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 text-left">
            <p className="text-sm text-emerald-800 font-semibold">📦 Order ID: FL20260{Math.floor(Math.random() * 100)}</p>
            <p className="text-sm text-emerald-700 mt-1">Expected delivery: Tomorrow by 8 AM</p>
            <p className="text-xs text-emerald-600 mt-1">Payment: {paymentMethod.toUpperCase()}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { clearCart(); navigate('/marketplace'); }} className="flex-1 btn-primary py-3">
              Continue Shopping
            </button>
            <button onClick={() => { clearCart(); navigate('/orders/FL20260045'); }} className="flex-1 btn-secondary py-3">
              Track Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && stage === 'cart') {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Discover fresh produce directly from farmers</p>
          <button onClick={() => navigate('/marketplace')} className="btn-primary">Browse Marketplace</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-8 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-emerald-600" />
          {stage === 'cart' ? 'Shopping Cart' : 'Checkout'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-4">
            {stage === 'cart' ? (
              items.map((item) => (
                <div key={item.product.id} className="card p-4 flex gap-4 items-center">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 truncate">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">{item.product.farmerName} • {item.product.location}</p>
                    <p className="text-emerald-700 font-bold">₹{item.product.price}/{item.product.unit}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - item.product.minOrder)}
                      className="w-8 h-8 bg-gray-100 hover:bg-emerald-100 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-12 text-center font-bold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + item.product.minOrder)}
                      className="w-8 h-8 bg-gray-100 hover:bg-emerald-100 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-extrabold text-gray-800">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-red-400 hover:text-red-600 mt-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-4">
                <div className="card p-5">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Home className="w-4 h-4" /> Delivery Address</h3>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your full delivery address..."
                    className="input-field"
                    rows={3}
                  />
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <input className="input-field text-sm" placeholder="City" defaultValue="Hyderabad" />
                    <input className="input-field text-sm" placeholder="PIN Code" defaultValue="500001" />
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Delivery Time</label>
                    <select className="input-field text-sm">
                      <option>Morning (6 AM – 10 AM)</option>
                      <option>Afternoon (12 PM – 4 PM)</option>
                      <option>Evening (5 PM – 8 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="card p-5">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><CreditCard className="w-4 h-4" /> Payment Method</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'upi', label: 'UPI Payment', icon: '📱', desc: 'Pay via GPay, PhonePe, Paytm' },
                      { id: 'card', label: 'Debit / Credit Card', icon: '💳', desc: 'Visa, Mastercard, Rupay' },
                      { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive' },
                    ].map((pm) => (
                      <label
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border-2 transition-all ${paymentMethod === pm.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}`}
                      >
                        <span className="text-2xl">{pm.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 text-sm">{pm.label}</p>
                          <p className="text-xs text-gray-500">{pm.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === pm.id ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'}`}>
                          {paymentMethod === pm.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={deliveryCharge === 0 ? 'text-emerald-600 font-semibold' : 'font-semibold'}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Platform Fee (2%)</span>
                  <span className="font-semibold">₹{platformFee}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-extrabold text-gray-800">Total</span>
                  <span className="font-extrabold text-2xl gradient-text">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {deliveryCharge === 0 && (
                <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-2 text-xs text-emerald-700 font-medium">
                  🎉 You saved ₹50 on delivery!
                </div>
              )}

              <button
                onClick={() => stage === 'cart' ? setStage('checkout') : setStage('success')}
                className="w-full btn-primary mt-4 py-3.5 flex items-center justify-center gap-2"
              >
                {stage === 'cart' ? <>Proceed to Checkout <ArrowRight className="w-4 h-4" /></> : 'Place Order & Pay'}
              </button>

              {stage === 'checkout' && (
                <button
                  onClick={() => setStage('cart')}
                  className="w-full btn-secondary mt-2 py-2.5 text-sm"
                >
                  ← Back to Cart
                </button>
              )}
            </div>

            <div className="card p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>Secure payment. 100% fresh guarantee.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
