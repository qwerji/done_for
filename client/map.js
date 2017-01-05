let worldMap = {
    'Ship': {
        prompt: "You survived the crash only to find that the ship's oxygen is leaking...",
        options: [
            {type: 'travel', text: 'Check Ship Computer', dest:'Ship Computer'},
            {type: 'travel', text: 'Check Armory Cabinet', dest: 'Armory'},
            {type: 'item', text: 'Put on EVA suit', name: 'EVA', icon: '🔋'}
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
            {type: 'travel', text: 'Go East to the Crystal Forest', dest: 'Forest Exterior'},
            {type: 'travel', text: 'Go into the Ship', dest: 'Ship'}
        ],
        img_url:'https://s-media-cache-ak0.pinimg.com/originals/07/5c/37/075c37b3bf9051d109092713f3a60b13.jpg'
    },
    'Forest Exterior': {
        prompt: 'Standing at the entrance to the forest you notice a hole in one of the crystals nearby...',
        options: [
            {type: 'travel', text: 'Enter the forest', dest: 'Forest Interior'},
            {type: 'travel', text: 'Go behind the ship.', dest: 'Behind Ship'},
            {type: 'travel', text: 'Go to the crash site.', dest: 'Crash Site'},
        ],
        img_url:'http://www.hotel-r.net/im/hotel/ca/crystal-forest.jpg'
    },
    'Forest Interior': {
        prompt: 'You are in the forest',
        options: [
            {type: 'travel', text: 'Continue to investigate the forest', dest: 'Flat Crystal Area'},
            {type: 'travel', text: 'Climb through the hole in the crystal', dest: "Alien's House"},
            {type: 'travel', text: 'Leave the forest', dest: 'Forest Exterior'},
        ],
        img_url:'http://www.hotel-r.net/im/hotel/ca/crystal-forest.jpg'
    },
    'Flat Crystal Area': {
        prompt: 'You see a flat crystal on the ground.',
        options: [
            {type: 'item', text: 'Pick up the Flat Crystal', name: 'Flat Crystal', icon: '🖱️'},
            {type: 'travel', text: 'Go Back', dest: 'Forest Interior'},
        ],
        img_url:'http://www.hotel-r.net/im/hotel/ca/crystal-forest.jpg'
    },
    "Alien's House": {
        prompt: 'After stepping through the hole, you come face to face with a strange looking Alien. He does not seem hostile, but is clearly wary of your presence.',
        options: [
            {type: 'travel', text: 'Show it the Flat Crystal', dest: 'Get Red Stone'},
            {type: 'attr', text: 'Show it the Flashlight', attr: 'alien_flashlight'},
            {type: 'attr', text: '"What the heck are you?!"', attr: 'alien_rude'},
            {type: 'travel', text: 'Go Back', dest: 'Forest Interior'},
        ],
        img_url:'http://www.hotel-r.net/im/hotel/ca/crystal-forest.jpg'
    },
    'Get Red Stone': {
        prompt: 'You show it the Flat Crystal. He seems confused, and hits the Crystal out of your hand. The Alien then reveals a Red Stone, offering it to you.',
        options: [
            {type: 'item/travel', text: 'Take the Red Stone', name: 'Flat Crystal', icon: '🔴️', dest: "Alien's House"}
        ],
        img_url:'http://www.hotel-r.net/im/hotel/ca/crystal-forest.jpg'
    },
    'Wastes': {
        prompt: 'An expanse of wastelands unfolds in front of you.',
        options: [
            {type: 'attr', text: 'Walk out into the Wastes.', attr: 'is_in_wastes'},
            {type: 'travel', text: 'Go to the crash site.', dest: 'Crash Site'},
            {type: 'travel', text: 'Go West to the Lake', dest: 'Lake'}
        ],
        img_url: 'https://kaskenkronicles.files.wordpress.com/2015/08/final-fantasy-jakerowell-envir-wasteland9.jpg'
    },
    'Behind Ship': {
        prompt: "There's nothing here but some wreckage from the crash.",
        options: [
            {type: 'travel', text: 'Go West to the Lake', dest: 'Lake'},
            {type: 'travel', text: 'Go East to the Crystal Forest', dest: 'Forest Exterior'}
        ],
        img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
    },
    'Lake': {
        prompt: 'You think you notice a small hole in the bottom of the lake...',
        options: [
            {type: 'travel', text: 'Swim down and check out the hole.', dest: 'Lake Hole'},
            {type: 'travel', text: 'Go behind the ship.', dest: 'Behind Ship'},
            {type: 'death', text: 'Slip and die.', cause: 'You slipped'},
            {type: 'travel', text: 'Go to the crash site.', dest: 'Crash Site'},
        ],
        img_url:'http://www.walldevil.com/wallpapers/a77/night-planet-sky-lake.jpg'
    },
    'Lake Hole': {
        prompt: 'You swim through the dense lake and find once you reach the hole two tunnels you could take. The left is pitch black.',
        options: [
            {type: 'death', text: 'Take the pitch-black left tunnel', cause: 'Drowned in Lake Hole'},
            {type: 'travel', text: 'Take the right tunnel', dest: 'Lake Tunnel'},
            {type: 'travel', text: 'Swim back to the surface', dest: 'Lake'},
        ],
        img_url:'http://www.walldevil.com/wallpapers/a77/night-planet-sky-lake.jpg'
    },
    'Inscriptions': {
        prompt: 'There are some inscriptions on the walls.',
        options: [
            {type: 'travel', text: 'Continue through the tunnel.', dest: 'Lake Tunnel'}
        ],
        img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
    },
    'Lake Tunnel': {
        prompt: 'There are two tunnels. The left is pitch black.',
        options: [
            {type: 'death', text: 'Take the pitch-black left tunnel', cause: 'Killed by eel (no flashlight)'},
            {type: 'travel', text: 'Take the right tunnel', dest: 'Crystal Cavern'}
        ],
        img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
    },
    'Crystal Cavern': {
        prompt: 'You enter a gleaming cavern, with clusters of crystals clinging to every surface. There is a green stone on the ground in front of you. There is an opening on the left wall that looks like you could squeeze your way into. You also notice a crystal stairway to your right.',
        options: [
            {type: 'item', text: 'Pick up green stone', name: 'Green Stone', icon: '💚'},
            {type: 'death', text: '"...Hello?"', cause: 'Said hello'},
            {type: 'travel', text: 'Search the crystals', dest: 'Crystal Search'},
            {type: 'travel', text: 'Enter the opening', dest: 'Cavern Opening'},
            {type: 'travel', text: 'Climb the stairway', dest: 'Forest Exterior'}
        ],
        img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
    },
    'Cavern Opening': {
        prompt: 'You are squeezed into the opening in the wall. The opening continues deeper but it seems to get smaller as it goes.',
        options: [
            {type: 'attr', text: 'Keep going', attr: 'opening_inc'}
        ],
        img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
    },
}
