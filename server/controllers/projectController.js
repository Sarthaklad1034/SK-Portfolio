const Project = require('../models/Project');
const asyncHandler = require('express-async-handler');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async(req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
});

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
const getFeaturedProjects = asyncHandler(async(req, res) => {
    const projects = await Project.find({ featured: true }).sort({ createdAt: -1 });
    res.json(projects);
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async(req, res) => {
    const { title, description, technologies, imageUrl, githubLink, featured } = req.body;

    const project = await Project.create({
        title,
        description,
        technologies: technologies.split(',').map(tech => tech.trim()),
        imageUrl: imageUrl.startsWith('http') ? imageUrl : `/uploads/images/${imageUrl}`,
        githubLink,
        featured: featured || false
    });

    res.status(201).json(project);
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async(req, res) => {
    const { title, description, technologies, imageUrl, githubLink, featured } = req.body;

    const project = await Project.findByIdAndUpdate(
        req.params.id, {
            title,
            description,
            technologies: technologies.split(',').map(tech => tech.trim()),
            imageUrl,
            githubLink,
            featured: featured || false
        }, { new: true }
    );

    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    res.json(project);
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async(req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    await project.deleteOne();
    res.json({ message: 'Project removed' });
});

module.exports = {
    getProjects,
    getFeaturedProjects,
    createProject,
    updateProject,
    deleteProject
};