class KD {
    constructor(point, axis) {
        this.point = point;
        this.axis = axis;
        this.left = null;
        this.right = null;
    }
    static Build(points, depth = 0) {
        if (points.length == 0) {
            return null;
        }
        let axis = depth%2;
        let mid = Math.floor(points.length/2);
        points.sort((a, b) => axis == 0 ? a.x-b.x : a.y - b.y);
        const node = new KD(points[mid], axis);
        node.left = KD.Build(points.slice(0, mid), depth+1);
        node.right = KD.Build(points.slice(mid+1), depth+1);
        return node;
    }
    static Nearest(cur, query, best) {
        if (cur == null) return;
        let d = EuclideanDist(query, cur.point);
        if (best.dist > d) {
            best.dist = d;
            best.point = cur.point;
        }
        let near, far;
        if (cur.axis == 0) {
            if (cur.point.x >= query.x) {
                near = cur.left;
                far = cur.right;
            }
            else {
                near = cur.right;
                far = cur.left;
            }
        }
        else {
            if (cur.point.y >= query.y) {
                near = cur.left;
                far = cur.right;
            }
            else {
                near = cur.right;
                far = cur.left;
            }
        }
        KD.Nearest(near, query, best);
        let delta = cur.axis == 0 ? query.x - cur.point.x : query.y - cur.point.y;
        if (Math.abs(delta) < best.dist) {
            KD.Nearest(far, query, best);
        }
    }
};
let root = null;
function InitializeError() {
    let allActual = [];
    for (let t = 0; t <= 1; t += 0.005) {
        let p = ({x: Function_x(t), y: Function_y(t)});
        if (p.x >= range.xl && p.x <= range.xr && p.y >= range.yl && p.y <= range.yr) {
            allActual.push(p);
        }
    }
    root = KD.Build(allActual);
}
function FindError(mousecoord) {
    let user = [Convert(mousecoord[0])];
    let epsilon = 0.005;
    let dist = 1;
    let accumulated = 0;
    let error = 0;
    for (let i = 1; i+2 < mousecoord.length; i++) {
        for (let t = 0; t < 1; t += epsilon) {
            let prev = user[user.length-1];
            let p = CatRom(mousecoord[i-1], mousecoord[i], mousecoord[i+1], mousecoord[i+2], t);
            let d = EuclideanDist(prev, p);
            if (accumulated+d < dist) {
                accumulated += d;
            }
            else {
                user.push(Convert(p));
                accumulated = 0;
            }
        }
    }
    const len = user.length;
    for (let i = 0; i < len; i++) {
        let best = {dist: Infinity, point : null};
        KD.Nearest(root, user[i], best);
        error += best.dist;
    }
    error /= len;
    error *= 100;
    let Error = document.getElementById("error");
    Error.innerHTML = "Error: " + error.toString();
}