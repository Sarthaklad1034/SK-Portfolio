// 

const express = require('express');
const router = express.Router();
const {
    getProjects,
    getFeaturedProjects,
    createProject,
    updateProject,
    deleteProject
} = require('../../controllers/projectController');
const { protect } = require('../../middleware/auth');

router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;