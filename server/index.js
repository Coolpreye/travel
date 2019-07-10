const express = require('express');
const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser');

// import the database connection
const db = require('./config/database');

// test the connection
//db.authenticate()
    //.then(() => console.log('Database connected'))
    //.catch(error => console.log(error));

// import the configurations
const configs = require('./config');

// create the new server
const app = express();

// filter the current environment
const config = configs[app.get('env')];

// enable pug
app.set('view engine', 'pug');
// add the views folder into the project
app.set('views', path.join(__dirname, './views'));

// load public assets folder
app.use(express.static('public'));

// get the current year
app.use((req, res, next) => {
    const date = new Date();
    res.locals.currentYear = date.getFullYear();
    // take the current page
    res.locals.currentPage = req.path;

    return next();
    //console.log(date.getFullYear());
});

// pass the sitename to the views
app.locals.sitetitle = config.sitename;

// enable body-parser
app.use(bodyParser.urlencoded({extended: true}));

// listen for the homepage
app.use('/', routes() );

// run the application
app.listen(3000);