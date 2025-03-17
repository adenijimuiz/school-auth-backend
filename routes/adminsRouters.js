const express = require('express');
const { adminRegister, adminlogin, registerStudent, logout, adminProfile } = require('../controllers/adminController');
const isAuthenticated = require('../middlewares/isAuthenticated');


const adminRouter = express.Router();

adminRouter.post('/register', adminRegister);
adminRouter.post('/login', adminlogin);
adminRouter.post('/registerStudent', isAuthenticated, registerStudent);
adminRouter.post('/logout', logout);
adminRouter.post('/profile', adminProfile);


module.exports = adminRouter;