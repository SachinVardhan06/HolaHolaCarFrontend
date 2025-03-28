import React from 'react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../comp/themeprovider';
import { FaQuestion, FaEnvelope, FaPhone, FaComments } from 'react-icons/fa';

const HelpCenter = () => {
  const { darkMode } = useContext(ThemeContext);

  const helpItems = [
    {
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions about our services',
      icon: <FaQuestion className="w-6 h-6" />,
      link: '/faq'
    },
    {
      title: 'Email Support',
      description: 'Send us an email and we\'ll get back to you within 24 hours',
      icon: <FaEnvelope className="w-6 h-6" />,
      link: 'mailto:support@holaholacar.com'
    },
    {
      title: 'Phone Support',
      description: 'Call us directly for immediate assistance',
      icon: <FaPhone className="w-6 h-6" />,
      link: 'tel:+1234567890'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: <FaComments className="w-6 h-6" />,
      link: '#'
    }
  ];

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            How Can We Help You?
          </h1>
          <p className={`text-xl ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We're here to help and answer any question you might have
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {helpItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-blue-900' 
                  : 'bg-white hover:bg-blue-50 shadow-lg'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-16 p-8 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
          }`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Send us a Message
          </h2>
          <form className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className={`w-full p-3 rounded-lg ${
                  darkMode 
                    ? 'bg-gray-700 text-white border-gray-600' 
                    : 'bg-gray-50 text-gray-900 border-gray-300'
                } border focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <textarea
                rows="4"
                placeholder="Your Message"
                className={`w-full p-3 rounded-lg ${
                  darkMode 
                    ? 'bg-gray-700 text-white border-gray-600' 
                    : 'bg-gray-50 text-gray-900 border-gray-300'
                } border focus:ring-2 focus:ring-blue-500`}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter;