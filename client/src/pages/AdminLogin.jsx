// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import Button from '../components/ui/Button';

// export default function AdminLogin() {
//   const [credentials, setCredentials] = useState({ email: '', password: '' });
//   const { login } = useAuth();
//   const [error, setError] = useState(''); 
  
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     await login(credentials);
//   //   } catch (error) {
//   //     console.error('Login failed:', error);
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Clear any existing errors
    
//     try {
//         await login(credentials);
//     } catch (error) {
//         setError(error.message || 'Failed to authenticate. Please try again.');
//         console.error('Login failed:', error);
//     }
// };



//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
//             Admin Dashboard
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
//             Sign in to access the dashboard
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email" className="sr-only">Email address</label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
//                 placeholder="Email address"
//                 value={credentials.email}
//                 onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
//                 placeholder="Password"
//                 value={credentials.password}
//                 onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//               />
//             </div>
//           </div>

//           <div>
//             <Button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Sign in
//             </Button>
//           </div>
//         </form>

//         <div className="text-center mt-4">
//           <a
//             href="/"
//             className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
//           >
//             ← Back to Home
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

export default function AdminLogin() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login, isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitLoading) return;
        
        setError('');
        setSubmitLoading(true);

        try {
            await login(credentials);
        } catch (error) {
            setError(error.message);
        } finally {
            setSubmitLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Admin Dashboard
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Sign in to access the dashboard
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                                placeholder="Email address"
                                value={credentials.email}
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                disabled={submitLoading}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                                placeholder="Password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                disabled={submitLoading}
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={submitLoading}
                        >
                            {submitLoading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <a
                        href="/"
                        className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}