app.controller('audioController', function($scope, ngAudio) {

    const soundtrack = ngAudio.load('./../sounds/donefor_v1.wav')
    const mouseover = ngAudio.load('./../sounds/df_mouse.wav')
    const mousedown = ngAudio.load('./../sounds/df_click.wav')
    soundtrack.loop = true

    $scope.startSoundtrack = function() {
        soundtrack.play()
    }

    $scope.mute = function() {
        if (soundtrack.muting) {
            soundtrack.muting = false
            mouseover.muting = false
            mousedown.muting = false
            $scope.muteText = 'ON'
        } else {
            soundtrack.muting = true
            mouseover.muting = true
            mousedown.muting = true
            $scope.muteText = 'OFF'
        }
    }

    $scope.muteText = 'ON'

    $scope.mouseover = function() {
        mouseover.play()
    }

    $scope.mousedown = function() {
        mousedown.play()
    }
})
