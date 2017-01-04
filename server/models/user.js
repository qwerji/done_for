let mongoose = require('mongoose'),
    Schema = mongoose.Schema

var userSchema = mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    inventory: {
        "🔦": {type: Boolean, default: false},
        "👨‍🚀" : {type: Boolean, default: false},
    },
    location: {type: String, default:'Ship'}
}, {timestamps: true})

mongoose.model('User', userSchema)
