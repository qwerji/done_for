let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var winnerSchema = mongoose.Schema({
    name: String,
    time_played: Number,
    inventory: {
        "🖱️": Boolean,
        "🔫️": Boolean,
        "🔴️": Boolean,
        "🔷️": Boolean,
        "💚": Boolean,
        "🔦": Boolean,
        "🔋": Boolean
    }
}, {timestamps: true})

mongoose.model('Winner', winnerSchema)
