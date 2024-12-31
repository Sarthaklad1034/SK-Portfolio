// const express = require('express');
// const router = express.Router();
// const { submitMessage, getMessages } = require('../../controllers/contactController');
// const { protect } = require('../../middleware/auth');
// const Message = require('../../models/Message');

// // @route   POST /api/contact
// // @desc    Submit a new contact message
// // @access  Public
// router.post('/', submitMessage);

// // @route   GET /api/contact/messages
// // @desc    Get all contact messages with optional filtering
// // @access  Private (Admin only)
// router.get('/messages', protect, getMessages);

// // @route   PATCH /api/contact/messages/:id/star
// // @desc    Toggle star status of a message
// // @access  Private (Admin only)
// router.patch('/messages/:id/star', protect, async(req, res) => {
//     try {
//         const message = await Message.findById(req.params.id);
//         if (!message) {
//             return res.status(404).json({ message: 'Message not found' });
//         }
//         message.isStarred = !message.isStarred;
//         await message.save();
//         res.json(message);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // @route   PATCH /api/contact/messages/:id/important
// // @desc    Toggle important status of a message
// // @access  Private (Admin only)
// router.patch('/messages/:id/important', protect, async(req, res) => {
//     try {
//         const message = await Message.findById(req.params.id);
//         if (!message) {
//             return res.status(404).json({ message: 'Message not found' });
//         }
//         message.isImportant = !message.isImportant;
//         await message.save();
//         res.json(message);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // @route   POST /api/contact/messages/:id/reply
// // @desc    Add a reply to a message
// // @access  Private (Admin only)
// router.post('/messages/:id/reply', protect, async(req, res) => {
//     try {
//         const message = await Message.findById(req.params.id);
//         if (!message) {
//             return res.status(404).json({ message: 'Message not found' });
//         }

//         message.responses.push({
//             content: req.body.content,
//             timestamp: new Date()
//         });
//         message.status = 'responded';
//         await message.save();

//         // Send email response to the original sender
//         await sendResponse(message.email, req.body.content);

//         res.json(message);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // @route   DELETE /api/contact/messages/:id
// // @desc    Delete a message
// // @access  Private (Admin only)
// router.delete('/messages/:id', protect, async(req, res) => {
//     try {
//         const message = await Message.findById(req.params.id);
//         if (!message) {
//             return res.status(404).json({ message: 'Message not found' });
//         }
//         await message.remove();
//         res.json({ message: 'Message deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const { submitMessage, getMessages } = require('../../controllers/contactController');
const { protect } = require('../../middleware/auth');
const Message = require('../../models/Message');
const { sendResponse } = require('../../utils/email');

// Public routes
router.post('/', submitMessage);

// Protected routes
router.get('/messages', protect, async(req, res) => {
    try {
        const { filter, search } = req.query;
        let query = {};

        // Build query based on filters
        if (filter === 'starred') query.isStarred = true;
        if (filter === 'important') query.isImportant = true;
        if (filter === 'unread') query.status = 'unread';

        // Add search functionality
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { message: { $regex: search, $options: 'i' } }
            ];
        }

        const messages = await Message.find(query).sort({ timestamp: -1 });
        res.json(messages);
    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({ message: 'Error retrieving messages' });
    }
});

router.post('/messages/:id/star', protect, async(req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        message.isStarred = !message.isStarred;
        await message.save();
        res.json(message);
    } catch (error) {
        console.error('Star message error:', error);
        res.status(500).json({ message: 'Error updating message star status' });
    }
});

router.delete('/messages/:id', protect, async(req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Delete message error:', error);
        res.status(500).json({ message: 'Error deleting message' });
    }
});

router.post('/messages/:id/reply', protect, async(req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: 'Reply content is required' });
        }

        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        message.responses.push({
            content,
            timestamp: new Date()
        });
        message.status = 'responded';
        await message.save();

        // Send email response
        try {
            await sendResponse(message.email, 'Re: Your Contact Form Submission', content);
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            // Continue even if email fails
        }

        res.json(message);
    } catch (error) {
        console.error('Reply message error:', error);
        res.status(500).json({ message: 'Error sending reply' });
    }
});

module.exports = router;