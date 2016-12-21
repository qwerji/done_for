let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    inventory: {
        "🔦": {type: Boolean, default: false}
    },
    location: {type: String, default:'Ship'}
})

mongoose.model('User', userSchema);
