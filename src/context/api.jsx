import axios from "axios";

const API_URL = "https://holaholacarbackend-4.onrender.com/api";

// -------------------- Authentication ---------------------


export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/token/`, credentials);

    
    const userDetails = await axios.get(`${API_URL}/user/`, {
      headers: { Authorization: `Bearer ${response.data.access}` },
    });
    console.log("User Details:", userDetails.data);

    const username = userDetails.data.username;
    localStorage.setItem("username", username);
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    return { access: response.data.access, username };
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed");
  }
};

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, userData);
    console.log("User registered:", response.data);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error);
    throw new Error("Registration failed");
  }
};

// Function to log out the user
export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("username");
};

// Function to refresh the access token
export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_URL}/token/refresh/`, {
      refresh: refreshToken,
    });
    return response.data;
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw new Error("Token refresh failed");
  }
};

// -------------------- Ride ---------------------

// Function to search for rides
export const searchRides = async (startLocation, endLocation, date) => {
  try {
    const response = await axios.get(`${API_URL}/search-rides/`, {
      params: {
        start_location: startLocation,
        end_location: endLocation,
        date: date,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rides:", error);
    throw new Error("Error fetching rides");
  }
};

// Function to publish a new ride

export const publishRide = async (rideData) => {
  try {
    const response = await axios.post(`${API_URL}/ride/`, rideData);
    return response.data;
  } catch (error) {
    console.error("Error publishing ride:", error);
    throw new Error("Error publishing ride");
  }
};

// Function to book a ride
export const bookRide = async (rideId, numPassengers, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/rides/book/`,
      { ride_id: rideId, num_passengers: numPassengers },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Booking failed:", error);
    throw new Error("Booking failed");
  }
};

// -------------------- Fetch Rides Example ---------------------

export const fetchRides = async (
  startLocation,
  endLocation,
  date,
  setRides,
  setLoading
) => {
  setLoading(true);
  try {
    const ridesData = await searchRides(startLocation, endLocation, date);
    console.log("Fetched Rides:", ridesData);
    setRides(ridesData.rides);
  } catch (error) {
    console.error("Error fetching rides:", error);
  } finally {
    setLoading(false);
  }
};
