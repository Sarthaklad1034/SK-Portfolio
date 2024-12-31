// // models/Education.js
// const mongoose = require('mongoose');

// const educationSchema = new mongoose.Schema({
//     degree: {
//         type: String,
//         required: true
//     },
//     school: {
//         type: String,
//         required: true
//     },
//     fieldOfStudy: {
//         type: String,
//         required: true
//     },
//     startDate: {
//         type: Date,
//         required: true
//     },
//     endDate: {
//         type: Date,
//         required: true
//     },
//     description: {
//         type: String
//     }
// }, {
//     timestamps: true
// });

// // models/Work.js
// const workSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     employmentType: {
//         type: String,
//         required: true,
//         enum: ['Full-time', 'Part-time', 'Self-employed', 'Freelance', 'Internship']
//     },
//     companyName: {
//         type: String,
//         required: true
//     },
//     startDate: {
//         type: Date,
//         required: true
//     },
//     endDate: {
//         type: Date,
//         required: true
//     },
//     description: {
//         type: String
//     }
// }, {
//     timestamps: true
// });

// // models/Achievement.js
// const achievementSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     associateWith: {
//         type: String,
//         required: true
//     },
//     issuer: {
//         type: String,
//         required: true
//     },
//     issueDate: {
//         type: Date,
//         required: true
//     },
//     description: {
//         type: String
//     },
//     imageUrl: {
//         type: String
//     }
// }, {
//     timestamps: true
// });

// const Education = mongoose.model('Education', educationSchema);
// const Work = mongoose.model('Work', workSchema);
// const Achievement = mongoose.model('Achievement', achievementSchema);

// module.exports = { Education, Work, Achievement };

const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    fieldOfStudy: {
        type: String
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String
    }
}, {
    timestamps: true
});

const workSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    employmentType: {
        type: String,
        required: true,
        enum: ['Full-time', 'Part-time', 'Self-employed', 'Freelance', 'Internship']
    },
    companyName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String
    }
}, {
    timestamps: true
});

const achievementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    associateWith: {
        type: String,
        required: true
    },
    issuer: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String
    }
}, {
    timestamps: true
});

const Education = mongoose.model('Education', educationSchema);
const Work = mongoose.model('Work', workSchema);
const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = { Education, Work, Achievement };