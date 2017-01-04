let session = require('./../controllers/sessionController.js'),
    game = require('./../controllers/gameController.js'),
    death = require('./../controllers/deathController.js')

module.exports = function(app){
    app.post('/login', session.login)
    app.post('/curUser', session.curUser)
    app.get('/logout', session.logout)
    app.post('/go', game.go)
    app.post('/get_item', game.get_item)
    app.post('/die', game.die)
    app.get('/get_losers', death.get_losers)
}
