app.factory('deathFactory', function($http, $location) {
    let factory = {}

    factory.get_losers = function(cb) {
        $http.get('/get_losers').then(function(output) {
            if (!output.data.loser) {
                $location.url('/login')
            }
            else {
                cb(output.data)
            }
        })
    }

    return factory
})
