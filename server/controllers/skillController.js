const Skill = require('../models/Skill');
const asyncHandler = require('express-async-handler');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
exports.getSkills = asyncHandler(async(req, res) => {
    const skills = await Skill.find()
        .sort({ category: 1, name: 1 })
        .select('-user');

    res.status(200).json(skills);
});

// @desc    Get single skill
// @route   GET /api/skills/:id
// @access  Private
exports.getSkill = asyncHandler(async(req, res) => {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    // Check user ownership
    if (skill.user.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User not authorized to access this skill');
    }

    res.status(200).json(skill);
});

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private
exports.createSkill = asyncHandler(async(req, res) => {
    const { name, category, proficiency, iconUrl } = req.body;

    // Validate required fields
    if (!name || !category || proficiency === undefined) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    // Create skill
    const skill = await Skill.create({
        name,
        category,
        proficiency,
        iconUrl: iconUrl || '',
        user: req.user.id
    });

    res.status(201).json(skill);
});

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
exports.updateSkill = asyncHandler(async(req, res) => {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    // Check user ownership
    if (skill.user.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User not authorized to update this skill');
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
        req.params.id,
        req.body, { new: true, runValidators: true }
    );

    res.status(200).json(updatedSkill);
});

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
exports.deleteSkill = asyncHandler(async(req, res) => {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    // Check user ownership
    if (skill.user.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User not authorized to delete this skill');
    }

    await skill.deleteOne();

    res.status(200).json({ id: req.params.id });
});

// @desc    Get skills by category
// @route   GET /api/skills/category/:category
// @access  Public
exports.getSkillsByCategory = asyncHandler(async(req, res) => {
    const skills = await Skill.find({ category: req.params.category })
        .sort({ proficiency: -1 })
        .select('-user');

    res.status(200).json(skills);
});