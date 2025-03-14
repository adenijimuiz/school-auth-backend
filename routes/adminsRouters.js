const express = require('express');
const { adminRegister, adminlogin } = require('../controllers/adminController');


const adminRouter = express.Router();

adminRouter.post('/register', adminRegister);
adminRouter.post('/login', adminlogin);


module.exports = adminRouter;