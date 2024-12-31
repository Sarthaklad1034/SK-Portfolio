// const Experience = require('../models/Experience');
// const { validationResult } = require('express-validator');

// // Get all experiences for a user
// exports.getExperiences = async(req, res) => {
//     try {
//         const experiences = await Experience.findOne({ userId: req.user.id });
//         res.json(experiences || { education: [], work: [], achievements: [] });
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// };

// // Add education experience
// exports.addEducation = async(req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const experience = await Experience.findOne({ userId: req.user.id });

//         const newEducation = {
//             degree: req.body.degree,
//             fieldOfStudy: req.body.fieldOfStudy,
//             schoolName: req.body.schoolName,
//             startDate: req.body.startDate,
//             endDate: req.body.endDate,
//             description: req.body.description
//         };

//         if (!experience) {
//             const newExperience = new Experience({
//                 userId: req.user.id,
//                 education: [newEducation]
//             });
//             await newExperience.save();
//             return res.json(newExperience);
//         }

//         experience.education.unshift(newEducation);
//         await experience.save();
//         res.json(experience);
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// };

// // Add work experience
// exports.addWork = async(req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const experience = await Experience.findOne({ userId: req.user.id });

//         const newWork = {
//             title: req.body.title,
//             employmentType: req.body.employmentType,
//             companyName: req.body.companyName,
//             startDate: req.body.startDate,
//             endDate: req.body.endDate,
//             description: req.body.description
//         };

//         if (!experience) {
//             const newExperience = new Experience({
//                 userId: req.user.id,
//                 work: [newWork]
//             });
//             await newExperience.save();
//             return res.json(newExperience);
//         }

//         experience.work.unshift(newWork);
//         await experience.save();
//         res.json(experience);
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// };

// // Add achievement
// exports.addAchievement = async(req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const experience = await Experience.findOne({ userId: req.user.id });

//         const newAchievement = {
//             title: req.body.title,
//             associateWith: req.body.associateWith,
//             issuer: req.body.issuer,
//             issueDate: req.body.issueDate,
//             description: req.body.description,
//             imageUrl: req.body.imageUrl
//         };

//         if (!experience) {
//             const newExperience = new Experience({
//                 userId: req.user.id,
//                 achievements: [newAchievement]
//             });
//             await newExperience.save();
//             return res.json(newExperience);
//         }

//         experience.achievements.unshift(newAchievement);
//         await experience.save();
//         res.json(experience);
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// };

// // Delete experience items
// exports.deleteEducation = async(req, res) => {
//     try {
//         const experience = await Experience.findOne({ userId: req.user.id });
//         experience.education = experience.education.filter(
//             edu => edu._id.toString() !== req.params.edu_id
//         );
//         await experience.save();
//         res.json(experience);
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// };

// exports.deleteWork = async(req, res) => {
//     try {
//         const experience = await Experience.findOne({ userId: req.user.id });
//         experience.work = experience.work.filter(
//             work => work._id.toString() !== req.params.work_id
//         );
//         await experience.save();
//         res.json(experience);
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// };

// exports.deleteAchievement = async(req, res) => {
//     try {
//         const experience = await Experience.findOne({ userId: req.user.id });
//         experience.achievements = experience.achievements.filter(
//             achievement => achievement._id.toString() !== req.params.achievement_id
//         );
//         await experience.save();
//         res.json(experience);
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// };

// controllers/experienceController.js
// controllers/experienceController.js
// const Experience = require('../models/Experience');
// const asyncHandler = require('express-async-handler');
// controllers/experienceController.js
// controllers/experienceController.js
const { Education, Work, Achievement } = require('../models/Experience');
const asyncHandler = require('express-async-handler');

// Get all experiences
const getExperiences = asyncHandler(async(req, res) => {
    const education = await Education.find().sort({ startDate: -1 });
    const work = await Work.find().sort({ startDate: -1 });
    const achievements = await Achievement.find().sort({ issueDate: -1 });

    res.json({
        education,
        work,
        achievements
    });
});

// Create new experience
const createExperience = asyncHandler(async(req, res) => {
    const { type } = req.params;
    let experience;

    switch (type) {
        case 'education':
            experience = await Education.create(req.body);
            break;
        case 'work':
            experience = await Work.create(req.body);
            break;
        case 'achievement':
            experience = await Achievement.create(req.body);
            break;
        default:
            res.status(400);
            throw new Error('Invalid experience type');
    }

    res.status(201).json(experience);
});

// Update experience
const updateExperience = asyncHandler(async(req, res) => {
    const { type, id } = req.params;
    let experience;

    const updateOptions = { new: true };

    switch (type) {
        case 'education':
            experience = await Education.findByIdAndUpdate(id, req.body, updateOptions);
            break;
        case 'work':
            experience = await Work.findByIdAndUpdate(id, req.body, updateOptions);
            break;
        case 'achievement':
            experience = await Achievement.findByIdAndUpdate(id, req.body, updateOptions);
            break;
        default:
            res.status(400);
            throw new Error('Invalid experience type');
    }

    if (!experience) {
        res.status(404);
        throw new Error('Experience not found');
    }

    res.json(experience);
});

// Delete experience
const deleteExperience = asyncHandler(async(req, res) => {
    const { type, id } = req.params;
    let experience;

    switch (type) {
        case 'education':
            experience = await Education.findById(id);
            break;
        case 'work':
            experience = await Work.findById(id);
            break;
        case 'achievement':
            experience = await Achievement.findById(id);
            break;
        default:
            res.status(400);
            throw new Error('Invalid experience type');
    }

    if (!experience) {
        res.status(404);
        throw new Error('Experience not found');
    }

    await experience.deleteOne();
    res.json({ message: 'Experience removed' });
});

module.exports = {
    getExperiences,
    createExperience,
    updateExperience,
    deleteExperience
};