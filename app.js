const express = require('express');
const bodyParser = require('body-parser');
const news = require('./routes/news.route');
const app = express();
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/test-news';
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-user-key, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/news', news);

const port = 8000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});