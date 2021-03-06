const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to PicaApp aplication."});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

//Creates JWT control
const jwtKey = require('./config/jwt.config.js');
app.set('keygen', jwtKey.llave);

const middleware = require('./middleware.js');

// Require for routes
require('./app/routes/vehiculo.routes.js')(app, middleware);
require('./app/routes/tipoVehiculo.routes.js')(app, middleware);
require('./app/routes/local.routes.js')(app, middleware);
require('./app/routes/user.routes.js')(app, middleware);
require('./app/routes/valoracion.routes.js')(app, middleware);
require('./app/routes/authentication.routes.js')(app);