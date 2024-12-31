// import React from 'react';
// import { useTheme } from '../../hooks/useTheme';

// const ThemeToggle = ({ className = '' }) => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <button
//       onClick={toggleTheme}
//       className={`relative inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${className}`}
//       aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
//     >
//       <svg
//         className={`h-5 w-5 transform transition-transform duration-500 ${
//           theme === 'dark' ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
//         }`}
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         aria-hidden="true"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
//         />
//       </svg>

//       <svg
//         className={`absolute h-5 w-5 transform transition-transform duration-500 ${
//           theme === 'dark' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
//         }`}
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         aria-hidden="true"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
//         />
//       </svg>
//     </button>
//   );
// };

// export default ThemeToggle;

// src/components/ui/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-md p-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      ) : (
        <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      )}
    </button>
  );
};

export default ThemeToggle;