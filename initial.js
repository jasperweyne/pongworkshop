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
    // game loop
    function loop() {
        // todo

        requestAnimationFrame(loop);
    }

    // start the game
    window.requestAnimationFrame(loop);
});