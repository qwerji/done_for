let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var winnerSchema = mongoose.Schema({
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
}, {timestamps: true})

mongoose.model('Winner', winnerSchema)
