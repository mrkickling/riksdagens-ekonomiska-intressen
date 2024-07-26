import { Bubble } from "./bubblesjs/bubble.js";
import { BubblesJS } from "./bubblesjs/bubblesjs.js";
import { agande } from "./data/agande-2024.js";

window.onload = function() {
    let bjs = new BubblesJS('bubbles');

    const partyToColor = {
        "SD": 'yellow',
        "M": 'blue',
        "V": 'red',
        "S": 'lightred',
        "L": 'marine',
        "MP": 'green',
        "C": 'lightgreen',
        "KD": 'darkblue'
    }

    let bubbles = [];
    for (const year in agande) {
        console.log(year);
        console.log
        const owners = agande[year];
        for (const owner in owners) {
            let ownerInfo = owners[owner];
            bubbles.push(
                new Bubble(
                    Math.random() * 2000,
                    Math.random() * 1000,
                    Math.random() * 50,
                    partyToColor[ownerInfo.party],
                    owner
                )
            )
        }
    }

    bjs.addBubbles(bubbles)

};