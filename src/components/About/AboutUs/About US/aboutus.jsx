import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../../comp/themeprovider";
import sachin from "../../../../assets/sachin.jpg";
import linkdin from "../../../../assets/linkdin.png";
import { FaLinkedin } from "react-icons/fa";

function Aboutus() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? "bg-gradient-to-r from-gray-900 to-gray-800" 
        : "bg-gradient-to-r from-blue-50 to-purple-50"
    } transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm ${
            darkMode 
              ? "bg-gray-800/50 border border-gray-700/50" 
              : "bg-white/80 border border-gray-200/50"
          } p-8 mb-12`}
        >
          <h1 className={`text-4xl font-bold mb-6 bg-gradient-to-r ${
            darkMode
              ? "from-blue-400 to-purple-400"
              : "from-blue-600 to-purple-600"
          } bg-clip-text text-transparent`}>
            About Us
          </h1>
          <p className={`text-lg leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            At HolaHolaCar, we are dedicated to providing a seamless and
            sustainable travel experience. By offering affordable rides and
            promoting cost savings, we make it easier for users to enjoy
            eco-friendly and shared transportation options while meeting new
            people.
          </p>
          <motion.div 
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[
              {
                title: "Our Mission",
                description: "To become the go-to marketplace for all shared travel needs, combining carpooling with diverse transportation options."
              },
              {
                title: "Our Impact",
                description: "Helping our community save money and reduce carbon footprint, one ride at a time."
              },
              {
                title: "Our Future",
                description: "Building a more connected, cost-effective, and eco-conscious world through innovative solutions."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl ${
                  darkMode 
                    ? "bg-gray-700/50 hover:bg-gray-700/70" 
                    : "bg-white/50 hover:bg-white/70"
                } transition-colors duration-300`}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className={`text-xl font-semibold mb-3 ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}>{item.title}</h3>
                <p className={`${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`rounded-2xl shadow-xl overflow-hidden ${
            darkMode 
              ? "bg-gray-800/50 border border-gray-700/50" 
              : "bg-white/80 border border-gray-200/50"
          } p-8`}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={sachin}
                alt="Sachin Vardhan"
                className="rounded-2xl w-64 h-64 object-cover shadow-lg"
              />
            </motion.div>
            <div>
              <h2 className={`text-3xl font-bold mb-6 bg-gradient-to-r ${
                darkMode
                  ? "from-blue-400 to-purple-400"
                  : "from-blue-600 to-purple-600"
              } bg-clip-text text-transparent`}>
                Our Founder
              </h2>
              <p className={`text-lg leading-relaxed mb-6 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}>
                Sachin Vardhan is the visionary behind HolaHolaCar. With a passion
                for sustainable travel and a commitment to making transportation
                more accessible and affordable, Sachin has led the company to new
                heights.
              </p>
              <div className="flex items-center gap-4">
                <span className={`text-xl font-semibold ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}>- Sachin Vardhan</span>
                <motion.a
                  href="https://www.linkedin.com/in/sachin-vardhan-06/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                    darkMode 
                      ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30" 
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  } transition-colors duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin className="text-xl" />
                  <span>Connect</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Aboutus;