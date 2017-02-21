app.factory('sessionFactory', function($http, $location){
    let factory = {}
    factory.login = function(user){
        $http.post('/login', user).then(function(output){
            $location.url('/situation');
        })
    }
    factory.curUser = function(time, cb){
        $http.post('/curUser', {time}).then(function(output){
            cb(output.data)
        })
    }
    factory.clear_session = function(cb=null) {
        $http.get('/logout').then(function(output) {
            if (cb) { cb() }
        })
    }
    return factory;
})
