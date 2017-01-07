app.controller('sessionController',function($scope, sessionFactory, $location){
    $scope.login = function(){
        $scope.errors = [];
        if(!$scope.newUser || !$scope.newUser.name){
            $scope.errors.push('Please enter a name')
        } else {
            sessionFactory.login($scope.newUser);
        }
    }

    sessionFactory.curUser(function(data){
        $scope.curUser = data;
        if(!$scope.curUser){
            $location.url('/login')
        }
    })
})
