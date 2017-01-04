let mongoose = require('mongoose'),
    Loser = mongoose.model('Loser')

module.exports = (function(){
    return {
        get_losers: function(req, res) {
            if (!req.session.user) {
                return res.json({loser: false})
            }
            Loser.findOne({_id: req.session.user}, function(err, loser) {
                Loser.find({}, function(err, losers) {
                    losers.splice(losers.length-1,1)
                    return res.json({loser: loser, losers: losers})
                })
            })
        }
    }
})()
