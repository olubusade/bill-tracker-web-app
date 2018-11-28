const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

 const {getHomePage} = require('./routes/index');
 const {addBillPage, addBill, deleteBill, editBill, editBillPage} = require('./routes/bill');
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'billtracker'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// routes for the app
app.get('/', getHomePage);
app.get('/add', addBillPage);
app.get('/edit/:id', editBillPage);
app.get('/delete/:id', deleteBill);
app.post('/add', addBill);
app.post('/edit/:id', editBill);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});