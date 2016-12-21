const mongoose = require('mongoose'),
    fs = require('fs') //allows us to read and write files
    path = require('path'), //keeps directories straight
    models_path = path.join(__dirname + './../models'),
mongoose.connect('mongodb://localhost/doneFor');
// make sure to run mongod ;)
fs.readdirSync(models_path).forEach(function(file){
    if(file.indexOf('.js') >= 0){
        require(models_path + '/' + file);
    }
})
