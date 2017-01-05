let mongoose = require('mongoose'),
    User = mongoose.model('User')

module.exports = (function(){
    return {
        login: function(req, res){
            let newUser = new User(req.body)
            newUser.save(function(err, user){
                if(user){
                    req.session.user = user._id;
                    req.session.save()
                    res.json({status: true})
                } else {
                    res.json(err);
                }
            })
        },
        curUser: function(req, res){
            User.findOne({_id: req.session.user}, function(err, user){
                if (user){
                    user.time_played = +((600 - req.body.time)/60).toFixed(2)
                    user.save()
                }
                res.json(user)
            })
        },
        logout: function(req, res){
            req.session.destroy()
            res.redirect('/')
        }
    }
})()
