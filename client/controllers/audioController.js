app.controller('audioController', function($scope, ngAudio) {

    // Load audio files
    const soundtrack = ngAudio.load('./../sounds/donefor_v1.wav'),
        mouseover = ngAudio.load('./../sounds/df_mouse.wav'),
        mousedown = ngAudio.load('./../sounds/df_click.wav')

    soundtrack.loop = true

    $scope.startSoundtrack = () => {
        soundtrack.play()
    }

    // Mute all audio tracks, UI change, localStorage
    $scope.mute = () => {
        if (soundtrack.muting) {
            soundtrack.muting = false
            mouseover.muting = false
            mousedown.muting = false
            $scope.muteText = 'ON'
            localStorage.setItem('mute', 0)
        } else {
            soundtrack.muting = true
            mouseover.muting = true
            mousedown.muting = true
            $scope.muteText = 'OFF'
            localStorage.setItem('mute', 1)
        }
    }

    $scope.muteText = 'ON'

    // Plays the mouseover sounds for buttons
    $scope.mouseover = () => {
        mouseover.play()
    }

    $scope.mousedown = () => {
        mousedown.play()
    }

    // Get the saved mute state if it exists
    if (localStorage.getItem('mute') === 1) {
        $scope.mute()
    }
})
