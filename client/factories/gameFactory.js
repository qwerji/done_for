app.factory('gameFactory', function($http, $location, $window){
    let factory = {};

    let attributes = {
        'used_staircase': false,

        'is_in_wastes': false,
        'wastes_coords': [0, 0],

        'opening_depth': 0,

        'monster_killed': false,

        'alien_flashlight': false,
        'alien_rude': false,

        'floor_lasered': false,

        'left_switch': true,
        'middle_switch': false,
        'right_switch': false
    }

    factory.get_situation = function(hero, cb) {
        // worldMap is from map.js
        let situation = worldMap[hero.location]

        // Splices item from options if in user inventory
        if (situation.options.length) {
            for (var i = 0; i < situation.options.length; i++) {
                if (situation.options[i].type == 'item' || 'item/travel') {
                    if (hero.inventory[situation.options[i].icon]) {
                        situation.options.splice(i,1)
                    }
                }
            }
        }

        //  Location-based Logic
        if (hero.location == 'Ship') {
            // If you have the EVA and the option to leave the ship hasn't already been pushed
            if (hero.inventory['🔋']) {
                if (situation.options[situation.options.length-1].dest !== 'Crash Site') {
                    situation.options.push({type: 'travel', text: 'Leave the ship', dest: 'Crash Site'})
                }
            }
        }
        else if (hero.location == 'Wastes') {
            // Sets wastes options to wandering mode, if you are IN the wastes
            if (attributes['is_in_wastes']) {
                situation = {
                    prompt: 'You wander aimlessly in the Wastes. You wonder if this was a good idea.',
                    options: [
                        {type: 'attr', text: 'Walk north into the Wastes.', attr: 'n_wastes'},
                        {type: 'attr', text: 'Walk east into the Wastes.', attr: 'e_wastes'},
                        {type: 'attr', text: 'Walk west into the Wastes.', attr: 'w_wastes'},
                        {type: 'attr', text: 'Leave the Wastes.', attr: 'is_in_wastes'}
                    ],
                    img_url: 'https://kaskenkronicles.files.wordpress.com/2015/08/final-fantasy-jakerowell-envir-wasteland9.jpg'
                }
                // Replaces option to leave wastes with option to go south in the wastes, if coordinates are not [0, 0]
                if (attributes['wastes_coords'][0] !== 0 || attributes['wastes_coords'][1] !== 0) {
                    situation.options[3] = {type: 'attr', text: 'Walk south into the Wastes.', attr: 's_wastes'}
                }
            }
        }
        else if (hero.location == 'Lake Hole') {
            if (hero.inventory['🔦']) {
                situation.options[0] = {type: 'travel', text: 'Take the pitch-black left tunnel', dest: 'Inscriptions'}
            }
        }
        else if (hero.location == 'Lake Tunnel') {
            if (hero.inventory['🔦']) {
                situation.options[0] = {type: 'death', text: 'Take the pitch-black left tunnel', cause: 'Killed by a giant eel'}
            }
        }
        else if (hero.location == 'Crystal Cavern') {
            if (hero.inventory['💚']) {
                situation.prompt = 'You enter a gleaming cavern, with clusters of crystals clinging to every surface. There is an opening on the left wall that looks like you could squeeze your way into. You also notice a crystal stairway to your right.'
            }
            if (attributes['floor_lasered']) {
                situation.options[1] = {type: 'travel', text: 'Enter the floor door', dest: 'Base'}
            }
            if (attributes['used_staircase']) {
                situation.options[3] = {type: 'travel', text: 'Climb the stairway', dest: 'Forest Exterior'}
            }
        }
        else if (hero.location == 'Cavern Opening') {
            if (attributes['opening_depth'] <= 0) {
                situation.options[1] = {type: 'travel', text: 'Go back to the cavern', dest: 'Crystal Cavern'}
            }
            else {
                situation.options[1] = {type: 'attr', text: 'Go back', attr: 'opening_dec'}
            }
            if (attributes['opening_depth'] >= 3) {
                situation.prompt = 'You managed to go deeper into the opening, but you find that you are unable to move at all.'
                situation.options = []
            }
        }
        else if (hero.location == 'Crystal Search') {
            if (hero.inventory['🔫']) {
                situation.options = [
                    {type: 'attr/travel', text: 'Use your Digger Laser on the door', attr: 'floor_lasered', dest:'Base'},
                    {type: 'travel', text: 'Go back', dest: 'Crystal Cavern'}
                ]
            }
        }
        else if (hero.location == 'Base') {
            if (!hero.inventory['🔦']) {
                situation.options[1] = {type: 'death', text: 'Enter the pitch-black open doorway', cause: 'No flashlight dark room'}
            }
            else {
                situation.options[1] = {type: 'travel', text: 'Enter the pitch-black open doorway', dest: 'Dark Room'}
            }
        }
        else if (hero.location == 'Console') {
            situation.options[4] = {type: 'death', text: 'Press the large button', cause: 'Wrong Switch Order'}
            if (attributes['left_switch']) {
                //display +--
                situation.img_url = 'imgs/switches/+--.svg'
                if (attributes['middle_switch']) {
                    //display ++-
                    situation.img_url = 'imgs/switches/++-.svg'
                    if (attributes['right_switch']) {
                        //display +++
                        situation.img_url = 'imgs/switches/+++.svg'
                    }
                }
                else if (attributes['right_switch']) {
                    //display +-+
                    situation.img_url = 'imgs/switches/+-+.svg'
                    //replace death option with success
                    situation.options[4] = {type: 'travel', text: 'Press the large button', dest: 'Active Command Center'}
                }
            }
            else if (attributes['right_switch']) {
                //display --+
                situation.img_url = 'imgs/switches/--+.svg'
                if (attributes['middle_switch']) {
                    //display -++
                    situation.img_url = 'imgs/switches/-++.svg'
                }
            }
            else if (attributes['middle_switch']) {
                //display -+-
                situation.img_url = 'imgs/switches/-+-.svg'
            }
            else {
                //display ---
                situation.img_url = 'imgs/switches/---.svg'
            }
        }
        else if (hero.location == 'Active Command Center') {
            if (hero.inventory['🔷']) {
                situation.prompt = 'The command center comes to life around you, lights turning on and machines humming. The strange machine in the corner appears to have been activated as well.'
            }
        }
        else if (hero.location == 'Behind Ship') {
            if (hero.inventory['🔫']) {
                situation = {
                    prompt: "There's nothing here but some wreckage from the crash.",
                    options: [
                        {type: 'travel', text: 'Go West to the Lake', dest: 'Lake'},
                        {type: 'travel', text: 'Go East to the Crystal Forest', dest: 'Forest Exterior'}
                    ],
                    img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
                }
            }
            else if (attributes['monster_killed']) {
                    situation.prompt = 'You attempt to attack the monster head on. But right before you make contact, it sees the glint of the red crystal on your belt. It immediately rears up and runs in the opposite direction. After the monster rummaged through the wreckage, you notice your Digger Laser amongst the debris.'
                    situation.options = [{type: 'item', text: 'Pick up the Digger Laser', name: 'Digger Laser', icon: '🔫'}]
            }
            else if (hero.inventory['💚'] || hero.inventory['🔴'] || hero.inventory['🔷']) {
                situation = {
                    prompt: "As you walk around your crashed ship, a large, horrible looking creature is rummaging through the wreckage, comes into view. It notices you and starts advancing towards you.",
                    options: [
                        {type: 'death', text: 'Fight it', cause: 'Killed by monster (brave)'},
                        {type: 'death', text: 'Run', cause: 'Killed by monster (coward)'}
                    ],
                    img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
                }
                if (hero.inventory['🔴']) {
                    situation.options[0] = {type: 'attr', text: 'Fight it', attr: 'monster_killed'}
                }
            }
        }
        else if (hero.location == 'Forest Exterior') {
            if (attributes['used_staircase']) {
                situation.options[3] = {type: 'travel', text: 'Take the Crystal Stairway', dest: 'Crystal Cavern'}
            }
        }
        else if (hero.location == 'Flat Crystal Area') {
            if (hero.inventory['🖱']) {
                situation.prompt = 'You find nothing.'
            }
        }
        else if (hero.location == "Alien's House") {
            if (attributes['alien_flashlight'] || attributes['alien_rude']) {
                situation = {
                    prompt: "After shining the flashlight in it's face, the Alien seems very irritated and won't acknowledge you. Oops.",
                    options: [{type: 'travel', text: 'Go Back', dest: 'Forest Interior'}],
                    img_url:'http://www.hotel-r.net/im/hotel/ca/crystal-forest.jpg'
                }
                if (attributes['alien_rude']) {
                    situation.prompt = "After yelling at the Alien, it seems very irritated and won't acknowledge you. Oops."
                }
            }
            else if (hero.inventory['🔴'] || !hero.inventory['🖱']) {
                situation.options = [
                    {type: 'attr', text: 'Show it the Flashlight', attr: 'alien_flashlight'},
                    {type: 'attr', text: '"What the heck are you?!"', attr: 'alien_rude'},
                    {type: 'travel', text: 'Go Back', dest: 'Forest Interior'},
                ]
                if (hero.inventory['🔴'] && hero.inventory['🔷'] && hero.inventory['💚']) {
                    situation.options[3] = {type: 'win', text: 'Show it the 3 Stones'}
                }
            }
        }

        cb(situation)
    }

    function travel(option, cb=null) {
        let dest = option.dest
        $http.post('/go', {dest}).then(function(output){
            if (cb) {
                cb()
            }
        })
    }

    function get_item(option, cb=null) {
        let item = option.icon
        $http.post('/get_item', {item}).then(function(output) {
            if (cb) {
                cb()
            }
        })
    }

    function lose_item(option, cb=null) {
        let item = option.lost_icon
        $http.post('/lose_item', {item}).then(function(output) {
            if (cb) {
                cb()
            }
        })
    }

    function change_attr(option, cb=null) {
        // Wastes coordinates attribute changes
        if (option.attr == 'n_wastes') {
            attributes['wastes_coords'][1]++
        }
        else if (option.attr == 's_wastes') {
            attributes['wastes_coords'][1]--
        }
        else if (option.attr == 'e_wastes') {
            attributes['wastes_coords'][0]++
        }
        else if (option.attr == 'w_wastes') {
            attributes['wastes_coords'][0]--
        }

        // Cavern opening change
        else if (option.attr == 'opening_inc') {
            attributes['opening_depth']++
        }
        else if (option.attr == 'opening_dec') {
            attributes['opening_depth']--
        }

        // Boolean attributes changes
        else {
            if (!attributes[option.attr]) {
                attributes[option.attr] = true
            }
            else {
                attributes[option.attr] = false
            }
        }

        // Update
        if (cb) {
            cb()
        }
    }

    factory.do = function(option, cb) {
        // Parses selected option's type
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
            let cause = option.cause
            $http.post('/die', {cause}).then(function(output) {
                $location.url('/dead')
            })
        }
        else if (option.type == 'win') {
            $http.get('/win').then(function(output) {
                $location.url('/winner')
            })
        }
    }

    return factory;
})
