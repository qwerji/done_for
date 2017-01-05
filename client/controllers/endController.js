app.controller('endController', function($scope, endFactory) {
    endFactory.get_losers(function(losers) {
        $scope.loser = losers.loser
        $scope.losers = losers.losers
    })
    endFactory.get_winners(function(winners) {
        $scope.winner = winners.winner
        $scope.winners = winners.winners
    })
})
