import axios from "axios";

async function AddressToCoordinates(address) {
  try {
    const response = await axios.get(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json",
      {
        params: {
          access_token:
            "pk.eyJ1Ijoic2FjaGludmFyZGhhbiIsImEiOiJjbTRkdDkwMGIwb2w0MmpwZmhndWYzNXRkIn0.9wORQ9fPfFaIf8rNmU2HOw",
        },
      }
    );
    const { features } = response.data;
    if (features && features.length > 0) {
      const [lng, lat] = features[0].center;
      return { lat, lng };
    } else {
      throw new Error("No results found for the address.");
    }
  } catch (err) {
    console.error("Geocoding Error:", err.message);
    throw err;
  }
}

export default AddressToCoordinates;
