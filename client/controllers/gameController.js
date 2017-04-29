app.controller('gameController', function($scope, sessionFactory, gameFactory, $location, $window) {

    // Recieves a user action in the form of an option object
    $scope.do = option => {
        // Starts the oxygen timer if an item was picked up and it was
        // the eva suit
        if (option.type == 'item' && option.name == 'eva') {
            startTimer()
        }
        // Perform the action, then update the UI
        gameFactory.do(option, update)
    }

    function update() {
        // Gets the current user's data
        sessionFactory.curUser($scope.time, data => {
            $scope.curUser = data
            if (!$scope.curUser) {
                $window.location.reload()
                $location.url('/login')
            }
            // Gets the current situation
            getSituation()
        })
    }

    function getSituation() {
        gameFactory.getSituation($scope.curUser, situation => {
            $scope.situation = situation
        })
    }

    // Sets allowed play time in seconds
    // If you are changing this, you also need to change it in the back end  
    // session controller
    const initialTime = 600

    function decrement() {
        $scope.time = $scope.time - 1

        // Converts time left to percentage, for styling
        $scope.oxygenPercentage = Math.floor(($scope.time / initialTime) * 100)

        if ($scope.oxygenPercentage <= 10) {
            $scope.oxygenColor = 'red'
        } else if ($scope.oxygenPercentage <= 25) {
            $scope.oxygenColor = 'orange'
        } else if ($scope.oxygenPercentage <= 50) {
            $scope.oxygenColor = 'yellow'
        } else if ($scope.oxygenPercentage <= 75) {
            $scope.oxygenColor = 'green'
        }
        if ($scope.time <= 0) {
            gameFactory.do({ type: 'death', cause: 'Suffocated' })
            $scope.oxygenPercentage = 0
            $scope.time = 0
        }
    }

    function startTimer(argument) {
        $scope.time = initialTime;
        $scope.oxygenPercentage = 100
        $scope.oxygenColor = '#2983ac'
        setInterval(() => {
            // Makes sure that the decrement and it's $scope variables
            // that update the UI are done within Angular's life cycle...?
            $scope.$apply(decrement)
        }, 1000)
    }

    update()
})
