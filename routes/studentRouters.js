const express = require('express');
const { studentLogin } = require('../controllers/studentController');


const studentRouter = express.Router();

studentRouter.post('/login', studentLogin);

module.exports = studentRouter