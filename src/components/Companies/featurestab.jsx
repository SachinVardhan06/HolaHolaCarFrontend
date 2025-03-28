import React from "react";
import { motion } from "framer-motion";
import carmove from "../../assets/carmove.mp4";

const TextHeading = () => {
  return (
    <div className="relative py-24 overflow-hidden rounded-2xl dark:bg-gray-900/90">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900" />
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Transforming
            </span>{" "}
            <span className="text-gray-800 dark:text-white">Your Daily Commute</span>
          </motion.h2>

          <motion.p
            className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-gray-700 leading-relaxed dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover a smarter, more efficient way to travel with thousands of
            satisfied users.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { label: "15K+", description: "Happy Users" },
              { label: "60K+", description: "Trips Completed" },
              { label: "98%", description: "Satisfaction Rate" },
              { label: "35%", description: "Cost Savings" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center px-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {stat.label}
                </div>
                <div className="mt-2 text-sm text-gray-700 font-medium dark:text-white">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-20 relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="relative rounded-2xl overflow-hidden group">
            {/* Gradient overlay */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

            {/* Video container */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl dark:text-white">
              <video
                className="w-full h-auto transform transition-transform duration-700 group-hover:scale-[1.02] dark:filter"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={carmove} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>
          </div>

          {/* Caption */}
          <motion.p
            className="mt-6 text-sm text-gray-600 text-center dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            See how HolaHolaCar is redefining shared travel experiences
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default TextHeading;
