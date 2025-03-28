// import React, { useState } from 'react';
// import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

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
//       <input
//         type="text"
//         value={query}
//         onChange={handleInputChange}
//         placeholder={`Enter ${label.toLowerCase()}`}
//         className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-x-transparent border-b-gray-200 text-lg focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0"
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

// export default LocationSearch;

import React, { useState, useContext, useRef, useEffect } from 'react';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { ThemeContext } from '../comp/themeprovider';

const geocodingClient = mbxGeocoding({ accessToken: 'sk.eyJ1Ijoic2FjaGludmFyZGhhbiIsImEiOiJjbTQxNnFhZHowODB6Mm1xd3ZwbTNpajdzIn0.XXqKvUvOnQ6TwrUjNjlnaA' });

function LocationSearch({ label, onSelect }) {
  const { darkMode } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);

    if (value.length > 2) {
      setIsLoading(true);
      try {
        const response = await geocodingClient.forwardGeocode({
          query: value,
          limit: 5
        }).send();

        setSuggestions(response.body.features);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const locationName = suggestion.place_name;
    setQuery(locationName);
    setSuggestions([]);
    setShowSuggestions(false);
    
    // Pass location data to parent
    onSelect(locationName, {
      lat: suggestion.center[1],
      lng: suggestion.center[0]
    });
  };

  return (
    <div className="w-full" ref={wrapperRef}>
      <label className={`block text-sm font-medium mb-2 ${
        darkMode ? 'text-gray-200' : 'text-gray-700'
      }`}>
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          className={`w-full p-4 border rounded-lg ${
            darkMode 
              ? 'bg-gray-800 border-gray-700 text-gray-200' 
              : 'bg-white border-gray-300 text-gray-900'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          placeholder={`Search ${label.toLowerCase()}...`}
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <ul className={`absolute z-50 w-full mt-1 rounded-lg shadow-lg max-h-60 overflow-auto ${
            darkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSuggestionClick(suggestion);
                }}
                className={`px-4 py-3 cursor-pointer ${
                  darkMode 
                    ? 'text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-900 hover:bg-gray-100'
                } border-b ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                } last:border-b-0`}
              >
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        )}
        
        {isLoading && (
          <div className={`absolute right-3 top-1/2 -translate-y-1/2 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationSearch;