import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Zap } from 'lucide-react';

const suggestions = [
  'What crops have high demand?',
  'Best price for tomatoes?',
  'Show my active orders',
  'How to reduce transport costs?',
];

const responses: Record<string, string> = {
  'What crops have high demand?': '🌾 **High Demand Crops Right Now:**\n\n1. **Tomato** — 92% demand, +8% price trend. Sell immediately!\n2. **Onion** — 88% demand, supply shortage expected. Prices rising.\n3. **Chilli** — 82% demand, high export orders from Guntur.\n\nI recommend listing Tomatoes first for maximum returns!',
  'Best price for tomatoes?': '💰 **AI Price Recommendation for Tomato:**\n\n• Farmer Gate Price: ₹30/kg\n• Regional Market Average: ₹33/kg\n• AI Recommended Range: ₹28–32/kg\n• Confidence Level: 87%\n\nBased on current demand (92%), transport costs, and historical data from Guntur region.',
  'Show my active orders': '📦 **Your Active Orders:**\n\n1. Hotel Taj Mahal — 200 kg Tomatoes — ₹6,000 — *In Transit*\n2. Reliance Fresh — 500 kg Onions — ₹11,000 — *Delivered*\n3. Paradise Restaurant — 150 kg Potatoes — ₹2,700 — *Confirmed*\n\nTotal pending: ₹8,700. Payment expected within 24 hours.',
  'How to reduce transport costs?': '🚚 **AI Transport Cost Reduction Tips:**\n\n1. **Use Load Sharing** — Combine with 2-3 nearby farmers going to the same city. Save 25-35%\n2. **Optimize Timing** — Schedule pickups in morning to avoid traffic\n3. **AI Route Planning** — Let FarmLink AI find the optimal multi-drop route\n4. **Group with FPOs** — Partner with local FPO for bulk shipments\n\nPotential savings: ₹800–1,200 per delivery!',
};

const defaultResponse = (query: string) =>
  `🤖 **FarmLink AI Response:**\n\nThank you for your question about "${query}". Based on current market data from Vijayawada, Guntur, and Hyderabad regions:\n\n• Current market conditions are favorable for farmers\n• AI demand forecasting shows 75-92% demand for most crops\n• Smart logistics can save you 20-30% on transport costs\n\nWould you like me to show specific data for any crop or region?`;

interface Message {
  from: 'user' | 'ai';
  text: string;
  time: string;
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'ai',
      text: '👋 **Hello!** I\'m your FarmLink AI Assistant.\n\nI can help you with:\n• Market demand & crop prices\n• Your orders and deliveries\n• Transport cost optimization\n• Weather and seasonal advice\n\nWhat would you like to know?',
      time: 'Now',
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { from: 'user', text, time: 'Now' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const aiText = responses[text] || defaultResponse(text);
      setMessages((prev) => [...prev, { from: 'ai', text: aiText, time: 'Now' }]);
      setTyping(false);
    }, 1200);
  };

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-gray-800">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={i} className="text-sm text-gray-700">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
          </p>
        );
      }
      if (line.startsWith('•') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.')) {
        return <p key={i} className="text-sm text-gray-700 ml-2">{line}</p>;
      }
      return <p key={i} className="text-sm text-gray-700">{line}</p>;
    });
  };

  return (
    <>
      {/* Float button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full shadow-2xl shadow-emerald-500/40 flex items-center justify-center z-50 transition-all hover:scale-110 animate-pulse-glow ${open ? 'scale-90' : ''}`}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[520px] flex flex-col bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white">FarmLink AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                  <p className="text-emerald-100 text-xs">Online · Powered by AI</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'ai' && (
                  <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-1">🤖</div>
                )}
                <div className={`max-w-[75%] rounded-2xl p-3 space-y-0.5 ${
                  msg.from === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-sm'
                    : 'bg-white border border-gray-200 rounded-tl-sm shadow-sm'
                }`}>
                  {msg.from === 'user' ? (
                    <p className="text-sm text-white">{msg.text}</p>
                  ) : (
                    <div>{formatText(msg.text)}</div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-xs">🤖</div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-3 flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <div key={d} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${d * 0.15}s` }}></div>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef}></div>
          </div>

          {/* Suggestions */}
          <div className="px-3 py-2 bg-white border-t border-gray-100">
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="flex-shrink-0 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full transition-colors border border-emerald-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            />
            <button
              onClick={() => sendMessage(input)}
              className="w-10 h-10 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
