let mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path'),
    models_path = path.join(__dirname + './../models');
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/done_for');
fs.readdirSync(models_path).forEach(function(file){
    if(file.indexOf('.js') >= 0){
        require(models_path + '/' + file);
    }
})
