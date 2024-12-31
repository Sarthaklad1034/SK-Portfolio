

// import React, { useState, useEffect } from 'react';
// import api from '../../utils/api';

// const ExperienceTimeline = () => {
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
//                 // Sort each array by date in descending order
//                 const sortedData = {
//                     education: data.education.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)),
//                     work: data.work.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)),
//                     achievements: data.achievements.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
//                 };
//                 setExperiences(sortedData);
//             } catch (err) {
//                 setError('Failed to load experiences');
//                 console.error('Error fetching experiences:', err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchExperiences();
//     }, []);

//     const formatDate = (date) => {
//         return new Date(date).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long'
//         });
//     };

//     if (isLoading) return <div className="text-center py-10">Loading...</div>;
//     if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

//     return (
//         <div className="container mx-auto px-4 py-16">
//             <div className="text-center mb-12">
//                 <h2 className="text-4xl font-bold mb-4 dark:text-white">Experience & Education</h2>
//                 <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//                     My professional journey and educational background
//                 </p>
//             </div>

//             <div className="flex justify-center mb-12">
//                 <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
//                     {['education', 'work', 'achievements'].map((tab) => (
//                         <button
//                             key={tab}
//                             onClick={() => setActiveTab(tab)}
//                             className={`px-6 py-2 rounded-lg transition-all duration-200 ${
//                                 activeTab === tab
//                                     ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
//                                     : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
//                             }`}
//                         >
//                             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             <div className="max-w-6xl mx-auto relative">
//                 <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />

//                 <div className="space-y-12">
//                     {experiences[activeTab]?.map((item, index) => (
//                         <div key={item._id} className="flex flex-col md:flex-row items-center">
//                             <div className="w-full md:w-1/2 pr-8 pl-4">
//                                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg
//                                     transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
//                                     <h3 className="text-xl font-bold mb-2 dark:text-white">
//                                         {activeTab === 'education' ? item.degree :
//                                          activeTab === 'work' ? item.title :
//                                          item.title}
//                                     </h3>
//                                     <p className="text-gray-600 dark:text-gray-400 mb-2">
//                                         {activeTab === 'education' ? item.school :
//                                          activeTab === 'work' ? item.companyName :
//                                          item.associateWith}
//                                     </p>
//                                     {activeTab === 'education' && (
//                                         <p className="text-gray-500 dark:text-gray-400 mb-2">
//                                             Field of Study: {item.fieldOfStudy}
//                                         </p>
//                                     )}
//                                     {activeTab === 'work' && (
//                                         <p className="text-gray-500 dark:text-gray-400 mb-2">
//                                             {item.employmentType}
//                                         </p>
//                                     )}
//                                     {activeTab === 'achievements' && (
//                                         <p className="text-gray-500 dark:text-gray-400 mb-2">
//                                             Issued by: {item.issuer}
//                                         </p>
//                                     )}
//                                     <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
//                                         {activeTab === 'achievements' 
//                                             ? formatDate(item.issueDate)
//                                             : `${formatDate(item.startDate)} - ${
//                                                 item.endDate ? formatDate(item.endDate) : 'Present'
//                                             }`}
//                                     </p>
//                                     {item.description && (
//                                         <p className="text-gray-700 dark:text-gray-300">
//                                             {item.description}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 absolute left-1/2 transform -translate-x-1/2" />

//                             <div className="w-full md:w-1/2 pl-8 pr-4">
//                                 {activeTab === 'achievements' && item.imageUrl && (
//                                     <div className="h-48 rounded-lg overflow-hidden shadow-lg">
//                                         <img
//                                             src={item.imageUrl}
//                                             alt={item.title}
//                                             className="w-full h-full object-cover"
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ExperienceTimeline;

import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const ExperienceTimeline = () => {
    const [experiences, setExperiences] = useState({
        education: [],
        work: [],
        achievements: []
    });
    const [activeTab, setActiveTab] = useState('education');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                setIsLoading(true);
                const { data } = await api.get('/experience');
                const sortedData = {
                    education: data.education.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)),
                    work: data.work.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)),
                    achievements: data.achievements.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
                };
                setExperiences(sortedData);
            } catch (err) {
                setError('Failed to load experiences');
                console.error('Error fetching experiences:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 dark:text-white">Experience & Education</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    My professional journey and educational background
                </p>
            </div>

            <div className="flex justify-center mb-12">
                <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    {['education', 'work', 'achievements'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                                activeTab === tab
                                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-6xl mx-auto relative px-4 sm:px-6 lg:px-8">
  {/* Vertical Timeline Line */}
  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />

  <div className="space-y-12 sm:space-y-16">
    {experiences[activeTab]?.map((item, index) => (
      <div key={item._id} className="relative">
        {/* Timeline Node */}
        <div 
          className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white dark:border-gray-900 z-10
            ${index % 4 === 0 ? 'bg-red-500' :
              index % 4 === 1 ? 'bg-green-500' :
              index % 4 === 2 ? 'bg-purple-500' :
              'bg-yellow-500'}`} 
        />

        {/* Content Card */}
        <div className={`flex flex-col md:flex-row items-center gap-3 sm:gap-4
          ${index % 2 === 0 
            ? 'md:pr-[53%] md:text-right' 
            : 'md:pl-[53%] md:flex-row-reverse md:text-left'}`}>
          
          {/* Data Section */}
          <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 
            transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl 
            text-left md:text-inherit">

            <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1.5 sm:mb-2 dark:text-white line-clamp-2">
              {activeTab === 'education' ? item.degree :
               activeTab === 'work' ? item.title :
               item.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-1.5 sm:mb-2 line-clamp-1">
              {activeTab === 'education' ? item.school :
               activeTab === 'work' ? item.companyName :
               item.associateWith}
            </p>
            
            {activeTab === 'education' && item.fieldOfStudy && (
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1.5 sm:mb-2 line-clamp-1">
                Branch : {item.fieldOfStudy}
              </p>
            )}

            {activeTab === 'work' && (
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1.5 sm:mb-2 line-clamp-1">
                {item.employmentType}
              </p>
            )}
            
            {activeTab === 'achievements' && (
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1.5 sm:mb-2 line-clamp-1">
                Issued by: {item.issuer}
              </p>
            )}
            
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mb-1.5 sm:mb-2">
              {activeTab === 'achievements' 
                ? formatDate(item.issueDate)
                : `${formatDate(item.startDate)} - ${
                    item.endDate ? formatDate(item.endDate) : 'Present'
                  }`}
            </p>
            
            {item.description && (
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-3 sm:line-clamp-4">
                {item.description}
              </p>
            )}
          </div>

          {/* Image Section */}
          {item.imageUrl && (
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex-shrink-0">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
        </div>
    );
};

export default ExperienceTimeline;