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
        if (option.type == 'item' && option.name == 'EVA') {
            start_timer()
        }
        gameFactory.do(option, function(){
            update()
        })
    }

    function decrement() {
        $scope.time = $scope.time - 1
        $scope.oxygen_percentage = Math.floor(($scope.time/30) * 100)
        if ($scope.oxygen_percentage <= 10) {
            $scope.oxygen_color = 'red' // set these to HEX values eventually
        }
        else if ($scope.oxygen_percentage <= 25) {
            $scope.oxygen_color = 'orange'
        }
        else if ($scope.oxygen_percentage <= 50) {
            $scope.oxygen_color = 'yellow'
        }
        else if ($scope.oxygen_percentage <= 75) {
            $scope.oxygen_color = 'green'
        }
        if ($scope.time <= 0) {
            // alert("YOU'RE DEAD")
            // $location.url('/logout')
            $scope.oxygen_percentage = 0
            $scope.time = 0
        }
    }

    function start_timer(argument) {
        $scope.time = 30;
        $scope.oxygen_percentage = 100
        $scope.oxygen_color = '#2983ac'
        setInterval(function() {
            $scope.$apply(decrement)
        }, 1000)
    }

    update()
})
