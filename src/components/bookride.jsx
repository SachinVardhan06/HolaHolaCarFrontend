import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "./comp/themeprovider";
import { toast } from "react-toastify";
import MapPopup from "./mappopup";
import AddressToCoordinates from "./addresstocoordinate";

function BookRide() {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [mapLocations, setMapLocations] = useState({ start: "", end: "" });
  const [seats, setSeats] = useState(1);


  

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/rides/${rideId}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log("Ride details:", response.data); // For debugging
        setRide(response.data);
      } catch (error) {
        toast.error("Failed to fetch ride details");
        navigate("/search");
      } finally {
        setLoading(false);
      }
    };

    fetchRideDetails();
  }, [rideId]);

  const handleShowRoute = async () => {
    try {
      const startCoords = await AddressToCoordinates(ride.start_location);
      const endCoords = await AddressToCoordinates(ride.end_location);
      setMapLocations({ start: startCoords, end: endCoords });
      setShowMap(true);
    } catch (error) {
      toast.error("Failed to load map route");
    }
  };

  const getDriverName = (ride) => {
    if (ride?.driver_details?.full_name) {
      return ride.driver_details.full_name;
    }
    if (ride?.driver_details?.username) {
      return ride.driver_details.username;
    }
    return "Anonymous Driver";
  };
  
  const getDriverInitial = (ride) => {
    if (ride?.driver_details?.full_name) {
      return ride.driver_details.full_name[0].toUpperCase();
    }
    if (ride?.driver_details?.username) {
      return ride.driver_details.username[0].toUpperCase();
    }
    return "U";
  };

  // Update the handleBooking function
  // Update the handleBooking function
  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login to book a ride");
      navigate("/login");
      return;
    }

    if (!validateBooking()) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/bookings/create/",
        {
          ride: parseInt(rideId),
          user: user.id, // Add user ID
          seats_booked: seats, // Change number_of_seats to seats_booked
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Ride booked successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Booking error:", error.response?.data);

      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        toast.error("Session expired. Please login again");
        navigate("/login");
      } else if (error.response?.status === 400) {
        const errorMessage =
          error.response.data.seats_booked?.[0] || // Update error field name
          error.response.data.ride?.[0] ||
          error.response.data.user?.[0] ||
          error.response.data.non_field_errors?.[0] ||
          error.response.data.detail ||
          "Failed to book ride";
        toast.error(errorMessage);
      } else if (error.response?.status === 403) {
        toast.error("You cannot book your own ride");
      } else {
        toast.error("Server error. Please try again later");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/rides/${rideId}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        // Detailed console logging
        console.group("Ride Details Data");
        console.log("Full response:", response.data);
        console.log("Driver details:", response.data.driver_details);
        console.log("User info:", response.data.user);
        console.log("Vehicle info:", response.data.vehicle);
        console.groupEnd();

        setRide(response.data);
      } catch (error) {
        console.error("Error fetching ride details:", error);
        toast.error("Failed to fetch ride details");
        navigate("/search");
      } finally {
        setLoading(false);
      }
    };

    fetchRideDetails();
  }, [rideId]);

  // Update the validation function
  const validateBooking = () => {
    if (!ride) {
      toast.error("Ride details not available");
      return false;
    }

    if (!user) {
      toast.error("Please login to book a ride");
      navigate("/login");
      return false;
    }

    if (ride.available_seats < seats) {
      toast.error(`Only ${ride.available_seats} seats available`);
      return false;
    }

    if (ride.user.id === user.id) {
      toast.error("You cannot book your own ride");
      return false;
    }

    const rideDateTime = new Date(`${ride.date}T${ride.time}`);
    if (rideDateTime < new Date()) {
      toast.error("This ride has already departed");
      return false;
    }

    return true;
  };

  // Also add validation before booking

  // Update the Book Now button to use validation

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!ride) return null;

  return (
    <div
      className={`min-h-screen pt-20 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-4xl mx-auto p-6">
        <div
          className={`rounded-lg shadow-xl overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Ride Details</h1>
            <p className="text-lg">
              {ride.start_location} → {ride.end_location}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Trip Details */}
            <div
              className={`grid grid-cols-2 gap-6 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div>
                <h3 className="font-semibold mb-2">Date & Time</h3>
                <p>{new Date(ride.date).toLocaleDateString()}</p>
                <p>{ride.time}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Price</h3>
                <p className="text-2xl font-bold text-green-600">
                  ₹{ride.price}
                </p>
              </div>
            </div>

            {/* Driver Details Section */}
            <div
              className={`border-t ${
                darkMode ? "border-gray-700" : "border-gray-200"
              } pt-6`}
            >
              <h3
                className={`font-semibold mb-4 ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Driver Details
              </h3>
              <div className="flex items-start space-x-4">
                {/* Avatar/Initial */}
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-medium">
                    {ride.driver_details?.full_name?.[0] || "U"}
                  </span>
                </div>

                <div className="flex-1 space-y-2">
                  {/* Name and Verification */}
                  <div>
                    <p
                      className={`font-medium ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      {ride.driver_details?.full_name || "Anonymous Driver"}
                    </p>
                    {ride.driver_details?.verification_status ===
                      "VERIFIED" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verified Driver
                      </span>
                    )}
                  </div>

                  {/* Phone Number */}
                  {/* Phone Number */}
                  <div className={darkMode ? "text-gray-400" : "text-gray-600"}>
                    <p className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {ride.driver_details?.user_phone ||
                        "No phone number available"}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Total Rides: {ride.driver_details?.total_rides || 0}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Rating: {ride.driver_details?.rating || "New"} ⭐
                      </p>
                    </div>
                  </div>

                  {/* Driver Image if available */}
                  {ride.driver_details?.image && (
                    <div className="mt-4">
                      <img
                        src={ride.driver_details.image}
                        alt={ride.driver_details.full_name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Section */}
            <div
              className={`border-t ${
                darkMode ? "border-gray-700" : "border-gray-200"
              } pt-6`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <label
                  className={`font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Number of Seats:
                </label>
                <select
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  className={`rounded-lg border p-2 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  {[1, 2, 3].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => validateBooking() && handleBooking()}
                  disabled={loading}
                  className={`flex-1 py-3 rounded-lg transition-colors ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Booking...
                    </span>
                  ) : (
                    "Book Now"
                  )}
                </button>
                <button
                  onClick={handleShowRoute}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Route
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showMap && (
        <MapPopup
          startLocation={mapLocations.start}
          endLocation={mapLocations.end}
          onClose={() => setShowMap(false)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default BookRide;
