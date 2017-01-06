app.factory('endFactory', function($http, $location) {
    let factory = {}

    factory.get_losers = function(cb) {
        $http.get('/get_losers').then(function(output) {
            if ($location.url() == '/dead' && !output.data.loser) {
                $location.url('/login')
            }
            cb(output.data)
        })
    }
    factory.get_winners = function(cb) {
        $http.get('/get_winners').then(function(output) {
            if ($location.url() == '/winner' && !output.data.winner) {
                $location.url('/login')
            }
            cb(output.data)
        })
    }

    return factory
})
