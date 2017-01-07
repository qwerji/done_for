let mongoose = require('mongoose'),
    Schema = mongoose.Schema

var userSchema = mongoose.Schema({
    // createdAt: { type: Date, expires: 86400, default: Date.now },
    name: {type: String, required: true},
    inventory: {
        "🖱": {type: Boolean, default: false},
        "🔫": {type: Boolean, default: false},
        "🔴": {type: Boolean, default: false},
        "🔷": {type: Boolean, default: false},
        "💚": {type: Boolean, default: false},
        "🔦": {type: Boolean, default: false},
        "🔋": {type: Boolean, default: false}
    },
    time_played: Number,
    location: {type: String, default:'Ship'},
}, {timestamps: true})

mongoose.model('User', userSchema)
