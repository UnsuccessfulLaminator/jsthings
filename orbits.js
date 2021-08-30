var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
const center = [canvas.width/2, canvas.height/2];
const radius = 50;

// Each element is an array [x, y, xVel, yVel, htmlColor]
var balls = [];
const gravity = 200000;

function randomDiscPoint(cx, cy, r) {
    const r_ = canvas.width*0.4*Math.sqrt(Math.random());
    const t = Math.random()*2*Math.PI;
    const x = cx+(r_*Math.cos(t));
    const y = cy+(r_*Math.sin(t));

    return [x, y];
}

for(var i = 0; i < 20; i++) {
    const pos = randomDiscPoint(center[0], center[1], canvas.width*0.4);
    const vel = randomDiscPoint(0, 0, 100);

    balls.push([pos[0], pos[1], vel[0], vel[1], "#"+Math.floor(Math.random()*0xFFFFFF).toString(16)]);
}

function loop() {
    draw();
    update(1.0/60);

    window.requestAnimationFrame(loop);
}

function update(dt) {
    for(ball of balls) {
        const dx = ball[0]-center[0];
        const dy = ball[1]-center[1];
        const sqLen = (dx**2)+(dy**2);
        const len = Math.sqrt(sqLen);
        
        if(len <= radius) {
            const perp = (ball[2]*dx)+(ball[3]*dy);
            
            ball[2] -= 2*perp*dx/sqLen;
            ball[3] -= 2*perp*dy/sqLen;
            ball[0] = (radius*dx/len)+center[0];
            ball[1] = (radius*dy/len)+center[1];
        }

        const lenCubed = len**3;

        ball[2] += -gravity*dx/lenCubed;
        ball[3] += -gravity*dy/lenCubed;
        ball[0] += ball[2]*dt;
        ball[1] += ball[3]*dt;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#0000FF";
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, radius, 0, 2*Math.PI);
    ctx.stroke();

    for(ball of balls) {
        ctx.strokeStyle = ball[4];
        ctx.beginPath();
        ctx.arc(ball[0], ball[1], 4, 0, 2*Math.PI);
        ctx.stroke();
    }
}

window.requestAnimationFrame(loop);
