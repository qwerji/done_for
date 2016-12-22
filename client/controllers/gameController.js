app.controller('gameController', function($scope, sessionFactory, gameFactory, $location, ngAudio) {
    function get_situation() {
        gameFactory.get_situation($scope.curUser, function(situation) {
            $scope.situation = situation;
        })
    }

    function update(){
        sessionFactory.curUser(function(data){
            $scope.curUser = data;
            if(!$scope.curUser){
                $location.url('/login');
            }
            get_situation()
        })
    }

    $scope.go = function(dest) {
        gameFactory.go({dest}, function(){
            update()
        })
    }

    $scope.get_item = function(item) {
        gameFactory.get_item({item}, function() {
            update()
        })
    }

    function onTimeout() {
        alert('Done For')
    }

    function decrement() {
        $scope.time = $scope.time - 1
        if ($scope.time <= 0) {
            if ($scope.curUser.location !== 'Cave') {
                alert("YOU'RE DEAD")
                $location.url('/logout')
            }
            $scope.time = 0
        }
    }

    $scope.time = 1800;
    setInterval(function() {
        $scope.$apply(decrement)
    }, 1000)

    update()
})
