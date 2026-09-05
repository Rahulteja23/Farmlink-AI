// FarmLink AI – Mock Data

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  minOrder: number;
  farmerId: string;
  farmerName: string;
  farmerRating: number;
  location: string;
  harvestDate: string;
  availableDate: string;
  description: string;
  image: string;
  organic: boolean;
  qualityGrade: string;
  freshnessDays: number;
  aiRecommendedMin: number;
  aiRecommendedMax: number;
  marketAvg: number;
  consumerPrice: number;
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  totalProducts: number;
  activeOrders: number;
  monthlyEarnings: number;
  pendingPayment: number;
  rating: number;
  crops: string[];
  farmSize: string;
  verified: boolean;
}

export interface Order {
  id: string;
  buyerName: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
  status: string;
  location: string;
  date: string;
  deliveryDate: string;
  trackingStep: number;
}

export interface BuyerRequirement {
  id: string;
  buyerName: string;
  buyerType: string;
  product: string;
  quantity: number;
  unit: string;
  location: string;
  requiredBy: string;
  targetPrice: number;
  responses: number;
  urgent: boolean;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    price: 30,
    unit: 'kg',
    quantity: 2000,
    minOrder: 10,
    farmerId: 'f1',
    farmerName: 'Raju Reddy',
    farmerRating: 4.8,
    location: 'Guntur, AP',
    harvestDate: '2026-08-25',
    availableDate: '2026-08-26',
    description: 'Fresh, juicy tomatoes grown using organic farming practices in the fertile Guntur region. No pesticides used.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80',
    organic: false,
    qualityGrade: 'A',
    freshnessDays: 7,
    aiRecommendedMin: 28,
    aiRecommendedMax: 32,
    marketAvg: 30,
    consumerPrice: 48,
  },
  {
    id: 'p2',
    name: 'Organic Onions',
    category: 'Vegetables',
    price: 22,
    unit: 'kg',
    quantity: 5000,
    minOrder: 50,
    farmerId: 'f2',
    farmerName: 'Lakshmi Devi FPO',
    farmerRating: 4.6,
    location: 'Kurnool, AP',
    harvestDate: '2026-08-22',
    availableDate: '2026-08-23',
    description: 'Premium quality organic onions. Grown in rich black soil of Kurnool district. Certified organic.',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&q=80',
    organic: true,
    qualityGrade: 'A+',
    freshnessDays: 30,
    aiRecommendedMin: 20,
    aiRecommendedMax: 25,
    marketAvg: 22,
    consumerPrice: 38,
  },
  {
    id: 'p3',
    name: 'Fresh Mangoes (Alphonso)',
    category: 'Fruits',
    price: 120,
    unit: 'kg',
    quantity: 800,
    minOrder: 5,
    farmerId: 'f3',
    farmerName: 'Srinivas Farms',
    farmerRating: 4.9,
    location: 'Vijayawada, AP',
    harvestDate: '2026-08-24',
    availableDate: '2026-08-25',
    description: 'Premium Alphonso mangoes from Vijayawada. Sweet, aromatic and ready to eat. Export quality.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80',
    organic: false,
    qualityGrade: 'A+',
    freshnessDays: 5,
    aiRecommendedMin: 115,
    aiRecommendedMax: 130,
    marketAvg: 118,
    consumerPrice: 180,
  },
  {
    id: 'p4',
    name: 'Basmati Rice',
    category: 'Grains',
    price: 65,
    unit: 'kg',
    quantity: 10000,
    minOrder: 100,
    farmerId: 'f4',
    farmerName: 'Krishna Delta FPO',
    farmerRating: 4.7,
    location: 'Amaravati, AP',
    harvestDate: '2026-08-10',
    availableDate: '2026-08-15',
    description: 'High-quality Basmati rice from the Krishna delta region. Long grain, aromatic. Directly from farmer collective.',
    image: 'https://images.unsplash.com/photo-1536304993881-ff86e6f3f786?w=400&q=80',
    organic: false,
    qualityGrade: 'A',
    freshnessDays: 365,
    aiRecommendedMin: 62,
    aiRecommendedMax: 70,
    marketAvg: 65,
    consumerPrice: 95,
  },
  {
    id: 'p5',
    name: 'Green Chillies',
    category: 'Spices',
    price: 45,
    unit: 'kg',
    quantity: 1200,
    minOrder: 10,
    farmerId: 'f5',
    farmerName: 'Rama Krishna',
    farmerRating: 4.5,
    location: 'Guntur, AP',
    harvestDate: '2026-08-26',
    availableDate: '2026-08-27',
    description: 'Guntur special green chillies. Known for their unique spice and flavor. Fresh harvest.',
    image: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&q=80',
    organic: false,
    qualityGrade: 'B+',
    freshnessDays: 10,
    aiRecommendedMin: 42,
    aiRecommendedMax: 50,
    marketAvg: 45,
    consumerPrice: 70,
  },
  {
    id: 'p6',
    name: 'Organic Bananas',
    category: 'Fruits',
    price: 28,
    unit: 'kg',
    quantity: 3000,
    minOrder: 20,
    farmerId: 'f6',
    farmerName: 'Vijaya Agri FPO',
    farmerRating: 4.6,
    location: 'Visakhapatnam, AP',
    harvestDate: '2026-08-25',
    availableDate: '2026-08-26',
    description: 'Naturally ripened organic bananas from Visakhapatnam hills. No artificial ripening agents.',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80',
    organic: true,
    qualityGrade: 'A',
    freshnessDays: 7,
    aiRecommendedMin: 25,
    aiRecommendedMax: 32,
    marketAvg: 28,
    consumerPrice: 45,
  },
  {
    id: 'p7',
    name: 'Fresh Potatoes',
    category: 'Vegetables',
    price: 18,
    unit: 'kg',
    quantity: 8000,
    minOrder: 50,
    farmerId: 'f7',
    farmerName: 'Anand Kumar',
    farmerRating: 4.4,
    location: 'Hyderabad, TS',
    harvestDate: '2026-08-20',
    availableDate: '2026-08-21',
    description: 'Fresh potatoes from Telangana farms. Suitable for restaurants and bulk buyers.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80',
    organic: false,
    qualityGrade: 'B+',
    freshnessDays: 45,
    aiRecommendedMin: 16,
    aiRecommendedMax: 20,
    marketAvg: 18,
    consumerPrice: 30,
  },
  {
    id: 'p8',
    name: 'Turmeric Powder',
    category: 'Spices',
    price: 180,
    unit: 'kg',
    quantity: 500,
    minOrder: 5,
    farmerId: 'f1',
    farmerName: 'Raju Reddy',
    farmerRating: 4.8,
    location: 'Guntur, AP',
    harvestDate: '2026-07-15',
    availableDate: '2026-07-20',
    description: 'Premium Guntur turmeric with high curcumin content. Ground fresh. Bright yellow color.',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80',
    organic: true,
    qualityGrade: 'A+',
    freshnessDays: 365,
    aiRecommendedMin: 175,
    aiRecommendedMax: 190,
    marketAvg: 180,
    consumerPrice: 260,
  },
];

export const farmers: Farmer[] = [
  {
    id: 'f1',
    name: 'Raju Reddy',
    location: 'Guntur, AP',
    phone: '+91 9876543210',
    email: 'raju.reddy@farmlink.ai',
    totalProducts: 12,
    activeOrders: 8,
    monthlyEarnings: 42500,
    pendingPayment: 8200,
    rating: 4.8,
    crops: ['Tomatoes', 'Chillies', 'Turmeric'],
    farmSize: '5 acres',
    verified: true,
  },
  {
    id: 'f2',
    name: 'Lakshmi Devi FPO',
    location: 'Kurnool, AP',
    phone: '+91 9876543211',
    email: 'lakshmi.fpo@farmlink.ai',
    totalProducts: 25,
    activeOrders: 15,
    monthlyEarnings: 1250000,
    pendingPayment: 85000,
    rating: 4.6,
    crops: ['Onions', 'Garlic', 'Cotton'],
    farmSize: '200 acres (collective)',
    verified: true,
  },
];

export const orders: Order[] = [
  {
    id: 'FL20260001',
    buyerName: 'Hotel Taj Mahal, Vijayawada',
    product: 'Fresh Tomatoes',
    quantity: 200,
    price: 30,
    total: 6000,
    status: 'In Transit',
    location: 'Vijayawada Distribution Center',
    date: '2026-08-25',
    deliveryDate: '2026-08-27',
    trackingStep: 4,
  },
  {
    id: 'FL20260002',
    buyerName: 'Reliance Fresh, Guntur',
    product: 'Organic Onions',
    quantity: 500,
    price: 22,
    total: 11000,
    status: 'Delivered',
    location: 'Guntur Store',
    date: '2026-08-22',
    deliveryDate: '2026-08-24',
    trackingStep: 6,
  },
  {
    id: 'FL20260003',
    buyerName: 'Paradise Restaurant, Hyderabad',
    product: 'Fresh Potatoes',
    quantity: 150,
    price: 18,
    total: 2700,
    status: 'Order Confirmed',
    location: 'Farmer Location',
    date: '2026-08-27',
    deliveryDate: '2026-08-29',
    trackingStep: 1,
  },
  {
    id: 'FL20260045',
    buyerName: 'Sri Durga Catering',
    product: 'Organic Bananas',
    quantity: 100,
    price: 28,
    total: 2800,
    status: 'In Transit',
    location: 'Vijayawada Distribution Center',
    date: '2026-08-26',
    deliveryDate: '2026-08-27',
    trackingStep: 4,
  },
];

export const buyerRequirements: BuyerRequirement[] = [
  {
    id: 'br1',
    buyerName: 'Hotel Grand, Vijayawada',
    buyerType: 'Hotel',
    product: 'Tomatoes',
    quantity: 500,
    unit: 'kg',
    location: 'Vijayawada',
    requiredBy: '2026-08-28',
    targetPrice: 28,
    responses: 3,
    urgent: true,
  },
  {
    id: 'br2',
    buyerName: 'MORE Supermarket',
    buyerType: 'Supermarket',
    product: 'Onions',
    quantity: 2000,
    unit: 'kg',
    location: 'Hyderabad',
    requiredBy: '2026-09-01',
    targetPrice: 20,
    responses: 5,
    urgent: false,
  },
  {
    id: 'br3',
    buyerName: 'Paradise Biryani',
    buyerType: 'Restaurant',
    product: 'Basmati Rice',
    quantity: 300,
    unit: 'kg',
    location: 'Hyderabad',
    requiredBy: '2026-08-30',
    targetPrice: 60,
    responses: 2,
    urgent: false,
  },
  {
    id: 'br4',
    buyerName: 'Fresh Mart Chain',
    buyerType: 'Retailer',
    product: 'Alphonso Mangoes',
    quantity: 200,
    unit: 'kg',
    location: 'Vijayawada',
    requiredBy: '2026-08-29',
    targetPrice: 110,
    responses: 4,
    urgent: true,
  },
  {
    id: 'br5',
    buyerName: 'Spice India Exports',
    buyerType: 'Food Processing',
    product: 'Green Chillies',
    quantity: 1000,
    unit: 'kg',
    location: 'Guntur',
    requiredBy: '2026-09-05',
    targetPrice: 40,
    responses: 7,
    urgent: false,
  },
];

export const demandData = [
  { month: 'Mar', tomato: 65, onion: 80, potato: 55, mango: 20 },
  { month: 'Apr', tomato: 72, onion: 75, potato: 60, mango: 40 },
  { month: 'May', tomato: 68, onion: 70, potato: 65, mango: 75 },
  { month: 'Jun', tomato: 80, onion: 65, potato: 70, mango: 90 },
  { month: 'Jul', tomato: 75, onion: 60, potato: 72, mango: 85 },
  { month: 'Aug', tomato: 85, onion: 72, potato: 68, mango: 60 },
  { month: 'Sep', tomato: 92, onion: 88, potato: 75, mango: 30 },
  { month: 'Oct', tomato: 88, onion: 95, potato: 80, mango: 15 },
];

export const priceData = [
  { week: 'W1', farmGate: 25, market: 30, consumer: 48 },
  { week: 'W2', farmGate: 27, market: 32, consumer: 50 },
  { week: 'W3', farmGate: 28, market: 33, consumer: 52 },
  { week: 'W4', farmGate: 26, market: 31, consumer: 49 },
  { week: 'W5', farmGate: 30, market: 36, consumer: 55 },
  { week: 'W6', farmGate: 32, market: 38, consumer: 58 },
];

export const impactMetrics = {
  additionalFarmerEarnings: 1250000,
  consumerSavings: 18,
  transportCostReduction: 24,
  farmersRegistered: 2847,
  buyersRegistered: 1234,
  productsListed: 8920,
  ordersCompleted: 15670,
  totalTransactions: 42500000,
  activeDeliveries: 234,
};

export const adminStats = {
  totalFarmers: 2847,
  totalBuyers: 1234,
  totalOrders: 15670,
  totalTransactions: 42500000,
  productsListed: 8920,
  activeDeliveries: 234,
  monthlyGrowth: [
    { month: 'Mar', revenue: 2100000, farmers: 1800, orders: 8500 },
    { month: 'Apr', revenue: 2800000, farmers: 2100, orders: 10200 },
    { month: 'May', revenue: 3200000, farmers: 2300, orders: 11800 },
    { month: 'Jun', revenue: 3800000, farmers: 2500, orders: 13200 },
    { month: 'Jul', revenue: 4200000, farmers: 2700, orders: 14500 },
    { month: 'Aug', revenue: 4250000, farmers: 2847, orders: 15670 },
  ],
};

export const vehicles = [
  { id: 'v1', driver: 'Suresh Kumar', type: 'Mini Truck (1T)', capacity: 1000, currentLoad: 720, route: 'Guntur → Vijayawada', farmers: ['Raju Reddy (200kg)', 'Srinivas Farms (220kg)', 'Anand Kumar (300kg)'], savings: 35, status: 'Loading' },
  { id: 'v2', driver: 'Ramesh Rao', type: 'Tempo (500kg)', capacity: 500, currentLoad: 480, route: 'Kurnool → Hyderabad', farmers: ['Lakshmi Devi FPO (300kg)', 'Vijaya Agri (180kg)'], savings: 22, status: 'In Transit' },
  { id: 'v3', driver: 'Venkat Reddy', type: 'Mini Truck (1T)', capacity: 1000, currentLoad: 350, route: 'Amaravati → Guntur', farmers: ['Krishna Delta FPO (350kg)'], savings: 15, status: 'Available' },
];

export const notifications = [
  { id: 'n1', type: 'order', message: 'New bulk order received: 500 kg Tomatoes from Hotel Grand', time: '2 min ago', read: false, icon: '🛒' },
  { id: 'n2', type: 'ai', message: 'AI Alert: Tomato demand expected to increase by 25% next week in Guntur region', time: '15 min ago', read: false, icon: '🤖' },
  { id: 'n3', type: 'payment', message: 'Payment of ₹11,000 received from MORE Supermarket', time: '1 hour ago', read: true, icon: '💰' },
  { id: 'n4', type: 'delivery', message: 'Order FL20260001 is out for delivery. Expected: 6:30 PM today', time: '2 hours ago', read: true, icon: '🚚' },
  { id: 'n5', type: 'price', message: 'Onion prices rising in Hyderabad market. AI recommends listing now', time: '3 hours ago', read: true, icon: '📈' },
  { id: 'n6', type: 'quality', message: 'Quality check completed for your Alphonso Mangoes. Grade: A+', time: '5 hours ago', read: true, icon: '✅' },
];

export const aiInsights = [
  { crop: 'Tomato', demand: 92, trend: 'up', insight: 'Demand rising 25% — ideal time to list', price: 30, change: '+8%' },
  { crop: 'Onion', demand: 88, trend: 'up', insight: 'Supply shortage expected, prices rising', price: 22, change: '+12%' },
  { crop: 'Potato', demand: 75, trend: 'stable', insight: 'Stable demand, good for long-term contracts', price: 18, change: '+2%' },
  { crop: 'Mango', demand: 60, trend: 'down', insight: 'Season ending, sell quickly', price: 120, change: '-5%' },
  { crop: 'Chilli', demand: 82, trend: 'up', insight: 'Export demand high from Guntur region', price: 45, change: '+15%' },
  { crop: 'Rice', demand: 70, trend: 'stable', insight: 'Bulk buyer season — target hotels and caterers', price: 65, change: '+1%' },
];

export const translations = {
  en: {
    nav_home: 'Home',
    nav_marketplace: 'Marketplace',
    nav_how: 'How It Works',
    nav_ai: 'AI Intelligence',
    nav_logistics: 'Logistics',
    nav_impact: 'Impact',
    nav_login: 'Login',
    nav_get_started: 'Get Started',
    hero_title: 'From Farm to Market, Without Unnecessary Middlemen',
    hero_sub: 'FarmLink AI directly connects farmers and FPOs with consumers and bulk buyers while using Artificial Intelligence to optimize demand, pricing, logistics, and delivery.',
    hero_cta1: 'Join as Farmer',
    hero_cta2: 'Explore Marketplace',
  },
  te: {
    nav_home: 'హోమ్',
    nav_marketplace: 'మార్కెట్‌ప్లేస్',
    nav_how: 'ఎలా పని చేస్తుంది',
    nav_ai: 'AI ఇంటెలిజెన్స్',
    nav_logistics: 'లాజిస్టిక్స్',
    nav_impact: 'ప్రభావం',
    nav_login: 'లాగిన్',
    nav_get_started: 'ప్రారంభించండి',
    hero_title: 'పొలం నుండి మార్కెట్ వరకు, అనవసరమైన మధ్యవర్తులు లేకుండా',
    hero_sub: 'FarmLink AI రైతులు మరియు FPOలను నేరుగా వినియోగదారులు మరియు బల్క్ కొనుగోలుదారులతో కలుపుతుంది.',
    hero_cta1: 'రైతుగా చేరండి',
    hero_cta2: 'మార్కెట్‌ప్లేస్ అన్వేషించండి',
  },
  hi: {
    nav_home: 'होम',
    nav_marketplace: 'मार्केटप्लेस',
    nav_how: 'यह कैसे काम करता है',
    nav_ai: 'AI इंटेलिजेंस',
    nav_logistics: 'लॉजिस्टिक्स',
    nav_impact: 'प्रभाव',
    nav_login: 'लॉगिन',
    nav_get_started: 'शुरू करें',
    hero_title: 'खेत से बाजार तक, अनावश्यक बिचौलियों के बिना',
    hero_sub: 'FarmLink AI किसानों और FPOs को सीधे उपभोक्ताओं और थोक खरीदारों से जोड़ता है।',
    hero_cta1: 'किसान के रूप में जुड़ें',
    hero_cta2: 'मार्केटप्लेस देखें',
  },
};
