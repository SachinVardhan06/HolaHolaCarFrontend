import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUserCircle, FaCar, FaSignOutAlt, FaBell } from "react-icons/fa";
import "../assets/fonts/fonts.css";
import axios from "axios";
import { ThemeContext } from "../../src/components/comp/themeprovider";
import { FaSun, FaMoon } from "react-icons/fa";

// First update the Logo component to remove right margin
const Logo = () => (
  <svg
    width="150"
    height="140"
    viewBox="0 0 300 100"
    xmlns="http://www.w3.org/2000/svg"
    className="-ml-2" // Added negative margin to align better
  >
    {/* Background */}
    <rect width="300" height="100" fill="transparent" />

    {/* Logo Circles */}
    <circle
      cx="100"
      cy="50"
      r="25"
      className="fill-[#007BFF] transition-colors duration-300"
    />
    <circle
      cx="130"
      cy="50"
      r="25"
      className="fill-[#00C853] transition-colors duration-300"
    />
  </svg>
);

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const refreshUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/profile/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      // Update localStorage with fresh data
      const updatedUser = {
        ...user,
        profile: response.data,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Log the fresh data
      console.group("🔄 Fresh User Data");
      console.log("Updated Profile:", response.data);
      console.log("Verification Status:", response.data.verification_status);
      console.groupEnd();
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  // Add after the Logo component
  const MenuButton = ({ isOpen, onClick, darkMode }) => (
    <button
      onClick={onClick}
      className="md:hidden p-2 rounded-lg"
      aria-label="Toggle menu"
    >
      <div className="w-6 h-6 flex flex-col justify-around">
        <span
          className={`block h-0.5 w-full transform transition-all duration-300 ${
            darkMode ? "bg-gray-300" : "bg-gray-600"
          } ${isOpen ? "rotate-45 translate-y-2.5" : ""}`}
        />
        <span
          className={`block h-0.5 w-full transition-all duration-300 ${
            darkMode ? "bg-gray-300" : "bg-gray-600"
          } ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-full transform transition-all duration-300 ${
            darkMode ? "bg-gray-300" : "bg-gray-600"
          } ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
        />
      </div>
    </button>
  );

  // Add this useEffect to refresh data on mount
  useEffect(() => {
    if (user) {
      refreshUserData();
    }
  }, []);
  // Add this useEffect hook after your existing useEffect hooks
  // Add this debug logging useEffect in your Navbar component
  useEffect(() => {
    console.group("🔄 User Profile Debug");
    console.log("User Profile:", {
      username: user?.username,
      email: user?.email,
      verification_status: user?.profile?.verification_status,
      full_profile: user?.profile,
    });
    console.groupEnd();
  }, [user]);

  // Add this inside the VerificationBadge component
  // Replace the existing VerificationBadge component with this one
  const VerificationBadge = () => {
    const isVerified = user?.profile?.verification_status === "VERIFIED";

    if (!isVerified) return null;

    return (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
        alt="Verified"
        className="ml-1 w-6 h-6 inline-block"
        title="Verified User"
      />
    );
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = async () => {
    try {
      // Get refresh token from localStorage
      const refreshToken = localStorage.getItem("refreshToken");

      // Call backend logout endpoint
      await axios.post(
        "http://localhost:8000/api/logout/",
        { refresh_token: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Clear all auth data from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("email");

      // Update AuthContext
      handleLogout();

      // Close dropdown
      setShowDropdown(false);

      // Show success message

      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);

      // Still clear local storage even if API call fails
      localStorage.clear();

      // Show error message but still logout user
      toast.error("Error during logout, but you've been logged out locally");

      // Update AuthContext and navigate
      handleLogout();
      navigate("/");
    }
  };

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <motion.nav
      className={`fixed top-6 mx-auto left-2 right-2 md:left-8 md:right-8 lg:left-6 lg:right-6 w-auto max-w-[1400px] z-50 rounded-xl font-inter transition-all duration-300 ${
        isScrolled
          ? darkMode
            ? "bg-gray-800/80 backdrop-blur-md shadow-lg border border-gray-700/50"
            : "bg-white/80 backdrop-blur-md shadow-lg border border-white/10"
          : darkMode
          ? "bg-gray-800/40"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              className="flex items-center -space-x-14"
              whileHover={{ scale: 1.02 }}
            >
              <Logo />
              <h1
                className={`text-2xl font-semibold ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                HolaHolaCar
              </h1>
            </motion.div>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MenuButton
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              darkMode={darkMode}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-xl">
            <Link
              to="/aboutus"
              className={`${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors`}
            >
              About
            </Link>
            <Link
              to="/search"
              className={`${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors`}
            >
              Find Rides
            </Link>
            <Link
              to="/publish"
              className={`${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors`}
            >
              Offer Ride
            </Link>
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors ${
                darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-100/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {darkMode ? (
                <FaSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <FaMoon className="w-5 h-5 text-gray-600" />
              )}
            </motion.button>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <motion.div
                  className="relative cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaBell
                    className={`w-5 h-5 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  />
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    2
                  </span>
                </motion.div>

                <div className="relative" ref={dropdownRef}>
                  {/* User Profile Button */}
                  <motion.button
                    className={`flex items-center space-x-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                    onClick={() => setShowDropdown(!showDropdown)}
                    whileHover={{ scale: 1.02 }}
                  >
                    {user.profile?.image ? (
                      <img
                        src={user.profile.image}
                        alt="Profile"
                        className="w-8 h-8 rounded-full border-2 border-gray-200"
                      />
                    ) : (
                      <FaUserCircle
                        className={`w-8 h-8 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      />
                    )}
                    <span className="font-medium">{user?.username}</span>
                  </motion.button>

                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg py-1 border ${
                        darkMode
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-100"
                      }`}
                    >
                      <div
                        className={`px-4 py-2 border-b ${
                          darkMode ? "border-gray-700" : "border-gray-100"
                        }`}
                      >
                        <div className="flex items-center">
                          <p
                            className={`text-sm font-medium ${
                              darkMode ? "text-gray-300" : "text-gray-900"
                            }`}
                          >
                            {user?.username}
                          </p>
                          {user?.profile?.verification_status ===
                            "VERIFIED" && <VerificationBadge />}
                        </div>
                        <p
                          className={`text-xs mt-0.5 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {user?.email}
                        </p>
                      </div>
                      <Link to="/profile">
                        <motion.div
                          className={`px-4 py-2 text-sm flex items-center space-x-2 ${
                            darkMode
                              ? "text-gray-300 hover:bg-gray-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          whileHover={{ x: 2 }}
                        >
                          <FaUserCircle className="w-4 h-4" />
                          <span>Profile</span>
                        </motion.div>
                      </Link>
                      <Link to="/my-booked-rides">
                        <motion.div
                          className={`px-4 py-2 text-sm flex items-center space-x-2 ${
                            darkMode
                              ? "text-gray-300 hover:bg-gray-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          whileHover={{ x: 2 }}
                        >
                          <FaCar className="w-4 h-4" />
                          <span>My Booked Rides</span>
                        </motion.div>
                      </Link>
                      <Link to="/my-rides">
                        <motion.div
                          className={`px-4 py-2 text-sm flex items-center space-x-2 ${
                            darkMode
                              ? "text-gray-300 hover:bg-gray-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          whileHover={{ x: 2 }}
                        >
                          <FaCar className="w-4 h-4" />
                          <span>My Rides</span>
                        </motion.div>
                      </Link>
                      <button
                        onClick={handleLogoutClick}
                        className={`w-full px-4 py-2 text-sm flex items-center space-x-2 ${
                          darkMode
                            ? "text-red-400 hover:bg-red-600"
                            : "text-red-600 hover:bg-red-50"
                        }`}
                      >
                        <FaSignOutAlt className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <motion.button
                    className={`px-4 py-2 font-medium rounded-lg ${
                      darkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    className="px-4 py-2 font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    whileHover={{ scale: 1.02 }}
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden absolute top-full left-0 right-0 mt-2 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            } border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
          >
            <div className="py-2">
              {/* Navigation Links */}
              <div className="px-4 py-2 space-y-1">
                <Link
                  to="/aboutus"
                  className={`block px-3 py-2 rounded-md ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/search"
                  className={`block px-3 py-2 rounded-md ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Find Rides
                </Link>
                <Link
                  to="/publish"
                  className={`block px-3 py-2 rounded-md ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Offer Ride
                </Link>
              </div>

              {/* User Section */}
              {user ? (
                <div className="px-4 py-2 space-y-1 border-t border-gray-200">
                  <Link
                    to="/profile"
                    className={`block px-3 py-2 rounded-md ${
                      darkMode
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-rides"
                    className={`block px-3 py-2 rounded-md ${
                      darkMode
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Rides
                  </Link>
                  <button
                    onClick={() => {
                      handleLogoutClick();
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      darkMode
                        ? "text-red-400 hover:bg-red-900/20"
                        : "text-red-600 hover:bg-red-50"
                    }`}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="px-4 py-2 space-y-2 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="block w-full px-3 py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`block w-full px-3 py-2 text-center rounded-md border ${
                      darkMode
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Dark Mode Toggle */}
              <div className="px-4 py-2 border-t border-gray-200">
                <button
                  onClick={() => {
                    setDarkMode(!darkMode);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>Dark Mode</span>
                  {darkMode ? (
                    <FaSun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <FaMoon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
export default Navbar;
//   return (
//     <motion.nav
//       className={`fixed top-6 mx-auto left-2 right-2 md:left-8 md:right-8 lg:left-6 lg:right-6 w-auto max-w-[1400px] z-50 rounded-xl font-inter transition-all duration-300 ${
//         isScrolled
//           ? darkMode
//             ? "bg-gray-800/80 backdrop-blur-md shadow-lg border border-gray-700/50"
//             : "bg-white/80 backdrop-blur-md shadow-lg border border-white/10"
//           : darkMode
//           ? "bg-gray-800/40"
//           : "bg-transparent"
//       }`}
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0 }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}

//           <Link to="/" className="flex items-center">
//             <motion.div
//               className="flex items-center -space-x-12" // Changed from -space-x-12
//               whileHover={{ scale: 1.02 }}
//             >
//               <Logo />
//               <h1
//                 className={`text-2xl font-semibold ${
//                   darkMode ? "text-gray-100" : "text-gray-900"
//                 }`}
//               >
//                 HolaHolaCar
//               </h1>
//             </motion.div>
//           </Link>
//           {/* Move Mobile Menu Button here - outside of Logo section */}
//           <div className="md:hidden">
//             <MenuButton
//               isOpen={mobileMenuOpen}
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               darkMode={darkMode}
//             />
//           </div>
//           {/* Navigation Links */}
//           <div className="hidden md:flex items-center space-x-8 text-xl">
//             <Link
//               to="/aboutus"
//               className={`${
//                 darkMode
//                   ? "text-gray-300 hover:text-white"
//                   : "text-gray-600 hover:text-gray-900"
//               } transition-colors`}
//             >
//               About
//             </Link>
//             <Link
//               to="/search"
//               className={`${
//                 darkMode
//                   ? "text-gray-300 hover:text-white"
//                   : "text-gray-600 hover:text-gray-900"
//               } transition-colors`}
//             >
//               Find Rides
//             </Link>
//             <Link
//               to="/publish"
//               className={`${
//                 darkMode
//                   ? "text-gray-300 hover:text-white"
//                   : "text-gray-600 hover:text-gray-900"
//               } transition-colors`}
//             >
//               Offer Ride
//             </Link>
//             <motion.button
//               onClick={() => setDarkMode(!darkMode)}
//               className={`p-2 rounded-full transition-colors ${
//                 darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-100/50"
//               }`}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {darkMode ? (
//                 <FaSun className="w-5 h-5 text-yellow-400" />
//               ) : (
//                 <FaMoon className="w-5 h-5 text-gray-600" />
//               )}
//             </motion.button>
//           </div>
//           {/* Auth Section */}
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <div className="flex items-center space-x-4">
//                 {/* Notification Bell */}
//                 <motion.div
//                   className="relative cursor-pointer"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <FaBell
//                     className={`w-5 h-5 ${
//                       darkMode ? "text-gray-300" : "text-gray-600"
//                     }`}
//                   />
//                   <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                     2
//                   </span>
//                 </motion.div>

//                 {/* User Menu */}
//                 <div className="relative" ref={dropdownRef}>
//                   <motion.button
//                     className={`flex items-center space-x-2 text-sm ${
//                       darkMode
//                         ? "text-gray-300 hover:text-white"
//                         : "text-gray-700 hover:text-gray-900"
//                     }`}
//                     onClick={() => setShowDropdown(!showDropdown)}
//                     whileHover={{ scale: 1.02 }}
//                   >
//                     {user.profile?.image ? (
//                       <img
//                         src={user.profile.image}
//                         alt="Profile"
//                         className="w-8 h-8 rounded-full border-2 border-gray-200"
//                       />
//                     ) : (
//                       <FaUserCircle
//                         className={`w-8 h-8 ${
//                           darkMode ? "text-gray-300" : "text-gray-600"
//                         }`}
//                       />
//                     )}
//                     <div className="flex items-center">
//                       <span className="font-medium text-[16px]">
//                         {user?.username}
//                       </span>
//                       {user?.profile?.verification_status === "VERIFIED" && (
//                         <VerificationBadge />
//                       )}
//                     </div>
//                   </motion.button>

//                   {/* Dropdown Menu */}
//                   {showDropdown && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg py-1 border ${
//                         darkMode
//                           ? "bg-gray-800 border-gray-700"
//                           : "bg-white border-gray-100"
//                       }`}
//                     >
//                       <div
//                         className={`px-4 py-2 border-b ${
//                           darkMode ? "border-gray-700" : "border-gray-100"
//                         }`}
//                       >
//                         <div className="flex items-center">
//                           <p
//                             className={`text-sm font-medium ${
//                               darkMode ? "text-gray-300" : "text-gray-900"
//                             }`}
//                           >
//                             {user?.username}
//                           </p>
//                           {user?.profile?.verification_status ===
//                             "VERIFIED" && <VerificationBadge />}
//                         </div>
//                         <p
//                           className={`text-xs mt-0.5 ${
//                             darkMode ? "text-gray-400" : "text-gray-500"
//                           }`}
//                         >
//                           {user?.email}
//                         </p>
//                       </div>
//                       <Link to="/profile">
//                         <motion.div
//                           className={`px-4 py-2 text-sm flex items-center space-x-2 ${
//                             darkMode
//                               ? "text-gray-300 hover:bg-gray-700"
//                               : "text-gray-700 hover:bg-gray-50"
//                           }`}
//                           whileHover={{ x: 2 }}
//                         >
//                           <FaUserCircle className="w-4 h-4" />
//                           <span>Profile</span>
//                         </motion.div>
//                       </Link>
//                       <Link to="/my-booked-rides">
//                         <motion.div
//                           className={`px-4 py-2 text-sm flex items-center space-x-2 ${
//                             darkMode
//                               ? "text-gray-300 hover:bg-gray-700"
//                               : "text-gray-700 hover:bg-gray-50"
//                           }`}
//                           whileHover={{ x: 2 }}
//                         >
//                           <FaCar className="w-4 h-4" />
//                           <span>My Booked Rides</span>
//                         </motion.div>
//                       </Link>
//                       <Link to="/my-rides">
//                         <motion.div
//                           className={`px-4 py-2 text-sm flex items-center space-x-2 ${
//                             darkMode
//                               ? "text-gray-300 hover:bg-gray-700"
//                               : "text-gray-700 hover:bg-gray-50"
//                           }`}
//                           whileHover={{ x: 2 }}
//                         >
//                           <FaCar className="w-4 h-4" />
//                           <span>My Rides</span>
//                         </motion.div>
//                       </Link>
//                       <button
//                         onClick={handleLogoutClick}
//                         className={`w-full px-4 py-2 text-sm flex items-center space-x-2 ${
//                           darkMode
//                             ? "text-red-400 hover:bg-red-600"
//                             : "text-red-600 hover:bg-red-50"
//                         }`}
//                       >
//                         <FaSignOutAlt className="w-4 h-4" />
//                         <span>Logout</span>
//                       </button>
//                     </motion.div>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Link to="/login">
//                   <motion.button
//                     className={`px-4 py-2 text-lg font-medium ${
//                       darkMode
//                         ? "text-gray-300 hover:text-white"
//                         : "text-gray-700 hover:text-gray-900"
//                     }`}
//                     whileHover={{ scale: 1.02 }}
//                   >
//                     Login
//                   </motion.button>
//                 </Link>
//                 <Link to="/register">
//                   <motion.button
//                     className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                       darkMode
//                         ? "text-white bg-blue-600 hover:bg-blue-700"
//                         : "text-white bg-blue-600 hover:bg-blue-700"
//                     }`}
//                     whileHover={{ scale: 1.02 }}
//                   >
//                     Sign Up
//                   </motion.button>
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       {mobileMenuOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           className={`absolute top-full left-0 right-0 mt-2 rounded-lg shadow-lg ${
//             darkMode ? "bg-gray-800" : "bg-white"
//           } border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
//         >
//           <div className="py-2">
//             {/* Navigation Links - Add these first */}
//             <div className="px-4 py-2 border-b border-gray-200">
//               <Link
//                 to="/aboutus"
//                 className={`block px-3 py-2 rounded-md ${
//                   darkMode
//                     ? "text-gray-300 hover:bg-gray-700"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 About
//               </Link>
//               <Link
//                 to="/search"
//                 className={`block px-3 py-2 rounded-md ${
//                   darkMode
//                     ? "text-gray-300 hover:bg-gray-700"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Find Rides
//               </Link>
//               <Link
//                 to="/publish"
//                 className={`block px-3 py-2 rounded-md ${
//                   darkMode
//                     ? "text-gray-300 hover:bg-gray-700"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Offer Ride
//               </Link>
//             </div>

//             {user ? (
//               <>
//                 {/* User Profile Section */}
//                 <div className="px-4 py-3 border-b border-gray-200">
//                   {/* ... existing user profile code ... */}
//                 </div>

//                 {/* User Navigation Links */}
//                 <div className="px-4 py-2 space-y-1">
//                   {/* ... existing user links ... */}
//                 </div>

//                 {/* Dark Mode & Logout */}
//                 <div className="px-4 pt-2 pb-3 border-t border-gray-200">
//                   {/* ... existing dark mode and logout buttons ... */}
//                 </div>
//               </>
//             ) : (
//               <div className="px-4 py-2 space-y-2">
//                 <Link
//                   to="/login"
//                   className={`block px-3 py-2 rounded-md text-center ${
//                     darkMode
//                       ? "bg-blue-600 hover:bg-blue-700"
//                       : "bg-blue-600 hover:bg-blue-700"
//                   } text-white`}
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className={`block px-3 py-2 rounded-md text-center border ${
//                     darkMode
//                       ? "border-gray-600 text-gray-300 hover:bg-gray-700"
//                       : "border-gray-300 text-gray-700 hover:bg-gray-100"
//                   }`}
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}

//             {/* Dark Mode Toggle (for non-logged in users) */}
//             {!user && (
//               <div className="px-4 pt-2 border-t border-gray-200">
//                 <button
//                   onClick={() => {
//                     setDarkMode(!darkMode);
//                     setMobileMenuOpen(false);
//                   }}
//                   className={`w-full flex items-center justify-between px-3 py-2 rounded-md ${
//                     darkMode
//                       ? "text-gray-300 hover:bg-gray-700"
//                       : "text-gray-700 hover:bg-gray-100"
//                   }`}
//                 >
//                   <span>Dark Mode</span>
//                   {darkMode ? (
//                     <FaSun className="w-5 h-5 text-yellow-400" />
//                   ) : (
//                     <FaMoon className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </motion.nav>
//   );
// };

// export default Navbar;
