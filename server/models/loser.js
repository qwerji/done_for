const mongoose = require('mongoose')

mongoose.model('Loser', mongoose.Schema({
    name: String,
    time_played: Number,
    cause_of_death: String,
    location: {type: String, default:'Ship'},
    inventory: {
        "flat_crystal": {type: Boolean, default: false},
        "digger_laser": {type: Boolean, default: false},
        "red_stone": {type: Boolean, default: false},
        "blue_stone": {type: Boolean, default: false},
        "green_stone": {type: Boolean, default: false},
        "flashlight": {type: Boolean, default: false},
        "eva": {type: Boolean, default: false}
    }
}, {timestamps: true}))
