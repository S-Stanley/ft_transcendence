const INITIAL_VELOCITY = .003;
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
        this.velocity_toleft = INITIAL_VELOCITY;
        this.velocity_toright = INITIAL_VELOCITY;
    }

    invert(){
        this.direction.x *= -1;
        if (this.direction.x > 0)
        {
            this.x += this.direction.x * this.velocity_toright * delta * 10;
            this.y += this.direction.y * this.velocity_toright * delta * 10;
        }
        else
        {
            this.x += this.direction.x * this.velocity_toleft * delta * 10;
            this.y += this.direction.y * this.velocity_toleft * delta * 10;
        }
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

    update(delta, paddleRects, collision, power){
        const rect = this.rect();
        if (collision === 1) {
            this.direction.x *= -1;
            if (this.direction.x > 0)
            {
                this.x += this.direction.x * this.velocity_toright * delta;
                this.y += this.direction.y * this.velocity_toright * delta;
            }
            else
            {
                this.x += this.direction.x * this.velocity_toleft * delta;
                this.y += this.direction.y * this.velocity_toleft * delta;
            }
            tmp = false;
        }
        else if ((rect.bottom >= window.innerHeight || rect.top <= 60) && tmp === false) {
            this.direction.y *= -1;
            if (this.direction.x > 0)
            {
                this.x += this.direction.x * this.velocity_toright * delta * 10;
                this.y += this.direction.y * this.velocity_toright * delta * 10;
            }
            else
            {
                this.x += this.direction.x * this.velocity_toleft * delta * 10;
                this.y += this.direction.y * this.velocity_toleft * delta * 10;
            }
            tmp = true;
        }
        else
        {
            if (this.direction.x > 0)
            {
                this.x += this.direction.x * this.velocity_toright * delta * 10;
                this.y += this.direction.y * this.velocity_toright * delta * 10;
            }
            else
            {
                this.x += this.direction.x * this.velocity_toleft * delta * 10;
                this.y += this.direction.y * this.velocity_toleft * delta * 10;
            }
            tmp = false;
        }
        if (power === 0)
        {
            // console.log('no speed powerups');
            this.velocity_toleft += (VELOCITY_INCREASE * delta);
            this.velocity_toright += (VELOCITY_INCREASE * delta);
        }
        else if (power === 1)
            ;
            // console.log('no increase on both');
        else if (power === 2)
        {
            // console.log('double on both');
            this.velocity_toleft += (VELOCITY_INCREASE * delta) * 2;
            this.velocity_toright += (VELOCITY_INCREASE * delta) * 2;
        }
        else if (power === 3)
            this.velocity_toleft += VELOCITY_INCREASE * delta;
        else if (power == 4)
            this.velocity_toright += VELOCITY_INCREASE * delta;
        else if (power === 5)
        {
            // console.log('double to right');
            this.velocity_toleft += VELOCITY_INCREASE * delta;
            this.velocity_toright += (VELOCITY_INCREASE * delta) * 2;
        }
        else if (power === 6)
        {
            // console.log('increase normal to right');
            this.velocity_toright += (VELOCITY_INCREASE * delta);
        }
        else if (power === 7)
        {
            // console.log('double to left');
            this.velocity_toleft += VELOCITY_INCREASE * delta * 2;
            this.velocity_toright += (VELOCITY_INCREASE * delta);
        }
        else if (power === 8)
        {
            // console.log('increase normal to left');
            this.velocity_toleft += VELOCITY_INCREASE * delta;
        }
    }
}

// update(delta, paddleRects, power){
//     if (this.direction.x > 0)
//     {
//         this.x += this.direction.x * this.velocity_toright * delta;
//         this.y += this.direction.y * this.velocity_toright * delta;
//     }
//     else
//     {
//         this.x += this.direction.x * this.velocity_toleft * delta;
//         this.y += this.direction.y * this.velocity_toleft * delta;
//     }
//     const rect = this.rect();
//     if (rect.bottom >= window.innerHeight || rect.top <= 60) {
//         this.direction.y *= -1;
//     }
//     if (paddleRects.some(r => isCollision(r, rect))){
//         this.direction.x *= -1;
//     }
//     if (power === 0)
//     {
//         console.log('no speed powerups');
//         this.velocity_toleft += (VELOCITY_INCREASE * delta);
//         this.velocity_toright += (VELOCITY_INCREASE * delta);
//     }
//     else if (power === 1)
//         console.log('no increase on both');
//     else if (power === 2)
//     {
//         console.log('double on both');
//         this.velocity_toleft += (VELOCITY_INCREASE * delta) * 2;
//         this.velocity_toright += (VELOCITY_INCREASE * delta) * 2;
//     }
//     else if (power === 3)
//         this.velocity_toleft += VELOCITY_INCREASE * delta;
//     else if (power == 4)
//         this.velocity_toright += VELOCITY_INCREASE * delta;
//     else if (power === 5)
//     {
//         console.log('double to right');
//         this.velocity_toleft += VELOCITY_INCREASE * delta;
//         this.velocity_toright += (VELOCITY_INCREASE * delta) * 2;
//     }
//     else if (power === 6)
//     {
//         console.log('increase normal to right');
//         this.velocity_toright += (VELOCITY_INCREASE * delta);
//     }
//     else if (power === 7)
//     {
//         console.log('double to left');
//         this.velocity_toleft += VELOCITY_INCREASE * delta * 2;
//         this.velocity_toright += (VELOCITY_INCREASE * delta);
//     }
//     else if (power === 8)
//     {
//         console.log('increase normal to left');
//         this.velocity_toleft += VELOCITY_INCREASE * delta;
//     }
// }
// };

// function isCollision(rect1, rect2){
//     return (rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top);
// }

function randomNumberBetween(min, max) {
    return Math.random() * (max-min) + min;
}
