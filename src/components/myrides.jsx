import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "./comp/themeprovider";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

// Create a RideCard component for better organization
const RideCard = ({ ride, darkMode, onCancel }) => {
  const [showBookings, setShowBookings] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg shadow-lg overflow-hidden ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      {/* Status Banner */}
      <div
        className={`px-4 py-2 ${
          ride.status === "SCHEDULED"
            ? "bg-green-600"
            : ride.status === "CANCELLED"
            ? "bg-red-600"
            : ride.status === "COMPLETED"
            ? "bg-blue-600"
            : "bg-yellow-600"
        }`}
      >
        <span className="text-white font-medium">{ride.status}</span>
      </div>

      <div className="p-6">
        {/* Route Information */}
        <div className="flex gap-3 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="w-0.5 h-16 bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
          </div>
          <div className="flex-1">
            <div className={darkMode ? "text-gray-200" : "text-gray-900"}>
              <p className="font-medium">{ride.start_location}</p>
              <p className="text-sm text-gray-500 mt-1">Start point</p>
            </div>
            <div
              className={`mt-6 ${darkMode ? "text-gray-200" : "text-gray-900"}`}
            >
              <p className="font-medium">{ride.end_location}</p>
              <p className="text-sm text-gray-500 mt-1">End point</p>
            </div>
          </div>
        </div>
        {/* Ride Details */}
        <div
          className={`grid grid-cols-2 gap-4 py-4 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              {new Date(ride.date).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              {new Date(ride.start_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className={`font-medium text-green-600`}>₹{ride.price}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Available Seats</p>
            <p
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              {ride.available_seats}
            </p>
          </div>
        </div>
        {ride.bookings && ride.bookings.length > 0 && (
          <div
            className={`mt-4 border-t ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {/* Bookings Header */}
            <button
              onClick={() => setShowBookings(!showBookings)}
              className={`w-full py-2 flex items-center justify-between ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  Bookings ({ride.bookings.length})
                </span>
                {ride.bookings.some((b) => b.status === "CONFIRMED") && (
                  <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  showBookings ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Bookings List */}
            {showBookings && (
              <div className="mt-4 space-y-4">
                {ride.bookings.map((booking) => (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={booking.id}
                    className={`w-full p-4 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    {/* User Info and Status */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500`}
                        >
                          <span className="text-white font-medium">
                            {booking.user_details?.full_name?.[0]?.toUpperCase() ||
                              "?"}
                          </span>
                        </div>
                        <div>
                          <h3
                            className={`font-medium ${
                              darkMode ? "text-gray-200" : "text-gray-900"
                            }`}
                          >
                            {booking.user_details?.full_name ||
                              "Anonymous User"}
                          </h3>
                          {booking.user_details?.user_phone && (
                            <p
                              className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              📱 {booking.user_details.user_phone}
                            </p>
                          )}
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm ${
                          booking.status === "CONFIRMED"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {booking.status}
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div
                      className={`grid grid-cols-2 gap-4 mt-3 pt-3 border-t ${
                        darkMode ? "border-gray-600" : "border-gray-200"
                      }`}
                    >
                      <div>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Seats Booked
                        </p>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-gray-200" : "text-gray-900"
                          }`}
                        >
                          {booking.seats_booked} seat(s)
                        </p>
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Amount Paid
                        </p>
                        <p className="font-medium text-green-600">
                          ₹{booking.total_amount}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Booked on
                        </p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {new Date(booking.booking_date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* Actions */}
        {ride.status === "SCHEDULED" && (
          <div
            className={`mt-4 pt-4 border-t ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => onCancel(ride.id)}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Cancel Ride
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

function MyRides() {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyRides = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No access token found");
        }

        const response = await axios.get(
          "https://holaholacarbackend-5.onrender.com/api/rides/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              user: user.id,
            },
          }
        );

        if (response.data) {
          console.group("Rides Data Debug");
          console.log("Full response:", response.data);
          console.log("First ride bookings:", response.data[0]?.bookings);
          console.log(
            "First ride user details:",
            response.data[0]?.bookings?.[0]?.user_details
          );
          console.groupEnd();
          setRides(response.data);
        } else {
          setRides([]);
        }
      } catch (error) {
        console.error("Error fetching rides:", error);
        const errorMessage =
          error.response?.data?.detail || "Failed to fetch rides";
        setError(errorMessage);
        toast.error(errorMessage);

        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyRides();
  }, [user, navigate]);

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        } pt-20`}
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        } pt-20`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }
  const handleCancelRide = async (rideId) => {
    if (
      !window.confirm(
        "Are you sure you want to cancel this ride? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.put(
        `https://holaholacarbackend-5.onrender.com/api/rides/${rideId}/cancel/`,
        { status: "CANCELLED" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setRides((prevRides) =>
          prevRides.map((ride) =>
            ride.id === rideId ? { ...ride, status: "CANCELLED" } : ride
          )
        );
        toast.success("Ride cancelled successfully");
      }
    } catch (error) {
      console.error("Error cancelling ride:", error.response || error);

      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        toast.error("Session expired. Please login again");
        navigate("/login");
        return;
      }

      const errorMessage =
        {
          403: "You don't have permission to cancel this ride",
          400: "Cannot cancel ride - Some passengers have already booked",
          404: "Ride not found",
        }[error.response?.status] ||
        "Failed to cancel ride. Please try again later";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`min-h-screen  font-inter ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } pt-20`}
    >
      <div className="container mx-auto mt-10 px-4">
        <h1
          className={`text-3xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          My Published Rides
        </h1>

        {rides.length === 0 ? (
          <div
            className={`text-center py-10 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <p className="mb-4">You haven't published any rides yet.</p>
            <Link
              to="/publish"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Publish a Ride
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rides.map((ride) => (
              <RideCard
                key={ride.id}
                ride={ride}
                darkMode={darkMode}
                onCancel={handleCancelRide}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRides;
