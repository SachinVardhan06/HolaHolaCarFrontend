import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaMapMarkerAlt, FaUserFriends, FaShieldAlt } from 'react-icons/fa';
import { ThemeContext } from '../comp/themeprovider';
import { useContext } from 'react';

const HowItWorks = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);


  const steps = [
    {
      icon: <FaMapMarkerAlt className="w-8 h-8" />,
      title: "Enter Your Route",
      description: "Share your journey details including pickup and drop-off points",
      color: "blue"
    },
    {
      icon: <FaCar className="w-8 h-8" />,
      title: "Find or Offer Rides",
      description: "Browse available rides or publish your own journey",
      color: "purple"
    },
    {
      icon: <FaUserFriends className="w-8 h-8" />,
      title: "Connect & Travel",
      description: "Meet your travel buddy and start your journey together",
      color: "green"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Safe & Secure",
      description: "Travel with verified users in a secure environment",
      color: "indigo"
    }
  ];

  return (
    <div className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}>
      <div className="max-w-7xl mx-auto mt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              HolaHolaCar
            </span>{" "}
            Works
          </h1>
          <p className={`text-xl ${
            darkMode ? "text-gray-300" : "text-gray-600"
          } max-w-2xl mx-auto`}>
            Your journey to shared travel begins with these simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-6 rounded-xl ${
                darkMode 
                  ? "bg-gray-800 hover:bg-gray-700" 
                  : "bg-white hover:bg-gray-50"
              } shadow-xl transition-all duration-300 hover:shadow-2xl`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto
                bg-gradient-to-br ${
                  step.color === 'blue' ? 'from-blue-400 to-blue-600' :
                  step.color === 'purple' ? 'from-purple-400 to-purple-600' :
                  step.color === 'green' ? 'from-green-400 to-green-600' :
                  'from-indigo-400 to-indigo-600'
                }`}>
                <div className="text-white">
                  {step.icon}
                </div>
              </div>
              <h3 className={`text-xl font-semibold mb-3 text-center ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                {step.title}
              </h3>
              <p className={`text-center ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.button
            onClick={() => navigate('/search')}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl
              font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300
              hover:scale-105"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;