import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineSun, HiOutlineMoon, HiOutlineBars3, HiOutlineRocketLaunch } from 'react-icons/hi2';
import { useTheme } from '../../hooks/useTheme.js';
import { useAuth } from '../../hooks/useAuth.js';
import { getInitials, getAvatarColor } from '../../utils/formatters.js';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="sticky top-0 z-30 glass dark:glass border-b border-gray-200 dark:border-slate-800 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 mr-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-slate-800 md:hidden"
            >
              <HiOutlineBars3 size={24} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="p-1.5 bg-primary-600 rounded-lg text-white">
                <HiOutlineRocketLaunch size={20} />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white hidden sm:block">
                CareerPilot AI
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:text-gray-400 dark:hover:text-primary-400 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
            </button>

            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center focus:outline-none"
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${getAvatarColor(user.name)} ring-2 ring-white dark:ring-slate-900`}>
                    {getInitials(user.name)}
                  </div>
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 py-1 overflow-hidden"
                    >
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                        onClick={() => setShowDropdown(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          logout();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-700"
                      >
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
