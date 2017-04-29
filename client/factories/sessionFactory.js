app.factory('sessionFactory', function($http, $location) {

    const factory = {}

    factory.login = user => {
        $http.post('/login', user).then(function(output){
            $location.url('/situation');
        })
    }

    factory.curUser = (time, cb) => {
        $http.post('/curUser', {time}).then(function(output){
            cb(output.data)
        })
    }

    factory.clearSession = (cb=null) => {
        $http.get('/logout').then(function(output) {
            if (cb) { cb() }
        })
    }

    return factory
})
