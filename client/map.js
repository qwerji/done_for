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
            {type: 'item', text: 'Pick up the Flat Crystal', name: 'Flat Crystal', icon: '🖱'},
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
            {type: 'item/lose_item/travel', text: 'Take the Red Stone', name: 'Red Stone', icon: '🔴', lost_icon:'🖱', dest: "Alien's House"}
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
            {type: 'attr/travel', text: 'Climb the stairway', dest: 'Forest Exterior', attr: 'used_staircase'}
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
    'Crystal Search': {
        prompt: 'You walk over to a group of crystals to further examine them. As you do, you notice a change in the density of the ground. You push the alien soil around with your feet and uncover a metal door in the ground. It seems to be locked.',
        options: [
            {type: 'travel', text: 'Go back', dest: 'Crystal Cavern'}
        ],
        img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
    },
    'Base': {
        prompt: 'The hole in the door you made with your Digger Laser is just big enough to climb through. You lower yourself down and land in a dimly lit hallway. There is a door at the end of the hallway, with a pitch-black, open doorway on the right.',
        options: [
            {type: 'travel', text: 'Enter the door at the end of the hallway', dest: 'Hallway'},
            {type: 'travel', text: 'Enter the pitch-black open doorway', dest: 'Dark Room'},
            {type: 'travel', text: 'Go back', dest: 'Crystal Cavern'}
        ],
        img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
    },
    'Dark Room': {
        prompt: 'You enter the Dark Room, shining your flashlight in front of you. Your stomach flips when you see a group of horrible looking aliens huddled in the corner. They simultaneously turn, make a blood-curdling sound and lunge towards you.',
        options: [
            {type: 'death', text: 'Fight them', cause: 'Killed by dark room aliens'},
            {type: 'travel', text: 'Run', dest: 'Command Center'}
        ],
        img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
    },
    'Hallway': {
        prompt: 'You reach another hallway, with another pitch-black doorway to your right. On your left, there is another door. You begin to hear some terrifying noises coming from an indiscernable location.',
        options: [
            {type: 'death', text: 'Enter the pitch-black doorway', cause: 'Killed in second hallway'},
            {type: 'travel', text: 'Enter the left door', dest: 'Command Center'}
        ],
        img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
    },
    'Command Center': {
        prompt: 'After running down the hallway in fear, you enter a door on your left, which seals behind you. Looking around, it seems as though you are in a command center of some sort. There is a strange looking machine on your left, and another room on your right. In front of you is a console with several switches on it.',
        options: [
            {type: 'travel', text: 'Enter the right room', dest: 'Book Room'},
            {type: 'travel', text: 'Examine the machine', dest: 'Inactive Teleporter'},
            {type: 'travel', text: 'Walk up to the console', dest: 'Console'},
        ],
        img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
    },
    'Inactive Teleporter': {
        prompt: 'You approach the dormant machine. There is a chamber, just big enough for someone to stand inside, and a series of controls within reach of it.',
        options: [
            {type: 'travel', text: 'Go back', dest: 'Command Center'}
        ],
        img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
    },
    'Book Room': {
        prompt: 'You enter the room, finding it to be strewn with scraps of paper with writing on them, written in a language you do not understand.',
        options: [
            {type: 'travel', text: 'Look at a random paper', dest: 'Book Hint'},
            {type: 'travel', text: 'Go back to the main room', dest: 'Command Center'},
        ],
        img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
    },
    'Book Hint': {
        prompt: 'Hint here.',
        options: [
            {type: 'travel', text: 'Set the paper down', dest: 'Book Room'}
        ],
        img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
    },
    'Console': {
        prompt: 'The console has three switches in the middle that stand out to you, with a larger button below them.',
        options: [
            {type: 'travel', text: 'Step away from the console', dest: 'Command Center'},
            {type: 'attr', text: 'Flip the Left Switch', attr: 'left_switch'},
            {type: 'attr', text: 'Flip the Middle Switch', attr: 'middle_switch'},
            {type: 'attr', text: 'Flip the Right Switch', attr: 'right_switch'}
        ],
        img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
    },
    'Active Command Center': {
        prompt: 'The command center comes to life around you, lights turning on and machines humming. The strange machine in the corner appears to have been activated as well. A compartment on the console opens up the console, presenting you with a blue stone.',
        options: [
            {type: 'item', text: 'Take the Blue Stone', name: 'Blue Stone', icon: '🔷'},
            {type: 'travel', text: 'Step into the strange machine', dest: 'Wastes'}
        ],
        img_url:'http://i0.kym-cdn.com/photos/images/original/000/581/296/c09.jpg'
    },
}
