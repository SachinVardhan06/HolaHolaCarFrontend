import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Function to handle logout and display toast
  const handleLogoutWithToast = () => {
    handleLogout();
    toast.error("Logout Successful");
  };

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 font-poppins bg-gray-100 shadow-md space-y-3 sm:space-y-0 w-full">
      {/* Logo Section */}
      <div className="flex justify-center w-full sm:w-auto">
        <Link to="/home">
          <h1 className="text-[20px] sm:text-[24px] font-semibold text-boldtext">
            HolaHolaCar
          </h1>
        </Link>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-center items-center w-full sm:w-auto">
        {user ? (
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <span className="text-sm sm:text-base font-semibold text-center sm:text-left">
              Welcome, {username}
            </span>
            <button
              onClick={handleLogoutWithToast}
              className="px-3 sm:px-4 py-1 sm:py-2 bg-red-500 text-white rounded text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {/* Login Button */}
            <Link to="/login" className="w-1/2 sm:w-auto flex justify-start mr-3">
              <button className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded text-sm sm:text-base">
                Login
              </button>
            </Link>

            {/* Sign Up Button */}
            <Link to="/register" className="w-1/2 sm:w-auto flex justify-end">
              <button className="px-3 sm:px-4 py-1 sm:py-2 bg-green-500 text-white rounded text-sm sm:text-base">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
