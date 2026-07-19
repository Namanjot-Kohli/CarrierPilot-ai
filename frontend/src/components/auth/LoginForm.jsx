import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineEnvelope, HiOutlineLockClosed } from 'react-icons/hi2';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { validateEmail, validatePassword } from '../../utils/validators';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    const emailError = validateEmail(email);
    if (emailError) {
      newErrors.email = emailError;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login(email, password);
      addToast('Logged in successfully', 'success');
      navigate('/dashboard');
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Login failed';
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 dark:border-slate-700/50 max-w-md w-full"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Sign in to continue your career journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          icon={<HiOutlineEnvelope className="w-5 h-5" />}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          icon={<HiOutlineLockClosed className="w-5 h-5" />}
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={loading}
          disabled={loading}
        >
          Sign In
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          Sign up
        </Link>
      </div>
    </motion.div>
  );
};

export default LoginForm;