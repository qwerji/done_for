const express = require('express'),
    app = express(),
    path = require('path'),
    session = require('express-session'),
    key = require('./sessionkey.js').key,
    port = 8000

app.use(session({
    secret: key,
    resave: true,
    saveUninitialized: false
}))
app.use(express.static(path.join(__dirname + '/client')))
app.use(express.static(path.join(__dirname + '/bower_components')))
app.use(require('body-parser').json())

require('./server/config/mongoose.js')
require('./server/config/routes.js')(app)

app.listen(port, () => { console.log(`Listening on port ${port}`) })
