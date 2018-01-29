/**
 * File:         server.js
 *
 ** Project:      Showcase LHS
 ** Author:       Radu Vasilescu
 * Date:         2018-01-29
 *
 ** Description:  Student Keycards project for LHS showcase 2018
 */

//* #############  Libraries  ############# *//

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//* #############  Database  ############# *//

// Connect to the database
var mysql = require('mysql');

// Database setup
var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "node",
    password: "nodeUser",
    database: "showcase"
});

// Make connection
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database!");
});

//* #############  Serial Listener  ############# *//

// Set up the Python serial listener
const spawn = require('child_process').spawn;

const listener = spawn('python', ['listen.py']);

// Pipe to this process' output
//listener.stdout.pipe(process.stdout);
listener.stderr.pipe(process.stderr);

// When students scan in, run this
listener.stdout.on('data', (data) => {
    console.log('Scanned in: ' + data.toString());
    scanIn(data);
});

console.log('Listening...');

listener.stderr.on('data', (data) => {
    console.log('stderr: ' + data);
});

listener.on('close', (code) => {
    console.log('child process exited with code ${code}');
});

//* #############  Application logic  ############# *//

//TODO Ask user for this on app start
var mode = 'PrintInfo'; //! Change this to set the application mode

function scanIn(id) {
    if (mode == 'PrintInfo') {
        printStudentInfo(id);
    } else {
        console.log("Unknown mode: '" + mode + "'");
    }
}

function printStudentInfo(id) {
    console.log('Student info for ' + id);
    con.query('SELECT * FROM Students WHERE `ID` = ' + id, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
}

//* #############  Web Endpoints  ############# *//

// This is so we can extract POST data from the HTTP request
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

// Setup the individual access points of the app
// Home page
app.get('/', function (req, res) {
    res.send("Hello. Please go to /students/ or /events/.");
});

// Students list page
app.get('/students/', function (req, res) {
    con.query('SELECT * FROM Students', function (err, result, fields) {
        if (err) throw err;
        res.send('<h2>Students:</h2><br/>' + result);
    });
});

// Event list page
app.get('/events/', function (req, res) {
    con.query('SELECT * FROM Events', function (err, result, fields) {
        if (err) throw err;
        res.send('<h2>Events:</h2><br/>' + result);
    });
});


//* #############  Start App  ############# *//

app.listen(8080);