app.factory('gameFactory', function($http, $location, $window){
    let factory = {};

    let game = new GameStateManager()

    factory.do = function(option, cb=null) {
        // Parses selected option's type
        if (option.type == 'travel') {
            travel(option, cb)
        }
        else if (option.type == 'item') {
            get_item(option, cb)
        }
        else if (option.type == 'item/travel') {
            travel(option)
            get_item(option, cb)
        }
        else if (option.type == 'attr') {
            change_attr(option, cb)
        }
        else if (option.type == 'attr/travel') {
            change_attr(option)
            travel(option, cb)
        }
        else if (option.type == 'item/lose_item/travel') {
            get_item(option)
            lose_item(option)
            travel(option, cb)
        }
        else if (option.type == 'death') {
            factory.refresh()
            $http.post('/die', {cause: option.cause}).then(function(output) {
                $location.url('/dead')
            })
        }
        else if (option.type == 'win') {
            factory.refresh()
            $http.get('/win').then(function(output) {
                $location.url('/winner')
            })
        }
    }

    factory.refresh = function() {
        game = game.refresh()
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
