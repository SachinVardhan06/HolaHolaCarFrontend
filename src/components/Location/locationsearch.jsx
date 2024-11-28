import React, { useState } from 'react';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const geocodingClient = mbxGeocoding({ accessToken: 'sk.eyJ1Ijoic2FjaGludmFyZGhhbiIsImEiOiJjbTQxNnFhZHowODB6Mm1xd3ZwbTNpajdzIn0.XXqKvUvOnQ6TwrUjNjlnaA' });

function LocationSearch({ label, onSelect }) {
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
    onSelect(suggestion.place_name);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-x-transparent border-b-gray-200 text-lg focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0"
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
}

export default LocationSearch;