import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import LocationSearch from "./Location/locationsearch";
import { toast } from "react-toastify";
import MapPopup from "./mappopup";
import AddressToCoordinates from "./addresstocoordinate";
import { ThemeContext } from "./comp/themeprovider";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaSearch,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaExchangeAlt,
} from "react-icons/fa";

// Helper component for ride cards
const RideCard = ({ ride, onShowRoute, darkMode }) => {
  // Update getUserInitials function
  const getUserInitials = (ride) => {
    if (ride?.driver_details?.full_name) {
      return ride.driver_details.full_name[0].toUpperCase();
    }
    return "U";
  };

  // Update getUserDisplayName function
  const getUserDisplayName = (ride) => {
    if (ride?.driver_details?.full_name) {
      return ride.driver_details.full_name;
    }
    if (ride?.driver_details?.username) {
      return ride.driver_details.username;
    }
    return "Unknown User";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 font-inter flex justify-between items-center">
        <span className="text-white font-medium">
          {ride.time || "Flexible"}
        </span>
        {/* <span className="text-white font-bold">₹{ride.price}</span> */}
      </div>

      <div className="p-4">
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
          <span className="text-green-400 text-2xl font-bold">₹{ride.price}</span>
        </div>

        <div
          className={`flex items-center gap-4 py-3 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-white text-lg font-medium">
                {getUserInitials(ride)}
              </span>
            </div>
          </div>
          <div className="flex-1">
          <p className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
            {getUserDisplayName(ride)}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <svg className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {ride.driver_details?.rating || 'New'} • {ride.driver_details?.total_rides || 0} rides
            </span>
          </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.open(`/book-ride/${ride.id}`, "_blank")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Book
            </button>
            <button
              onClick={() =>
                onShowRoute(ride.start_location, ride.end_location)
              }
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Show Route"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`flex gap-4 mt-3 pt-3 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <svg
              className={`h-5 w-5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {ride.available_seats || 0} seats left
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className={`h-5 w-5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {ride.date}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};



function SearchPage() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [date, setDate] = useState("");
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapLocations, setMapLocations] = useState({ start: "", end: "" });
  const [expandedRide, setExpandedRide] = useState(null);
  const { darkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const handleSearch = async () => {
    if (!startLocation || !endLocation || !date) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // Remove token requirement
      const response = await axios.get(
        "http://localhost:8000/api/rides/search/",
        {
          params: {
            start_location: startLocation,
            end_location: endLocation,
            date: date,
          },
        }
      );

      if (response.data && Array.isArray(response.data)) {
        setRides(response.data);
        if (response.data.length === 0) {
          toast.info("No rides found for this route and date");
        }
      } else {
        toast.error("Invalid response format from server");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error(error.response?.data?.detail || "Failed to fetch rides");
    } finally {
      setLoading(false);
    }
  };
  const handleSwapLocations = () => {
    const temp = startLocation;
    setStartLocation(endLocation);
    setEndLocation(temp);
  };

  const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <div className="relative">
      <input
        ref={ref}
        type="text"
        value={value}
        onClick={onClick}
        readOnly
        className={`w-full p-3 border rounded-lg cursor-pointer pl-10 ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-gray-200 pl-4"
            : "bg-white border-gray-300 text-gray-700"
        }`}
        placeholder="Select travel date"
      />
    </div>
  ));

  const handleShowRoute = async (start, end) => {
    try {
      const startCoords = await AddressToCoordinates(start);
      const endCoords = await AddressToCoordinates(end);

      if (!startCoords || !endCoords) {
        toast.error("Could not locate addresses on map");
        return;
      }

      setMapLocations({ start: startCoords, end: endCoords });
      setShowMap(true);
    } catch (error) {
      toast.error("Failed to load map route");
    }
  };
  const inputClassName = `w-full p-3 border rounded-lg ${
    darkMode
      ? "bg-gray-800 border-gray-700 text-gray-200"
      : "bg-white border-gray-300 text-gray-900"
  }`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`min-h-screen pt-20 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        {/* Hero Section */}
        <div
          className={`w-full py-16 mt-5 font-inter ${
            darkMode ? "bg-gray-800" : "bg-blue-50"
          }`}
        >
          <div className="max-w-4xl mx-auto px-4">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className={`text-4xl md:text-5xl font-bold text-center mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Find Your Perfect Ride
            </motion.h1>
            <motion.p
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className={`text-xl text-center mb-12 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Travel together, save money, and reduce carbon footprint
            </motion.p>

            {/* Search Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`rounded-xl shadow-2xl p-6 ${
                darkMode ? "bg-gray-900" : "bg-white"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Start Location */}
                <div className="md:col-span-5 relative">
                  <div className="relative">
                    <FaMapMarkerAlt
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                        darkMode ? "text-green-400" : "text-green-500"
                      }`}
                    />
                    <LocationSearch
                      label="From"
                      onSelect={setStartLocation}
                      darkMode={darkMode}
                      inputClassName={`${inputClassName} pl-10`}
                      labelClassName={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    />
                  </div>
                </div>
                {/* Swap Button */}
                <div className="md:col-span-2 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSwapLocations}
                    className={`p-3 rounded-full ${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <FaExchangeAlt
                      className={darkMode ? "text-gray-400" : "text-gray-600"}
                    />
                  </motion.button>
                </div>
                {/* End Location */}
                <div className="md:col-span-5 relative">
                  <div className="relative">
                    <FaMapMarkerAlt
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                        darkMode ? "text-red-400" : "text-red-500"
                      }`}
                    />
                    <LocationSearch
                      label="To"
                      onSelect={setEndLocation}
                      darkMode={darkMode}
                      inputClassName={`${inputClassName} pl-10`}
                      labelClassName={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    />
                  </div>
                </div>
                <div className="md:col-span-7 ">
                  <DatePicker
                    selected={date ? new Date(date) : null}
                    onChange={(date) =>
                      setDate(date.toISOString().split("T")[0])
                    }
                    minDate={new Date()}
                    customInput={<CustomDateInput />}
                    dateFormat="dd MMM yyyy"
                    placeholderText="Select travel date"
                    className={inputClassName}
                    popperClassName={`${darkMode ? "dark-calendar" : ""}`}
                    calendarClassName={`shadow-lg rounded-lg border ${
                      darkMode
                        ? "bg-gray-800 border-gray-700 text-gray-200"
                        : "bg-white border-gray-200 text-gray-700 shadow-lg rounded-lg"
                    }`}
                  />
                </div>
                {/* Search Button */}
                <div className="md:col-span-5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSearch}
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
                  >
                    <FaSearch />
                    {loading ? "Searching..." : "Search Rides"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto p-6 space-y-4">
        {rides.length === 0 && !loading ? (
          <div
            className={`text-center py-12 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <p className="text-xl mb-4">
              No rides found for this route and date
            </p>
            <p>Try different dates or locations</p>
          </div>
        ) : (
          rides.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              onShowRoute={handleShowRoute}
              darkMode={darkMode}
            />
          ))
        )}
      </div>

      {showMap && (
        <MapPopup
          startLocation={mapLocations.start}
          endLocation={mapLocations.end}
          onClose={() => setShowMap(false)}
          darkMode={darkMode}
        />
      )}
    </>
  );
}

export default SearchPage;
