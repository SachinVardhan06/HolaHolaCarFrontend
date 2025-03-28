import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "./comp/themeprovider";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import MapPopup from "./mappopup";

const BookingCard = ({ booking, darkMode, onViewRoute, onCancel }) => {
  // Extract ride details for easier access
  const ride = booking.ride_details;
  const vehicle = booking.vehicle_info;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-lg overflow-hidden`}
    >
      {/* Status Banner */}
      <div
        className={`px-4 py-2 ${
          booking.status === "CONFIRMED"
            ? "bg-green-600"
            : booking.status === "CANCELLED"
            ? "bg-red-600"
            : "bg-blue-600"
        }`}
      >
        <span className="text-white font-medium">
          {booking.booking_status_display}
        </span>
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
              <p className="text-sm text-gray-500 mt-1">Pickup point</p>
            </div>
            <div
              className={`mt-6 ${darkMode ? "text-gray-200" : "text-gray-900"}`}
            >
              <p className="font-medium">{ride.end_location}</p>
              <p className="text-sm text-gray-500 mt-1">Drop-off point</p>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center gap-4 py-4 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-white text-lg font-medium">
                {booking.driver_name?.[0] || "D"}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <p
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              {booking.driver_name}
            </p>
            {ride.driver_details?.user_phone && (
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                📞 {ride.driver_details.user_phone}
              </p>
            )}
            {ride.driver_details?.user_email && (
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                📧 {ride.driver_details.user_email}
              </p>
            )}
            {vehicle && (
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                🚗 {vehicle.make} {vehicle.model} - {vehicle.vehicle_number}
              </p>
            )}
          </div>
        </div>
        {/* Booking Details */}
        <div
          className={`grid grid-cols-2 gap-4 py-4 border-t ${
            darkMode
              ? "border-gray-700 text-gray-300"
              : "border-gray-200 text-gray-700"
          }`}
        >
          <div>
            <p className="text-sm opacity-75">Date</p>
            <p className="font-semibold">
              {new Date(ride.date).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm opacity-75">Time</p>
            <p className="font-semibold">
              {new Date(ride.start_time).toLocaleTimeString()}
            </p>
          </div>
          <div>
            <p className="text-sm opacity-75">Seats</p>
            <p className="font-semibold">{booking.seats_booked}</p>
          </div>
          <div>
            <p className="text-sm opacity-75">Amount</p>
            <p className="font-semibold text-green-600">
              ₹{booking.total_amount}
            </p>
          </div>
        </div>
        {/* Actions */}
        <div
          className={`flex space-x-3 pt-4 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <button
            onClick={() => onViewRoute(ride)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Route
          </button>
          {booking.can_cancel && booking.status === "CONFIRMED" && (
            <button
              onClick={() => onCancel(booking.id)}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
function MyBookedRides() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [filter, setFilter] = useState("all"); // Add filter state

  useEffect(() => {
    fetchBookings();
  }, [filter]); // Add filter dependency

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/bookings/my/${
          filter !== "all" ? `?status=${filter}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.group("Bookings Data");
      console.log("Full response:", response.data);
      console.log("First booking locations:", response.data[0]?.ride);
      console.groupEnd();

      if (response.data.results) {
        // Handle paginated response
        setBookings(response.data.results);
      } else if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        toast.error("Invalid bookings data format");
      }
    } catch (error) {
      console.error("Booking fetch error:", error.response?.data);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.detail || "Failed to fetch bookings");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/bookings/${bookingId}/cancel/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Booking cancelled successfully");
        fetchBookings(); // Refresh bookings list
      }
    } catch (error) {
      console.error("Cancel booking error:", error.response?.data);
      toast.error(error.response?.data?.detail || "Failed to cancel booking");
    }
  };

  const handleViewRoute = (ride) => {
    setSelectedRoute({
      start: ride.start_location,
      end: ride.end_location,
    });
    setShowMap(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-20 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
        {/* Header with Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            My Booked Rides
          </h1>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`rounded-lg border px-4 py-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
            >
              <option value="all">All Bookings</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <button
              onClick={() => navigate("/search")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Book New Ride
            </button>
          </div>
        </div>

        {/* Bookings Grid */}
        {bookings.length === 0 ? (
          <div
            className={`text-center py-12 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <p className="text-xl mb-4">
              {filter === "all"
                ? "You haven't booked any rides yet."
                : `No ${filter.toLowerCase()} bookings found.`}
            </p>
            <button
              onClick={() => navigate("/search")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Search Rides
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                darkMode={darkMode}
                onViewRoute={handleViewRoute}
                onCancel={handleCancelBooking}
              />
            ))}
          </div>
        )}
      </div>
      {showMap && selectedRoute && (
        <MapPopup
          startLocation={selectedRoute.start_location}
          endLocation={selectedRoute.end_location}
          onClose={() => setShowMap(false)}
          darkMode={darkMode}
        />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default MyBookedRides;
