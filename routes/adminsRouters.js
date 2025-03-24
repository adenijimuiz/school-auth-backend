const express = require('express');
const { adminRegister, adminlogin, registerStudent, logout, adminProfile, getAllStudents, getStudentById, updateStudent, deleteStudent, adminChangePassword } = require('../controllers/adminController');
const isAuthenticated = require('../middlewares/isAuthenticated');


const adminRouter = express.Router();

adminRouter.post('/register', adminRegister);
adminRouter.post('/login', adminlogin);
adminRouter.post('/registerStudent', isAuthenticated, registerStudent);
adminRouter.post('/logout', logout);
adminRouter.get('/profile', isAuthenticated,adminProfile);
adminRouter.get('/students', isAuthenticated, getAllStudents);
adminRouter.get('/students/:id', isAuthenticated, getStudentById);
adminRouter.put('/students/:id', isAuthenticated, updateStudent);
adminRouter.delete('/students/:id', isAuthenticated, deleteStudent);
adminRouter.put('/change-password', isAuthenticated, adminChangePassword);

module.exports = adminRouter;