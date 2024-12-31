import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../ui/ProjectCard';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
                
                // Process projects to ensure proper image paths
                const processedProjects = response.data.map(project => ({
                    ...project,
                    imageUrl: project.imageUrl ? (
                        project.imageUrl.startsWith('http') 
                            ? project.imageUrl 
                            : `${import.meta.env.VITE_API_URL}${project.imageUrl}`
                    ) : null
                }));
                
                setProjects(processedProjects);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setError('Failed to load projects. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        
        
    
        fetchProjects();
    }, []);

    if (isLoading) return <div className="py-20 text-center text-gray-600 dark:text-gray-300">Loading projects...</div>;
    if (error) return <div className="py-20 text-center text-red-500">{error}</div>;
    if (!projects.length) {
        return <div className="py-20 text-center text-gray-600 dark:text-gray-300">No projects available.</div>;
    }

    return (
        <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
                    Featured Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard 
                            key={project._id} 
                            project={{
                                ...project,
                                imageUrl: project.imageUrl,
                                technologies: Array.isArray(project.technologies) 
                                    ? project.technologies 
                                    : project.technologies?.split(',').map(tech => tech.trim()) || []
                            }} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;