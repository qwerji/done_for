var session = require('./../controllers/sessionController.js'),
    game = require('./../controllers/gameController.js')

module.exports = function(app){
    app.post('/login', function(req, res){
        session.login(req, res);
    })
    app.post('/curUser', function(req, res){
        session.curUser(req, res);
    })
    app.get('/logout', function(req, res){
        session.logout(req, res);
    })
    app.post('/go', function(req, res){
        game.go(req, res);
    })
    app.post('/get_item', function(req, res) {
        game.get_item(req, res);
    })
}
