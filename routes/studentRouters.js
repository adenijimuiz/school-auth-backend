const express = require('express');
const { studentLogin, changePassword } = require('../controllers/studentController');
const isStudentAuthenticated = require('../middlewares/isStudentAuthenticated');


const studentRouter = express.Router();

studentRouter.post('/login', studentLogin);
studentRouter.put('/change-password',isStudentAuthenticated, changePassword);

module.exports = studentRouter