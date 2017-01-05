let session = require('./../controllers/sessionController.js'),
    game = require('./../controllers/gameController.js'),
    end = require('./../controllers/endController.js')

module.exports = function(app){
    app.post('/login', session.login)
    app.post('/curUser', session.curUser)
    app.get('/logout', session.logout)
    app.post('/go', game.go)
    app.post('/get_item', game.get_item)
    app.get('/win', game.win)
    app.post('/die', game.die)
    app.get('/get_losers', end.get_losers)
    app.get('/get_winners', end.get_winners)
}
