var express         = require('express');
const path          = require('path');
var bodyParser      = require('body-parser');
const config        = require('./config');
var cors            = require('cors');

var app             = express();
var router          = express.Router();

const db_url        = process.env.MONGODB_URI || config.dbUri

require('./server/models').connect(db_url);

app.use(express.static(path.join(__dirname, 'client/build')));

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://marina-cove.herokuapp.com'
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
const apiRoutes             = require('./server/routes/api-routes');
const apiRoutesUsers        = require('./server/routes/api-users');
const apiRoutesServices     = require('./server/routes/api-services');
const apiRoutesVehicles     = require('./server/routes/api-vehicles');
const apiRoutesAuth         = require('./server/routes/api-auth');

app.use('/api', apiRoutes);
app.use('/api/users', apiRoutesUsers);
app.use('/api/services', apiRoutesServices);
app.use('/api/vehicles', apiRoutesVehicles);
app.use('/api/auth', apiRoutesAuth);


// router.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port, function () {
    console.log(`server running on port ${port}`);
});