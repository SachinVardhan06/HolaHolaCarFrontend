import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../comp/themeprovider';
import { FaCalendar, FaUser, FaTag, FaHeart, FaComment } from 'react-icons/fa';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Carpooling: Sustainable Transportation',
    excerpt: 'Explore how carpooling is shaping the future of sustainable urban transportation...',
    author: 'John Doe',
    date: '2024-03-27',
    category: 'Sustainability',
    image: 'https://source.unsplash.com/random/800x600/?carpool',
    likes: 156,
    comments: 23
  },
  // ...Add more blog posts
];

const Blog = () => {
  const { darkMode } = useContext(ThemeContext);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Sustainability', 'Safety', 'Community', 'Technology'];

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            HolaHolaCar Blog
          </h1>
          <p className={`text-xl ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Stories, updates, and insights from our community
          </p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-lg overflow-hidden shadow-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm mb-4">
                  <span className={`flex items-center gap-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <FaCalendar />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className={`flex items-center gap-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <FaUser />
                    {post.author}
                  </span>
                </div>
                <h2 className={`text-xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {post.title}
                </h2>
                <p className={`mb-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`flex items-center gap-2 ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    <FaTag />
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <FaHeart className="text-red-500" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaComment className={
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      } />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;