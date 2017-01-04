app.controller('gameController', function($scope, sessionFactory, gameFactory, $location, ngAudio) {
    function get_situation() {
        gameFactory.get_situation($scope.curUser, function(situation) {
            $scope.situation = situation;
        })
    }

    function update(){
        sessionFactory.curUser($scope.time, function(data){
            $scope.curUser = data;
            if(!$scope.curUser){
                $location.url('/login');
            }
            get_situation()
        })
    }

    $scope.do = function(option) {
        gameFactory.do(option, function(){
            update()
        })
    }

    function decrement() {
        $scope.time = $scope.time - 1
        if ($scope.time <= 0) {
            alert("YOU'RE DEAD")
            // $location.url('/logout')
            $scope.time = 0
        }
    }

    $scope.time = 1800;
    setInterval(function() {
        $scope.$apply(decrement)
    }, 1000)

    update()
})
