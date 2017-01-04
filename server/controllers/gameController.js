var mongoose = require('mongoose');
var User = mongoose.model('User')

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
                user.inventory[req.body.item] = true;
                user.save()
                res.json({status: true})
            })
        }
    }
})()
