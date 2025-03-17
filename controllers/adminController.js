const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const Student = require('../models/Student')

//registrataion

const adminRegister = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    //validate
    if(!username || !email || !password){
        res.status(400);
        throw new Error('All fields are required');
    }

    //check if email is taken
    const adminExits = await Admin.findOne({email});
    if(adminExits){
        res.status(400);
        throw new Error('Admin already exists');
    }

    //hashing admin password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create the admin 
    const adminUser = new Admin({
        username,
        email,
        password: hashPassword,
        role: 'admin',
    });

    await adminUser.save();

    res.json({
        status: true,
        message: 'Registration was successfull',
        admin: {
            username,
            email
        }
    });
});

//login
const adminlogin = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const admin = await Admin.findOne({email, role: 'admin'});
    if (!admin) {
        res.status(404);
        throw new Error('Invalid credentials');
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, admin?.password);
    if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
    }


    const token = jwt.sign({id: admin?._id, role: admin?.role }, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.cookie('token', token, {
        httpOnly: true, //prevent clients side javascript from accessing the cookie
        
        secure: process.env.NODE_ENV === 'production', //ensure the cookies is only sent over http in productions.
        sameSite: 'strict', //prevent the cookies being sent in cross-site request
        maxAge: 24 * 60 * 60 * 1000, //1 day
    });

    res.json({
        status: 'Success',
        _id: admin?._id,
        message: 'Login success',
    });
});

const registerStudent = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    const studentExits = await Student.findOne({email});

    if(studentExits){
        res.status(400);
        throw new Error('student with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    const studentUser = await Student({
        username,
        email,
        password: hashPassword,
        role: 'student',
    })

    await studentUser.save();

    res.json({
        status: true,
        message: 'Student registration was successfull',
        user: {
            username,
            email
        }
    });
});

//logout
const logout = asyncHandler(async (req, res) => {
    //clear the authentication cookie named 'token'
    //setting the cookie value to an empty string ('') removes any existing token
    res.cookie('token', '', {maxAge: 1});

    res.status(200).json({
        message: 'Logged out successfully'
    });
});


//profile
const adminProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req?.admin?.id).select('-password');

    if(admin){
        res.status(200).json({
            status: 'success',
            admin,
        });
    } else {
        res.status(404);
        throw new Error('Admin not found');
    }
});




module.exports = {
    adminRegister,
    adminlogin,
    registerStudent,
    logout,
    adminProfile
}