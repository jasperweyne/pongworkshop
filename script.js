/// INITIAL CODE (STEP 0) (see inital.js)
// wraps a HTML element for easy access
function ElementWrapper(objName) {
    this.htmlElement = document.getElementById(objName);

    this.wrap = function (name, getFn, setFn) {
        Object.defineProperty(this, name, { 
            get: () => getFn(this.htmlElement),
            set: (newVal) => setFn(this.htmlElement, newVal)
        }); 
    }

    this.wrap("left", (o) => o.offsetLeft, (o, v) => o.style.left = v + "px");
    this.wrap("top", (o) => o.offsetTop, (o, v) => o.style.top = v + "px");
    this.wrap("width", (o) => o.offsetWidth, (o, v) => o.style.width = v + "px");
    this.wrap("height", (o) => o.offsetHeight, (o, v) => o.style.height = v + "px");
}

// check for collision between two objects using axis-aligned bounding box (AABB)
// @see https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function collides(obj1, obj2) {
    return obj1.left < obj2.left + obj2.width &&
           obj1.left + obj1.width > obj2.left &&
           obj1.top < obj2.top + obj2.height &&
           obj1.top + obj1.height > obj2.top;
}

window.addEventListener("load", function(e) {
    /// STEP 1
    const field = new ElementWrapper('field');
    const leftPaddle = new ElementWrapper('leftpaddle');
    const rightPaddle = new ElementWrapper('rightpaddle');
    const ball = new ElementWrapper('ball');

    /// STEP 2
    var ballSpeedX = 1;
    var ballSpeedY = 1;

    /// STEP 3
    var leftSpeed = 0;
    var rightSpeed = 0;

    /// STEP 0
    // game loop
    function loop() {
        /// STEP 2
        // move ball by its velocity
        ball.left += ballSpeedX;
        ball.top += ballSpeedY;

        /// STEP 3
        // move paddles by their velocity
        leftPaddle.top += leftSpeed;
        rightPaddle.top += rightSpeed;

        /// STEP 4
        // prevent paddles from going through walls
        if (leftPaddle.top < 0) {
            leftPaddle.top = 0;
        }

        if (leftPaddle.top > field.height - leftPaddle.height) {
            leftPaddle.top = field.height - leftPaddle.height;
        }

        if (rightPaddle.top < 0) {
            rightPaddle.top = 0;
        }

        if (rightPaddle.top > field.height - rightPaddle.height) {
            rightPaddle.top = field.height - rightPaddle.height;
        }
        
        /// STEP 5
        // prevent ball from going through walls by changing its velocity
        if (ball.top < 0) {
            ball.top = 0;
            ballSpeedY *= -1;
        }

        if (ball.top > field.height - ball.height) {
            ball.top = field.height - ball.height;
            ballSpeedY *= -1;
        }

        /// STEP 6
        // check to see if ball collides with paddle. if they do change x velocity
        if (collides(ball, leftPaddle)) {
            ballSpeedX *= -1;
        }
        
        if (collides(ball, rightPaddle)) {
            ballSpeedX *= -1;
        }

        /// STEP 7
        // reset ball if it goes past paddle (but only if we haven't already done so)
        if (ball.left < 0 || ball.left > field.width - ball.width) {
            ball.left = field.width / 2;
            ball.top = field.height / 2;
        }

        requestAnimationFrame(loop);
    }

    /// STEP 3
    // listen to keyboard events to move the paddles
    function onkeydown(event) {
        // w key pressed
        if (event.key == "w") {
            leftSpeed = -5;
        }

        // s key pressed
        if (event.key == "s") {
            leftSpeed = 5;
        }

        // i key pressed
        if (event.key == "i") {
            rightSpeed = -5;
        }

        // k key pressed
        if (event.key == "k") {
            rightSpeed = 5;
        }
    };

    // listen to keyboard events to move the paddles
    function onkeyup(event) {
        // w/s key released
        if (event.key == "w" || event.key == "s") {
            leftSpeed = 0;
        }

        // i/k key released
        if (event.key == "i" || event.key == "k") {
            rightSpeed = 0;
        }
    };

    /// STEP 0
    // start the game
    window.requestAnimationFrame(loop);

    /// STEP 3
    // link the keyboard events
    document.addEventListener('keydown', onkeydown);
    document.addEventListener('keyup', onkeyup);
});