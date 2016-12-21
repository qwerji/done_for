var session = require('./../controllers/sessionController.js');

module.exports = function(app){
    app.post('/login', function(req, res){
        session.login(req, res);
    })
    app.get('/curUser', function(req, res){
        session.curUser(req, res);
    })
    app.get('/logout', function(req, res){
        session.logout(req, res);
    })
    app.post('/go', function(req, res){
        session.go(req, res);
    })
    app.post('/get_item', function(req, res) {
        session.get_item(req, res);
    })
}
