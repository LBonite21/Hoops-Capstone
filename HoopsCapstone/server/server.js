const express = require('express');
const app = express();
let port = 3002;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./model/AccountModel');
const Account = mongoose.model("account");

let password = "qgqYI52yqFJvnIXt";
let dbName = "HoopsCapstone";
const mongoUri = `mongodb+srv://lemon:${password}@hoops.8snys.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected to Mongo")
});

mongoose.connection.on("error", (err) => {
    console.log(`Error: ${err}`)
});

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

const routes = require('./routes');
routes(app);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});