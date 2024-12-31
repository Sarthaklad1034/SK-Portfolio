// // server/models/Project.js
// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     technologies: {
//         type: String,
//         required: true
//     },
//     imageUrl: {
//         type: String
//     },
//     githubUrl: {
//         type: String
//     },
//     liveUrl: {
//         type: String
//     },
//     featured: {
//         type: Boolean,
//         default: false
//     }
// }, {
//     timestamps: true
// });

// module.exports = mongoose.model('Project', projectSchema);
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    technologies: [{
        type: String,
        required: [true, 'At least one technology is required']
    }],
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required']
    },
    githubLink: {
        type: String
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);