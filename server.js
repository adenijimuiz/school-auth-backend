const express = require('express');
const connectDB = require('./utils/connectDB');
const adminRouter = require('./routes/adminsRouters');
const { errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const studentRouter = require('./routes/studentRouters');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

connectDB();

//routes
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/student', studentRouter)


//middleware
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})