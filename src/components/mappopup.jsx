import React from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

const MapPopup = ({ startLocation, endLocation, onClose }) => {
  const [directionsResponse, setDirectionsResponse] = React.useState(null);

  const handleLoadDirections = () => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: startLocation,
        destination: endLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  };

  

  React.useEffect(() => {
    handleLoadDirections();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-11/12 max-w-3xl bg-white rounded-lg shadow-lg">
        {/* Header with Close Button */}
        <div className="flex justify-end p-2">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Google Map */}
        <div className="w-full h-96">
          <GoogleMap
            center={{ lat: 28.6139, lng: 77.209 }}
            zoom={7}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default MapPopup;
