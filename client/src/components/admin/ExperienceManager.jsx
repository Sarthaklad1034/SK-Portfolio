// // components/admin/ExperienceManager.jsx
// import React, { useState, useEffect } from 'react';
// import api from '../../utils/api';

// const ExperienceManager = () => {
//     const [experiences, setExperiences] = useState({
//         education: [],
//         work: [],
//         achievements: []
//     });
//     const [activeTab, setActiveTab] = useState('education');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [formData, setFormData] = useState({
//         education: {
//             degree: '',
//             school: '',
//             fieldOfStudy: '',
//             startDate: '',
//             endDate: '',
//             description: ''
//         },
//         work: {
//             title: '',
//             employmentType: 'Full-time',
//             companyName: '',
//             startDate: '',
//             endDate: '',
//             description: ''
//         },
//         achievement: {
//             title: '',
//             associateWith: '',
//             issuer: '',
//             issueDate: '',
//             description: '',
//             imageUrl: ''
//         }
//     });
//     const [editingId, setEditingId] = useState(null);

//     useEffect(() => {
//         fetchExperiences();
//     }, []);

//     const fetchExperiences = async () => {
//         try {
//             setIsLoading(true);
//             const { data } = await api.get('/experience');
//             setExperiences(data);
//             setError(null);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Error fetching experiences');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError(null);

//         try {
//             const type = activeTab === 'achievements' ? 'achievement' : activeTab;
//             const data = formData[type];

//             if (editingId) {
//                 await api.put(`/experience/${type}/${editingId}`, data);
//             } else {
//                 await api.post(`/experience/${type}`, data);
//             }

//             // Reset form and refresh data
//             setFormData({
//                 ...formData,
//                 [type]: getEmptyForm(type)
//             });
//             setEditingId(null);
//             await fetchExperiences();
//         } catch (err) {
//             setError(err.response?.data?.message || 'Error saving experience');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this item?')) return;

//         try {
//             setIsLoading(true);
//             const type = activeTab === 'achievements' ? 'achievement' : activeTab;
//             await api.delete(`/experience/${type}/${id}`);
//             await fetchExperiences();
//         } catch (err) {
//             setError(err.response?.data?.message || 'Error deleting experience');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleEdit = (item) => {
//         const type = activeTab === 'achievements' ? 'achievement' : activeTab;
//         setFormData({
//             ...formData,
//             [type]: {
//                 ...item,
//                 startDate: item.startDate?.split('T')[0],
//                 endDate: item.endDate?.split('T')[0],
//                 issueDate: item.issueDate?.split('T')[0]
//             }
//         });
//         setEditingId(item._id);
//     };

//     const getEmptyForm = (type) => {
//         const emptyForms = {
//             education: {
//                 degree: '',
//                 school: '',
//                 fieldOfStudy: '',
//                 startDate: '',
//                 endDate: '',
//                 description: ''
//             },
//             work: {
//                 title: '',
//                 employmentType: 'Full-time',
//                 companyName: '',
//                 startDate: '',
//                 endDate: '',
//                 description: ''
//             },
//             achievement: {
//                 title: '',
//                 associateWith: '',
//                 issuer: '',
//                 issueDate: '',
//                 description: '',
//                 imageUrl: ''
//             }
//         };
//         return emptyForms[type];
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h2 className="text-2xl font-bold mb-6">Experience Manager</h2>
            
//             {error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                     {error}
//                 </div>
//             )}

//             <div className="mb-6">
//                 <div className="flex space-x-4">
//                     {['education', 'work', 'achievements'].map((tab) => (
//                         <button
//                             key={tab}
//                             onClick={() => setActiveTab(tab)}
//                             className={`px-4 py-2 rounded ${
//                                 activeTab === tab
//                                     ? 'bg-blue-500 text-white'
//                                     : 'bg-gray-200 text-gray-700'
//                             }`}
//                         >
//                             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             <form onSubmit={handleSubmit} className="mb-8">
//                 {activeTab === 'education' && (
//                     <div className="space-y-4">
//                         <input
//                             type="text"
//                             placeholder="Degree"
//                             value={formData.education.degree}
//                             onChange={(e) => setFormData({
//                                 ...formData,
//                                 education: { ...formData.education, degree: e.target.value }
//                             })}
//                             className="w-full p-2 border rounded"
//                             required
//                         />
//                         <input
//                             type="text"
//                             placeholder="School"
//                             value={formData.education.school}
//                             onChange={(e) => setFormData({
//                                 ...formData,
//                                 education: { ...formData.education, school: e.target.value }
//                             })}
//                             className="w-full p-2 border rounded"
//                             required
//                         />
//                         <input
//                             type="text"
//                             placeholder="Field of Study"
//                             value={formData.education.fieldOfStudy}
//                             onChange={(e) => setFormData({
//                                 ...formData,
//                                 education: { ...formData.education, fieldOfStudy: e.target.value }
//                             })}
//                             className="w-full p-2 border rounded"
//                             required
//                         />
//                         <div className="grid grid-cols-2 gap-4">
//                             <input
//                                 type="date"
//                                 value={formData.education.startDate}
//                                 onChange={(e) => setFormData({
//                                     ...formData,
//                                     education: { ...formData.education, startDate: e.target.value }
//                                 })}
//                                 className="w-full p-2 border rounded"
//                                 required
//                             />
//                             <input
//                                 type="date"
//                                 value={formData.education.endDate}
//                                 onChange={(e) => setFormData({
//                                     ...formData,
//                                     education: { ...formData.education, endDate: e.target.value }
//                                 })}
//                                 className="w-full p-2 border rounded"
//                                 required
//                             />
//                         </div>
//                         <textarea
//                             placeholder="Description"
//                             value={formData.education.description}
//                             onChange={(e) => setFormData({
//                                 ...formData,
//                                 education: { ...formData.education, description: e.target.value }
//                             })}
//                             className="w-full p-2 border rounded"
//                             rows="4"
//                             required
//                         />
//                     </div>
//                 )}

//                 {/* Similar form sections for work and achievements... */}
             
                
//                 <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
//                 >
//                     {isLoading ? 'Saving...' : (editingId ? 'Update' : 'Add')}
//                 </button>
//             </form>

//             <div className="space-y-4">
//                 {experiences[activeTab]?.map((item) => (
//                     <div key={item._id} className="p-4 border rounded bg-white">
//                         <h3 className="text-xl font-semibold">
//                             {activeTab === 'education' ? item.degree :
//                              activeTab === 'work' ? item.title :
//                              item.title}
//                         </h3>
//                         <p className="text-gray-600">
//                             {activeTab === 'education' ? item.school :
//                              activeTab === 'work' ? item.companyName :
//                              item.associateWith}
//                         </p>
//                         <p className="text-sm text-gray-500 mt-2">{item.description}</p>
//                         <div className="mt-4 space-x-4">
//                             <button
//                                 onClick={() => handleEdit(item)}
//                                 className="text-blue-500 hover:underline"
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 onClick={() => handleDelete(item._id)}
//                                 className="text-red-500 hover:underline"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ExperienceManager;
// components/admin/ExperienceManager.jsx
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const ExperienceManager = () => {
    const [experiences, setExperiences] = useState({
        education: [],
        work: [],
        achievements: []
    });
    const [activeTab, setActiveTab] = useState('education');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        education: {
            degree: '',
            school: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            description: '',
            imageUrl: ''
        },
        work: {
            title: '',
            employmentType: 'Full-time',
            companyName: '',
            startDate: '',
            endDate: '',
            description: '',
            imageUrl: ''
        },
        achievement: {
            title: '',
            associateWith: '',
            issuer: '',
            issueDate: '',
            description: '',
            imageUrl: ''
        }
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            setIsLoading(true);
            const { data } = await api.get('/experience');
            setExperiences(data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching experiences');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const type = activeTab === 'achievements' ? 'achievement' : activeTab;
            const data = formData[type];

            if (editingId) {
                await api.put(`/experience/${type}/${editingId}`, data);
            } else {
                await api.post(`/experience/${type}`, data);
            }

            setFormData({
                ...formData,
                [type]: getEmptyForm(type)
            });
            setEditingId(null);
            await fetchExperiences();
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving experience');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        try {
            setIsLoading(true);
            const type = activeTab === 'achievements' ? 'achievement' : activeTab;
            await api.delete(`/experience/${type}/${id}`);
            await fetchExperiences();
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting experience');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (item) => {
        const type = activeTab === 'achievements' ? 'achievement' : activeTab;
        setFormData({
            ...formData,
            [type]: {
                ...item,
                startDate: item.startDate?.split('T')[0],
                endDate: item.endDate?.split('T')[0],
                issueDate: item.issueDate?.split('T')[0]
            }
        });
        setEditingId(item._id);
    };

    const getEmptyForm = (type) => {
        const emptyForms = {
            education: {
                degree: '',
                school: '',
                fieldOfStudy: '',
                startDate: '',
                endDate: '',
                description: ''
            },
            work: {
                title: '',
                employmentType: 'Full-time',
                companyName: '',
                startDate: '',
                endDate: '',
                description: ''
            },
            achievement: {
                title: '',
                associateWith: '',
                issuer: '',
                issueDate: '',
                description: '',
                imageUrl: ''
            }
        };
        return emptyForms[type];
    };

    const renderImageUrlField = () => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL (optional)
            </label>
            <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData[activeTab === 'achievements' ? 'achievement' : activeTab].imageUrl}
                onChange={(e) => setFormData({
                    ...formData,
                    [activeTab === 'achievements' ? 'achievement' : activeTab]: {
                        ...formData[activeTab === 'achievements' ? 'achievement' : activeTab],
                        imageUrl: e.target.value
                    }
                })}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
                Enter a direct URL to an image (e.g., https://example.com/image.jpg)
            </p>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Experience Manager</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="mb-6">
                <div className="flex space-x-4">
                    {['education', 'work', 'achievements'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded ${
                                activeTab === tab
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mb-8">
                {activeTab === 'education' && (
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Degree"
                            value={formData.education.degree}
                            onChange={(e) => setFormData({
                                ...formData,
                                education: { ...formData.education, degree: e.target.value }
                            })}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="School"
                            value={formData.education.school}
                            onChange={(e) => setFormData({
                                ...formData,
                                education: { ...formData.education, school: e.target.value }
                            })}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Field of Study"
                            value={formData.education.fieldOfStudy}
                            onChange={(e) => setFormData({
                                ...formData,
                                education: { ...formData.education, fieldOfStudy: e.target.value }
                            })}
                            className="w-full p-2 border rounded"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="date"
                                value={formData.education.startDate}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    education: { ...formData.education, startDate: e.target.value }
                                })}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="date"
                                value={formData.education.endDate}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    education: { ...formData.education, endDate: e.target.value }
                                })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <textarea
    placeholder="Description"
    value={formData.education.description}
    onChange={(e) => setFormData({
        ...formData,
        education: { ...formData.education, description: e.target.value }
    })}
    className="w-full p-2 border rounded"
    rows="4"
/>

{renderImageUrlField()}
                    </div>
                )}

                {activeTab === 'work' && (
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Job Title"
                            value={formData.work.title}
                            onChange={(e) => setFormData({
                                ...formData,
                                work: { ...formData.work, title: e.target.value }
                            })}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <select
                            value={formData.work.employmentType}
                            onChange={(e) => setFormData({
                                ...formData,
                                work: { ...formData.work, employmentType: e.target.value }
                            })}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={formData.work.companyName}
                            onChange={(e) => setFormData({
                                ...formData,
                                work: { ...formData.work, companyName: e.target.value }
                            })}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="date"
                                value={formData.work.startDate}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    work: { ...formData.work, startDate: e.target.value }
                                })}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="date"
                                value={formData.work.endDate}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    work: { ...formData.work, endDate: e.target.value }
                                })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <textarea
    placeholder="Job Description"
    value={formData.work.description}
    onChange={(e) => setFormData({
        ...formData,
        work: { ...formData.work, description: e.target.value }
    })}
    className="w-full p-2 border rounded"
    rows="4"
/>

{renderImageUrlField()}
                    </div>
                )}

                {activeTab === 'achievements' && (
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Achievement Title"
                            value={formData.achievement.title}
                            onChange={(e) => setFormData({
                                ...formData,
                                achievement: { ...formData.achievement, title: e.target.value }
                            })}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Associated With"
                            value={formData.achievement.associateWith}
                            onChange={(e) => setFormData({
                                ...formData,
                                achievement: { ...formData.achievement, associateWith: e.target.value }
                            })}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Issuer"
                            value={formData.achievement.issuer}
                            onChange={(e) => setFormData({
                                ...formData,
                                achievement: { ...formData.achievement, issuer: e.target.value }
                            })}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="date"
                            value={formData.achievement.issueDate}
                            onChange={(e) => setFormData({
                                ...formData,
                                achievement: { ...formData.achievement, issueDate: e.target.value }
                            })}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <textarea
    placeholder="Achievement Description"
    value={formData.achievement.description}
    onChange={(e) => setFormData({
        ...formData,
        achievement: { ...formData.achievement, description: e.target.value }
    })}
    className="w-full p-2 border rounded"
    rows="4"
/>
                        {/* <input
                            type="url"
                            placeholder="Image URL (optional)"
                            value={formData.achievement.imageUrl}
                            onChange={(e) => setFormData({
                                ...formData,
                                achievement: { ...formData.achievement, imageUrl: e.target.value }
                            })}
                            className="w-full p-2 border rounded"
                        /> */}
                        {renderImageUrlField()}
                    </div>
                )}
                
                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {isLoading ? 'Saving...' : (editingId ? 'Update' : 'Add')}
                </button>
            </form>

            <div className="space-y-4">
            {experiences[activeTab]?.map((item) => (
  <div 
    key={item._id} 
    className="p-4 sm:p-6 border rounded-lg bg-white dark:bg-gray-800 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-all"
  >
    <div className="flex-1 min-w-0">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white break-words">
        {activeTab === 'education' ? item.degree :
         activeTab === 'work' ? item.title :
         item.title}
      </h3>
      <p className="mt-1 text-base sm:text-lg text-gray-600 dark:text-gray-300">
        {activeTab === 'education' ? item.school :
         activeTab === 'work' ? item.companyName :
         item.associateWith}
      </p>
      <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 line-clamp-3 sm:line-clamp-none">
        {item.description}
      </p>
      
      <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
        <button
          onClick={() => handleEdit(item)}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 
                   border border-blue-200 rounded-lg hover:bg-blue-100 hover:text-blue-700 
                   dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/40 
                   transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
        <button
          onClick={() => handleDelete(item._id)}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 
                   border border-red-200 rounded-lg hover:bg-red-100 hover:text-red-700 
                   dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/40 
                   transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </div>

    {item.imageUrl && (
      <div className="w-full sm:w-32 h-48 sm:h-32 order-first sm:order-last">
        <img
          src={item.imageUrl}
          alt=""
          className="w-full h-full object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
          loading="lazy"
        />
      </div>
    )}
  </div>
))}
            </div>
        </div>
    );
};

export default ExperienceManager;