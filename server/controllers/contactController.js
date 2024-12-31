const Message = require('../models/Message');
const { sendNotification, sendResponse } = require('../utils/email');

exports.submitMessage = async(req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const messageData = new Message({ name, email, message });
        await messageData.save();

        // Send notification email to admin
        await sendNotification(messageData);

        res.status(201).json({
            success: true,
            message: 'Message sent successfully'
        });
    } catch (error) {
        console.error('Submit message error:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending message'
        });
    }
};

exports.getMessages = async(req, res) => {
    try {
        const { filter, search, label } = req.query;
        let query = {};

        // Build query based on filters
        if (filter === 'starred') query.isStarred = true;
        if (filter === 'important') query.isImportant = true;
        if (filter === 'unread') query.status = 'unread';
        if (label) query.labels = label;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { message: { $regex: search, $options: 'i' } }
            ];
        }

        const messages = await Message.find(query)
            .sort({ timestamp: -1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};