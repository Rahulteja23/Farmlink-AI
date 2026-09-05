import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'te' | 'hi';
type UserRole = 'farmer' | 'consumer' | 'buyer' | 'fpo' | 'logistics' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  login: (role: UserRole, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoUsers: Record<string, User> = {
  farmer: { id: 'f1', name: 'Raju Reddy', email: 'raju@farmlink.ai', role: 'farmer', location: 'Guntur, AP', phone: '+91 9876543210' },
  consumer: { id: 'c1', name: 'Priya Sharma', email: 'priya@gmail.com', role: 'consumer', location: 'Hyderabad, TS', phone: '+91 9876543220' },
  buyer: { id: 'b1', name: 'Hotel Grand Manager', email: 'hotel@grand.com', role: 'buyer', location: 'Vijayawada, AP', phone: '+91 9876543230' },
  fpo: { id: 'fp1', name: 'Lakshmi Devi FPO', email: 'fpo@lakshmi.com', role: 'fpo', location: 'Kurnool, AP', phone: '+91 9876543240' },
  logistics: { id: 'l1', name: 'Suresh Transport', email: 'suresh@transport.com', role: 'logistics', location: 'Vijayawada, AP', phone: '+91 9876543250' },
  admin: { id: 'a1', name: 'Admin User', email: 'admin@farmlink.ai', role: 'admin', location: 'Amaravati, AP', phone: '+91 9876543260' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  const login = (role: UserRole, name?: string) => {
    if (role && demoUsers[role]) {
      const u = { ...demoUsers[role] };
      if (name) u.name = name;
      setUser(u);
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, language, setLanguage, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
