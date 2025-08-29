import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

export const Error = () => {
  return (
    <div className="relative p-20 w-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 overflow-hidden">
      <motion.div
        className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-indigo-500 blur-3xl opacity-20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center p-8 md:p-12 space-y-6 rounded-lg shadow-2xl backdrop-blur-sm bg-gray-800 bg-opacity-80 border border-gray-700 max-w-lg mx-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="text-pink-400 drop-shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>

        <motion.p
          className="text-pink-400 font-mono text-sm uppercase tracking-widest"
          variants={itemVariants}
        >
          Error 500
        </motion.p>

        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-indigo-400 text-center tracking-tight"
          variants={itemVariants}
        >
          System Offline
        </motion.h1>

        <motion.p
          className="text-gray-300 text-lg text-center leading-relaxed"
          variants={itemVariants}
        >
          We're sorry, our services are experiencing a momentary outage. We are
          actively working to resolve the issue.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 pt-4"
          variants={itemVariants}
        >
          <a
            href="/"
            className="px-6 py-3 font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Refresh Page
          </a>
          <a
            href="/contact"
            className="px-6 py-3 font-semibold rounded-lg text-indigo-400 border border-indigo-500 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Contact Support
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Error;
