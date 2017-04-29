const User = require('mongoose').model('User')

module.exports = (() => {
    return {
        login: (req, res) => {
            const newUser = new User(req.body)
            newUser.save((err, user) => {
                if (err) { console.log(err) }
                if(user){
                    req.session.user = user._id
                    req.session.save()
                    res.json({status: true})
                } else {
                    res.json(null)
                }
            })
        },
        curUser: (req, res) => {
            User.findOne({_id: req.session.user}, (err, user) => {
                if (err) { console.log(err) }
                if (user){
                    if (req.body.time) {
                        user.time_played = +((600 - req.body.time)/60).toFixed(2)
                        user.save()
                    }
                    res.json(user)
                } else {
                    res.json(null)
                }
            })
        },
        logout: (req, res) => {
            req.session.destroy()
            res.json({status: true})
        }
    }
})()
