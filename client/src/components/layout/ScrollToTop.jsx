import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    // Show button when page is scrolled up to given distance
    setIsVisible(scrollPosition > 300);
  }, [scrollPosition]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed
        bottom-8
        right-8
        p-3
        bg-blue-600
        dark:bg-blue-500
        text-white
        rounded-full
        shadow-lg
        hover:bg-blue-700
        dark:hover:bg-blue-600
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2
        transition-all
        duration-300
        z-50
        ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
      `}
    >
      <ArrowUpIcon className="h-6 w-6" />
    </button>
  );
};

export default ScrollToTop;