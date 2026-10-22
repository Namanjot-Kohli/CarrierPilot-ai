import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { HiOutlineRocketLaunch } from 'react-icons/hi2';

const Login = () => {
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Left side - Illustration/Gradient */}
      <div className="hidden lg:flex w-1/2 relative bg-indigo-600 overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 opacity-90" />
        
        {/* Animated Background Elements */}
        <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-lg px-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <HiOutlineRocketLaunch className="w-7 h-7" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Guidance Pilot</span>
          </div>
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Welcome back to your career command center.
          </h1>
          <p className="text-indigo-100 text-lg leading-relaxed">
            Continue your journey of professional growth with AI-powered guidance tailored specifically for you.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold">
            G
          </div>
          <span className="font-bold tracking-tight">Guidance Pilot</span>
        </div>

        {/* Mobile background blob */}
        <div className="lg:hidden absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl top-0 right-0 -z-10" />

        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
