app.factory('gameFactory', function($http, $location) {

    const factory = {}

    factory.do = (option, cb=null) => {
        // Parses selected option's type
        switch(option.type) {
            case 'travel':
                travel(option, cb)
                break
            case 'item':
                getItem(option, cb)
                break
            case 'item/travel':
                travel(option)
                getItem(option, cb)
                break
            case 'attr':
                changeAttr(option, cb)
                break
            case 'attr/travel':
                changeAttr(option)
                travel(option, cb)
                break
            case 'item/lose_item/travel':
                getItem(option)
                loseItem(option)
                travel(option, cb)
                break
            case 'death':
                factory.refresh()
                $http.post('/die', {cause: option.cause}).then(function(output) {
                    $location.url('/dead')
                })
                break
            case 'win':
                factory.refresh()
                $http.get('/win').then(function(output) {
                    $location.url('/winner')
                })
                break
            default:
                factory.refresh()
                $http.post('/die', {cause: 'Cheating'}).then(function(output) {
                    $location.url('/dead')
                })
        }
    }

    factory.refresh = GameStateManager.refresh

    factory.getSituation = function(hero, cb) {
        cb(GameStateManager.getSituation(hero))
    }

    function travel(option, cb=null) {
        $http.post('/go', {dest: option.dest}).then(function(output){
            if (cb) { cb() }
        })
    }

    function getItem(option, cb=null) {
        $http.post('/getItem', {item: option.name}).then(function(output) {
            if (cb) { cb() }
        })
    }

    function loseItem(option, cb=null) {
        $http.post('/loseItem', {item: option.lost_name}).then(function(output) {
            if (cb) { cb() }
        })
    }

    function changeAttr(option, cb=null) {
        GameStateManager.changeAttr(option)
        if (cb) { cb() }
    }

    return factory
})
