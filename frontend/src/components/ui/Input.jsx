import React, { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

export const Input = React.forwardRef(({
  label,
  error,
  leftIcon,
  type = 'text',
  className = '',
  fullWidth = true,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const wrapperClasses = `${fullWidth ? 'w-full' : ''} mb-4`;
  const baseInputClasses = 'w-full rounded-xl border bg-white dark:bg-slate-900 px-4 py-2.5 text-sm transition-all duration-300 focus:outline-none focus:ring-2 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100';
  
  const errorClasses = error 
    ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' 
    : 'border-gray-300 dark:border-slate-700 focus:border-primary-500 focus:ring-primary-500/20';

  const iconPadding = leftIcon ? 'pl-10' : '';
  const pwdPadding = isPassword ? 'pr-10' : '';

  if (type === 'textarea') {
    return (
      <div className={wrapperClasses}>
        {label && <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
        <div className="relative">
          <textarea
            ref={ref}
            className={`${baseInputClasses} ${errorClasses} min-h-[100px] ${className}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-rose-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      {label && <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-gray-400 dark:text-gray-500">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          type={inputType}
          className={`${baseInputClasses} ${errorClasses} ${iconPadding} ${pwdPadding} ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-rose-500">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
