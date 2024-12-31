const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const {
    getSkills,
    getSkill,
    createSkill,
    updateSkill,
    deleteSkill,
    getSkillsByCategory
} = require('../../controllers/skillController');

// Public routes
router.get('/', getSkills);
router.get('/category/:category', getSkillsByCategory);

// Protected routes
router.use(protect); // All routes below this will require authentication
router.post('/', createSkill);
router.get('/:id', getSkill);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);

module.exports = router;