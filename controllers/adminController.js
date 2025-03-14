const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

//registrataion

const registerAdmin = asyncHandler(async (req, res) => {
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
    const adminUser = await User({
        username,
        email,
        password,
        role: 'admin',
    });

    await adminUser.save();

    res.json({
        status: true,
        message: 'Registration was successfull'
    })
})