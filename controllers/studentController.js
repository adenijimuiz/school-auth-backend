const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Student = require('../models/Student');

const studentLogin = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const student = await Student.findOne({email});
    if(!student){
        res.status(401);
        throw new Error("Invaild email or password");
    };

    const isMatch = await bcrypt.compare(password, student?.password);
    if(!isMatch){
        res.status(401);
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign({id: student?._id}, process.env.JWT_SECRET, {expiresIn: '3d'});

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production'
    });

    res.json({
        status: 'Success',
        _id: student?._id,
        message: 'Login success',
        username: student?.username,
        email: student?.email,
    });
})

module.exports = {
    studentLogin
}