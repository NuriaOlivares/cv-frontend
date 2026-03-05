import { createContext, useState, useEffect, type ReactNode } from 'react';
import { authApi } from '../api/authApi';
import type { LoginRequest, LoginResponse } from '../types/cv.types';

interface AuthContextType {
  user: LoginResponse | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        await authApi.refresh();
        const stored = localStorage.getItem('user');
        if (stored) setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (request: LoginRequest) => {
    const response = await authApi.login(request);
    setUser(response);
    localStorage.setItem('user', JSON.stringify(response));
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = user?.role === 'ROLE_ADMIN';

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};