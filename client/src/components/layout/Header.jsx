import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const { theme } = useTheme();
  const scrollPosition = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
  ];

  return (
    <header className="relative w-full z-50">
      {/* Main header content with direct blur effect */}
      <div className={`w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-all duration-300 ${
        scrollPosition > 50 ? 'shadow-lg' : ''
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Updated Logo Section */}
            <a 
              href="/" 
              className="flex items-center gap-2 sm:gap-3"
            >
             <img 
  src={logo} 
  alt="Logo" 
  className="w-11 h-11 sm:w-14 sm:h-14 object-contain" 
/>

              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SARTHAK LAD
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm xl:text-base"
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="#contact" 
                className="px-4 py-2 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white transition-colors text-sm xl:text-base"
              >
                Contact
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg 
                className="w-6 h-6 text-gray-800 dark:text-gray-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden">
              <nav className="py-4 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a 
                  href="#contact" 
                  className="block px-4 py-2 mt-4 text-center rounded-full bg-blue-600/90 hover:bg-blue-600 text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Full screen mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md lg:hidden">
          {/* This empty div maintains the full-screen overlay */}
        </div>
      )}
    </header>
  );
};

export default Header;