app.factory('gameFactory', function($http){
    let factory = {};
    
    let map = {
        'Ship': {
            prompt: 'You are in the ship that has just crash landed',
            options: [
                {text: 'Go to the wastes.', dest:'Wastes'},
                { text: 'Go to the Lake', dest: 'Lake'},
            ],
            items:[],
            img_url:'https://s-media-cache-ak0.pinimg.com/originals/07/5c/37/075c37b3bf9051d109092713f3a60b13.jpg'
        },
        'Lake': {
            prompt: 'You are at the lake.',
            options: [{ text: 'Go to the ship.', dest: 'Ship'}],
            items:[{ text: 'Get ye flashlight.', name: 'Flashlight', icon: '🔦'}],
            img_url:'http://www.walldevil.com/wallpapers/a77/night-planet-sky-lake.jpg'
        },
        'Wastes': {
            prompt: 'You are at the wastes.',
            options: [
                { text: 'Go to the ship.', dest: 'Ship'},
                { text: 'Go to the cave.', dest: 'Cave'}
            ],
            items:[],
            img_url: 'https://kaskenkronicles.files.wordpress.com/2015/08/final-fantasy-jakerowell-envir-wasteland9.jpg'
        },
        'Cave': {
            prompt: 'You got to the cave you win all the internets!',
            options: [
                { text: 'Go to the wastes.', dest: 'Wastes' }
            ],
            items:[],
            img_url:'http://dev.textraveler.com/wp-content/uploads/2014/03/4804_113460017852_3654002_n.jpg'
        }
    }

    factory.get_situation = function(hero, cb) {
        let location = map[hero.location]
        if (location.items.length) { // splices item from options if in user inventory
            for (var i = 0; i < location.items.length; i++) {
                if (hero.inventory[location.items[i].icon]) {
                    location.items.splice(i,1)
                }
            }
        }
        if (hero.location == 'Wastes') {
            if (!hero.inventory['🔦']) {
                let filtered_loc = {
                    prompt: location.prompt,
                    options: [location.options[0]],
                    items: [],
                    img_url: location.img_url
                };
                cb(filtered_loc)
                return;
            }
        }
        cb(location)
    }

    factory.go = function(dest, cb) {
        $http.post('/go', dest).then(function(output){
            cb()
        })
    }
    factory.get_item = function(item, cb) {
        $http.post('/get_item', item).then(function(output) {
            cb()
        })
    }
    return factory;
})
