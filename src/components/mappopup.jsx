import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FjaGludmFyZGhhbiIsImEiOiJjbTRkdDkwMGIwb2w0MmpwZmhndWYzNXRkIn0.9wORQ9fPfFaIf8rNmU2HOw';

const MapPopup = ({ startLocation, endLocation, onClose }) => {
  const mapContainerRef = useRef(null);
  const popupRef = useRef(null); // Reference to the popup container
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  // Close the popup when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(); // Close the popup
      }
    };

    // Add event listener
    document.addEventListener('click', handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2,
    });

    map.on('load', async () => {
      try {
        console.log('Fetching route data...');
        console.log('Start Location:', startLocation);
        console.log('End Location:', endLocation);

        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${startLocation.lng},${startLocation.lat};${endLocation.lng},${endLocation.lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        console.log('Route data:', data);

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0].geometry;
          const { distance, duration } = data.routes[0];

          // Set distance and duration
          setDistance((distance / 1000).toFixed(2)); // Convert to kilometers
          setDuration((duration / 60).toFixed(2)); // Convert to minutes

          // Add route to the map
          map.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route,
            },
          });

          map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
            },
          });

          // Add start and end markers
          new mapboxgl.Marker({ color: 'green' })
            .setLngLat([startLocation.lng, startLocation.lat])
            .addTo(map);

          new mapboxgl.Marker({ color: 'red' })
            .setLngLat([endLocation.lng, endLocation.lat])
            .addTo(map);

          // Fit map to route
          map.fitBounds(
            [
              [startLocation.lng, startLocation.lat],
              [endLocation.lng, endLocation.lat],
            ],
            {
              padding: 50,
            }
          );
        } else {
          console.error('No routes found');
        }
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    });

    return () => map.remove();
  }, [startLocation, endLocation]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div
        ref={popupRef}
        className="bg-white rounded-lg shadow-lg p-4 relative w-full max-w-lg"
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div
          ref={mapContainerRef}
          className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
        />
        {distance && duration && (
          <div className="mt-4 text-center">
            <p><strong>Distance:</strong> {distance} km</p>
            <p><strong>Duration:</strong> {duration} min</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPopup;
