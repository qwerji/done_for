app.controller('sessionController',function($scope, sessionFactory, gameFactory, $location, ngAudio){
    $scope.login = function(){
        $scope.errors = [];
        if(!$scope.newUser || !$scope.newUser.name){
            $scope.errors.push('Name cannot be blank')
        } else if($scope.newUser.name.length < 2){
            $scope.errors.push('Name must be at least 2 Characters')
        } else {
            sessionFactory.login($scope.newUser);
        }
    }

    sessionFactory.curUser(function(data){
        $scope.curUser = data;
        if(!$scope.curUser){
            $location.url('/login');
        }
    })
})
