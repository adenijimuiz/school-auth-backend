const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email:    { type: String, required: true},
    password: { type: String, required: true },
    role:     { type: String, enum: ['admin', 'student'], default: 'student' }
});

const Admin  = mongoose.model('Admin', adminSchema);

module.exports = Admin