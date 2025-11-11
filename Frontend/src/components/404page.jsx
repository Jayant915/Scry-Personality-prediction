import React from "react";
import { motion } from "framer-motion";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-25 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center p-6 bg-gray-900 text-gray-100"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center max-w-md w-full mx-auto">
          {/* 404 Text - now responsive */}
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.h1>

          {/* Title */}
          <h2 className="text-3xl font-bold mb-3 text-purple-300">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-gray-400 mb-8 text-lg">
            Oops! The page you're looking for doesn't exist or may have been moved.
          </p>

          {/* Home Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium hover:shadow-lg transition-all"
            >
              <RocketLaunchIcon className="h-5 w-5 mr-2" />
              Return Home
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;