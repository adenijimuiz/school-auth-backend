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

    const studenttoken = jwt.sign({id: student?._id, role: 'student'}, process.env.JWT_SECRET, {expiresIn: '3d'});

    res.cookie('token', studenttoken, {
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

const changePassword = asyncHandler(async (req, res) => {
    const {currentPassword, newPassword} = req.body;

    //validate
    if(!currentPassword || !newPassword){
        res.status(400);
        throw new Error("Both current and new passwords are required");
    }

    const student = await Student.findById(req.user.id);
    if(!student){
        res.status(404);
        throw new Error("Student Not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, student?.password);
    if(!isMatch){
        res.status(401);
        throw new Error("current password is incorrect");
    }

    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(newPassword, salt);

    await student.save();

    res.json({ message: "Password updated successfully" });
})


module.exports = {
    studentLogin,
    changePassword
}