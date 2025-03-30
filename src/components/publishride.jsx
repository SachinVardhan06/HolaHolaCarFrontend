import React, { useState, useContext, useEffect } from "react";
import { publishRide } from "../context/api";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "./comp/themeprovider";
import LocationSearch from "./Location/locationsearch";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const PublishRideForm = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const [step, setStep] = useState(1);
  const [vehicles, setVehicles] = useState([]);

  // Initialize form data with test values
  const [formData, setFormData] = useState({
    user: user?.id || "",
    vehicle: "1", // Default vehicle ID
    start_location: "Delhi, India",
    end_location: "Mumbai, India",
    start_latitude: 28.6139,
    start_longitude: 77.209,
    end_latitude: 19.076,
    end_longitude: 72.8777,
    price: "",
    start_time: "09:00",
    end_time: "18:00",
    date: new Date().toISOString().split("T")[0],
    distance: 1400,
    available_seats: 4,
    status: "SCHEDULED",
    note: "Direct route via highway. AC vehicle. Regular breaks.",
    allow_pets: true,
    smoking_allowed: false,
  });

  // Helper function to get current time
  const getCurrentTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
  };

  // Helper function to format datetime for backend
  const formatDateTimeForBackend = (date, time) => {
    try {
      const [hours, minutes] = time.split(":");
      const dateObj = new Date(date);
      dateObj.setHours(parseInt(hours, 10));
      dateObj.setMinutes(parseInt(minutes, 10));
      dateObj.setSeconds(0);
      return dateObj.toISOString();
    } catch (error) {
      console.error("Date formatting error:", error);
      return null;
    }
  };

  // Fetch vehicles on component mount
  // useEffect(() => {
  //   const fetchVehicles = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://holaholacarbackend-5.onrender.com/api/vehicles/",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //           },
  //         }
  //       );
  //       setVehicles(response.data);
  //     } catch (error) {
  //       toast.error("Failed to fetch vehicles");
  //     }
  //   };

  //   if (user) {
  //     fetchVehicles();
  //   }
  // }, [user]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("Access Token:", token); // Debug log for token

        const response = await axios.get(
          "https://holaholacarbackend-5.onrender.com/api/vehicles/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Vehicles API Response:", response.data); // Debug log for response

        // Extract the vehicles from the `results` property
        if (response.data && Array.isArray(response.data.results)) {
          setVehicles(response.data.results);
        } else {
          console.error("Unexpected response format:", response.data);
          setVehicles([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        toast.error("Failed to fetch vehicles");
        setVehicles([]); // Fallback to an empty array
      }
    };

    if (user) {
      fetchVehicles();
    } else {
      console.error("User is not logged in");
    }
  }, [user]);

  // In the same file, update handleSubmit:
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      if (!user) {
        toast.error("Please log in to publish a ride");
        return;
      }

      // Validate required fields
      if (!formData.vehicle) {
        toast.error("Please select a vehicle");
        return;
      }

      if (!formData.start_location || !formData.end_location) {
        toast.error("Please enter both start and end locations");
        return;
      }

      // Format the data for the backend
      const formattedData = {
        user: user.id,
        vehicle: parseInt(formData.vehicle),
        start_location: formData.start_location,
        end_location: formData.end_location,
        start_latitude: formData.start_latitude || 0,
        start_longitude: formData.start_longitude || 0,
        end_latitude: formData.end_latitude || 0,
        end_longitude: formData.end_longitude || 0,
        price: parseFloat(formData.price),
        start_time: formatDateTimeForBackend(
          formData.date,
          formData.start_time
        ),
        end_time: formatDateTimeForBackend(formData.date, formData.end_time),
        date: formData.date,
        distance: parseInt(formData.distance) || 0,
        available_seats: parseInt(formData.available_seats),
        status: "SCHEDULED",
        note: formData.note || "",
        allow_pets: formData.allow_pets,
        smoking_allowed: formData.smoking_allowed,
      };

      console.log("Token:", localStorage.getItem("accessToken"));
      console.log("Submitting ride data:", formattedData);

      const response = await publishRide(formattedData);
      toast.success("Ride published successfully!");
      console.log("Ride published successfully:", response);
      // ... rest of the success handling ...
    } catch (error) {
      console.error("Publish ride error:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.vehicle?.[0] ||
        error.message ||
        "Failed to publish ride";
      toast.error(errorMessage);
    }
  };

  // ... rest of your component (renderStep and return statement) remains the same ...

  const renderStep = () => {
    // Add this check at the beginning of the function
    if (!Array.isArray(vehicles)) {
      return (
        <p
          className={`mt-2 text-sm ${
            darkMode ? "text-red-400" : "text-red-500"
          }`}
        >
          Failed to load vehicles. Please try again later.
        </p>
      );
    }

    const inputClassName = `w-full p-4 border rounded-lg ${
      darkMode
        ? "bg-gray-800 border-gray-700 text-gray-200"
        : "bg-white border-gray-300 text-gray-900"
    }`;

    const labelClassName = `block text-sm font-medium ${
      darkMode ? "text-gray-300" : "text-gray-700"
    } mb-2`;

    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Route & Vehicle
            </h2>
            <div>
              <select
                value={formData.vehicle}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, vehicle: e.target.value }))
                }
                className={inputClassName}
              >
                <option value="">Select Vehicle</option>
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.make} {vehicle.model} -{" "}
                      {vehicle.registration_number}
                    </option>
                  ))
                ) : (
                  <option disabled>No vehicles available</option>
                )}
              </select>
              {vehicles.length === 0 && (
                <p
                  className={`mt-2 text-sm ${
                    darkMode ? "text-red-400" : "text-red-500"
                  }`}
                >
                  Please add a vehicle first
                </p>
              )}
            </div>
            <LocationSearch
              label="Start Location"
              darkMode={darkMode}
              onSelect={(value, coords) =>
                setFormData((prev) => ({
                  ...prev,
                  start_location: value,
                  start_latitude: coords?.lat,
                  start_longitude: coords?.lng,
                }))
              }
            />
            <LocationSearch
              label="End Location"
              darkMode={darkMode}
              onSelect={(value, coords) =>
                setFormData((prev) => ({
                  ...prev,
                  end_location: value,
                  end_latitude: coords?.lat,
                  end_longitude: coords?.lng,
                }))
              }
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Date & Time
            </h2>
            <div>
              <label className={labelClassName}>Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: e.target.value }))
                }
                min={new Date().toISOString().split("T")[0]}
                className={inputClassName}
              />
            </div>
            <div>
              <label className={labelClassName}>Start Time</label>
              <input
                type="time"
                value={formData.start_time}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    start_time: e.target.value,
                  }))
                }
                className={inputClassName}
              />
            </div>
            <div>
              <label className={labelClassName}>End Time</label>
              <input
                type="time"
                value={formData.end_time}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    end_time: e.target.value,
                  }))
                }
                className={inputClassName}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Ride Details
            </h2>
            <div>
              <label className={labelClassName}>Price per Seat</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
                placeholder="Enter price"
                className={inputClassName}
              />
            </div>
            <div>
              <label className={labelClassName}>Available Seats</label>
              <input
                type="number"
                value={formData.available_seats}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    available_seats: e.target.value,
                  }))
                }
                min="1"
                max="8"
                className={inputClassName}
              />
            </div>
            <div className="flex gap-4">
              <label
                className={`flex items-center space-x-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.allow_pets}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      allow_pets: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <span>Allow Pets</span>
              </label>
              <label
                className={`flex items-center space-x-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.smoking_allowed}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      smoking_allowed: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <span>Smoking Allowed</span>
              </label>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Review & Submit
            </h2>
            <div>
              <label className={labelClassName}>Additional Notes</label>
              <textarea
                value={formData.note}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, note: e.target.value }))
                }
                placeholder="Add any additional information for passengers..."
                rows="4"
                className={`${inputClassName} resize-none`}
              />
            </div>
            <div
              className={`p-4 rounded-lg ${
                darkMode ? "bg-gray-700/50" : "bg-blue-50"
              }`}
            >
              <h3
                className={`font-medium mb-2 ${
                  darkMode ? "text-gray-100" : "text-blue-800"
                }`}
              >
                Ride Summary
              </h3>
              <ul
                className={`space-y-2 text-sm ${
                  darkMode ? "text-gray-300" : "text-blue-700"
                }`}
              >
                <li>From: {formData.start_location}</li>
                <li>To: {formData.end_location}</li>
                <li>Date: {formData.date}</li>
                <li>
                  Time: {formData.start_time.split("T")[1]} -{" "}
                  {formData.end_time.split("T")[1]}
                </li>
                <li>Price: ₹{formData.price}</li>
                <li>Available Seats: {formData.available_seats}</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen pt-20 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      <div className="max-w-2xl mx-auto p-6">
        <div
          className={`rounded-2xl shadow-xl p-8 ${
            darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 mx-1 rounded ${
                    step >= i
                      ? darkMode
                        ? "bg-blue-400"
                        : "bg-blue-500"
                      : darkMode
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <div
              className={`flex justify-between text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span>Route</span>
              <span>Time</span>
              <span>Details</span>
              <span>Review</span>
            </div>
          </div>

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep((prev) => prev - 1)}
                className={`px-6 py-2.5 rounded-lg transition-colors ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Back
              </button>
            )}
            <button
              onClick={
                step < 4 ? () => setStep((prev) => prev + 1) : handleSubmit
              }
              disabled={!formData.start_location && step === 1}
              className={`px-6 py-2.5 rounded-lg transition-colors ${
                step === 4
                  ? darkMode
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-500 hover:bg-green-600"
                  : darkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white ml-auto disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {step === 4 ? "Publish Ride" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishRideForm;
