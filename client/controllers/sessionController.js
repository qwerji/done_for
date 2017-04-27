app.controller('sessionController', function($scope, sessionFactory, $location, gameFactory) {

    // Logging in, with validations
    $scope.login = () => {
        if (!$scope.newUser || !$scope.newUser.name) {
            $scope.error = 'Please enter a name'
        } else {
            // This gets a fresh game instance
            gameFactory.refresh()
            sessionFactory.login($scope.newUser)
        }
    }

    sessionFactory.curUser(data => {
        $scope.curUser = data
        if (!$scope.curUser) {
            $location.url('/login')
        }
    })

    $scope.logout = () => {
        gameFactory.refresh()
        sessionFactory.clearSession(() => {
            $location.url('/login')
        })
    }
})
