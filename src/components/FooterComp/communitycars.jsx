import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../comp/themeprovider';
import { FaUsers, FaStar, FaRoute, FaLeaf, FaUserCircle } from 'react-icons/fa';

const Community = () => {
  const { darkMode } = useContext(ThemeContext);

  const stats = [
    { icon: <FaUsers />, label: 'Active Members', value: '10,000+' },
    { icon: <FaRoute />, label: 'Rides Shared', value: '50,000+' },
    { icon: <FaLeaf />, label: 'CO₂ Saved', value: '1,200 tons' },
    { icon: <FaStar />, label: 'Average Rating', value: '4.8/5' }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Priya Singh',
      role: 'Regular Commuter',
      image: 'https://source.unsplash.com/random/100x100/?woman',
      content: 'HolaHolaCar has transformed my daily commute. I\'ve made great friends and saved money!'
    },
    // Add more testimonials...
  ];

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Join Our Growing Community
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Connect with fellow travelers, share experiences, and make sustainable travel choices together.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center p-6 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-blue-50'
              }`}
            >
              <div className={`text-3xl mb-2 ${
                darkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {stat.icon}
              </div>
              <div className={`text-2xl font-bold mb-1 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.value}
              </div>
              <div className={
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Featured Stories */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 text-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Community Stories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg`}
              >
                <div className="flex items-center mb-4">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                  ) : (
                    <FaUserCircle className="w-12 h-12 text-gray-400 mr-4" />
                  )}
                  <div>
                    <h3 className={`font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {testimonial.name}
                    </h3>
                    <p className={
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className={`italic ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-12 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-blue-50'
          }`}
        >
          <h2 className={`text-3xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to Join Our Community?
          </h2>
          <p className={`mb-8 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Start your journey with HolaHolaCar today and become part of our growing family.
          </p>
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => window.location.href = '/register'}
          >
            Join Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Community;