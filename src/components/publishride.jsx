import React, { useState } from "react";
import { useContext,useEffect } from "react";     
import { publishRide } from "../context/api";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const PublishRideForm = () => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("Guest");
  const [formData, setFormData] = useState({
    name: "",
    leavingFrom: "",
    destination: "",
    price: "",
    date: "",
    passengers: "",
    note: "", // Optional note field
    contact_number: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rideData = {
      user: username,
      start_location: formData.leavingFrom.trim(),
      end_location: formData.destination.trim(),
      price: parseInt(formData.price, 10), // String with two decimals
      start_time: "2024-11-21T10:00:00Z", // Example fixed value
      end_time: "2024-11-21T12:00:00Z", // Example fixed value
      date: formData.date, // Already in ISO format from input[type="date"]
      available_seats: parseInt(formData.passengers, 10), // Ensure integer
      booked_seats: 0, // Integer
      is_complete: false, // Boolean
      note: formData.note.trim() || "", // Trim spaces, fallback to empty string
      contact_number: parseInt(formData.contact_number, 10),
    };

    console.log("Submitting ride data:", rideData); // Debugging

    try {
      const data = await publishRide(rideData);
      console.log("Ride published successfully:", data);
      toast.success("Ride Published Successfully");
    } catch (error) {
      console.error(
        "Error publishing ride:",
        error.response?.data || error.message
      );
      alert("Failed to publish ride. Please try again.");
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const inputStyles =
    "peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0";

  return (
    <div>
      {/* Hero Section */}
      <div className="h-auto md:h-[750px] w-full flex justify-center bg-blue-500 flex-col items-center font-poppins shadow-xl p-4">
        <div className="w-full md:w-[90%] flex justify-center text-center">
          <h1 className="text-2xl md:text-5xl font-bold text-white">
            Drive with <span className="text-boldtext">HolaHolaCar</span> and save
            by sharing your ride!
          </h1>
        </div>

        {/* Form Section */}
        <div className="h-auto md:h-[530px] bg-white w-full md:w-[50%] flex justify-center rounded-xl mt-8 md:mt-14 p-4">
          <div className="w-full md:w-[95%] space-y-3 mt-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="leavingFrom"
                placeholder="Leaving From"
                value={formData.leavingFrom}
                onChange={handleChange}
                required
                className={inputStyles}
              />
              <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className={inputStyles}
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className={inputStyles}
              />
              <input
                type="price"
                name="price"
                placeholder="Price Per Person"
                value={formData.price}
                onChange={handleChange}
                required
                className={inputStyles}
              />
              <input
                type="contact_number"
                name="contact_number"
                placeholder="Contact Number"
                value={formData.contact_number}
                onChange={handleChange}
                required
                className={inputStyles}
              />
              <input
                type="number"
                name="passengers"
                placeholder="Passengers"
                value={formData.passengers}
                onChange={handleChange}
                required
                className={inputStyles}
              />
              <textarea
                name="note"
                placeholder="Additional Notes"
                value={formData.note}
                onChange={handleChange}
                className={inputStyles}
              />
              <button
                className="w-full py-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
              >
                Publish Ride
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="h-auto md:h-[600px] flex justify-center flex-col items-center font-poppins p-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-blue-400">
            Drive, Share, Save
          </h1>
        </div>
        <div className="flex flex-col md:flex-row md:gap-36 mt-8 items-center">
          <div className="h-[200px] md:h-[300px] w-auto">
            <img
              className="h-full object-cover"
              src="https://static.vecteezy.com/system/resources/previews/014/688/765/original/money-investment-concept-business-people-invest-their-money-for-profit-putting-capital-in-new-project-to-gain-profitable-returns-flat-cartoon-character-design-for-landing-page-web-mobile-banner-vector.jpg"
              alt="Investment Concept"
            />
          </div>
          <div className="flex flex-col w-full md:w-[50%] gap-4 font-poppins mt-4 md:mt-0">
            <div>
              <h1 className="text-lg md:text-[24px] font-bold">Drive</h1>
              <p className="text-sm md:text-[18px]">
                Keep your plans! Hit the road just as you anticipated and make
                the most of your vehicle’s empty seats.
              </p>
            </div>
            <div>
              <h1 className="text-lg md:text-[24px] font-bold">Share</h1>
              <p className="text-sm md:text-[18px]">
                Travel with good company. Share a memorable ride with travellers
                from all walks of life.
              </p>
            </div>
            <div>
              <h1 className="text-lg md:text-[24px] font-bold">Save</h1>
              <p className="text-sm md:text-[18px]">
                Tolls, petrol, electricity… Easily divvy up all the costs with
                other passengers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishRideForm;
