import React, { useState } from 'react';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1Ijoic2FjaGludmFyZGhhbiIsImEiOiJjbTQxNmxod2kyYWpvMmpvOWd4dGFtYjBjIn0.EuHQuVYI23UU7c9rb7wXXA' });

const LocationSearch = ({ label, onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await geocodingClient.forwardGeocode({
          query: value,
          limit: 5
        }).send();

        setSuggestions(response.body.features);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.place_name);
    setSuggestions([]);
    onSelect(suggestion.geometry.coordinates); // Return coordinates as [longitude, latitude]
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <ul className="mt-2 bg-white border border-gray-300 rounded-md">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            onClick={() => handleSuggestionClick(suggestion)}
            className="p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
          >
            {suggestion.place_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationSearch;