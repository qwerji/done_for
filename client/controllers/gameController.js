app.controller('gameController', function($scope, sessionFactory, gameFactory, $location, ngAudio, $route, $location, $window) {
    $scope.do = function(option) {
        if (option.type == 'item' && option.name == 'eva') {
            start_timer()
        }
        gameFactory.do(option, function(){
            update()
        })
    }

    function update(){
        sessionFactory.curUser($scope.time, function(data){
            $scope.curUser = data;
            if(!$scope.curUser){
                $window.location.reload()
                $location.url('/login')
            }
            get_situation()
        })
    }
    
    function get_situation() {
        gameFactory.get_situation($scope.curUser, function(situation) {
            $scope.situation = situation;
        })
    }

    // Sets allowed play time in seconds
    // If you are changing this, you also need to change it in the back end  
    // session controller
    const initial_time = 600

    function decrement() {
        $scope.time = $scope.time - 1

        // Converts time left to percentage, for styling
        $scope.oxygen_percentage = Math.floor(($scope.time/initial_time) * 100)

        if ($scope.oxygen_percentage <= 10) {
            $scope.oxygen_color = 'red' // set these to HEX values that match line 57 eventually
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
            gameFactory.do({type: 'death', cause: 'Suffocated'})
            $scope.oxygen_percentage = 0
            $scope.time = 0
        }
    }

    function start_timer(argument) {
        $scope.time = initial_time;
        $scope.oxygen_percentage = 100
        $scope.oxygen_color = '#2983ac'
        setInterval(function() {
            $scope.$apply(decrement)
        }, 1000)
    }

    update()
})
