import React, { createContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, registerUser, refreshToken } from './api';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshState, setRefreshState] = useState(false);

  const [username, setUsername] = useState(localStorage.getItem('username') || 'Guest');

  // Effect to monitor localStorage updates for username
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);  // Update state if localStorage changes
    }
  }, [localStorage.getItem('username')]); // Re-run when localStorage username changes

  const login = (username) => {
    setUsername(username);
    localStorage.setItem('username', username); // Store the username in localStorage
  };

  const logout = () => {
    setUsername('Guest');
    localStorage.removeItem('username');
  };


  useEffect(() => {
    const access = localStorage.getItem('access');
    const username = localStorage.getItem('username'); // Get username from localStorage
    if (access && username) {
      setUser({ access, username });
    }
    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    
    try {
      const data = await loginUser(credentials);
      if (data) {
        // Trigger a refresh by toggling the refresh state
        setRefreshState(prevState => !prevState); // Forces component re-render
      }
      setUser({ access: data.access, username: data.username });
      setError(null);
    } catch (error) {
      setError('Details Not Matched');
      toast.warning("Login Failed")
      console.error(error);
    }
  };

  const handleRegister = async (userData) => {
    try {
      await registerUser(userData);
      await handleLogin({ email: userData.email, password: userData.password }); // Log in directly after registration
    } catch (error) {
      setError('Registration failed');
      console.error(error);
    }
  };
  

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, handleLogin, handleLogout,handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};
