const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

//registrataion

const adminRegister = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    //validate
    if(!username || !email || !password){
        res.status(400);
        throw new Error('All fields are required');
    }

    //check if email is taken
    const userExits = await User.findOne({email});
    if(userExits){
        res.status(400);
        throw new Error('User already exists');
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create the admin 
    const adminUser = new User({
        username,
        email,
        password: hashPassword,
        role: 'admin',
    });

    await adminUser.save();

    res.json({
        status: true,
        message: 'Registration was successfull',
        user: {
            username,
            email
        }
    });
});

//login
const adminlogin = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email, role: 'admin'});
    if (!user) {
        res.status(404);
        throw new Error('Admin not found');
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
    }


    const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.cookie('token', token, {
        httpOnly: true, //prevent clients side javascript from accessing the cookie
        
        secure: process.env.NODE_ENV === 'production', //ensure the cookies is only sent over http in productions.
        sameSite: 'strict', //prevent the cookies being sent in cross-site request
        maxAge: 24 * 60 * 60 * 1000, //1 day
    });

    res.json({
        status: 'Success',
        _id: user?._id,
        message: 'Login success',
        username: user?.username,
        email: user?.email,
    });
});

const registerStudent = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    const userExits = await User.findOne({email});

    if(userExits){
        res.status(400);
        throw new Error('user with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    const studentUser = await User({
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

})




module.exports = {
    adminRegister,
    adminlogin
}