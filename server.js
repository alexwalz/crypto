var express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const config = require('./config');
var cors = require('cors');

var app = express();
var router = express.Router();

// db and models 
const db_url = process.env.MONGODB_URI || config.dbUri

require('./server/models').connect(db_url);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

var port = process.env.PORT || 5000;

// Enable body parser to read incoming POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS stuff
var allowedOrigins = [
    'http://localhost:3000'
];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                `allow access from the specified Origin: ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// Routes
const apiRoutes = require('./server/routes/api-routes');
app.use('/api', apiRoutes);


//If no route matches, send the client 
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, function () {
    console.log(`server running on port ${port}`);
});