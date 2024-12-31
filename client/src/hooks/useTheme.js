// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleTheme, setTheme, selectTheme } from '../features/theme/themeSlice';

// export const useTheme = () => {
//     const dispatch = useDispatch();
//     const theme = useSelector(selectTheme);

//     useEffect(() => {
//         const root = document.documentElement;
//         root.setAttribute('data-theme', theme);
//         localStorage.setItem('theme', theme);
//     }, [theme]);

//     return {
//         theme,
//         toggleTheme: () => dispatch(toggleTheme()),
//         setTheme: (newTheme) => dispatch(setTheme(newTheme))
//     };
// };

// src/hooks/useTheme.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, selectTheme } from '../features/theme/themeSlice';

export const useTheme = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return {
        theme,
        toggleTheme: () => dispatch(toggleTheme())
    };
};