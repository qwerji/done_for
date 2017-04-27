const mongoose = require('mongoose'),
    Loser = mongoose.model('Loser'),
    Winner = mongoose.model('Winner')

module.exports = (() => {
    return {
        getLosers: (req, res) => {
            if (!req.session.user) {
                return res.json({ loser: false })
            }
            Loser.findOne({ _id: req.session.user }, (err, loser) => {
                Loser.find({}, (err, losers) => {
                    if (err) { console.log(err) }
                    if (losers && loser) {
                        // Remove the current loser from the recents array
                        for (let i = 0; i < losers.length; i++) {
                            if (String(losers[i]._id) == String(loser._id)) {
                                losers.splice(i,1)
                                break
                            }
                        }
                        res.json({ loser: loser, losers: losers })
                    } else {
                        res.json(null)
                    }
                })
            })
        },
        getWinners: (req, res) => {
            if (!req.session.user) {
                return res.json({ winner: false })
            }
            Winner.findOne({ _id: req.session.user }, (err, winner) => {
                Winner.find({}, (err, winners) => {
                    if (err) { console.log(err) }
                    if (winners && winner) {
                        // Remove the current winner from the recents array
                        for (let i = 0; i < winners.length; i++) {
                            if (String(winners[i]._id) == String(winner._id)) {
                                winners.splice(i,1)
                                break
                            }
                        }
                        res.json({ winner: winner, winners: winners })
                    } else {
                        res.json(null)
                    }
                })
            })
        }
    }
})()
