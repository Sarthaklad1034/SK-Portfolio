// import React, { useState, useEffect } from 'react';
// import api from '../../utils/api';

// const ProjectManager = () => {
//     const [projects, setProjects] = useState([]);
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         technologies: '',
//         imageUrl: '',
//         githubLink: '',
//         featured: false
//     });
//     const [editingId, setEditingId] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchProjects();
//     }, []);

//     const fetchProjects = async () => {
//         try {
//             setIsLoading(true);
//             const { data } = await api.get('/projects');
//             setProjects(data);
//             setError(null);
//         } catch (error) {
//             setError(error.response?.data?.message || 'Error fetching projects');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     setIsLoading(true);
//     //     setError(null);

//     //     try {
//     //         const projectData = {
//     //             ...formData,
//     //             imageUrl: formData.imageUrl.startsWith('http') 
//     //                 ? formData.imageUrl 
//     //                 : formData.imageUrl
//     //         };

//     //         if (editingId) {
//     //             await api.put(`/projects/${editingId}`, projectData);
//     //         } else {
//     //             await api.post('/projects', projectData);
//     //         }

//     //         setFormData({
//     //             title: '',
//     //             description: '',
//     //             technologies: '',
//     //             imageUrl: '',
//     //             githubLink: '',
//     //             featured: false
//     //         });
//     //         setEditingId(null);
//     //         await fetchProjects();
//     //     } catch (error) {
//     //         setError(error.response?.data?.message || 'Error saving project');
//     //     } finally {
//     //         setIsLoading(false);
//     //     }
//     // };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError(null);
    
//         try {
//             const projectData = {
//                 ...formData,
//                 imageUrl: formData.imageUrl.startsWith('http') 
//                     ? formData.imageUrl 
//                     : `/uploads/images/${formData.imageUrl}` // Ensure proper path format
//             };
    
//             if (editingId) {
//                 await api.put(`/projects/${editingId}`, projectData);
//             } else {
//                 await api.post('/projects', projectData);
//             }
    
//             setFormData({
//                 title: '',
//                 description: '',
//                 technologies: '',
//                 imageUrl: '',
//                 githubLink: '',
//                 featured: false
//             });
//             setEditingId(null);
//             await fetchProjects();
//         } catch (error) {
//             setError(error.response?.data?.message || 'Error saving project');
//         } finally {
//             setIsLoading(false);
//         }
//     };
    

//     const handleEdit = (project) => {
//         setFormData({
//             title: project.title,
//             description: project.description,
//             technologies: Array.isArray(project.technologies) 
//                 ? project.technologies.join(', ') 
//                 : project.technologies,
//             imageUrl: project.imageUrl.replace('/uploads/images/', ''),
//             githubLink: project.githubLink || '',
//             featured: project.featured || false
//         });
//         setEditingId(project._id);
//     };

//     const handleDelete = async (projectId) => {
//         if (!window.confirm('Are you sure you want to delete this project?')) {
//             return;
//         }

//         try {
//             setIsLoading(true);
//             await api.delete(`/projects/${projectId}`);
//             await fetchProjects();
//         } catch (error) {
//             setError(error.response?.data?.message || 'Error deleting project');
//         } finally {
//             setIsLoading(false);
//         }
//     };


//     return (
//         <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                 Project Manager
//             </h2>

//             {error && (
//                 <div className="p-4 text-red-700 bg-red-100 rounded-lg">
//                     {error}
//                 </div>
//             )}

//             {isLoading && (
//                 <div className="text-center py-4">
//                     Loading...
//                 </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <input
//                         type="text"
//                         placeholder="Project Title"
//                         value={formData.title}
//                         onChange={(e) => setFormData({...formData, title: e.target.value})}
//                         className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
//                         required
//                     />
//                 </div>
                
//                 <div>
//                     <textarea
//                         placeholder="Project Description"
//                         value={formData.description}
//                         onChange={(e) => setFormData({...formData, description: e.target.value})}
//                         className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
//                         rows="4"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <input
//                         type="text"
//                         placeholder="Technologies (comma-separated)"
//                         value={formData.technologies}
//                         onChange={(e) => setFormData({...formData, technologies: e.target.value})}
//                         className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
//                         required
//                     />
//                 </div>

//                 <input
//                     type="url"
//                     placeholder="Image URL"
//                     value={formData.imageUrl}
//                     onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
//                     className="w-full px-4 py-2 border rounded"
//                     required
//                 />

//                 <div>
//                     <input
//                         type="url"
//                         placeholder="GitHub URL"
//                         value={formData.githubUrl}
//                         onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
//                         className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
//                     />
//                 </div>

//                 <div className="flex items-center">
//                     <input
//                         type="checkbox"
//                         checked={formData.featured}
//                         onChange={(e) => setFormData({...formData, featured: e.target.checked})}
//                         className="mr-2"
//                     />
//                     <label className="text-gray-700 dark:text-gray-300">Featured Project</label>
//                 </div>

//                 <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
//                 >
//                     {isLoading ? 'Processing...' : (editingId ? 'Update Project' : 'Add Project')}
//                 </button>
//             </form>

//             <div className="mt-8 space-y-4">
//             {projects.map((project) => (
//   <div 
//     key={project._id} 
//     className="p-3 sm:p-4 border rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
//   >
//     <div className="flex flex-col sm:flex-row sm:items-start gap-4">
//       {project.imageUrl && (
//         <div className="w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
//           <img
//             src={project.imageUrl.startsWith('http')
//               ? project.imageUrl
//               : `${import.meta.env.VITE_API_URL}${project.imageUrl}`}
//             alt={project.title}
//             className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded shadow-sm hover:shadow-md transition-shadow"
//           />
//         </div>
//       )}
//       <div className="flex-1 min-w-0">
//         <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white break-words">
//           {project.title}
//         </h3>
//         <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-3 sm:line-clamp-2">
//           {project.description}
//         </p>
//         <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
//           <button
//             onClick={() => handleEdit(project)}
//             disabled={isLoading}
//             className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-blue-600 border border-blue-600 rounded-lg 
//                      hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-blue-400 dark:border-blue-400 
//                      disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => handleDelete(project._id)}
//             disabled={isLoading}
//             className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-red-600 border border-red-600 rounded-lg 
//                      hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-400 dark:border-red-400 
//                      disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// ))}
//             </div>
//         </div>
//     );
// };

// export default ProjectManager;

import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: '',
        imageUrl: '',
        githubLink: '',  // Changed from githubUrl to githubLink
        featured: false
    });
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            const { data } = await api.get('/projects');
            setProjects(data);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || 'Error fetching projects');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
    
        try {
            const projectData = {
                ...formData,
                imageUrl: formData.imageUrl.startsWith('http') 
                    ? formData.imageUrl 
                    : `/uploads/images/${formData.imageUrl}`
            };
    
            if (editingId) {
                await api.put(`/projects/${editingId}`, projectData);
            } else {
                await api.post('/projects', projectData);
            }
    
            setFormData({
                title: '',
                description: '',
                technologies: '',
                imageUrl: '',
                githubLink: '',  // Changed from githubUrl to githubLink
                featured: false
            });
            setEditingId(null);
            await fetchProjects();
        } catch (error) {
            setError(error.response?.data?.message || 'Error saving project');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleEdit = (project) => {
        setFormData({
            title: project.title,
            description: project.description,
            technologies: Array.isArray(project.technologies) 
                ? project.technologies.join(', ') 
                : project.technologies,
            imageUrl: project.imageUrl.replace('/uploads/images/', ''),
            githubLink: project.githubLink || '',  // Changed from githubUrl to githubLink
            featured: project.featured || false
        });
        setEditingId(project._id);
    };

    const handleDelete = async (projectId) => {
        if (!window.confirm('Are you sure you want to delete this project?')) {
            return;
        }

        try {
            setIsLoading(true);
            await api.delete(`/projects/${projectId}`);
            await fetchProjects();
        } catch (error) {
            setError(error.response?.data?.message || 'Error deleting project');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Project Manager
            </h2>

            {error && (
                <div className="p-4 text-red-700 bg-red-100 rounded-lg">
                    {error}
                </div>
            )}

            {isLoading && (
                <div className="text-center py-4">
                    Loading...
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Project Title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        required
                    />
                </div>
                
                <div>
                    <textarea
                        placeholder="Project Description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        rows="4"
                        required
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Technologies (comma-separated)"
                        value={formData.technologies}
                        onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        required
                    />
                </div>

                <input
                    type="url"
                    placeholder="Image URL"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full px-4 py-2 border rounded"
                    required
                />

                <div>
                    <input
                        type="url"
                        placeholder="GitHub URL"
                        value={formData.githubLink}  // Changed from githubUrl to githubLink
                        onChange={(e) => setFormData({...formData, githubLink: e.target.value})}  // Changed from githubUrl to githubLink
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        className="mr-2"
                    />
                    <label className="text-gray-700 dark:text-gray-300">Featured Project</label>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                >
                    {isLoading ? 'Processing...' : (editingId ? 'Update Project' : 'Add Project')}
                </button>
            </form>

            <div className="mt-8 space-y-4">
                {projects.map((project) => (
                    <div 
                        key={project._id} 
                        className="p-3 sm:p-4 border rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                            {project.imageUrl && (
                                <div className="w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
                                    <img
                                        src={project.imageUrl.startsWith('http')
                                            ? project.imageUrl
                                            : `${import.meta.env.VITE_API_URL}${project.imageUrl}`}
                                        alt={project.title}
                                        className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded shadow-sm hover:shadow-md transition-shadow"
                                    />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white break-words">
                                    {project.title}
                                </h3>
                                <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-3 sm:line-clamp-2">
                                    {project.description}
                                </p>
                                <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        disabled={isLoading}
                                        className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-blue-600 border border-blue-600 rounded-lg 
                                                hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-blue-400 dark:border-blue-400 
                                                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        disabled={isLoading}
                                        className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-red-600 border border-red-600 rounded-lg 
                                                hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-400 dark:border-red-400 
                                                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectManager;