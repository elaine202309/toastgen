import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || '';

interface User {
  email: string;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshCredits: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('toastgen_token'));
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async (t: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, { headers: { Authorization: `Bearer ${t}` } });
      if (res.ok) {
        const data = await res.json();
        setUser({ email: data.email, credits: data.credits });
      } else {
        localStorage.removeItem('toastgen_token');
        setToken(null);
      }
    } catch {
      // offline — keep token
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      fetchMe(token);
    } else {
      setLoading(false);
    }
  }, [token, fetchMe]);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    localStorage.setItem('toastgen_token', data.token);
    setToken(data.token);
    setUser({ email: data.email, credits: data.credits });
  };

  const register = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    localStorage.setItem('toastgen_token', data.token);
    setToken(data.token);
    setUser({ email: data.email, credits: data.credits });
  };

  const logout = () => {
    localStorage.removeItem('toastgen_token');
    setToken(null);
    setUser(null);
  };

  const refreshCredits = async () => {
    if (!token) return;
    const res = await fetch(`${API_BASE}/api/credits`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) {
      const data = await res.json();
      setUser(prev => prev ? { ...prev, credits: data.credits } : null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshCredits }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
