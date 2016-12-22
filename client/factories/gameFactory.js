app.factory('gameFactory', function($http){
    let factory = {};
    
    let map = {
        'Ship': {
            prompt: 'You survived the crash only to find that your oxygen is leaking...',
            options: [
                {text: 'Check console', dest:'Console'},
                {text: 'Check armory cabinet', dest: 'Armory'},
                {text: 'Leave the ship', dest: 'Outside Ship'},
            ],
            items:[],
            img_url:'http://orig04.deviantart.net/fa92/f/2011/107/e/2/passage_1_by_penemenn-d3e9aoh.jpg'
        },
        'Console': {
            prompt: 'The console appears to be broken but is currently displaying some information...',
            options: [
                {text: 'Check atomspheric conditions', dest:'Atmosphere'},
                {text: 'Check information on life on the planet', dest: 'Life'},
                {text: 'Back to the ship main compartment', dest: 'Ship'},
            ],
            items:[],
            img_url:'http://ak6.picdn.net/shutterstock/videos/2038331/thumb/2.jpg'
        },
        'Armory': {
            prompt: 'All the weapons appear to be unusable...but there appears to be an undamaged flashlight.',
            options: [
                {text: 'Back to the ship main compartment', dest: 'Ship'},
            ],
            items:[{ text: 'Pick up the flashlight.', name: 'Flashlight', icon: '🔦'}],
            img_url:'http://i.imgur.com/18Z47Ll.jpg'
        },
        'Outside Ship': {
            prompt: 'Outside the ship you see that you can go three directions...',
            options: [
                { text: 'Go West to the Lake', dest: 'Lake'},
                {text: 'Go North to the wastes.', dest:'Wastes'},
                { text: 'Go East to the Crystal Forest', dest: 'Crystal Forest'},
                { text: 'Go into the ship', dest: 'Ship'},
            ],
            items:[],
            img_url:'https://s-media-cache-ak0.pinimg.com/originals/07/5c/37/075c37b3bf9051d109092713f3a60b13.jpg'
        },
        'Crystal Forest': {
            prompt: 'Standing at the entrance to the forest you notice a hole in one of the crystals nearby..',
            options: [
                { text: 'Continue to investigate the forest', dest: 'Deep Forest'},
                { text: 'Climb through the hole in the crystal', dest: 'Crystal Hole'},
                { text: 'Go to the crash site.', dest: 'Outside Ship'},
                ],
            items:[],
            img_url:'http://www.hotel-r.net/im/hotel/ca/crystal-forest.jpg'
        },
        'Lake': {
            prompt: 'You think you see something to the left of the lake in a copse of trees, also you think you notice a small hole in the bottom of the lake..',
            options: [
                { text: 'Investigate the trees.', dest: 'Lake Investigate'},
                { text: 'Swim down and check out the hole.', dest: 'Lake Hole'},
                { text: 'Go to the crash site.', dest: 'Outside Ship'},
                ],
            items:[],
            img_url:'http://www.walldevil.com/wallpapers/a77/night-planet-sky-lake.jpg'
        },
        'Lake Hole': {
            prompt: 'You swim through the dense lake and find once you reach the hole two paths you could take...',
            options: [
                { text: 'Take the left path', dest: 'Lake Hole Left'},
                { text: 'Take the right path', dest: 'Lake Hole Right'},
                { text: 'Swim back to the surface', dest: 'Lake'},
                ],
            items:[],
            img_url:'http://www.walldevil.com/wallpapers/a77/night-planet-sky-lake.jpg'
        },
        'Lake Hole Left': {
            prompt: 'You notice inscriptions to the left thanks to your trusty flash light',
            options: [
                { text: 'Take the left path', dest: 'Lake Hole Left'},
                { text: 'Take the right path', dest: 'Lake Hole Right'},
                { text: 'Swim back to the surface', dest: 'Lake'},
                ],
            items:[],
            img_url:'http://www.walldevil.com/wallpapers/a77/night-planet-sky-lake.jpg'
        },
        'Lake Hole Left Death': {
            prompt: 'The murky depths are so dark that its impossible to find your way out, and you die.',
            options: [],
            items:[],
            img_url:'http://www.walldevil.com/wallpapers/a77/night-planet-sky-lake.jpg'
        },
        'Lake Investigate': {
            prompt: 'Youve fallen into the trap of an indigenous species called the trap flower and find that you are stuck here until your oxygen runs out.',
            options: [],
            items:[],
            img_url:'http://www.walldevil.com/wallpapers/a77/night-planet-sky-lake.jpg'
        },
        'Wastes': {
            prompt: 'You are at the wastes. You see three paths you can take...',
            options: [
                { text: 'Go to the crash site.', dest: 'Outside Ship'},
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
        if (hero.location == 'Left Lake Hole') {
            if (!hero.inventory['🔦']) {
                let filtered_loc = {
                    prompt: 'location'.prompt,
                    options: [],
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
