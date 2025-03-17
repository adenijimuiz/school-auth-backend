const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    role:     { type: String, enum: ['student'], default: 'student' }
});

const Student = mongoose.model('Student', studentSchema)

module.exports = Student