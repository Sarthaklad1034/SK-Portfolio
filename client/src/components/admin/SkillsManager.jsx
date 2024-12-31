import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../hooks/useAuth';

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    proficiency: 0,
    iconUrl: ''
  });
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuth();

  const categories = [
    'Frontend',
    'Backend',
    'Database',
    'DevOps',
    'Tools',
    'Other'
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get('/skills');
      // Ensure we're always setting an array
      const skillsData = Array.isArray(response.data) ? response.data : [];
      setSkills(skillsData);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setError('Failed to fetch skills. Please try again.');
      setSkills([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/skills/${editingId}`, formData);
      } else {
        await api.post('/skills', formData);
      }
      
      setFormData({
        name: '',
        category: '',
        proficiency: 0,
        iconUrl: ''
      });
      setEditingId(null);
      fetchSkills();
    } catch (error) {
      console.error('Error saving skill:', error);
      setError('Failed to save skill. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await api.delete(`/skills/${id}`);
        fetchSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
        setError('Failed to delete skill. Please try again.');
      }
    }
  };

  const handleEdit = (skill) => {
    setFormData(skill);
    setEditingId(skill._id);
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Skills Manager
      </h2>

      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Skill Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Proficiency: {formData.proficiency}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.proficiency}
            onChange={(e) => setFormData({...formData, proficiency: parseInt(e.target.value)})}
            className="w-full"
          />
        </div>
        <div>
          <input
            type="url"
            placeholder="Icon URL"
            value={formData.iconUrl}
            onChange={(e) => setFormData({...formData, iconUrl: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {editingId ? 'Update Skill' : 'Add Skill'}
        </button>
      </form>

      {isLoading ? (
  <div className="text-center py-4">
    <p className="text-gray-600 dark:text-gray-400">Loading skills...</p>
  </div>
) : (
  <div className="mt-8 space-y-4">
    {Array.isArray(skills) && skills.length > 0 ? (
      skills.map((skill) => (
        <div
          key={skill._id}
          className="p-3 sm:p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full sm:w-2/3">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white break-words">
                {skill.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                Category: {skill.category}
              </p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 dark:bg-gray-600">
                  <div
                    className="bg-blue-600 h-2 sm:h-2.5 rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex flex-row sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => handleEdit(skill)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-blue-400 dark:border-blue-400 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(skill._id)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-red-600 border border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-400 dark:border-red-400 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center py-4">
        <p className="text-gray-600 dark:text-gray-400">No skills found. Add your first skill above.</p>
      </div>
    )}
  </div>
)}
    </div>
  );
};

export default SkillsManager;