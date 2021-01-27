//בס"ד
var __animationDuration = 4000;
var canvas;
var ctx;
var w;
var h;

var nodes = [];
function draw_vars(){
 canvas = document.getElementById("canvas");
 ctx = canvas.getContext("2d");
  w = document.body.clientWidth;
h = document.body.clientHeight;
    canvas.width = w;
    canvas.height = h;
    

}
function draw() {
   
        requestAnimationFrame(draw);

        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0, 0, 0, .08)";
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = "lighter";

        var l = nodes.length, node;
        while (l--) {
            node = nodes[l];
            drawNode(node);
            if (node.dead) {
                nodes.splice(l, 1);
            }
        }

        if (nodes.length < 10) {
            l = rand(4, 1) | 0;
            while (l--) {
                nodes.push(makeNode(
                    Math.random() * w | 0,
                    Math.random() * h | 0,
                    40,
                    "hsl(" + (rand(300, 0) | 0) + ", 100%, 50%)",
                    100
                ));
            }
        }
    }

    function drawNode(node) {
        var l = node.children.length
            , point
            ;
        while (l--) {
            point = node.children[l];
            ctx.beginPath();
            ctx.fillStyle = point.color;
            ctx.arc(point.x, point.y, 1, 0, PI2);
            ctx.fill();
            ctx.closePath();
            updatePoint(point);
            if (point.dead) {
                node.children.splice(l, 1);
                if (node.count > 20) {
                    nodes.push(makeNode(
                        point.x,
                        point.y,
                        node.radius * 10,
                        node.color,
                        (node.count / 10) | 0
                    ))
                }
            }
        }
        if (!node.children.length) {
            node.dead = true;
        }
    }

    function updatePoint(point) {
        var dx = point.x - point.dx;
        var dy = point.y - point.dy;
        var c = Math.sqrt(dx * dx + dy * dy);
        point.dead = c < 1;
        point.x -= dx * point.velocity;
        point.y -= dy * point.velocity;
    }

    const rad = Math.PI / 180;
    const PI2 = Math.PI * 2;
    var ttt = 0;

    function rand(max, min) {
        min = min || 0;
        return Math.random() * (max - min) + min;
    }

    function makeNode(x, y, radius, color, partCount) {

        radius = radius || 0;
        partCount = partCount || 0;
        var count = partCount;

        var children = []
            , kof
            , r
            ;


        while (partCount--) {
            kof = 100 * Math.random() | 0;
            r = radius * Math.random() | 0;
            children.push({
                x: x,
                y: y,
                dx: x + r * Math.cos(ttt * kof * rad),
                dy: y + r * Math.sin(ttt * kof * rad),
                color: color,
                velocity: rand(1, 0.05)
            });
            ttt++
        }

        return {
            radius: radius,
            count: count,
            color: color,
            x: x,
            y: y,
            children: children
        }
    }

    setTimeout(function () {
        // If onload hasn't been called, stop all requests after 2 seconds
        if (typeof (_l) == "undefined") {
            if (window.stop !== undefined) window.stop();
            else if (document.execCommand !== undefined) document.execCommand("Stop", false);
        }
    }, 2000, "push");

    /*
    * Capture and kill CSS animations after X number of seconds
    */
    //function pauseAnimations() {
    //    var body = document.getElementsByTagName("body")[0];

    //    if (body.addEventListener) {
    //        body.addEventListener("webkitAnimationStart", listener, false);
    //        body.addEventListener("webkitAnimationIteration", listener, false);
    //        body.addEventListener("animationstart", listener, false);
    //        body.addEventListener("animationiteration", listener, false);
    //    }
    //}

    //function listener(e) {

    //    var targetEl;

    //    if (e.type == "webkitAnimationStart" || e.type == "webkitAnimationIteration") {

    //        targetEl = e.target;

    //        setTimeout(function () {
    //            targetEl.style.webkitAnimationPlayState = "paused";
    //        }, __animationDuration, "push");

    //    } else if (e.type == "animationstart" || e.type == "animationiteration") {

    //        targetEl = e.target;

    //        setTimeout(function () {
    //            targetEl.style.MozAnimationPlayState = "paused";
    //        }, __animationDuration, 'push');

    //    }
    //}

   

    //// Pause all audio elements, allow the audio/video
    //// elements to render before stopping them
    //function pauseElementTypes(type) {
    //    for (var i = 0, els = document.getElementsByTagName(type); i < els.length; i++) {
    //        els[i].pause();
    //    }
    //}

    //// Wait until the elements have been created to pause them
    //setTimeout(function () {
    //    pauseElementTypes("audio");
    //    pauseElementTypes("video");
    //}, 100);
   