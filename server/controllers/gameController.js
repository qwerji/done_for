let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Loser = mongoose.model('Loser'),
    Winner = mongoose.model('Winner')

module.exports = (function(){
    return {
        go: function(req, res){
            User.findOne({_id: req.session.user}, function(err, user){
                if (user) {
                    user.location = req.body.dest;
                    user.save()
                }
                res.json({status: true})
            })
        },
        get_item: function(req, res) {
            User.findOne({_id: req.session.user}, function(err, user){
                if (user) {
                    user.inventory[req.body.item] = true;
                    user.save()
                }
                res.json({status: true})
            })
        },
        lose_item: function(req, res) {
            User.findOne({_id: req.session.user}, function(err, user){
                if (user) {
                    user.inventory[req.body.item] = false;
                    user.save()
                }
                res.json({status: true})
            })
        },
        die: function(req, res) {
            User.findOne({_id: req.session.user}, function(err, user){
                let new_loser = new Loser({
                    name: user.name,
                    time_played: user.time_played,
                    cause_of_death: req.body.cause,
                    _id: user._id
                })
                new_loser.save(function(err, loser) {
                    user.remove()
                    res.json({status: true})
                })
            })
        },
        win: function(req, res) {
            User.findOne({_id: req.session.user}, function(err, user){
                let new_winner = new Winner({
                    name: user.name,
                    time_played: user.time_played,
                    inventory: user.inventory,
                    _id: user._id
                })
                new_winner.save(function(err, winner) {
                    user.remove()
                    res.json({status: true})
                })
            })
        }
    }
})()
