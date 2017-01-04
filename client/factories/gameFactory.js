app.factory('gameFactory', function($http, $location){
    let factory = {};
    
    let map = {
        'Ship': {
            prompt: 'You survived the crash only to find that your oxygen is leaking...',
            options: [
                {type: 'travel', text: 'Check Ship Computer', dest:'Ship Computer'},
                {type: 'travel', text: 'Check Armory Cabinet', dest: 'Armory'},
                {type: 'item', text: 'Put on EVA suit', name: 'EVA', icon: '👨‍🚀'}
            ],
            img_url:'http://orig04.deviantart.net/fa92/f/2011/107/e/2/passage_1_by_penemenn-d3e9aoh.jpg'
        },
        'Ship Computer': {
            prompt: 'Someone make this',
            options: [
                {type: 'travel', text: 'Back to the ship main compartment', dest: 'Ship'}
            ],
            img_url:'http://ak6.picdn.net/shutterstock/videos/2038331/thumb/2.jpg'
        },
        'Armory': {
            prompt: 'All the weapons appear to be unusable...but there appears to be an undamaged flashlight.',
            options: [
                {type: 'travel', text: 'Back to the ship main compartment', dest: 'Ship'},
                {type: 'item', text: 'Pick up the flashlight.', name: 'Flashlight', icon: '🔦'},
            ],
            img_url:'http://i.imgur.com/18Z47Ll.jpg'
        },
        'Crash Site': {
            prompt: 'Outside the ship you see that you can go three directions...',
            options: [
                {type: 'travel', text: 'Go West to the Lake', dest: 'Lake'},
                {type: 'travel', text: 'Go North to the Wastes.', dest:'Wastes'},
                {type: 'travel', text: 'Go East to the Crystal Forest', dest: 'Crystal Forest'},
                {type: 'travel', text: 'Go into the Ship', dest: 'Ship'}
            ],
            img_url:'https://s-media-cache-ak0.pinimg.com/originals/07/5c/37/075c37b3bf9051d109092713f3a60b13.jpg'
        },
        'Crystal Forest': {
            prompt: 'Standing at the entrance to the forest you notice a hole in one of the crystals nearby..',
            options: [
                {type: 'travel', text: 'Continue to investigate the forest', dest: 'Deep Forest'},
                {type: 'travel', text: 'Climb through the hole in the crystal', dest: 'Crystal Hole'},
                {type: 'travel', text: 'Go to the crash site.', dest: 'Crash Site'},
            ],
            img_url:'http://www.hotel-r.net/im/hotel/ca/crystal-forest.jpg'
        },
        'Lake': {
            prompt: 'You think you notice a small hole in the bottom of the lake...',
            options: [
                {type: 'travel', text: 'Swim down and check out the hole.', dest: 'Lake Hole'},
                {type: 'death', text: 'Slip and die.', cause: 'You slipped'},
                {type: 'travel', text: 'Go to the crash site.', dest: 'Crash Site'},
            ],
            img_url:'http://www.walldevil.com/wallpapers/a77/night-planet-sky-lake.jpg'
        },
        'Lake Hole': {
            prompt: 'You swim through the dense lake and find once you reach the hole two paths you could take. The left is pitch black, but you do have your flashlight.',
            options: [
                {type: 'travel', text: 'Take the left path', dest: 'Lake Hole Left'},
                {type: 'travel', text: 'Take the right path', dest: 'Lake Hole Right'},
                {type: 'travel', text: 'Swim back to the surface', dest: 'Lake'},
            ],
            img_url:'http://www.walldevil.com/wallpapers/a77/night-planet-sky-lake.jpg'
        },
        'Lake Hole Left': {
            prompt: 'You notice inscriptions to the left thanks to your trusty flash light',
            options: [
                {type: 'travel', text: 'Take the left path', dest: 'Lake Hole Left'},
                {type: 'travel', text: 'Take the right path', dest: 'Lake Hole Right'},
                {type: 'travel', text: 'Swim back to the surface', dest: 'Lake'},
            ],
            img_url:'http://www.walldevil.com/wallpapers/a77/night-planet-sky-lake.jpg'
        },
        'Wastes': {
            prompt: 'You are at the wastes. You see three paths you can take...',
            options: [
                {type: 'travel', text: 'Go to the crash site.', dest: 'Outside Ship'},
                {type: 'travel', text: 'Go to the cave.', dest: 'Cave'}
            ],
            img_url: 'https://kaskenkronicles.files.wordpress.com/2015/08/final-fantasy-jakerowell-envir-wasteland9.jpg'
        }
    }

    let attributes = {
        'used_staircase': false,
        'alien_is_angry': false
    }

    factory.get_situation = function(hero, cb) {
        let location = map[hero.location]
        if (location.options.length) { // splices item from options if in user inventory
            for (var i = 0; i < location.options.length; i++) {
                if (location.options[i].type == 'item' || 'item/travel') {
                    if (hero.inventory[location.options[i].icon]) {
                        location.options.splice(i,1)
                    }
                }
            }
        }
        if (hero.location == 'Ship') {
            // If you have the EVA and the option to leave the ship hasn't already been pushed
            if (hero.inventory['👨‍🚀']) {
                if (location.options[location.options.length-1].dest !== 'Outside Ship') {
                    location.options.push({type: 'travel', text: 'Leave the ship', dest: 'Crash Site'})
                }
            }
        }
        cb(location)
    }

    function travel(option, cb) {
        let dest = option.dest
        $http.post('/go', {dest}).then(function(output){
            cb()
            return
        })
    }

    function get_item(option, cb) {
        let item = option.icon
        $http.post('/get_item', {item}).then(function(output) {
            cb()
            return
        })
    }

    function change_attr(option) {
        if (!attributes[option.attr]) {
            attributes[option.attr] = true
            return
        }
        else {
            attributes[option.attr] = false
            return
        }
    }

    factory.do = function(option, cb) {
        if (option.type == 'travel') {
            travel(option, cb)
        }
        else if (option.type == 'item') {
            get_item(option, cb)
        }
        else if (option.type == 'item/travel') {
            travel(option, cb)
            get_item(option, cb)
        }
        else if (option.type == 'attr') {
            change_attr(option)
        }
        else if (option.type == 'attr/travel') {
            change_attr(option)
            travel(option, cb)
        }
        else if (option.type == 'death') {
            let cause = option.cause
            $http.post('/die', {cause}).then(function(output) {
                $location.url('/dead')
            })
        }
    }

    return factory;
})
