const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Student = require('../models/Student');

const isStudentAuthenticated = asyncHandler(async (req, res, next) => {
    if (req.cookies.token) {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        // Ensure that the token belongs to a student
        if (decoded.role !== 'student') {
            res.status(403);
            throw new Error('Access denied, student only');
        }
        // Retrieve the student record (excluding the password)
        req.user = await Student.findById(decoded.id).select('-password');
        return next();
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = isStudentAuthenticated;
