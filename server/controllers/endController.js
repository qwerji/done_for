let mongoose = require('mongoose'),
    Loser = mongoose.model('Loser'),
    Winner = mongoose.model('Winner')

module.exports = (function(){
    return {
        get_losers: function(req, res) {
            if (!req.session.user) {
                return res.json({loser: false})
            }
            Loser.findOne({_id: req.session.user}, function(err, loser) {
                Loser.find({}, function(err, losers) {
                    if (err) { console.log(err) }
                    if (losers) {
                        losers.splice(losers.length-1,1)
                        res.json({loser: loser, losers: losers})
                    } else {
                        res.json(null)
                    }
                })
            })
        },
        get_winners: function(req, res) {
            if (!req.session.user) {
                return res.json({winner: false})
            }
            Winner.findOne({_id: req.session.user}, function(err, winner) {
                Winner.find({}, function(err, winners) {
                    if (err) { console.log(err) }
                    if (winners) {
                        winners.splice(winners.length-1,1)
                        res.json({winner: winner, winners: winners})
                    } else {
                        res.json(null)
                    }
                })
            })
        }
    }
})()
