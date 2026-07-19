import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/authApi.js';
import * as userApi from '../api/userApi.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }
    
    try {
      const res = await authApi.getMe();
      // Backend returns { success, data: { user }, message }
      setUser(res.data?.user || res.data || null);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await authApi.login(email, password);
    // Backend returns { success, data: { user, accessToken }, message }
    const { user: userData, accessToken } = res.data;
    localStorage.setItem('token', accessToken);
    setUser(userData);
    setIsAuthenticated(true);
    return res;
  };

  const signup = async (name, email, password) => {
    const res = await authApi.signup(name, email, password);
    // Backend returns { success, data: { user, accessToken }, message }
    const { user: userData, accessToken } = res.data;
    localStorage.setItem('token', accessToken);
    setUser(userData);
    setIsAuthenticated(true);
    return res;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = async (userData) => {
    try {
      const res = await userApi.updateProfile(userData);
      // Backend returns { success, data: updatedUser, message }
      const updatedUser = res.data || userData;
      setUser(prev => ({ ...prev, ...updatedUser }));
      return updatedUser;
    } catch (error) {
      // Still update local state optimistically
      setUser(prev => ({ ...prev, ...userData }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, signup, logout, updateUser, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
