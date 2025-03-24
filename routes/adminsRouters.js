const express = require('express');
const { adminRegister, adminlogin, registerStudent, logout, adminProfile, getAllStudents, getStudentById } = require('../controllers/adminController');
const isAuthenticated = require('../middlewares/isAuthenticated');


const adminRouter = express.Router();

adminRouter.post('/register', adminRegister);
adminRouter.post('/login', adminlogin);
adminRouter.post('/registerStudent', isAuthenticated, registerStudent);
adminRouter.post('/logout', logout);
adminRouter.get('/profile', isAuthenticated,adminProfile);
adminRouter.get('/students', isAuthenticated, getAllStudents);
adminRouter.get('/students/:id', isAuthenticated, getStudentById);

module.exports = adminRouter;