// useAuth.js
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { logout } from '../features/auth/authSlice';

// export const useAuth = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

//     const handleLogout = () => {
//         dispatch(logout());
//         navigate('/');
//     };

//     return {
//         user,
//         isAuthenticated,
//         loading,
//         logout: handleLogout,
//     };
// };

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const useAuth = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         setIsAuthenticated(!!token);
//     }, []);

//     const login = async(credentials) => {
//         try {
//             // Use the full URL of your backend server
//             const response = await fetch('http://localhost:3000/api/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // Include CORS headers if needed
//                     'Accept': 'application/json'
//                 },
//                 credentials: 'include', // Include cookies if using sessions
//                 body: JSON.stringify(credentials),
//             });

//             let data;
//             const contentType = response.headers.get('content-type');
//             if (contentType && contentType.includes('application/json')) {
//                 data = await response.json();
//             } else {
//                 data = { message: await response.text() };
//             }

//             if (!response.ok) {
//                 throw new Error(data.message || 'Authentication failed');
//             }

//             // Only proceed if we haven't thrown an error
//             localStorage.setItem('token', data.token);
//             setIsAuthenticated(true);
//             navigate('/admin/dashboard');

//             return data;
//         } catch (error) {
//             console.error('Login error:', error.message);
//             throw new Error(error.message || 'Authentication failed');
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         setIsAuthenticated(false);
//         navigate('/admin/login');
//     };

//     return { isAuthenticated, login, logout };
// };

// client/src/hooks/useAuth.js
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../utils/api'; // Import the api utility

// export const useAuth = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Check token on mount
//         const token = localStorage.getItem('token');
//         if (token) {
//             setIsAuthenticated(true);
//             // Optionally verify token validity here
//         }
//     }, []);

//     const login = async(credentials) => {
//         try {
//             const { data } = await api.post('/auth/login', credentials);

//             if (data.token) {
//                 localStorage.setItem('token', data.token);
//                 if (data.user) {
//                     setUser(data.user);
//                 }
//                 setIsAuthenticated(true);
//                 return data;
//             } else {
//                 throw new Error('No token received from server');
//             }
//         } catch (error) {
//             if (error.code === 'ERR_NETWORK') {
//                 throw new Error('Unable to connect to the server. Please check if the server is running.');
//             }
//             throw new Error(error.message || 'Authentication failed');
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         setUser(null);
//         setIsAuthenticated(false);
//         navigate('/admin/login');
//     };

//     // Verify token validity
//     const checkAuth = async() => {
//         try {
//             const { data } = await api.get('/auth/verify');
//             setIsAuthenticated(true);
//             setUser(data.user);
//         } catch (error) {
//             logout();
//         }
//     };

//     return {
//         isAuthenticated,
//         user,
//         login,
//         logout,
//         checkAuth
//     };
// };

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const checkAuth = useCallback(async() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoading(false);
            setIsAuthenticated(false);
            setUser(null);
            return false;
        }

        try {
            const { data } = await api.get('/auth/verify');
            setUser(data.user);
            setIsAuthenticated(true);
            setIsLoading(false);
            return true;
        } catch (error) {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
            setIsLoading(false);
            return false;
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const login = async(credentials) => {
        try {
            setIsLoading(true);
            const { data } = await api.post('/auth/login', credentials);

            if (data.token) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                setIsAuthenticated(true);
                navigate('/admin/dashboard', { replace: true });
                return data;
            } else {
                throw new Error('No token received from server');
            }
        } catch (error) {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
            if (error.response && error.response.status === 400) {
                throw new Error('Invalid credentials');
            }
            if (error.code === 'ERR_NETWORK') {
                throw new Error('Unable to connect to the server. Please check if the server is running.');
            }
            throw new Error(error.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/admin/login', { replace: true });
    }, [navigate]);

    return {
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        checkAuth
    };
};