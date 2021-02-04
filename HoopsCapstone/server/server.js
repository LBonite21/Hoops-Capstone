const express = require('express');
const app = express();
let port = 3002;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.get('/', (req, res) => {
    res.send("Welcome to Node JS")
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});