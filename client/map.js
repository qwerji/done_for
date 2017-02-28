const GameStateManager = function() {

    this.refresh = function() {
        return new GameStateManager()
    }

    this.getSituation = function(hero) {
        return filter(worldMap[hero.location], hero)
    }

    this.changeAttr = function(option) {
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

        // Console switches
        else if (option.attr == 'left_switch'){
            attributes['switches'][0] = !attributes['switches'][0]
        }
        else if (option.attr == 'middle_switch'){
            attributes['switches'][1] = !attributes['switches'][1]
        }
        else if (option.attr == 'right_switch'){
            attributes['switches'][2] = !attributes['switches'][2]
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
    }

    let attributes = {
        'used_staircase': false,
        'is_in_wastes': false,
        'wastes_coords': [0, 0],
        'opening_depth': 0,
        'monster_killed': false,
        'alien_flashlight': false,
        'alien_rude': false,
        'floor_lasered': false,
        'switches': [true, false, false]
    }

    function removeItem(situation, hero) {
        // Splices item from options if in user inventory
        if (situation.options.length) {
            for (var i = 0; i < situation.options.length; i++) {
                if (situation.options[i].type == 'item' || 'item/travel') {
                    if (hero.inventory[situation.options[i].name]) {
                        situation.options.splice(i,1)
                    }
                }
            }
        }
    }

    function filter(situation, hero) {
        
        removeItem(situation, hero)

        //  Location-based Logic
        if (hero.location == 'Ship') {
            // If you have the EVA and the option to leave the ship hasn't already been pushed
            if (hero.inventory['eva']) {
                if (situation.options[situation.options.length-1].dest !== 'Crash Site') {
                    situation.options.push({type: 'travel', text: 'Leave the ship', dest: 'Crash Site'})
                }
            }
        }
        else if (hero.location == 'Armory') {
            if (hero.inventory['flashlight']) {
                situation.prompt = 'All of the weapons appear to be unusable.'
            }
        }
        else if (hero.location == 'Wastes') {
            // Sets wastes options to wandering mode, if you are IN the wastes
            if (attributes['is_in_wastes']) {
                situation = {
                    prompt: 'You wander aimlessly in the Wastes. You begin to wonder if this was a good idea.',
                    options: [
                        {type: 'attr', text: 'Walk north into the Wastes', attr: 'n_wastes'},
                        {type: 'attr', text: 'Walk east into the Wastes', attr: 'e_wastes'},
                        {type: 'attr', text: 'Walk west into the Wastes', attr: 'w_wastes'},
                        {type: 'attr', text: 'Leave the Wastes', attr: 'is_in_wastes'}
                    ],
                    img_url: 'imgs/locations/wastes.svg'
                }
                // Replaces option to leave wastes with option to go south in the wastes, if coordinates are not [0, 0]
                if (attributes['wastes_coords'][0] !== 0 || attributes['wastes_coords'][1] !== 0) {
                    situation.options[3] = {type: 'attr', text: 'Walk south into the Wastes.', attr: 's_wastes'}
                }
            }
        }
        else if (hero.location == 'Lake Hole') {
            if (hero.inventory['flashlight']) {
                situation.options[0] = {type: 'travel', text: 'Take the pitch-black left tunnel', dest: 'Inscriptions'}
            }
        }
        else if (hero.location == 'Lake Tunnel') {
            if (hero.inventory['flashlight']) {
                situation.options[0] = {type: 'death', text: 'Take the pitch-black left tunnel', cause: 'Killed by something in the dark.'}
            }
        }
        else if (hero.location == 'Crystal Cavern') {
            if (hero.inventory['green_stone']) {
                situation.prompt = 'You enter a gleaming cavern, with clusters of crystals clinging to every surface. There is an opening on the left wall that looks like you could squeeze your way into. You also notice a crystal stairway to your right.'
            }
            if (attributes['floor_lasered']) {
                situation.options[situation.options.length-3] = {type: 'travel', text: 'Enter the floor door', dest: 'Base'}
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
            if (hero.inventory['digger_laser']) {
                situation.options = [
                    {type: 'attr/travel', text: 'Use your Digger Laser on the door', attr: 'floor_lasered', dest:'Base'},
                    {type: 'travel', text: 'Go back', dest: 'Crystal Cavern'}
                ]
            }
        }
        else if (hero.location == 'Base') {
            if (!hero.inventory['flashlight']) {
                situation.options[1] = {type: 'death', text: 'Enter the pitch-black open doorway', cause: 'Killed by something in the dark.'}
            }
            else {
                situation.options[1] = {type: 'travel', text: 'Enter the pitch-black open doorway', dest: 'Dark Room'}
            }
        }
        else if (hero.location == 'Console') {
            situation.options[4] = {type: 'death', text: 'Press the large button', cause: 'Being incorrect.'}
            switch(attributes['switches'].join()){
                case 'false,false,false':
                    situation.img_url = 'imgs/switches/---.svg'
                    break
                case 'true,false,false':
                    situation.img_url = 'imgs/switches/+--.svg'
                    break
                case 'true,true,false':
                    situation.img_url = 'imgs/switches/++-.svg'
                    break
                case 'true,true,true':
                    situation.img_url = 'imgs/switches/+++.svg'
                    break
                case 'false,true,true':
                    situation.img_url = 'imgs/switches/-++.svg'
                    break
                case 'false,false,true':
                    situation.img_url = 'imgs/switches/--+.svg'
                    break
                case 'false,true,false':
                    situation.img_url = 'imgs/switches/-+-.svg'
                    break
                case 'true,false,true':
                    situation.img_url = 'imgs/switches/+-+.svg'
                    situation.options[4] = {type: 'travel', text: 'Press the large button', dest: 'Active Command Center'}
                    break
            }
        }
        else if (hero.location == 'Active Command Center') {
            if (hero.inventory['blue_stone']) {
                situation.prompt = 'The command center comes to life around you, lights turning on and machines humming. The strange machine in the corner appears to have been activated as well.'
            }
        }
        else if (hero.location == 'Behind Ship') {
            if (hero.inventory['digger_laser']) {
                situation = {
                    prompt: "There's nothing here but some wreckage from the crash.",
                    options: [
                        {type: 'travel', text: 'Go West to the Lake', dest: 'Lake'},
                        {type: 'travel', text: 'Go East to the Crystal Forest', dest: 'Forest Exterior'}
                    ],
                    img_url:'imgs/locations/behind_ship.svg'
                }
            }
            else if (attributes['monster_killed']) {
                    situation.prompt = 'You attempt to attack the monster head on. But right before you make contact, it sees the glint of the red crystal on your belt. It immediately rears up and runs in the opposite direction. After the monster rummaged through the wreckage, you notice your Digger Laser amongst the debris.'
                    situation.options = [{type: 'item', text: 'Pick up the Digger Laser', name: 'digger_laser'}]
            }
            else if (hero.inventory['green_stone'] || hero.inventory['red_stone'] || hero.inventory['blue_stone']) {
                situation = {
                    prompt: "As you walk around your crashed ship a large, horrible looking creature that is rummaging through the wreckage comes into view. It notices you and starts advancing.",
                    options: [
                        {type: 'death', text: 'Fight it', cause: 'Died bravely in battle.'},
                        {type: 'death', text: 'Run', cause: 'Died like a coward.'}
                    ],
                    img_url:'imgs/locations/monster.svg'
                }
                if (hero.inventory['red_stone']) {
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
            if (hero.inventory['flat_crystal']) {
                situation.prompt = 'You find nothing.'
            }
        }
        else if (hero.location == "Alien's House") {
            if (attributes['alien_flashlight'] || attributes['alien_rude']) {
                situation = {
                    prompt: "After shining the flashlight in it's face, the Alien seems very irritated and won't acknowledge you. Oops.",
                    options: [{type: 'travel', text: 'Go Back', dest: 'Forest Interior'}],
                    img_url:'imgs/locations/alien.svg'
                }
                if (attributes['alien_rude']) {
                    situation.prompt = "After yelling at the Alien, it seems very irritated and won't acknowledge you. Oops."
                }
            }
            else if (hero.inventory['red_stone'] || !hero.inventory['flat_crystal']) {
                situation.options = [
                    {type: 'attr', text: 'Show it the Flashlight', attr: 'alien_flashlight'},
                    {type: 'attr', text: '"What the heck are you?!"', attr: 'alien_rude'},
                    {type: 'travel', text: 'Go Back', dest: 'Forest Interior'},
                ]
                if (hero.inventory['red_stone'] && hero.inventory['blue_stone'] && hero.inventory['green_stone']) {
                    situation.options[3] = {type: 'win', text: 'Show it the 3 Stones'}
                }
            }
        }

        return situation
    }

    let worldMap = {
        'Ship': {
            prompt: "You awaken in the main cabin of your spacecraft. You were supposed to be in cryo on your way home from a research mission. The interior of the ship is disheveled and quite damaged. You suspect an oxygen leak, and imagine there isn't much time before it runs out.",
            options: [
                { type: 'travel', text: 'Check Ship Computer', dest: 'Ship Computer' },
                { type: 'travel', text: 'Check Armory Cabinet', dest: 'Armory' },
                { type: 'item', text: 'Put on EVA suit', name: 'eva' }
            ],
            img_url: 'imgs/locations/ship.svg'
        },
        'Ship Computer': {
            prompt: "You check the ship's computer, which tells you that the atmospheric conditions of the unknown planet you have landed on will not support human life. However, there are trace readings of other life forms.",
            options: [
                { type: 'travel', text: 'Back to the ship main compartment', dest: 'Ship' }
            ],
            img_url: 'imgs/locations/ship_computer.svg'
        },
        'Armory': {
            prompt: 'All the weapons appear to be unusable but there appears to be an undamaged flashlight.',
            options: [
                { type: 'travel', text: 'Back to the ship main compartment', dest: 'Ship' },
                { type: 'item', text: 'Pick up the flashlight', name: 'flashlight' },
            ],
            img_url: 'imgs/locations/armory.svg'
        },
        'Crash Site': {
            prompt: 'Outside the ship you can see three landmarks.',
            options: [
                { type: 'travel', text: 'Go North to the Wastes', dest: 'Wastes' },
                { type: 'travel', text: 'Go East to the Crystal Forest', dest: 'Forest Exterior' },
                { type: 'travel', text: 'Go West to the Lake', dest: 'Lake' },
                { type: 'travel', text: 'Go into the Ship', dest: 'Ship' }
            ],
            img_url: 'imgs/locations/crash_site.svg'
        },
        'Forest Exterior': {
            prompt: 'Standing at the entrance to the forest of crystals you notice a hole in one of the crystals nearby.',
            options: [
                { type: 'travel', text: 'Enter the forest', dest: 'Forest Interior' },
                { type: 'travel', text: 'Go behind the ship', dest: 'Behind Ship' },
                { type: 'travel', text: 'Go to the crash site', dest: 'Crash Site' },
            ],
            img_url: 'imgs/locations/crystal_forest.svg'
        },
        'Forest Interior': {
            prompt: 'Inside the forest there are two paths that seem well traveled.',
            options: [
                { type: 'travel', text: 'Continue to investigate the forest', dest: 'Flat Crystal Area' },
                { type: 'travel', text: 'Climb through the hole in the crystal', dest: "Alien's House" },
                { type: 'travel', text: 'Leave the forest', dest: 'Forest Exterior' },
            ],
            img_url: 'imgs/locations/crystal_forest.svg'
        },
        'Flat Crystal Area': {
            prompt: 'You see a flat crystal on the ground.',
            options: [
                { type: 'item', text: 'Pick up the Flat Crystal', name: 'flat_crystal' },
                { type: 'travel', text: 'Go Back', dest: 'Forest Interior' },
            ],
            img_url: 'imgs/locations/crystal_forest.svg'
        },
        "Alien's House": {
            prompt: 'After stepping through the hole, you come face to face with a strange looking Alien. He does not seem hostile, but is clearly wary of your presence.',
            options: [
                { type: 'travel', text: 'Show it the Flat Crystal', dest: 'Get Red Stone' },
                { type: 'attr', text: 'Show it the Flashlight', attr: 'alien_flashlight' },
                { type: 'attr', text: '"What the heck are you?!"', attr: 'alien_rude' },
                { type: 'travel', text: 'Go Back', dest: 'Forest Interior' },
            ],
            img_url: 'imgs/locations/alien.svg'
        },
        'Get Red Stone': {
            prompt: 'You show it the Flat Crystal. He seems confused, and hits the Crystal out of your hand. The Alien then reveals a Red Stone, offering it to you.',
            options: [
                { type: 'item/lose_item/travel', text: 'Take the Red Stone', name: 'red_stone', lost_name: 'flat_crystal', dest: "Alien's House" }
            ],
            img_url: 'imgs/locations/alien.svg'
        },
        'Wastes': {
            prompt: 'An expanse of wastelands unfolds in front of you.',
            options: [
                { type: 'attr', text: 'Walk out into the Wastes', attr: 'is_in_wastes' },
                { type: 'travel', text: 'Go to the crash site', dest: 'Crash Site' },
                { type: 'travel', text: 'Go West to the Lake', dest: 'Lake' }
            ],
            img_url: 'imgs/locations/wastes.svg'
        },
        'Behind Ship': {
            prompt: "There's nothing here but some wreckage from the crash.",
            options: [
                { type: 'travel', text: 'Go West to the Lake', dest: 'Lake' },
                { type: 'travel', text: 'Go East to the Crystal Forest', dest: 'Forest Exterior' }
            ],
            img_url: 'imgs/locations/behind_ship.svg'
        },
        'Lake': {
            prompt: "You think you notice a small hole in the bottom of the lake. Your EVA suit should allow you to enter the lake's mysterious liquid.",
            options: [
                { type: 'travel', text: 'Swim down and check out the hole', dest: 'Lake Hole' },
                { type: 'travel', text: 'Go behind the ship', dest: 'Behind Ship' },
                { type: 'travel', text: 'Go to the crash site', dest: 'Crash Site' }
            ],
            img_url: 'imgs/locations/lake.svg'
        },
        'Lake Hole': {
            prompt: 'You swim through the dark lake and once you reach the hole, two tunnels branch off from it. Both are quite dark.',
            options: [
                { type: 'death', text: 'Take the pitch-black left tunnel', cause: 'Drowned.' },
                { type: 'travel', text: 'Take the right tunnel', dest: 'Lake Tunnel' },
                { type: 'travel', text: 'Swim back to the surface', dest: 'Lake' }
            ],
            img_url: 'imgs/locations/in_lake.svg'
        },
        'Inscriptions': {
            prompt: 'There are some inscriptions on the walls.',
            options: [
                { type: 'travel', text: 'Continue through the tunnel', dest: 'Lake Tunnel' }
            ],
            img_url: 'imgs/locations/hint.svg'
        },
        'Lake Tunnel': {
            prompt: 'You reach two more tunnels.',
            options: [
                { type: 'death', text: 'Take the pitch-black left tunnel', cause: 'Killed by something in the dark.' },
                { type: 'travel', text: 'Take the right tunnel', dest: 'Crystal Cavern' }
            ],
            img_url: 'imgs/locations/in_lake.svg'
        },
        'Crystal Cavern': {
            prompt: 'You enter a gleaming cavern, with clusters of crystals clinging to every surface. There is a green stone on the ground in front of you. There is an opening on the left wall that looks like you could squeeze your way into. You also notice a crystal stairway to your right.',
            options: [
                { type: 'item', text: 'Pick up green stone', name: 'green_stone' },
                { type: 'death', text: '"...Hello?"', cause: 'Shhh...' },
                { type: 'travel', text: 'Search the crystals', dest: 'Crystal Search' },
                { type: 'travel', text: 'Enter the opening', dest: 'Cavern Opening' },
                { type: 'attr/travel', text: 'Climb the stairway', dest: 'Forest Exterior', attr: 'used_staircase' }
            ],
            img_url: 'imgs/locations/crystal_cavern.svg'
        },
        'Cavern Opening': {
            prompt: 'You are squeezed into the opening in the wall. The opening continues deeper but it seems to get smaller as it goes.',
            options: [
                { type: 'attr', text: 'Keep going', attr: 'opening_inc' }
            ],
            img_url: 'imgs/locations/crystal_cavern.svg'
        },
        'Crystal Search': {
            prompt: 'You walk over to a group of crystals to further examine them. As you do, you notice a change in the density of the ground. You push the alien soil around with your feet and uncover a metal door in the ground. It seems to be locked.',
            options: [
                { type: 'travel', text: 'Go back', dest: 'Crystal Cavern' }
            ],
            img_url: 'imgs/locations/crystal_cavern.svg'
        },
        'Base': {
            prompt: 'The hole in the door you made with your Digger Laser is just big enough to climb through. You lower yourself down and land in a dimly lit hallway. There is a door at the end of the hallway, with a pitch-black, open doorway on the right.',
            options: [
                { type: 'travel', text: 'Enter the door at the end of the hallway', dest: 'Hallway' },
                { type: 'travel', text: 'Enter the pitch-black open doorway', dest: 'Dark Room' },
                { type: 'travel', text: 'Go back', dest: 'Crystal Cavern' }
            ],
            img_url: 'imgs/locations/base.svg'
        },
        'Dark Room': {
            prompt: 'You enter the Dark Room, shining your flashlight in front of you. Your stomach flips when you see a group of horrible looking aliens huddled in the corner. They simultaneously turn, make a blood-curdling sound and lunge towards you.',
            options: [
                { type: 'death', text: 'Fight them', cause: 'Killed by horrible monsters.' },
                { type: 'travel', text: 'Run', dest: 'Command Center' }
            ],
            img_url: 'imgs/locations/hallway.svg'
        },
        'Hallway': {
            prompt: 'You reach another hallway, with another pitch-black doorway to your right. On your left, there is another door. You begin to hear some terrifying noises coming from an indiscernable location.',
            options: [
                { type: 'death', text: 'Enter the pitch-black doorway', cause: 'Killed by horrible monsters.' },
                { type: 'travel', text: 'Enter the left door', dest: 'Command Center' }
            ],
            img_url: 'imgs/locations/base.svg'
        },
        'Command Center': {
            prompt: 'After running down the hallway in fear, you enter a door on your left, which seals behind you. Looking around, it seems as though you are in a command center of some sort. There is a strange looking machine on your left, and another room on your right. In front of you is a console with several switches on it.',
            options: [
                { type: 'travel', text: 'Examine the machine', dest: 'Inactive Teleporter' },
                { type: 'travel', text: 'Enter the right room', dest: 'Book Room' },
                { type: 'travel', text: 'Walk up to the console', dest: 'Console' }
            ],
            img_url: 'imgs/locations/command_center.svg'
        },
        'Inactive Teleporter': {
            prompt: 'You approach the dormant machine. There is a chamber, just big enough for someone to stand inside, and a series of controls within reach of it.',
            options: [
                { type: 'travel', text: 'Go back', dest: 'Command Center' }
            ],
            img_url: 'imgs/locations/teleporter.svg'
        },
        'Book Room': {
            prompt: 'You enter the room, finding it to be strewn with scraps of paper with writing on them, written in a language you do not understand.',
            options: [
                { type: 'travel', text: 'Look at a random paper', dest: 'Book Hint' },
                { type: 'travel', text: 'Go back to the main room', dest: 'Command Center' }
            ],
            img_url: 'imgs/locations/book_room.svg'
        },
        'Book Hint': {
            prompt: 'Interesting.',
            options: [
                { type: 'travel', text: 'Set the paper down', dest: 'Book Room' }
            ],
            img_url: 'imgs/locations/hint.svg'
        },
        'Console': {
            prompt: 'The console has three switches in the middle that stand out to you, with a larger button below them.',
            options: [
                { type: 'attr', text: 'Flip the Left Switch', attr: 'left_switch' },
                { type: 'attr', text: 'Flip the Right Switch', attr: 'right_switch' },
                { type: 'attr', text: 'Flip the Middle Switch', attr: 'middle_switch' },
                { type: 'travel', text: 'Step away from the console', dest: 'Command Center' }
            ],
            img_url: ''
        },
        'Active Command Center': {
            prompt: 'The command center comes to life around you, lights turning on and machines humming. The strange machine in the corner appears to have been activated as well. A compartment on the console opens up the console, presenting you with a blue stone.',
            options: [
                { type: 'item', text: 'Take the Blue Stone', name: 'blue_stone' },
                { type: 'travel', text: 'Step into the strange machine', dest: 'Wastes' }
            ],
            img_url: 'imgs/locations/teleporter.svg'
        }
    }
}

