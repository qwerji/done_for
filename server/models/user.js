const mongoose = require('mongoose')

mongoose.model('User', mongoose.Schema({
    name: {type: String, required: true},
    inventory: {
        "flat_crystal": {type: Boolean, default: false},
        "digger_laser": {type: Boolean, default: false},
        "red_stone": {type: Boolean, default: false},
        "blue_stone": {type: Boolean, default: false},
        "green_stone": {type: Boolean, default: false},
        "flashlight": {type: Boolean, default: false},
        "eva": {type: Boolean, default: false}
    },
    time_played: Number,
    location: {type: String, default:'Ship'}
}, {timestamps: true}))
