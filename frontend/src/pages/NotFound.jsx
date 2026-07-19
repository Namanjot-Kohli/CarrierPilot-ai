import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { HiOutlineHome } from 'react-icons/hi2';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md z-10"
      >
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Page not found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
          Looks like you've navigated off the career path. Let's get you back on track.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg" leftIcon={<HiOutlineHome />} className="shadow-lg shadow-indigo-500/30">
            Go Home
          </Button>
        </Link>
      </motion.div>

      {/* Floating elements animation */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-12 h-12 border-4 border-indigo-500/20 rounded-xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-16 h-16 border-4 border-purple-500/20 rounded-full"
      />
    </div>
  );
};

export default NotFound;
