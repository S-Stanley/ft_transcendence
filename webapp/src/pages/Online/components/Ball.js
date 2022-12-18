const INITIAL_VELOCITY = .02;
const VELOCITY_INCREASE = 0.0000001;
let tmp = false;

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset();
    }

    get x(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }

    set x(value){
        this.ballElem.style.setProperty("--x", value);
    }

    get y(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }

    set y(value){
        this.ballElem.style.setProperty("--y", value);
    }

    rect() {
        return this.ballElem.getBoundingClientRect();
    }

    get_x() {
        return this.x;
    }

    get_y() {
        return this.y;
    }

    set_x(value) {
        this.x = value;
    }

    set_y(value) {
        this.y = value;
    }

    reset(){
        this.x = 50;
        this.y = 50;
        this.direction = {
            x: 0,
        };
        while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= 0.9){
            const heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = {
                x: Math.cos(heading),
                y: Math.sin(heading)
            };
        }
        this.velocity = INITIAL_VELOCITY;
    }

    stop(){
        this.x = 50;
        this.y = 50;
        this.direction = {
            x: 0,
        };
        while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= 0.9){
            const heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = {
                x: Math.cos(heading),
                y: Math.sin(heading)
            };
        }
        this.velocity = 0;
    }

    update(delta, paddleRects, collision){
        const rect = this.rect();
        if (collision === 1) {
            this.direction.x *= -1;
            this.y += this.direction.x * this.velocity * delta;
            this.x += this.direction.y * this.velocity * delta;
            tmp = false;
        }
        else if ((rect.bottom >= window.innerHeight || rect.top <= 60) && tmp === false) {
            this.direction.y *= -1;
            this.x += this.direction.x * this.velocity * delta * 10;
            this.y += this.direction.y * this.velocity * delta * 10;
            tmp = true;
        }
        else
        {
            this.x += this.direction.x * this.velocity * delta;
            this.y += this.direction.y * this.velocity * delta;
            tmp = false;
        }
        this.velocity += VELOCITY_INCREASE * delta;
    }
}

// function isCollision(rect1, rect2){
//     return (rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top);
// }

function randomNumberBetween(min, max) {
    return Math.random() * (max-min) + min;
}
