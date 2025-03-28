import React from 'react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../comp/themeprovider';

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Daily Commuter",
    text: "CarPool has transformed my daily commute. I've saved money and made great friends!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Business Traveler",
    text: "The most reliable ridesharing platform I've ever used. Perfect for business trips.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5
  },
  {
    name: "Emma Thompson",
    role: "Student",
    text: "As a student, this has been a game-changer for my budget. Super easy to use!",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5
  },
  // Add more reviews as needed
];


const InfiniteReviews = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`py-20 overflow-hidden rounded-2xl ${
      darkMode 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className={`text-4xl md:text-5xl font-bold ${
              darkMode
                ? 'bg-gradient-to-r from-blue-400 to-purple-400'
                : 'bg-gradient-to-r from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Loved by Travelers Worldwide
          </motion.h2>
          <motion.p 
            className={`mt-4 text-xl ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join thousands of happy commuters who've found their perfect ride
          </motion.p>
        </div>

        <div className="relative">
          {/* First row of reviews */}
          <motion.div 
            className="flex space-x-6"
            animate={{ x: [0, -1035] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear"
              }
            }}
          >
            {[...reviews, ...reviews].map((review, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 w-[400px] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                    : 'bg-white border-gray-100 hover:bg-gray-50'
                } border`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={review.image} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className={`text-lg font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{review.name}</h3>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{review.role}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {review.text}
                  </p>
                  <div className="flex items-center mt-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Second row of reviews - uses same styling as first row */}
          <motion.div 
            className="flex space-x-6 mt-8"
            animate={{ x: [-1035, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear"
              }
            }}
          >
            {[...reviews, ...reviews].map((review, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 w-[400px] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                    : 'bg-white border-gray-100 hover:bg-gray-50'
                } border`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={review.image} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className={`text-lg font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{review.name}</h3>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{review.role}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {review.text}
                  </p>
                  <div className="flex items-center mt-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteReviews;