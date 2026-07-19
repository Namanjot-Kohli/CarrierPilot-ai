import React from 'react';
import { motion } from 'framer-motion';
import { CgSpinner } from 'react-icons/cg';

const variants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm border-transparent',
  secondary: 'bg-transparent border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30',
  ghost: 'bg-transparent border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800',
  danger: 'bg-rose-500 text-white hover:bg-rose-600 border-transparent',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-60 disabled:cursor-not-allowed';
  
  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={isDisabled || isLoading}
      whileHover={isDisabled || isLoading ? {} : { scale: 1.02, y: -1 }}
      whileTap={isDisabled || isLoading ? {} : { scale: 0.98 }}
      onClick={onClick}
      {...props}
    >
      {isLoading && <CgSpinner className="animate-spin -ml-1 mr-2 h-5 w-5" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  );
};

export default Button;
