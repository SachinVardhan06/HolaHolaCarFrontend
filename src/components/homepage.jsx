import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function Homepage() {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    // Fetch username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const navigate = useNavigate();

  const handlePublishClick = () => {
    if (!user) {
      toast.warn("You must be logged in to publish a ride.");
      return;
    }
    // Navigate to the publish page if the user is logged in
    navigate("/publish");
  };

  return (
    <nav>
      <div className="font-poppins mt-3">
        <div className="relative">
          <div className="relative h-auto w-full">
            {/* Background Image */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center">
              <span className="text-green-600">Find Your</span>{" "}
              <span className="text-blue-500">Ride Anywhere!</span>
            </h1>
            <img
              className="h-auto w-full object-cover mt-6 md:mt-20"
              src="https://connexionmobility.com/wp-content/uploads/elementor/thumbs/car-and-man-and-mobile-app-connexion-qe0xupbectt7fs1kh0h3ll7nblendiyk3edpcurksg.png"
              alt="Background"
            />
            <div className="absolute inset-0 flex flex-col items-center mt-6 md:mt-14 z-10 mb-5">
              <div className="flex gap-6 flex-col sm:flex-row md:flex-row sm:mt-10">
                <Link to="/search">
                  <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-md w-full sm:w-auto mb-4 sm:mb-0">
                    Search Ride
                  </button>
                </Link>
                <button
                  onClick={handlePublishClick}
                  className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white text-lg font-semibold rounded-md w-full sm:w-auto mb-4 sm:mb-0"
                >
                  Publish Ride
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="h-auto md:h-[600px] flex flex-col md:flex-row items-center gap-12 mt-28">
          <div className="w-full md:w-[45%] flex flex-col gap-5 px-4">
            <h1 className="text-3xl sm:text-4xl text-blue-500 font-bold">
              Join Our Carpool Community
            </h1>
            <p className="text-blue-500 text-base sm:text-[18px]">
              Save money, reduce emissions, and make your commute more enjoyable
              by carpooling with others!
            </p>
          </div>
          <div className="w-full md:w-[45%]">
            <img
              className="h-auto md:h-[300px] w-full object-cover"
              src="https://img.freepik.com/free-vector/car-sharing-concept-illustration_114360-20860.jpg?t=st=1731233787~exp=1731237387~hmac=bcf8377c12ab69a3ee37b4bfb58406483a94c37418900c3a38eebd7d5e5dfe4b&w=1060"
              alt="Carpool"
            />
          </div>
        </div>

        {/* Security Section */}
        <div className="h-auto md:h-[600px] bg-blue-500 flex flex-col md:flex-row items-center gap-12 md:gap-24 px-4 py-6">
          <div className="w-full md:w-[35%]">
            <img
              className="h-auto md:h-[300px] w-full object-cover"
              src="https://cdni.iconscout.com/illustration/premium/thumb/phishing-8841975-7169469.png"
              alt="Security"
            />
          </div>
          <div className="w-full md:w-[45%] flex flex-col gap-5">
            <h1 className="text-3xl sm:text-4xl text-white font-bold">
              Helps us keep you Safe!
            </h1>
            <p className="text-white text-base sm:text-[18px]">
              At HolaHolaCar, we're working hard to make our platform as secure
              as it can be. But when scams do happen, we want you to know
              exactly how to avoid and report them. Follow our tips to help us
              keep you safe.
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Homepage;
