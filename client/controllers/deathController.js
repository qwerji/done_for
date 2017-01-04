app.controller('deathController', function($scope, deathFactory) {
    deathFactory.get_losers(function(losers) {
        $scope.loser = losers.loser
        $scope.losers = losers.losers
    })
})
