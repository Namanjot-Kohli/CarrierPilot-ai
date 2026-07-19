import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineHome, HiOutlineChatBubbleLeftRight, HiOutlineMap, HiOutlineStar, HiOutlineUser, HiOutlinePlus } from 'react-icons/hi2';
import { Button } from './Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { getInitials, getAvatarColor } from '../../utils/formatters.js';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <HiOutlineHome size={20} /> },
    { path: '/chat', label: 'AI Assistant', icon: <HiOutlineChatBubbleLeftRight size={20} /> },
    { path: '/roadmaps', label: 'Roadmaps', icon: <HiOutlineMap size={20} /> },
    { path: '/recommendations', label: 'Recommendations', icon: <HiOutlineStar size={20} /> },
    { path: '/profile', label: 'Profile', icon: <HiOutlineUser size={20} /> },
  ];

  const sidebarClasses = `fixed inset-y-0 left-0 z-40 w-64 glass dark:glass border-r border-gray-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-shrink-0 flex flex-col bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  }`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside className={sidebarClasses}>
        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
          <Button 
            fullWidth 
            variant="primary" 
            leftIcon={<HiOutlinePlus size={20} />}
            className="mb-6 shadow-glow"
            onClick={() => { navigate('/chat'); onClose?.(); }}
          >
            New Chat
          </Button>

          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {user && (
          <div className="p-4 border-t border-gray-100 dark:border-slate-800/80">
            <div 
              className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer group"
              onClick={() => { navigate('/profile'); onClose?.(); }}
              title="Go to Profile"
            >
              <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold shadow-sm ring-2 ring-white dark:ring-slate-900 ${getAvatarColor(user.name)}`}>
                {getInitials(user.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
