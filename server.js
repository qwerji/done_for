const express = require('express'),
    app = express(),
    path = require('path'),
    bp = require('body-parser'),
    session = require('express-session')
    port = 8000;

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false
}))
app.use(express.static(path.join(__dirname + '/client')));
app.use(express.static(path.join(__dirname + '/bower_components')));
app.use(bp.json());
require('./server/config/mongoose.js')// always above routes
require('./server/config/routes.js')(app) //set up routes

app.listen(port, function() {
    console.log(`Listening on port ${port}`)
})
