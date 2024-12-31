// import { createSlice } from '@reduxjs/toolkit';

// const getInitialTheme = () => {
//     if (typeof window === 'undefined') return 'light';
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) return savedTheme;
//     return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
// };

// const initialState = {
//     theme: getInitialTheme(),
//     isLoaded: false,
//     customColors: {
//         primary: '#3B82F6',
//         secondary: '#10B981',
//         accent: '#8B5CF6'
//     }
// };

// const themeSlice = createSlice({
//     name: 'theme',
//     initialState,
//     reducers: {
//         toggleTheme: (state) => {
//             state.theme = state.theme === 'light' ? 'dark' : 'light';
//             localStorage.setItem('theme', state.theme);
//         },
//         setTheme: (state, action) => {
//             state.theme = action.payload;
//             localStorage.setItem('theme', action.payload);
//         },
//         setIsLoaded: (state, action) => {
//             state.isLoaded = action.payload;
//         },
//         updateCustomColors: (state, action) => {
//             state.customColors = {...state.customColors, ...action.payload };
//         }
//     }
// });

// export const { toggleTheme, setTheme, setIsLoaded, updateCustomColors } = themeSlice.actions;
// export const selectTheme = (state) => state.theme.theme;
// export const selectIsThemeLoaded = (state) => state.theme.isLoaded;
// export const selectCustomColors = (state) => state.theme.customColors;
// export default themeSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('theme') || 'light';
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        mode: getInitialTheme(),
    },
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.mode);
        }
    }
});

export const { toggleTheme } = themeSlice.actions;
export const selectTheme = (state) => state.theme.mode;
export default themeSlice.reducer;