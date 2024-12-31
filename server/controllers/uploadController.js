// server/controllers/uploadController.js
const fs = require('fs').promises;
const path = require('path');

const uploadImage = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const imageUrl = `/uploads/images/${req.file.filename}`;
        res.status(200).json({ imageUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file' });
    }
};

const deleteImage = async(req, res) => {
    try {
        const { filename } = req.params;
        const filepath = path.join(__dirname, '../uploads/images', filename);

        await fs.unlink(filepath);
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting file' });
    }
};

module.exports = { uploadImage, deleteImage };