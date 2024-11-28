import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import startups from "../assets/startups.gif";
import security from "../assets/security.png";
import { motion } from "framer-motion";
import travel from "../assets/travel.png";
import instagram from "../assets/instagram.png";
import linkdin from "../assets/linkdin.png";
import twitter from "../assets/twitter.png";
import youtube from "../assets/youtube.png";
import Aboutus from "./About/AboutUs/About US/aboutus";

function Homepage() {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("Guest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
            <div className="h-full w-full flex flex-col md:flex-row justify-between p-5 rounded-lg mt-32">
              <div className="mt-10 md:mt-0 md:w-1/2 flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl font-semibold mb-4 text-blue-600">
                  Welcome to HolaHolaCar!
                </h1>
                <p className="text-lg text-gray-700">
                  Find rides, connect with travelers, and make your journeys
                  easier, affordable, and more enjoyable. Let’s ride together
                  and redefine travel! 🌟
                </p>
              </div>
              <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center items-center">
                <img
                  className="h-[300px] md:h-[400px] object-cover rounded-lg shadow-lg"
                  src={startups}
                  alt="Startups"
                />
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center mt-6 md:mt-14 z-10 mb-5">
              <div className="flex gap-6 flex-col sm:flex-row md:flex-row sm:mt-10 md:mt-14 mt-16">
                <Link to="/search">
                  <button className="px-16 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-md w-full sm:w-auto mb-4 sm:mb-0">
                    Search Ride
                  </button>
                </Link>
                <button
                  onClick={handlePublishClick}
                  className="px-16 py-3 bg-green-600 hover:bg-green-500 text-white text-lg font-semibold rounded-md w-full sm:w-auto mb-4 sm:mb-0"
                >
                  Publish Ride
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="h-auto md:h-[600px] flex flex-col md:flex-row items-center gap-12 mt-16 mb-5">
          <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center items-center">
            <img
              className="h-[300px] md:h-[300px] object-cover rounded-lg shadow-lg"
              src={travel}
              alt="Carpool"
            />
          </div>
          <div className="w-full md:w-[45%] flex flex-col gap-5 px-4">
            <h1 className="text-3xl sm:text-4xl text-blue-500 font-bold">
              Join Our Carpool Community
            </h1>
            <p className="text-lg sm:text-[18px]">
              Save money, reduce emissions, and make your commute more enjoyable
              by carpooling with others!
            </p>
          </div>
        </div>

        {/* Security Section */}
        <div className="h-auto md:h-[600px] bg-blue-500 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 px-4 py-6">
          <motion.div
            className="w-full md:w-[45%] flex flex-col gap-5 mx-9"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl text-white font-bold">
              Helps us keep you Safe!
            </h1>
            <p className="text-white text-lg sm:text-[18px]">
              At HolaHolaCar, we're working hard to make our platform as secure
              as it can be. But when scams do happen, we want you to know
              exactly how to avoid and report them. Follow our tips to help us
              keep you safe.
            </p>
          </motion.div>
          <motion.div
            className="md:mt-0 md:w-1/2 flex justify-center items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              className="h-[300px] md:h-[300px] object-cover rounded-lg"
              src={security}
              alt="Security"
            />
          </motion.div>
        </div>
        <div className="h-full flex flex-col md:flex-row justify-between px-8 md:px-20 mb-5">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl sm:text-4xl text-blue-500 font-bold text-center mt-10">
              About Us
            </h1>
            <div className="hidden md:block">
              <Link to="/aboutus">
                <p>About Us</p>
              </Link>
              <Link to="/howitworks">
                <p>How it Works</p>
              </Link>
            </div>
            <div className="md:hidden mt-4">
              <button
                onClick={toggleDropdown}
                className="bg-blue-500 text-white px-4 py-2 rounded-md justify-center w-full"
              >
                About Us
              </button>
              {isDropdownOpen && (
                <div className="mt-2 bg-white shadow-lg rounded-md">
                  <Link to="/aboutus" className="block px-4 py-2">
                    About Us
                  </Link>
                  <Link to="/howitworks" className="block px-4 py-2">
                    How it Works
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-auto mt-10 md:mt-0">
            <h1 className="text-3xl sm:text-4xl text-blue-500 font-bold text-center mt-10">
              Follow Us on Social Media
            </h1>
            <div className="h-6 flex space-x-4 justify-center mt-4">
              <a
                href="https://www.linkedin.com/company/holaholacar/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-10 w-10 hover:opacity-75 transition-opacity duration-300"
                  src={linkdin}
                  alt="LinkedIn"
                />
              </a>
              <a
                href="https://www.youtube.com/@holaholacar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-10 w-10 hover:opacity-75 transition-opacity duration-300"
                  src={youtube}
                  alt="YouTube"
                />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-10 w-10 hover:opacity-75 transition-opacity duration-300"
                  src={twitter}
                  alt="Twitter"
                />
              </a>
              <a
                href="https://www.instagram.com/holaholacar/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-10 w-10 hover:opacity-75 transition-opacity duration-300"
                  src={instagram}
                  alt="Instagram"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Homepage;

// import React, { useState, useEffect, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AuthContext } from "../context/AuthContext";

// function Homepage() {
//   const { user } = useContext(AuthContext);
//   const [username, setUsername] = useState("Guest");

//   useEffect(() => {
//     // Fetch username from localStorage
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, []);

//   const navigate = useNavigate();

//   const handlePublishClick = () => {
//     if (!user) {
//       toast.warn("You must be logged in to publish a ride.");
//       return;
//     }
//     // Navigate to the publish page if the user is logged in
//     navigate("/publish");
//   };

//   return (
//     <nav>
//       <div className="font-poppins mt-3">
//         {/* Header Section */}
//         <div className="relative text-center px-4">
//           <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
//             <span className="text-green-600">Find Your</span>{" "}
//             <span className="text-blue-500">Ride Anywhere!</span>
//           </h1>
//           <img
//             className="h-56 sm:h-72 md:h-96 w-full object-cover mt-4 rounded-lg"
//             src="https://connexionmobility.com/wp-content/uploads/elementor/thumbs/car-and-man-and-mobile-app-connexion-qe0xupbectt7fs1kh0h3ll7nblendiyk3edpcurksg.png"
//             alt="Background"
//           />
//           <div className="absolute inset-0 flex flex-col items-center justify-center mt-10 space-y-4 z-10">
//             <div className="flex flex-wrap justify-center gap-4">
//               <Link to="/search">
//                 <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-md">
//                   Search Ride
//                 </button>
//               </Link>
//               <button
//                 onClick={handlePublishClick}
//                 className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white text-lg font-semibold rounded-md"
//               >
//                 Publish Ride
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Information Section */}
//         <div className="flex flex-col md:flex-row items-center gap-12 mt-16 px-4">
//           <div className="w-full md:w-1/2">
//             <h2 className="text-2xl md:text-3xl text-blue-500 font-bold">
//               Join Our Carpool Community
//             </h2>
//             <p className="text-blue-500 mt-4 text-base md:text-lg">
//               Save money, reduce emissions, and make your commute more enjoyable
//               by carpooling with others!
//             </p>
//           </div>
//           <div className="w-full md:w-1/2">
//             <img
//               className="h-64 sm:h-80 md:h-96 w-full object-cover rounded-lg"
//               src="https://img.freepik.com/free-vector/car-sharing-concept-illustration_114360-20860.jpg?t=st=1731233787~exp=1731237387~hmac=bcf8377c12ab69a3ee37b4bfb58406483a94c37418900c3a38eebd7d5e5dfe4b&w=1060"
//               alt="Carpool"
//             />
//           </div>
//         </div>

//         {/* Security Section */}
//         <div className="bg-blue-500 flex flex-col md:flex-row items-center gap-12 px-4 py-10 mt-12 rounded-lg">
//           <div className="w-full md:w-1/3">
//             <img
//               className="h-64 sm:h-80 md:h-96 w-full object-cover rounded-lg"
//               src="https://cdni.iconscout.com/illustration/premium/thumb/phishing-8841975-7169469.png"
//               alt="Security"
//             />
//           </div>
//           <div className="w-full md:w-2/3">
//             <h2 className="text-2xl md:text-3xl text-white font-bold">
//               Helps us keep you Safe!
//             </h2>
//             <p className="text-white mt-4 text-base md:text-lg">
//               At HolaHolaCar, we're working hard to make our platform as secure
//               as it can be. But when scams do happen, we want you to know
//               exactly how to avoid and report them. Follow our tips to help us
//               keep you safe.
//             </p>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Homepage;
