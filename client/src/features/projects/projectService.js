import axios from 'axios';

const API_URL = '/api/projects';

// Get auth token from local storage
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const projectService = {
    // Get all projects
    async getProjects() {
        const response = await axios.get(API_URL);
        return response.data;
    },

    // Get featured projects
    async getFeaturedProjects() {
        const response = await axios.get(`${API_URL}/featured`);
        return response.data;
    },

    // Create new project
    async createProject(projectData) {
        const response = await axios.post(API_URL, projectData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // Update project
    async updateProject(id, projectData) {
        const response = await axios.put(`${API_URL}/${id}`, projectData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // Delete project
    async deleteProject(id) {
        await axios.delete(`${API_URL}/${id}`, {
            headers: getAuthHeader()
        });
    },

    // Get single project
    async getProjectById(id) {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    }
};

export default projectService;