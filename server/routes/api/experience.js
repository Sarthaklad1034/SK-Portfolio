// // routes/api/experience.js
// const express = require('express');
// const router = express.Router();
// const { protect } = require('../../middleware/auth');
// const {
//     getExperiences,
//     createExperience,
//     updateExperience,
//     deleteExperience
// } = require('../../controllers/experienceController');

// router.get('/', getExperiences);
// router.post('/:type', protect, createExperience);
// router.put('/:type/:id', protect, updateExperience);
// router.delete('/:type/:id', protect, deleteExperience);

// module.exports = router;

// routes/api/experience.js
const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const {
    getExperiences,
    createExperience,
    updateExperience,
    deleteExperience
} = require('../../controllers/experienceController');

// Get all experiences
router.get('/', getExperiences);

// Create new experience (protected routes)
router.post('/:type', protect, createExperience);

// Update experience
router.put('/:type/:id', protect, updateExperience);

// Delete experience
router.delete('/:type/:id', protect, deleteExperience);

module.exports = router;