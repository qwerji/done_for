let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var loserSchema = mongoose.Schema({
    name: String,
    time_played: Number,
    cause_of_death: String
}, {timestamps: true})

mongoose.model('Loser', loserSchema)
