app.controller('sessionController',function($scope, sessionFactory, $location, gameFactory){
    $scope.login = function(){
        if(!$scope.newUser || !$scope.newUser.name){
            $scope.error = 'Please enter a name'
        } else {
            sessionFactory.login($scope.newUser)
        }
    }

    sessionFactory.curUser(function(data){
        $scope.curUser = data
        if(!$scope.curUser){
            $location.url('/login')
        }
    })

    $scope.logout = function() {
        gameFactory.refresh()
        sessionFactory.clear_session(function() {
            $location.url('/login')
        })
    }
})
