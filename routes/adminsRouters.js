const express = require('express');
const { adminRegister, adminlogin, registerStudent } = require('../controllers/adminController');
const isAuthenticated = require('../middlewares/isAuthenticated');


const adminRouter = express.Router();

adminRouter.post('/register', adminRegister);
adminRouter.post('/login', adminlogin);
adminRouter.post('/registerStudent', isAuthenticated,registerStudent);


module.exports = adminRouter;