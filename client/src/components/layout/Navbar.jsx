import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from '../ui/ThemeToggle';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { theme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', icon: '🏠', label: 'Home' },
    { id: 'about', icon: '🎯', label: 'About' },
    { id: 'projects', icon: '💼', label: 'Projects' },
    { id: 'contact', icon: '📧', label: 'Contact' }
  ];

  return (
    <nav className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-[95%] sm:w-auto">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg 
                    px-3 sm:px-4 md:px-6 py-2 sm:py-3">
        <ul className="flex items-center justify-between sm:justify-center gap-3 sm:gap-6 md:gap-8">
          {navItems.map(({ id, icon, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative p-1.5 sm:p-2 block transition-colors group`}
              >
                <span className={`block text-base sm:text-lg md:text-xl
                  ${activeSection === id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                  }`}
                >
                  {icon}
                </span>
                
                <span className="hidden sm:block absolute -bottom-4 left-1/2 transform -translate-x-1/2 
                               text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 
                               transition-opacity whitespace-nowrap">
                  {label}
                </span>
                
                {activeSection === id && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                                 w-1 sm:w-1.5 h-1 sm:h-1.5 
                                 bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </a>
            </li>
          ))}
          <li className="ml-1 sm:ml-2">
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;