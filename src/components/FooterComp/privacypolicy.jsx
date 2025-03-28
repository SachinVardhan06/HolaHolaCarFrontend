import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserSecret, FaLock, FaCookie } from 'react-icons/fa';
import { ThemeContext } from '../comp/themeprovider';

const PrivacyPolicy = () => {
  const { darkMode } = useContext(ThemeContext);

  const sections = [
    {
      icon: <FaUserSecret />,
      title: "Information We Collect",
      content: [
        "Personal identification information (Name, email address, phone number)",
        "Vehicle information for ride providers",
        "Payment information",
        "Location data during rides",
        "Device information and usage statistics"
      ]
    },
    {
      icon: <FaLock />,
      title: "How We Protect Your Data",
      content: [
        "End-to-end encryption for sensitive data",
        "Regular security audits and updates",
        "Secure payment processing",
        "Data backup and recovery protocols",
        "Access control and authentication"
      ]
    },
    {
      icon: <FaCookie />,
      title: "Cookies & Tracking",
      content: [
        "Essential cookies for site functionality",
        "Analytics cookies to improve service",
        "Session cookies for user experience",
        "Marketing cookies (with consent)",
        "Third-party integration cookies"
      ]
    },
    {
      icon: <FaShieldAlt />,
      title: "Your Rights",
      content: [
        "Access to your personal data",
        "Right to data portability",
        "Right to be forgotten",
        "Opt-out options",
        "Data correction requests"
      ]
    }
  ];

  return (
    <div className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 ${
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
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Policy
            </span>
          </h1>
          <p className={`text-xl ${
            darkMode ? "text-gray-300" : "text-gray-600"
          } max-w-2xl mx-auto`}>
            Your privacy is important to us. Learn how we collect, use, and protect your data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-6 rounded-xl ${
                darkMode 
                  ? "bg-gray-800 hover:bg-gray-700" 
                  : "bg-white hover:bg-gray-50"
              } shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl">
                  {section.icon}
                </div>
                <h2 className={`ml-4 text-xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (index * 0.1) + (itemIndex * 0.05) }}
                    className={`flex items-center ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mt-16 p-6 rounded-xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-xl`}
        >
          <h2 className={`text-2xl font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Contact Us
          </h2>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            If you have any questions about our Privacy Policy, please contact us at{" "}
            <a 
              href="mailto:privacy@holaholacar.com"
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              privacy@holaholacar.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;