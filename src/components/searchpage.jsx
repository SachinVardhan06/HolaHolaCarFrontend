import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import LocationSearch from "./Location/locationsearch";
import { toast } from "react-toastify";

function SearchPage() {
  const [expandedRide, setExpandedRide] = useState(null); // Track which ride is expanded

  const toggleExpandRide = (rideId) => {
    setExpandedRide((prev) => (prev === rideId ? null : rideId)); // Toggle expansion
  };

  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [date, setDate] = useState("");
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(""); // Add token state
  const [showMap, setShowMap] = useState(false); // For displaying MapPopup
  const [mapLocations, setMapLocations] = useState({ start: "", end: "" });

  // Handle user login
  // Handle ride search
  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "https://holaholacarbackend-4.onrender.com/api/search-rides/",
        {
          params: {
            start_location: startLocation,
            end_location: endLocation,
            date,
          },
        }
      );
      setRides(response.data.rides);
    } catch (err) {
      toast.error("Ride not found");
      setError("Failed to fetch rides. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const { user, handleLogout } = useContext(AuthContext);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Handle booking a ride
  const handleBookRide = async (rideId) => {
    if (!username) {
      alert("Please log in to book a ride.");
      return;
    }

    try {
      const response = await axios.post(
        `https://holaholacarbackend-4.onrender.com/api/rides/book/`,
        { ride_id: rideId },
        {
          headers: {
            Authorization: `Bearer ${username}`,
          },
        }
      );
      alert("Ride booked successfully!");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Failed to book ride, please try again.");
    }
  };

  return (
    <>
      <div>
        {/* Container Div */}
        <div className="h-full w-full flex flex-col justify-center bg-blue-500 items-center font-poppins relative overflow-hidden pb-6">
          {/* Main Content */}
          <div className="p-5 text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-bold text-white">
              Your Pick of Ride at Low Prices!
            </h1>
          </div>
          <div className="h-auto bg-white w-[90%] sm:w-[70%] lg:w-[40%] flex justify-center rounded-xl p-4 shadow-md">
            <div className="w-full space-y-3">
              <LocationSearch
                label="Start Location"
                onSelect={setStartLocation}
              />
              <LocationSearch label="End Location" onSelect={setEndLocation} />
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="peer py-3 px-4 block w-full bg-transparent border-b-2 border-gray-200 text-lg focus:border-blue-500 focus:ring-0"
                />
              </div>
              <button
                className="w-full py-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Available Rides Section */}
        <div className="flex justify-center items-center h-auto font-poppins text-lg sm:text-xl lg:text-2xl text-center mt-6">
          {rides.length > 0 && (
            <h1>
              Available Ride From{" "}
              <span className="text-blue-600">{startLocation}</span> to{" "}
              <span className="text-green-700">{endLocation}</span>
            </h1>
          )}
        </div>

        {/* Rides Listing */}
        <div className="w-full flex flex-col items-center mt-6 space-y-4 font-poppins px-4 mb-16">
          {loading && <p className="text-lg text-gray-600">Loading...</p>}
          {error && <p className="text-lg text-red-500">{error}</p>}
          {rides.length > 0 &&
            rides.map((ride) => (
              <div
                key={ride.id}
                className={`w-full sm:w-[90%] lg:w-[60%] bg-white rounded-xl shadow-lg p-6 border border-gray-200 ${
                  expandedRide === ride.id ? "pb-8" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-gray-700">
                    <p className="text-base sm:text-lg font-semibold">
                      {ride.start_location}{" "}
                      <span className="text-gray-500">to</span>{" "}
                      {ride.end_location}
                    </p>
                    <p className="text-lg text-gray-500">{ride.date}</p>
                    <p className="text-lg text-gray-500">{ride.user}</p>
                  </div>
                  <p className="text-lg sm:text-xl font-bold ">
                    <span className="text-green-500">₹</span> {ride.price}
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => toggleExpandRide(ride.id)}
                    className="px-4 py-2 sm:px-5 sm:py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
                  >
                    {expandedRide === ride.id ? "Hide Details" : "Book Ride"}
                  </button>
                </div>
                {expandedRide === ride.id && (
                  <div className="mt-4 border-t pt-4">
                    <p className="text-gray-700 text-sm">
                      <strong>Contact:</strong>{" "}
                      {ride.contact_number || "Not Provided"}
                    </p>
                    <p className="text-gray-700 text-sm">
                      <strong>Additional Info: </strong>
                      {ride.note}
                    </p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default SearchPage;

// import React, { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import MapPopup from './mappopup';

// function SearchPage() {
//   const [expandedRide, setExpandedRide] = useState(null); // Track which ride is expanded
//   const [startLocation, setStartLocation] = useState("");
//   const [endLocation, setEndLocation] = useState("");
//   const [date, setDate] = useState("");
//   const [rides, setRides] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showMap, setShowMap] = useState(false); // For displaying MapPopup
//   const [mapLocations, setMapLocations] = useState({ start: "", end: "" }); // Ride locations

//   const { user, handleLogout } = useContext(AuthContext);

//   const handleSearch = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(
//         "https://holaholacarbackend-4.onrender.com/api/search-rides/",
//         {
//           params: {
//             start_location: startLocation,
//             end_location: endLocation,
//             date,
//           },
//         }
//       );
//       setRides(response.data.rides);
//     } catch (err) {
//       setError("Failed to fetch rides. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBookRide = async (rideId) => {
//     if (!user) {
//       alert("Please log in to book a ride.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `https://holaholacarbackend-4.onrender.com/api/rides/book/`,
//         { ride_id: rideId },
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       alert("Ride booked successfully!");
//     } catch (err) {
//       console.error("Booking failed:", err);
//       alert("Failed to book ride, please try again.");
//     }
//   };

//   const openMap = (start, end) => {
//     setMapLocations({ start, end });
//     setShowMap(true);
//   };

//   const closeMap = () => {
//     setShowMap(false);
//     setMapLocations({ start: "", end: "" });
//   };

//   return (
//     <>
//       <div>
//         {/* Search Section */}
//         <div className="h-[600px] w-full flex flex-col justify-center bg-blue-500 items-center font-poppins relative overflow-hidden">
//           <div className="p-5 text-center">
//             <h1 className="text-4xl sm:text-6xl lg:text-6xl font-bold text-white">
//               Your Pick of Ride at Low Prices!
//             </h1>
//           </div>
//           <div className="h-auto bg-white w-[90%] sm:w-[70%] lg:w-[40%] flex justify-center rounded-xl p-4 shadow-md">
//             <div className="w-full space-y-3">
//               <input
//                 type="text"
//                 value={startLocation}
//                 onChange={(e) => setStartLocation(e.target.value)}
//                 className="peer py-3 px-4 block w-full bg-transparent border-b-2 border-gray-200 text-lg focus:border-blue-500 focus:ring-0"
//                 placeholder="Leaving from"
//               />
//               <input
//                 type="text"
//                 value={endLocation}
//                 onChange={(e) => setEndLocation(e.target.value)}
//                 className="peer py-3 px-4 block w-full bg-transparent border-b-2 border-gray-200 text-lg focus:border-blue-500 focus:ring-0"
//                 placeholder="Going to"
//               />
//               <input
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 className="peer py-3 px-4 block w-full bg-transparent border-b-2 border-gray-200 text-lg focus:border-blue-500 focus:ring-0"
//               />
//               <button
//                 className="w-full py-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 onClick={handleSearch}
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Rides Listing */}
//         <div className="w-full flex flex-col items-center mt-6 space-y-4 font-poppins px-4">
//           {loading && <p className="text-lg text-gray-600">Loading...</p>}
//           {error && <p className="text-lg text-red-500">{error}</p>}
//           {rides.map((ride) => (
//             <div
//               key={ride.id}
//               className="w-full sm:w-[90%] lg:w-[60%] bg-white rounded-xl shadow-lg p-6 border border-gray-200"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-lg font-semibold">
//                     {ride.start_location} to {ride.end_location}
//                   </p>
//                   <p className="text-sm text-gray-500">{ride.date}</p>
//                 </div>
//                 <p className="text-lg font-bold text-blue-600">₹ {ride.price}</p>
//               </div>
//               <div className="mt-4 flex space-x-4">
//                 <button
//                   onClick={() => handleBookRide(ride.id)}
//                   className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//                 >
//                   Book Ride
//                 </button>
//                 <button
//                   onClick={() => openMap(ride.start_location, ride.end_location)}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                 >
//                   Show Map
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Map Popup */}
//         {showMap && (
//           <MapPopup
//             startLocation={mapLocations.start}
//             endLocation={mapLocations.end}
//             onClose={closeMap}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// export default SearchPage;

// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
// import { AuthContext } from '../context/AuthContext';

// const geocodingClient = mbxGeocoding({ accessToken: 'sk.eyJ1Ijoic2FjaGludmFyZGhhbiIsImEiOiJjbTQxNnFhZHowODB6Mm1xd3ZwbTNpajdzIn0.XXqKvUvOnQ6TwrUjNjlnaA' });

// function LocationSearch({ label, onSelect }) {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   const handleInputChange = async (e) => {
//     const value = e.target.value;
//     setQuery(value);

//     if (value.length > 2) {
//       try {
//         const response = await geocodingClient.forwardGeocode({
//           query: value,
//           limit: 5
//         }).send();

//         setSuggestions(response.body.features);
//       } catch (error) {
//         console.error('Error fetching location suggestions:', error);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setQuery(suggestion.place_name);
//     setSuggestions([]);
//     onSelect(suggestion.place_name);
//   };

//   return (
//     <div className="mb-4">
//       <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
//       <input
//         type="text"
//         value={query}
//         onChange={handleInputChange}
//         placeholder={`Enter ${label.toLowerCase()}`}
//         className="w-full p-2 border border-gray-300 rounded-md"
//       />
//       <ul className="mt-2 bg-white border border-gray-300 rounded-md">
//         {suggestions.map((suggestion) => (
//           <li
//             key={suggestion.id}
//             onClick={() => handleSuggestionClick(suggestion)}
//             className="p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
//           >
//             {suggestion.place_name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function SearchPage() {
//   const [startLocation, setStartLocation] = useState('');
//   const [endLocation, setEndLocation] = useState('');
//   const [date, setDate] = useState('');
//   const [rides, setRides] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showMap, setShowMap] = useState(false); // For displaying MapPopup
//   const [mapLocations, setMapLocations] = useState({ start: '', end: '' }); // Ride locations

//   const { user, handleLogout } = useContext(AuthContext);

//   const handleSearch = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(
//         'https://holaholacarbackend-4.onrender.com/api/search-rides/',
//         {
//           params: {
//             start_location: startLocation,
//             end_location: endLocation,
//             date,
//           },
//         }
//       );
//       setRides(response.data);
//     } catch (err) {
//       setError('Failed to fetch rides');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Search Rides</h1>
//       <LocationSearch label="Start Location" onSelect={setStartLocation} />
//       <LocationSearch label="End Location" onSelect={setEndLocation} />
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-md"
//         />
//       </div>
//       <button
//         onClick={handleSearch}
//         className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//       >
//         Search
//       </button>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       <ul className="mt-4">
//         {Array.isArray(rides) && rides.map((ride) => (
//           <li key={ride.id} className="p-4 border-b border-gray-300">
//             {ride.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default SearchPage;
