// import { useState } from 'react';
// import { motion } from 'framer-motion';

// const ProjectCard = ({ project }) => {
//     const [imageError, setImageError] = useState(false);

//     // Fallback image URL or placeholder
//     const fallbackImage = "/api/placeholder/400/300";

//     const handleImageError = () => {
//         setImageError(true);
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
//         >
//             <div className="relative pb-[56.25%]">
//                 {!imageError && project.images && project.images.length > 0 ? (
//                     <img
//                         src={project.images[0]}
//                         alt={`${project.title || 'Project'} thumbnail`}
//                         onError={handleImageError}
//                         className="absolute top-0 left-0 w-full h-full object-cover"
//                     />
//                 ) : (
//                     <img
//                         src={fallbackImage}
//                         alt="Project placeholder"
//                         className="absolute top-0 left-0 w-full h-full object-cover"
//                     />
//                 )}
//             </div>
//             <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2 dark:text-white">
//                     {project.title || 'Untitled Project'}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 mb-4">
//                     {project.description || 'No description available'}
//                 </p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                     {Array.isArray(project.technologies) && project.technologies.map((tech, index) => (
//                         <span
//                             key={index}
//                             className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
//                         >
//                             {tech}
//                         </span>
//                     ))}
//                 </div>
//                 <div className="flex gap-4">
//                     {project.githubLink && (
//                         <a
//                             href={project.githubLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 dark:text-blue-400 hover:underline"
//                         >
//                             GitHub
//                         </a>
//                     )}
//                     {project.liveLink && (
//                         <a
//                             href={project.liveLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 dark:text-blue-400 hover:underline"
//                         >
//                             Live Demo
//                         </a>
//                     )}
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default ProjectCard;

// import { useState } from 'react';
// import { motion } from 'framer-motion';

// const ProjectCard = ({ project }) => {
//     const [imageError, setImageError] = useState(false);
//     const [imageLoaded, setImageLoaded] = useState(false);

//     const getImageUrl = (imageUrl) => {
//         if (!imageUrl) return null;
//         return imageUrl.startsWith('http') 
//             ? imageUrl 
//             : `${import.meta.env.VITE_API_URL}${imageUrl}`;
//     };

//     const handleGithubClick = (e, url) => {
//         e.stopPropagation();
//         if (url) {
//             window.open(url, '_blank', 'noopener,noreferrer');
//         }
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
//         >
//             <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden bg-gray-100 dark:bg-gray-600">
//                 {!imageError && project.imageUrl && (
//                     <>
//                         {!imageLoaded && (
//                             <div className="absolute inset-0 flex items-center justify-center">
//                                 <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                             </div>
//                         )}
//                         <img
//                             src={getImageUrl(project.imageUrl)}
//                             alt={project.title}
//                             onLoad={() => setImageLoaded(true)}
//                             onError={() => {
//                                 setImageError(true);
//                                 setImageLoaded(true);
//                             }}
//                             className={`w-full h-full object-cover transition-opacity duration-300 ${
//                                 imageLoaded ? 'opacity-100' : 'opacity-0'
//                             }`}
//                         />
//                     </>
//                 )}
//             </div>
//             <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2 dark:text-white">
//                     {project.title || 'Untitled Project'}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
//                     {project.description || 'No description available'}
//                 </p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                     {Array.isArray(project.technologies) && project.technologies.map((tech, index) => (
//                         <span
//                             key={index}
//                             className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
//                         >
//                             {tech}
//                         </span>
//                     ))}
//                 </div>
//                 {project.githubLink && (
//                     <button
//                         onClick={(e) => handleGithubClick(e, project.githubLink)}
//                         className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
//                     >
//                         View on GitHub
//                     </button>
//                 )}
//             </div>
//         </motion.div>
//     );
// };

// export default ProjectCard;
        
import { useState } from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return '/api/placeholder/400/300';
        
        // If it's already a full URL, return as is
        if (imageUrl.startsWith('http')) return imageUrl;
        
        // If it's a relative path, ensure it starts with a slash
        const normalizedPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
        
        // Combine with API URL
        return `${import.meta.env.VITE_API_URL}${normalizedPath}`;
    };
     

    const handleGithubClick = (e, url) => {
        e.stopPropagation();
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
        >
            <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden bg-gray-100 dark:bg-gray-600">
                {!imageError ? (
                    <>
                        {!imageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                        <img
                            src={getImageUrl(project.imageUrl)}
                            alt={project.title}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => {
                                setImageError(true);
                                setImageLoaded(true);
                            }}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                                imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    </>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                        <span className="text-gray-500 dark:text-gray-400">No image available</span>
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                    {project.title || 'Untitled Project'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description || 'No description available'}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(project.technologies) && project.technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                {project.githubLink && (
                    <button
                        onClick={(e) => handleGithubClick(e, project.githubLink)}
                        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                        View on GitHub
                    </button>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectCard;