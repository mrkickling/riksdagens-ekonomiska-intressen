class Bubble {

    constructor(x, y, r, color="orange", title="") {
        this.r = r;
        this.x = x;
        this.y = y;
        this.color = color;
        this.mouseDown = false;
        this.title = title;
    }

    getSize() {
        return this.r;
    }

    getPosition() {
        return (this.x, this.y);
    }


    keepInside(rect) {
        if (this.x > rect.width) {
            this.x = rect.width - this.r;
        }
        if (this.y > rect.height) {
            this.y = rect.height - this.r;
        }
        if (this.x < 0) {
            this.x = this.r;
        }
        if (this.y < 0) {
            this.y = this.r;
        }
    } 
     
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.fillStyle = "black";
        ctx.fillText(this.title, this.x - this.r, this.y + this.r + 10);
    }

    insideRadius(x, y) {
        return (
            this.x >= x - this.r && this.x <= x + this.r &&
            this.y >= y - this.r && this.y <= y + this.r
        );
    }

    touches(otherCircle) {
        // Calculate the differences in the x and y coordinates
        let dx = this.x - otherCircle.x;
        let dy = this.y - otherCircle.y;

        // Calculate the distance between the centers of the two circles
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate the sum of the radii
        let sumOfRadii = this.r + otherCircle.r;

        // Check if the distance is less than the sum of the radii
        return distance < sumOfRadii;
    }

    moveOutOfWay(allBubbles) {
        allBubbles.forEach(bubble => {
            if (bubble != this && this.touches(bubble)) {
                let x_diff = this.x - bubble.x;
                let y_diff = this.y - bubble.y;
                
                if (x_diff == 0) {x_diff = Math.random() * 2 - 1;}
                if (y_diff == 0) {y_diff = Math.random() * 2 - 1;}

                let x_norm = Math.sign(x_diff);
                let y_norm = Math.sign(y_diff);

                let speed = 2;
                this.x += x_norm * speed;
                this.y += y_norm * speed;
            }
        });
    }

}

export {Bubble};