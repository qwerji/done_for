app.factory('endFactory', function($http, $location) {
    let factory = {}

    factory.get_losers = function(cb) {
        $http.get('/get_losers').then(function(output) {
            cb(output.data)
        })
    }
    factory.get_winners = function(cb) {
        $http.get('/get_winners').then(function(output) {
            cb(output.data)
        })
    }

    return factory
})
