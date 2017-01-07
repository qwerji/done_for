let mongoose = require('mongoose'),
    Schema = mongoose.Schema

var userSchema = mongoose.Schema({
    // Allotted seconds + 60
    createdAt: { type: Date, expires: 660, default: Date.now },
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
