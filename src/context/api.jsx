import axios from "axios";

const API_URL = "http://localhost:8000/api";  // Update this for production

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to handle token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// -------------------  LOGOUT ----------------------

export const logoutUser = async () => {
  try {
    // Call backend logout endpoint if you have one
    const response = await api.post('/logout/', {
      refresh_token: localStorage.getItem('refreshToken')
    });

    // Clear all auth-related items from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');

    // Remove Authorization header from future requests
    delete api.defaults.headers.common['Authorization'];

    return true;
  } catch (error) {
    console.error('Logout error:', error);
    // Still clear local storage even if API call fails
    localStorage.clear();
    delete api.defaults.headers.common['Authorization'];
    throw new Error(error.response?.data?.detail || 'Logout failed');
  }
};


// -------------------- Authentication ---------------------
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login/', credentials);
    
    if (response.data.token) {
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("refreshToken", response.data.refresh);
      localStorage.setItem("username", response.data.user.username);
      
      return {
        access: response.data.token,
        user: response.data.user,
      };
    }
    throw new Error("Invalid response from server");
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Invalid email or password");
    }
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};

export const registerUser = async (userData) => {
  try {
    // Ensure password confirmation matches
    if (userData.password !== userData.password2) {
      throw new Error("Passwords do not match");
    }

    const response = await api.post('/register/', {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      password2: userData.password2
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || 
                        error.response?.data?.email?.[0] ||
                        error.response?.data?.username?.[0] ||
                        error.message ||
                        "Registration failed";
    throw new Error(errorMessage);
  }
};

export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh');
    const response = await api.post('/token/refresh/', { refresh });
    localStorage.setItem('access', response.data.access);
    return response.data.access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    logoutUser();
    throw new Error("Session expired. Please login again.");
  }
};

// -------------------- User Profile ---------------------
export const getUserProfile = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/profile/', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch profile');
  }
};

export const updateProfile = async (formData) => {
  try {
    const response = await fetch('http://localhost:8000/api/profile/', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to update profile');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to update profile');
  }
};
// -------------------- Rides ---------------------

export const searchRides = async (filters) => {
  try {
    const response = await api.get('/rides/search/', { params: filters });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Search failed");
  }
};

export const publishRide = async (rideData) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.post(
      'http://localhost:8000/api/rides/',
      rideData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Publish ride error details:', error.response?.data);
    if (error.response?.status === 401) {
      throw new Error('Please log in again');
    }
    throw error.response?.data || error;
  }
};


export const bookRide = async (rideId, bookingData) => {
  try {
    const response = await api.post(`/rides/${rideId}/book/`, bookingData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Booking failed");
  }
};

export const cancelRide = async (rideId) => {
  try {
    const response = await api.post(`/rides/${rideId}/cancel/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Cancellation failed");
  }
};

export const getUserRides = async () => {
  try {
    const response = await api.get('/rides/my-rides/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch rides");
  }
};

// -------------------- Reviews ---------------------

export const submitReview = async (rideId, reviewData) => {
  try {
    const response = await api.post(`/rides/${rideId}/review/`, reviewData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to submit review");
  }
};

export const getRideReviews = async (rideId) => {
  try {
    const response = await api.get(`/rides/${rideId}/reviews/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch reviews");
  }
};

// -------------------- Error Handler ---------------------

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    return error.response.data.detail || "An error occurred";
  } else if (error.request) {
    // Request made but no response
    return "Network error. Please check your connection.";
  } else {
    // Request setup error
    return "An error occurred. Please try again.";
  }
};



export const getVehicles = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:8000/api/vehicles/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch vehicles');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch vehicles error:', error);
    throw error;
  }
};

export const deleteVehicle = async (vehicleId) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`http://localhost:8000/api/vehicles/${vehicleId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete vehicle');
    }
    
    return true;
  } catch (error) {
    console.error('Delete vehicle error:', error);
    throw error;
  }
};