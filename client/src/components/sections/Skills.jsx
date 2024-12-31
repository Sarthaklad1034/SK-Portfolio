// import { useState, useEffect } from 'react';
// import api from '../../utils/api';
// import { motion } from 'framer-motion';

// const SkillCard = ({ skill }) => {
//   const progressBarVariants = {
//     initial: { width: 0 },
//     animate: { width: `${skill.proficiency}%` }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold dark:text-white">{skill.name}</h3>
//         <span className="text-blue-600 dark:text-blue-400">{skill.proficiency}%</span>
//       </div>
//       <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
//         <motion.div
//           className="h-full bg-blue-600 dark:bg-blue-400"
//           variants={progressBarVariants}
//           initial="initial"
//           whileInView="animate"
//           transition={{ duration: 1, ease: "easeOut" }}
//         />
//       </div>
//     </div>
//   );
// };

import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { motion } from 'framer-motion';

const SkillCard = ({ skill }) => {
  const progressBarVariants = {
    initial: { width: 0 },
    animate: { width: `${skill.proficiency}%` }
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-4">
        {skill.iconUrl ? (
          <div className="w-12 h-12 flex-shrink-0">
            <img 
              src={skill.iconUrl} 
              alt={`${skill.name} icon`}
              className="w-full h-full object-contain rounded-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-icon.png'; // Fallback icon
              }}
            />
          </div>
        ) : (
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-md flex items-center justify-center flex-shrink-0">
            <span className="text-2xl text-gray-500 dark:text-gray-400">
              {skill.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex-grow flex items-center justify-between">
          <h3 className="text-lg font-semibold dark:text-white">{skill.name}</h3>
          <span className="text-blue-600 dark:text-blue-400">{skill.proficiency}%</span>
        </div>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-600 dark:bg-blue-400"
          variants={progressBarVariants}
          initial="initial"
          whileInView="animate"
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/skills');
        
        // Ensure response.data is an array
        const skillsData = Array.isArray(response.data) ? response.data : [];
        setSkills(skillsData);
        
        // Extract unique categories from valid array
        const uniqueCategories = [...new Set(skillsData.map(skill => skill.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setError('Failed to load skills. Please try again later.');
        // Initialize empty arrays on error
        setSkills([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Ensure skills is always an array and filter it
  const getFilteredSkills = () => {
    if (!Array.isArray(skills)) return [];
    
    return selectedCategory === 'all'
      ? skills
      : skills.filter(skill => skill.category === selectedCategory);
  };

  const filteredSkills = getFilteredSkills();

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-600 dark:text-gray-400">Loading skills...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
          Skills & Technologies
        </h2>
        
        {/* Category Filter */}
        <div className="w-full overflow-x-auto scrollbar-hide pb-4 mb-8 sm:mb-12">
  <div className="flex flex-nowrap min-w-max sm:min-w-0 sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-4 px-4 sm:px-0">
    <button
      onClick={() => setSelectedCategory('all')}
      className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full whitespace-nowrap
        transition-all duration-200 hover:opacity-90
        ${
          selectedCategory === 'all'
            ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
    >
      All
    </button>
    
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => setSelectedCategory(category)}
        className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full whitespace-nowrap
          transition-all duration-200 hover:opacity-90
          ${
            selectedCategory === category
              ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
      >
        {category}
      </button>
    ))}
  </div>
</div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                No skills found for this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;