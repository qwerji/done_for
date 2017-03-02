app.factory('gameFactory', function($http, $location, $window){
    let factory = {};

    let game = GameStateManager

    factory.do = function(option, cb=null) {
        // Parses selected option's type
        switch(option.type) {
            case 'travel':
                travel(option, cb)
                break
            case 'item':
                get_item(option, cb)
                break
            case 'item/travel':
                travel(option)
                get_item(option, cb)
                break
            case 'attr':
                change_attr(option, cb)
                break
            case 'attr/travel':
                change_attr(option)
                travel(option, cb)
                break
            case 'item/lose_item/travel':
                get_item(option)
                lose_item(option)
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

    factory.refresh = function() {
        game.refresh()
    }

    factory.get_situation = function(hero, cb) {
        cb(game.getSituation(hero))
    }

    function travel(option, cb=null) {
        $http.post('/go', {dest: option.dest}).then(function(output){
            if (cb) {
                cb()
            }
        })
    }

    function get_item(option, cb=null) {
        $http.post('/get_item', {item: option.name}).then(function(output) {
            if (cb) {
                cb()
            }
        })
    }

    function lose_item(option, cb=null) {
        $http.post('/lose_item', {item: option.lost_name}).then(function(output) {
            if (cb) {
                cb()
            }
        })
    }

    function change_attr(option, cb=null) {
        game.changeAttr(option)
        if (cb) {
            cb()
        }
    }

    return factory;
})
