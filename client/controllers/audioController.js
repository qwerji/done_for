app.controller('audioController', function($scope, $window) {

    // Load audio files
    const soundtrack = new Audio('./../sounds/donefor_v1.wav'),
        mouseover = new Audio('./../sounds/df_mouse.wav'),
        mousedown = new Audio('./../sounds/df_click.wav')

    soundtrack.loop = true

    $scope.startSoundtrack = () => {
        soundtrack.play()
    }

    $scope.mouseover = () => {
        mouseover.play()
    }

    $scope.mousedown = () => {
        mousedown.play()
    }

    // Mute all audio tracks, UI change, localStorage
    $scope.mute = () => {
        if (soundtrack.muted) {
            soundtrack.muted = false
            mouseover.muted = false
            mousedown.muted = false
            $scope.muteText = 'ON'
        } else {
            soundtrack.muted = true
            mouseover.muted = true
            mousedown.muted = true
            $scope.muteText = 'OFF'
        }
        $window.localStorage.setItem('audio', $scope.muteText)
    }

    $scope.muteText = 'ON'

    if ($window.localStorage.getItem('audio') === 'OFF') {
        soundtrack.muted = false
        $scope.mute()
    }

})
