function matMul(mat, vec) {
    var newVec = [];
    
    for(var i = 0; i < vec.length; i++) {
        newVec[i] = 0;

        for(var j = 0; j < vec.length; j++) newVec[i] += mat[i*vec.length + j]*vec[j];
    }

    return newVec;
}

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

function genGrid(xNum, yNum, scale, zFunc) {
    var points = [];
    var edges = [];

    for(var x = 0; x < xNum; x++) {
        for(var y = 0; y < yNum; y++) {
            const realX = (x - (xNum-1)/2)*scale;
            const realY = (y - (yNum-1)/2)*scale;

            points.push([realX, realY, zFunc(realX, realY)])

            if(x > 0) edges.push([x*xNum + y, (x-1)*xNum + y]);
            if(y > 0) edges.push([x*xNum + y, x*xNum + y-1]);
        }
    }

    return [points, edges];
}

function render(points, edges, center, style) {
    ctx.strokeStyle = style;

    for(edge of edges) {
        const p0 = points[edge[0]];
        const p1 = points[edge[1]];
        
        ctx.beginPath();
        ctx.moveTo(p0[0]/p0[2] + center[0], p0[1]/p0[2] + center[1]);
        ctx.lineTo(p1[0]/p1[2] + center[0], p1[1]/p1[2] + center[1]);
        ctx.stroke();
    }
}

var t = 0;

function loop() {
    const grid = genGrid(30, 30, 100, function(x, y) {
        return 2-0.15*Math.cos(0.012*Math.sqrt((x**2)+(y**2)) - t/30);
    });
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    render(grid[0], grid[1], [500, 500], "#FF0000");
    
    t++;

    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
