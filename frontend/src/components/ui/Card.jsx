import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  variant = 'solid', // solid, glass
  padding = 'md', // none, sm, md, lg
  hover = false,
  className = '',
  onClick,
  ...props
}) => {
  const variants = {
    solid: 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/50 shadow-sm',
    glass: 'glass dark:glass shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]',
  };

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };

  const hoverClasses = hover ? 'hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer' : '';

  const BaseTag = onClick ? motion.div : 'div';
  const motionProps = onClick ? {
    whileHover: { y: -4 },
    whileTap: { scale: 0.98 },
    onClick
  } : {};

  return (
    <BaseTag
      className={`rounded-2xl overflow-hidden ${variants[variant]} ${paddings[padding]} ${hoverClasses} ${className}`}
      {...motionProps}
      {...props}
    >
      {children}
    </BaseTag>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 pb-4 border-b border-gray-100 dark:border-slate-700/50 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-100 dark:border-slate-700/50 ${className}`}>
    {children}
  </div>
);

export default Card;
