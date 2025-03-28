import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import startups from "../assets/startups.gif";
import security from "../assets/security.png";
import travel from "../assets/travel.png";
import carmove from "../assets/carmove.mp4";
import instagram from "../assets/instagram.png";
import linkdin from "../assets/linkdin.png";
import twitter from "../assets/twitter.png";
import youtube from "../assets/youtube.png";
import Aboutus from "./About/AboutUs/About US/aboutus";
import aeroplanevideo from "../assets/aeroplanevideo.mp4";
import TrustedBy from "./Companies/trustedby";
import TextHeading from "./Companies/featurestab";
import InfiniteReviews from "./Companies/reviews";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// First, update the vehicles array at the top of your file
const vehicles = [
  {
    name: "Sedan",
    image:
      "https://www.motortrend.com/uploads/sites/5/2020/05/2020-Audi-A6-sedan-01.jpg",
    desc: "Perfect blend of comfort and style",
    features: ["Leather Seats", "Climate Control", "Cruise Control"],
    highlights: {
      passengers: "4",
      luggage: "3 Bags",
      mileage: "20 km/l",
    },
  },
  {
    name: "SUV",
    image:
      "https://www.forbes.com/wheels/wp-content/uploads/2021/03/BestMidsizeSUVS_2022_Telluride_SEO.jpg",
    desc: "Dominate every road with confidence",
    features: ["All-Wheel Drive", "Elevated Seating", "Spacious Interior"],
    highlights: {
      passengers: "7",
      luggage: "5 Bags",
      mileage: "15 km/l",
    },
  },
  {
    name: "MPV",
    image:
      "https://media.drivingelectric.com/image/private/s--oKXeDgii--/v1597799529/drivingelectric/2020-05/eqv.jpg",
    desc: "Ultimate family transportation",
    features: ["Flexible Seating", "Entertainment System", "Extra Storage"],
    highlights: {
      passengers: "8",
      luggage: "6 Bags",
      mileage: "16 km/l",
    },
  },
  {
    name: "Hatchback",
    image:
      "https://www.autotrader.com/wp-content/uploads/2022/12/2023-toyota-corolla-se-front-right.jpg",
    desc: "Agile and economical city car",
    features: ["Easy Parking", "Fuel Efficient", "Sporty Handling"],
    highlights: {
      passengers: "5",
      luggage: "2 Bags",
      mileage: "22 km/l",
    },
  },
];

const colors = {
  primary: {
    light: "#60A5FA", // blue-400
    default: "#3B82F6", // blue-500
    dark: "#2563EB", // blue-600
  },
  secondary: {
    light: "#4ADE80", // green-400
    default: "#22C55E", // green-500
    dark: "#16A34A", // green-600
  },
  accent: {
    purple: "#8B5CF6", // purple-500
    indigo: "#6366F1", // indigo-500
  },
  neutral: {
    white: "#FFFFFF",
    light: "#F3F4F6", // gray-100
    medium: "#9CA3AF", // gray-400
    dark: "#4B5563", // gray-600
  },
};

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
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-6 font-inter transition-colors duration-200">
        <div className="relative min-h-[100vh] w-full overflow-hidden rounded-xl mt-28 sm:mt-28">
          <div className="absolute inset-0 z-10 bg-black/50" />
          <video
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            autoPlay
            loop
            muted
            playsInline
            style={{ objectPosition: "center 20%" }} // Helps with mobile video positioning
          >
            <source src={aeroplanevideo} type="video/mp4" />
          </video>

          <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center min-h-[100vh]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-6 sm:space-y-8 max-w-4xl mx-auto"
            >
              <motion.h1
                className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 dark:from-gray-300 dark:via-gray-400 dark:to-gray-300 mb-2 sm:mb-0">
                  YOUR JOURNEY
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 dark:from-blue-500 dark:via-purple-500 dark:to-blue-500">
                  STARTS HERE
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-3xl text-gray-200 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed px-4"
              >
                <span className="opacity-90 block sm:inline">
                  Connect with fellow travelers,
                </span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 font-normal dark:from-blue-400 dark:to-purple-400 block sm:inline">
                  share amazing journeys
                </span>{" "}
                <span className="opacity-90 block sm:inline">
                  and make your travel more affordable
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 px-4"
              >
                <Link to="/search" className="w-full sm:w-auto">
                  <motion.button
                    className="group relative w-full sm:w-auto px-6 sm:px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 
            text-white rounded-xl font-medium text-base sm:text-lg transition-all duration-300 
            hover:shadow-[0_8px_30px_rgb(59,130,246,0.3)] overflow-hidden"
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Search Ride</span>
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 
              group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.button>
                </Link>

                <motion.button
                  onClick={handlePublishClick}
                  className="group relative w-full sm:w-auto px-6 sm:px-10 py-4 bg-transparent text-white 
          border-2 border-white/30 rounded-xl font-medium text-base sm:text-lg backdrop-blur-sm
          hover:border-white/60 transition-all duration-300 
          hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Publish Ride</span>
                  <div
                    className="absolute inset-0 bg-white opacity-0 
            group-hover:opacity-10 transition-opacity duration-300 rounded-xl"
                  />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-20"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="w-6 sm:w-8 h-10 sm:h-12 rounded-full border-2 border-white/20 backdrop-blur-sm flex items-center justify-center
        hover:border-white/40 transition-colors duration-300"
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white rounded-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
        <TrustedBy />
        <motion.div
          className="flex flex-col gap-16 mt-32 px-4 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {/* Features Section */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="w-full md:w-1/2"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ delay: 1 }}
            >
              <h2 className="text-3xl md:text-5xl text-blue-500 dark:text-blue-400 font-bold mb-6">
                Join Our Carpool Community
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed">
                Save money, reduce emissions, and make your commute more
                enjoyable by carpooling with others! Connect with fellow
                travelers and create lasting friendships along the way.
              </p>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2"
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              transition={{ delay: 1 }}
            >
              <img
                src={travel}
                alt="Carpool Community"
                className="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </motion.div>
          </div>

          {/* Security Section */}
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl shadow-xl overflow-hidden"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-12 p-8">
              <div className="w-full md:w-1/3">
                <img
                  src={security}
                  alt="Security"
                  className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
              <div className="w-full md:w-2/3 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Your Safety is Our Priority!
                </h2>
                <p className="text-lg leading-relaxed">
                  At HolaHolaCar, we're committed to maintaining a secure
                  platform. We implement robust verification processes and
                  provide comprehensive safety guidelines to ensure a
                  trustworthy carpooling experience.
                </p>
              </div>
            </div>
          </motion.div>

          <TextHeading />
          <motion.div
            className="w-full py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Content */}
                <div className="lg:w-1/3 space-y-8">
                  <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-500 dark:to-purple-500">
                      Available Vehicle Types
                    </h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
                      Choose from our wide range of verified vehicles for your
                      perfect journey
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-blue-600 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          Verified Vehicles
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          All vehicles are thoroughly checked
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-purple-600 dark:text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          24/7 Available
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Book your ride anytime
                        </p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => navigate("/add-vehicle")}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-xl px-8 py-4 
          font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add Your Vehicle
                  </motion.button>
                </div>

                {/* Right Content - Infinite Scroll */}
                <div className="lg:w-2/3">
                  <div className="relative">
                    <div className="flex overflow-hidden">
                      <motion.div
                        className="flex gap-6"
                        animate={{
                          x: [0, -1920],
                        }}
                        transition={{
                          x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                          },
                        }}
                      >
                        {[...vehicles, ...vehicles].map((vehicle, index) => (
                          <motion.div
                            key={index}
                            className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden group"
                            whileHover={{ scale: 1.02, y: -5 }}
                          >
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={vehicle.image}
                                alt={vehicle.name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                                {vehicle.name}
                              </h3>
                            </div>

                            <div className="p-6">
                              <div className="flex justify-between mb-4 text-sm">
                                <span className="flex items-center gap-1">
                                  <svg
                                    className="w-4 h-4 text-blue-500 dark:text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                  </svg>
                                  {vehicle.highlights.passengers} Seats
                                </span>
                                <span className="flex items-center gap-1">
                                  <svg
                                    className="w-4 h-4 text-blue-500 dark:text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                    />
                                  </svg>
                                  {vehicle.highlights.luggage}
                                </span>
                                <span className="flex items-center gap-1">
                                  <svg
                                    className="w-4 h-4 text-blue-500 dark:text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                  </svg>
                                  {vehicle.highlights.mileage}
                                </span>
                              </div>

                              <div className="border-t pt-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-400">
                                  <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mr-2"></span>
                                  Available Now
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                    <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-blue-50 to-transparent dark:from-gray-800 dark:to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-purple-50 to-transparent dark:from-gray-800 dark:to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <InfiniteReviews />
        </motion.div>
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
