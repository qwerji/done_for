app.factory('endFactory', function($http, $location) {

    const factory = {}

    factory.getLosers = function(cb) {
        $http.get('/getLosers').then(output => {
            if ($location.url() == '/dead' && !output.data.loser) {
                $location.url('/login')
            }
            cb(output.data)
        })
    }

    factory.getWinners = function(cb) {
        $http.get('/getWinners').then(output => {
            if ($location.url() == '/winner' && !output.data.winner) {
                $location.url('/login')
            }
            cb(output.data)
        })
    }

    return factory
})
