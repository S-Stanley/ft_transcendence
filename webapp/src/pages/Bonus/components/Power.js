const INITIAL_VELOCITY = .025;
let tmp = false;

export default class Power {
    constructor(powerElem) {
        this.powerElem = powerElem;
        this.reset();
    }

    get x(){
        return parseFloat(getComputedStyle(this.powerElem).getPropertyValue("--x"));
    }

    set x(value){
        this.powerElem.style.setProperty("--x", value);
    }

    get y(){
        return parseFloat(getComputedStyle(this.powerElem).getPropertyValue("--y"));
    }

    set y(value){
        this.powerElem.style.setProperty("--y", value);
    }

    rect() {
        return this.powerElem.getBoundingClientRect();
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

    update(delta, collision){
        const rect = this.rect();
        if (collision === 1) {
            this.direction.x *= -1;
            this.x += this.direction.x * this.velocity * delta;
            this.y += this.direction.y * this.velocity * delta;
            tmp = false;
        }
        else if ((rect.bottom >= window.innerHeight || rect.top <= 60) && tmp === false) {
            this.direction.y *= -1;
            this.x += this.direction.x * this.velocity * delta;
            this.y += this.direction.y * this.velocity * delta;
            tmp = true;
        }
        else
        {
            this.x += this.direction.x * this.velocity * delta;
            this.y += this.direction.y * this.velocity * delta;
            tmp = false;
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max-min) + min;
}
