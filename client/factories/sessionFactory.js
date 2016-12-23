app.factory('sessionFactory', function($http, $location){
    let factory = {};
    factory.login = function(user){
        $http.post('/login', user).then(function(output){
            $location.url('/situation');
        });
    }
    factory.curUser = function(cb){
        $http.get('/curUser').then(function(output){
            cb(output.data);
        })
    }
    factory.clear_session = function() {
        $http.get('/logout').then(function(output) {
            
        })
    }
    return factory;
})
