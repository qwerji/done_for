const mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Loser = mongoose.model('Loser'),
    Winner = mongoose.model('Winner')

module.exports = (() => {
    return {
        go: (req, res) => {
            User.findOne({_id: req.session.user}, (err, user) => {
                if (err) { console.log(err) }
                if (user) {
                    user.location = req.body.dest
                    user.save()
                    res.json({status: true})
                } else {
                    res.json(null)
                }
            })
        },
        getItem: (req, res) => {
            User.findOne({_id: req.session.user}, (err, user) => {
                if (err) { console.log(err) }
                if (user) {
                    user.inventory[req.body.item] = true
                    user.save()
                    res.json({status: true})
                } else {
                    res.json(null)
                }
            })
        },
        loseItem: (req, res) => {
            User.findOne({_id: req.session.user}, (err, user) => {
                if (err) { console.log(err) }
                if (user) {
                    user.inventory[req.body.item] = false
                    user.save()
                    res.json({status: true})
                } else {
                    res.json(null)
                }
            })
        },
        die: (req, res) => {
            User.findOne({_id: req.session.user}, (err, user) => {
                if (err) { console.log(err) }
                if (user) {
                    let new_loser = new Loser({
                        name: user.name,
                        time_played: user.time_played,
                        cause_of_death: req.body.cause,
                        location: user.location,
                        inventory: user.inventory,
                        _id: user._id
                    })
                    new_loser.save((err, loser) => {
                        if (err) { console.log(err) }
                        user.remove()
                        res.json({status: true})
                    })
                } else {
                    res.json(null)
                }
            })
        },
        win: (req, res) => {
            User.findOne({ _id: req.session.user }, (err, user) => {
                if (err) { console.log(err) }
                if (user) {
                    const new_winner = new Winner({
                        name: user.name,
                        time_played: user.time_played,
                        inventory: user.inventory,
                        _id: user._id
                    })
                    new_winner.save((err, winner) => {
                        if (err) { console.log(err) }
                        user.remove()
                        res.json({ status: true })
                    })
                } else {
                    res.json(null)
                }
            })
        }
    }
})()
