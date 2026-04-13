import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('jobPortalUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('jobPortalToken'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem('jobPortalUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('jobPortalUser');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('jobPortalToken', token);
    } else {
      localStorage.removeItem('jobPortalToken');
    }
  }, [token]);

  useEffect(() => {
    const loadProfile = async () => {
      if (token && !user) {
        try {
          const profile = await fetchProfile();
          setUser(profile);
        } catch (error) {
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadProfile();
  }, [token, user]);

  const login = ({ token: authToken, ...userInfo }) => {
    setToken(authToken);
    setUser(userInfo);
    navigate('/jobs');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const value = { user, token, login, logout, isAuthenticated: Boolean(user && token), loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
