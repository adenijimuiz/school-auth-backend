const express = require('express');
const connectDB = require('./utils/connectDB');

require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB()

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})