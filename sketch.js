var bubbles = [];
var totalBubbles = 150;
var backgroundColor = '#39324b';
var h;

function windowResized() {
    resizeCanvas(windowWidth, h);
}

function setup() {
    if (navigator.userAgent.match(/(Android)/i)) {
        h = 875;
    } else if (navigator.userAgent.match(/(iPhone)/i)) {
        h = 875;
    } else if (navigator.userAgent.match(/(iPad|iPodPro)/i)) {
        h = 1500;
    } else {
        h = 850;
    }
    canvas = createCanvas(windowWidth, h);
    background(backgroundColor);
    canvas.style('z-index', '-1');
    canvas.position(0, 0);

    for (var i = 0; i < totalBubbles; i++) {
        bubbles.push({
            x: random(0, width),
            y: window.innerHeight + 200,
            diameter: random(50, 120),
            speed: random(1, 10),
            offset: 0,
            popped: false,
            textOpacity: 1
        });
    }
}

function draw() {
    background(backgroundColor);
    bubbles.forEach(function (bubble) {
        if (bubble.popped) {
            textSize(12);
            textAlign(CENTER);
            fill('rgba(255,525,255,' + bubble.textOpacity + ')');
            text('**pop**', bubble.x, bubble.y - bubble.offset);

            if (bubble.textOpacity > 0.01) {
                bubble.textOpacity -= 0.01;
            } else {
                bubble.textOpacity = 0;
            }

        } else {
            drawBubble(bubble);
        }
    });

}

function wasClickInsideBubble(bubble) {
    var bubbleRadius = bubble.diameter / 3;

    if (
        (mouseX > bubble.x - bubbleRadius) && (mouseX < bubble.x + bubbleRadius) &&
        (mouseY > bubble.y - bubble.offset - bubbleRadius) && (mouseY < bubble.y - bubble.offset + bubbleRadius)
    ) {
        return true;
    } else {
        return false;
    }
}

function mouseClicked() {
    bubbles.forEach(function (bubble) {
        if (wasClickInsideBubble(bubble)) {
            bubble.popped = true;
            console.log('popped!');
        }
    });
}

function drawBubble(bubble) {

    if (bubble.offset > height + 400) {
        bubble.offset = 0;
    }

    bubble.offset += bubble.speed;
    fill('#f2cc5d');
    stroke('while');
    ellipse(bubble.x, bubble.y - bubble.offset, bubble.diameter, bubble.diameter);

    fill('white');
    ellipse(bubble.x + (bubble.diameter * 0.2), bubble.y - bubble.offset - (bubble.diameter * 0.25), bubble.diameter / 8, bubble.diameter / 8);

    fill('khaki');
    noStroke();
    ellipse(bubble.x + (bubble.diameter * 0.15), bubble.y - bubble.offset - (bubble.diameter * 0.2), bubble.diameter / 8, bubble.diameter / 8);
}
