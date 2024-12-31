// // components/sections/Experience.jsx
// import { useState, useEffect } from 'react';
// import api from '../../utils/api';

// const Experience = () => {
//     const [experiences, setExperiences] = useState({
//         education: [],
//         work: [],
//         achievements: []
//     });
//     const [activeTab, setActiveTab] = useState('education');
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchExperiences = async () => {
//             try {
//                 setIsLoading(true);
//                 const { data } = await api.get('/experience');
//                 setExperiences(data);
//             } catch (err) {
//                 setError('Failed to load experiences');
//                 console.error('Error fetching experiences:', err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchExperiences();
//     }, []);

//     if (isLoading) return <div className="text-center py-10">Loading...</div>;
//     if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

//     return (
//         <div className="container mx-auto px-4">
//             <h2 className="text-4xl font-bold text-center mb-10">Experience</h2>
            
//             {/* Tab Navigation */}
//             <div className="flex justify-center mb-8">
//                 <div className="inline-flex rounded-lg border border-gray-200 p-1">
//                     {['education', 'work', 'achievements'].map((tab) => (
//                         <button
//                             key={tab}
//                             className={`px-4 py-2 rounded-lg ${
//                                 activeTab === tab
//                                     ? 'bg-blue-500 text-white'
//                                     : 'text-gray-600 hover:text-gray-900'
//                             }`}
//                             onClick={() => setActiveTab(tab)}
//                         >
//                             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Education Section */}
//             {activeTab === 'education' && (
//                 <div className="space-y-6">
//                     {experiences.education.map((edu) => (
//                         <div key={edu._id} className="bg-white p-6 rounded-lg shadow-md">
//                             <h3 className="text-xl font-semibold">{edu.degree}</h3>
//                             <p className="text-gray-600">{edu.school}</p>
//                             <p className="text-gray-500">{edu.fieldOfStudy}</p>
//                             <p className="text-sm text-gray-400">
//                                 {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
//                             </p>
//                             <p className="mt-2">{edu.description}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Work Section */}
//             {activeTab === 'work' && (
//                 <div className="space-y-6">
//                     {experiences.work.map((work) => (
//                         <div key={work._id} className="bg-white p-6 rounded-lg shadow-md">
//                             <h3 className="text-xl font-semibold">{work.title}</h3>
//                             <p className="text-gray-600">{work.companyName}</p>
//                             <p className="text-gray-500">{work.employmentType}</p>
//                             <p className="text-sm text-gray-400">
//                                 {new Date(work.startDate).getFullYear()} - {new Date(work.endDate).getFullYear()}
//                             </p>
//                             <p className="mt-2">{work.description}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Achievements Section */}
//             {activeTab === 'achievements' && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {experiences.achievements.map((achievement) => (
//                         <div key={achievement._id} className="bg-white p-6 rounded-lg shadow-md">
//                             {achievement.imageUrl && (
//                                 <img
//                                     src={achievement.imageUrl}
//                                     alt={achievement.title}
//                                     className="w-full h-48 object-cover rounded-lg mb-4"
//                                 />
//                             )}
//                             <h3 className="text-xl font-semibold">{achievement.title}</h3>
//                             <p className="text-gray-600">{achievement.associateWith}</p>
//                             <p className="text-gray-500">Issued by {achievement.issuer}</p>
//                             <p className="text-sm text-gray-400">
//                                 {new Date(achievement.issueDate).toLocaleDateString()}
//                             </p>
//                             <p className="mt-2">{achievement.description}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Experience;
import React from 'react';
import ExperienceTimeline from './ExperienceTimeline';

const Experience = () => {
    return (
        <section id="experience" className="bg-gray-50 dark:bg-gray-900 py-20">
            <ExperienceTimeline />
        </section>
    );
};

export default Experience;