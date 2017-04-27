const session = require('./../controllers/sessionController.js'),
    game = require('./../controllers/gameController.js'),
    end = require('./../controllers/endController.js')

module.exports = app => {
    app.post('/login', session.login)
    app.post('/curUser', session.curUser)
    app.get('/logout', session.logout)
    app.post('/go', game.go)
    app.post('/getItem', game.getItem)
    app.post('/loseItem', game.loseItem)
    app.get('/win', game.win)
    app.post('/die', game.die)
    app.get('/getLosers', end.getLosers)
    app.get('/getWinners', end.getWinners)
}
