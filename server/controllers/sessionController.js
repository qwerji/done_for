var mongoose = require('mongoose');
var User = mongoose.model('User')

module.exports = (function(){
    return {
        login: function(req, res){
            var newUser = new User(req.body)
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
                res.json(user)
            })
        },
        go: function(req, res){
            User.findOne({_id: req.session.user}, function(err, user){
                user.location = req.body.dest;
                user.save()
                res.json({status: true})
            })
        },
        get_item: function(req, res) {
            User.findOne({_id: req.session.user}, function(err, user){
                user.inventory[req.body.item] = true;
                user.save()
                res.json({status: true})
            })
        },
        logout: function(req, res){
            req.session.destroy()
            res.redirect('/')
        }
    }
})()
