const express = require('express');
const connectDB = require('./utils/connectDB');
const adminRouter = require('./routes/adminsRouters');
const { errorHandler } = require('./middlewares/errorHandler');

require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB();

//routes
app.use('/api/v1/admin', adminRouter);


//middleware
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})