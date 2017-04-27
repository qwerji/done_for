const mongoose = require('mongoose')

mongoose.model('Winner', mongoose.Schema({
    name: String,
    time_played: Number,
    inventory: {
        "flat_crystal": Boolean,
        "digger_laser": Boolean,
        "red_stone": Boolean,
        "blue_stone": Boolean,
        "green_stone": Boolean,
        "flashlight": Boolean,
        "eva": Boolean
    }
}, {timestamps: true}))
