// routes/api/messages.js
const express = require('express');
const router = express.Router();
const {
    getMessages,
    updateMessage,
    deleteMessages
} = require('../../controllers/messageController');
const { protect } = require('../../middleware/auth');

router.use(protect); // All message routes require authentication

router.get('/', getMessages);
router.patch('/:id', updateMessage);
router.delete('/', deleteMessages);

module.exports = router;