import React, { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:8000/api";

// Add API endpoints configuration
const API_ENDPOINTS = {
  login: `${API_BASE_URL}/login/`,
  register: `${API_BASE_URL}/register/`,
  logout: `${API_BASE_URL}/logout/`,
  refreshToken: `${API_BASE_URL}/token/refresh/`,
};

const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) {
    console.log("No refresh token found");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ refresh }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Token refresh failed:", data);
      // Clear invalid tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    }

    // Validate token response
    if (!data.access || typeof data.access !== 'string') {
      console.error("Invalid token response:", data);
      return null;
    }

    // Store new access token
    localStorage.setItem("accessToken", data.access);
    return data.access;
  } catch (error) {
    console.error("Token refresh error:", error);
    // Clear tokens on error
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
};

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error("Token parsing error:", error);
    return true;
  }
};


const isValidLoginResponse = (data) => {
  return (
    data &&
    typeof data.access === 'string' &&
    typeof data.refresh === 'string' &&
    data.user &&
    typeof data.user.username === 'string'
  );
};

// Add response handling utility
const handleApiResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    if (typeof data === "object") {
      const firstError = Object.entries(data)[0];
      if (firstError) {
        const [field, messages] = firstError;
        throw new Error(Array.isArray(messages) ? messages[0] : messages);
      }
    }
    throw new Error(data.detail || "Operation failed");
  }

  return data;
};

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await fetch(`${API_BASE_URL}/logout/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Logout failed");
        }
      }

      // Clear all auth data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logged out successfully");
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const validateTokens = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    
    if (!accessToken || isTokenExpired(accessToken)) {
      const newToken = await refreshToken();
      if (!newToken) {
        await handleLogout();
        return false;
      }
    }
    return true;
  }, [handleLogout]);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setUser(null);
        localStorage.removeItem("user");
      } else {
        try {
          const newToken = await refreshToken();
          if (!newToken) {
            await handleLogout();
          }
        } catch (error) {
          await handleLogout();
        }
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, [handleLogout]);

  // Token refresh interval
  useEffect(() => {
    if (user) {
      const refreshInterval = setInterval(async () => {
        const newToken = await refreshToken();
        if (!newToken) {
          await handleLogout();
        }
      }, 14 * 60 * 1000); // Refresh every 14 minutes

      return () => clearInterval(refreshInterval);
    }
  }, [user, handleLogout]);

  
  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.email, // Backend expects username field
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (data.detail) {
          throw new Error(data.detail);
        }
        if (data.non_field_errors) {
          throw new Error(data.non_field_errors[0]);
        }
        throw new Error("Invalid credentials");
      }

      // Verify required data is present
      if (!data.access || !data.refresh || !data.user) {
        throw new Error("Invalid server response");
      }

      const userData = {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        profile: data.user.profile || null,
      };

      // Store auth data
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      toast.success(`Welcome back, ${userData.username}!`);
      return true;
    } catch (error) {
      const errorMessage = error.message || "Login failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };
  // Update the handleRegister function to better handle API responses
  const handleRegister = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          password2: userData.password2,
          phone_number: userData.phone_number,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle different types of API errors
        if (typeof data === "object") {
          const firstError = Object.entries(data)[0];
          if (firstError) {
            const [field, messages] = firstError;
            throw new Error(Array.isArray(messages) ? messages[0] : messages);
          }
        }
        throw new Error(data.detail || "Registration failed");
      }

      // Check if registration was successful
      if (data.message === "Registration successful") {
        toast.success(
          "Registration successful! Please check your email to verify your account."
        );
        return true;
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      const errorMessage =
        error.message || "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Add a new method to validate registration data
  const validateRegistrationData = (userData) => {
    const errors = {};

    if (!userData.username || userData.username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
    }

    if (!userData.email || !userData.email.includes("@")) {
      errors.email = "Please enter a valid email address";
    }

    if (!userData.password || userData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (userData.password !== userData.password2) {
      errors.password2 = "Passwords do not match";
    }

    if (!userData.phone_number || !/^\d{10}$/.test(userData.phone_number)) {
      errors.phone_number = "Please enter a valid 10-digit phone number";
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };

  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem("accessToken");
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  }, []);

  const isAuthenticated = useCallback(() => {
    return !!user && !!localStorage.getItem("accessToken");
  }, [user]);

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  const contextValue = {
    user,
    loading,
    error,
    handleLogin,
    handleLogout,
    handleRegister,
    getAuthHeaders,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
