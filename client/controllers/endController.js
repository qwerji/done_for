app.controller('endController', function($scope, endFactory) {
    // Gets losers and winners, but only displays one for now
    // Eventually I want to display both if you win or lose
    endFactory.getLosers(losers => {
        $scope.loser = losers.loser
        $scope.losers = losers.losers
    })
    endFactory.getWinners(winners => {
        $scope.winner = winners.winner
        $scope.winners = winners.winners
    })
})
