const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String,
        required: true
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['student'], 
        default: 'student' 
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin', 
        required: true
    }
},{
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema)

module.exports = Student