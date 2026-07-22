function TransformCanvas(context, cw, ch) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(cw/2,ch/2);
    context.scale(1,-1);
}

function Convert(p) {
    return {
        x : (p.x-origin.x)/xunit,
        y : (origin.y-p.y)/yunit
    }
}

function CatRom(a, b, c, d, t){
    return{x: ((-a.x+3*(b.x)-3*(c.x)+(d.x))*(t*t*t)/2+(a.x-((5*b.x)/(2))+2*c.x-((d.x)/(2)))*(t*t)+((c.x-a.x)/2)*t+(b.x)), y: ((-a.y+3*(b.y)-3*(c.y)+(d.y))*(t*t*t)/2+(a.y-((5*b.y)/(2))+2*c.y-((d.y)/(2)))*(t*t)+((c.y-a.y)/2)*t+(b.y))};
}
function CatRomGraph(a,b,c,d,t,context){
    context.moveTo(b.x,b.y);
    for(let i=t;i<1;i+=t){
        context.lineTo(CatRom(a,b,c,d,i).x,CatRom(a,b,c,d,i).y);
    }
    context.lineTo(c.x,c.y);
}

function EuclideanDist(p1, p2) {
    const xval = (p1.x-p2.x)*(p1.x-p2.x);
    const yval = (p1.y-p2.y)*(p1.y-p2.y);
    return Math.sqrt(xval+yval);
}