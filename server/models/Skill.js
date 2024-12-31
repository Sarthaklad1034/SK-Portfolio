const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Skill name is required'],
        trim: true,
        maxLength: [50, 'Skill name cannot exceed 50 characters']
    },
    category: {
        type: String,
        required: [true, 'Skill category is required'],
        enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'],
        trim: true
    },
    proficiency: {
        type: Number,
        required: [true, 'Proficiency level is required'],
        min: [0, 'Proficiency cannot be less than 0'],
        max: [100, 'Proficiency cannot exceed 100']
    },
    iconUrl: {
        type: String,
        trim: true,
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
skillSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Skill', skillSchema);