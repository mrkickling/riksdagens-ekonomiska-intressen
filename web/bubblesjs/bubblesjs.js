import { Bubble } from "./bubble.js";


class BubblesJS {

    constructor(canvasID) {
        this.bubblesCanvas = document.getElementById(canvasID);
        this.resizeCanvas();

        this.rect = this.bubblesCanvas.getBoundingClientRect();
        this.ctx = this.bubblesCanvas.getContext('2d');
        this.bubbles = [];
        this.clickedBubble = null;

        this.addEventListeners();
        this.animate = this.animate.bind(this);
        this.animate();
    }

    addBubble(bubble) {
        this.bubbles.push(bubble);
    }

    addBubbles(bubbles) {
        bubbles.forEach(bubble => {
            this.addBubble(bubble);
        });
    }

    addEventListeners() {
        // resize the canvas to fill browser window dynamically
        window.addEventListener('resize', function() {
            this.resizeCanvas()
        }.bind(this), false);
        
        // Keep track on click events
        window.addEventListener('mousedown', function(e) {
            this.bubbles.forEach(bubble => {
                const x = e.clientX - this.rect.left;
                const y = e.clientY - this.rect.top;
                if (bubble.insideRadius(x, y)) {
                    console.log("Click bubble!");
                    this.clickedBubble = bubble;
                }
            });
        }.bind(this));

        // Keep track on move mouse events
        window.addEventListener('mousemove', function(e) {
            const x = e.clientX - this.rect.left;
            const y = e.clientY - this.rect.top;

            if (this.clickedBubble) {
                this.clickedBubble.x = x;
                this.clickedBubble.y = y;
            }
        }.bind(this));

        // Keep track on click release events
        window.addEventListener('mouseup', function(e) {
            if (this.clickedBubble) {
                this.clickedBubble = null;
            }
        }.bind(this));
    }

    resizeCanvas() {
        console.log('resize')
        this.bubblesCanvas.width = window.innerWidth;
        this.bubblesCanvas.height = window.innerHeight;
    }

    animate() {

        // Clear the canvas
        this.ctx.clearRect(
            0, 0, this.bubblesCanvas.width, this.bubblesCanvas.height
        );

        // call again next time we can draw
        requestAnimationFrame(this.animate);

        // Draw all the bubbles
        this.bubbles.forEach(bubble => {
            bubble.keepInside(this.rect);
            bubble.moveOutOfWay(this.bubbles);
            bubble.draw(this.ctx);
        });

    }
}

export {BubblesJS};