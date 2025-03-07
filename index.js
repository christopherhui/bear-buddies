// from FCC MERN Tutorial
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// create express server
const app = express();
app.use(express.static('frontend/build'));
const port = process.env.PORT || 5000;

const path = require('path');
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

// cors middleware
app.use(cors());
app.use(express.json()); // parse json

const uri = process.env.MONGODB_KEY;
// need these flags to deal with things that mongoDB has deprecated
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully!");
});

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

// starts server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});