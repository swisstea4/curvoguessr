const subxunit = 20;
const subyunit = 20;
const xunit = 2*subxunit;
const yunit = 2*subyunit;

function TransformCanvas(context, cw, ch) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(cw/2,ch/2);
    context.scale(1,-1);
}
function DrawAxis(){
    const canvas = document.getElementById('plane');
    const context = canvas.getContext('2d');
    const ch = canvas.height;
    const cw = canvas.width;
    TransformCanvas(context, cw, ch);
    context.beginPath();
    context.strokeStyle = "#363636";
    context.lineWidth = 0.5;
    for (let i = -Math.floor((ch/2)/yunit)*yunit+subyunit; i <= Math.floor((ch/2)/yunit)*yunit-subyunit; i+=yunit) {
        context.moveTo(-(cw/2),i);
        context.lineTo((cw/2),i);
    }
    for (let i = -Math.floor((cw/2)/xunit)*xunit+subxunit; i <= Math.floor((cw/2)/xunit)*xunit+subxunit; i+=xunit) {
        context.moveTo(i,-(ch/2));
        context.lineTo(i,(ch/2));
    }
    context.stroke();

    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 2;
    for (let i = -Math.floor((ch/2)/yunit)*yunit; i <= Math.floor((ch/2)/yunit)*yunit; i += yunit) {
        context.moveTo(-(cw/2),i);
        context.lineTo((cw/2),i);
    }
    for (let i = -Math.floor((cw/2)/xunit)*xunit; i <= Math.floor((cw/2)/xunit)*xunit; i += xunit) {
        context.moveTo(i,-(ch/2));
        context.lineTo(i,(ch/2));
    }
    context.stroke();
    
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 6;
    
    context.moveTo(-cw/2+(subxunit/2),0);
    context.lineTo(cw/2-(subxunit/2),0);
    context.moveTo(0,-ch/2+(subyunit/2));
    context.lineTo(0,ch/2-(subyunit)/2);
    context.stroke();

    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 1;
    
    context.moveTo(-cw/2,0);
    context.lineTo(-cw/2+(2*subxunit/3),(2*subyunit/3));
    context.lineTo(-cw/2+(2*subxunit/3),-(2*subyunit/3));
    context.closePath();
    context.fillStyle = "black";
    context.fill();

    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 1;
    
    context.moveTo(cw/2,0);
    context.lineTo(cw/2-(2*subxunit/3),(2*subyunit/3));
    context.lineTo(cw/2-(2*subxunit/3),-(2*subyunit/3));
    context.closePath();
    context.fillStyle = "black";
    context.fill();
    
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.moveTo(0,-ch/2);
    context.lineTo((2*subxunit/3),-ch/2+(2*subyunit/3));
    context.lineTo(-(2*subxunit/3),-ch/2+(2*subyunit/3));
    context.closePath();
    context.fillStyle = "black";
    context.fill();

    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.moveTo(0,ch/2);
    context.lineTo((2*subxunit/3),ch/2-(2*subyunit/3));
    context.lineTo(-(2*subxunit/3),ch/2-(2*subyunit/3));
    context.closePath();
    context.fillStyle = "black";
    context.fill();
}
function DrawGraphSegment(t_1, t_2, mxerr, Funct_x, Funct_y, context){
    const t_m = (t_1 + t_2)/2;
    const p_1 = {
        x: Funct_x(t_1),
        y: Funct_y(t_1)
    }
    const p_m = {
        x: Funct_x(t_m),
        y: Funct_y(t_m)
    }
    const p_2 = {
        x: Funct_x(t_2),
        y: Funct_y(t_2)
    }
    const mid = {
        x: (p_1.x + p_2.x)/2,
        y: (p_1.y + p_2.y)/2
    }
    const dx = (p_m.x-mid.x);
    const dy = (p_m.y-mid.y);
    const error = Math.sqrt(dx*dx+dy*dy);
    if (error < mxerr) {
        context.moveTo(xunit*p_1.x, yunit*p_1.y);
        context.lineTo(xunit*p_2.x, yunit*p_2.y);
    }
    else {
        DrawGraphSegment(t_1, t_m, mxerr, Funct_x, Funct_y, context);
        DrawGraphSegment(t_m, t_2, mxerr, Funct_x, Funct_y, context);
    }
}
function DrawGraph(t_1, t_2, Funct_x, Funct_y){
    const canvas = document.getElementById('plane');
    const context = canvas.getContext('2d');
    const ch = canvas.height;
    const cw = canvas.width;
    
    TransformCanvas(context,cw,ch);
    context.beginPath();
    context.strokeStyle = "Red";
    context.lineWidth = 4;

    DrawGraphSegment(t_1,t_2,0.001,Funct_x, Funct_y, context);
    context.stroke();
}
function Squared_x(t) {
    return 5*Math.cos(t);
}
function Squared_y(t) {
    return 3*Math.sin(t);
}
DrawAxis();
// DrawGraph(0, 2*Math.PI,Squared_x, Squared_y);

//Allow the user to draw

function CatRomGraph(a,b,c,d,t,context){
    function CatRom(a, b, c, d, t){
    return{x: ((-a.x+3*(b.x)-3*(c.x)+(d.x))*(t*t*t)/2+(a.x-((5*b.x)/(2))+2*c.x-((d.x)/(2)))*(t*t)+((c.x-a.x)/2)*t+(b.x)), y: ((-a.y+3*(b.y)-3*(c.y)+(d.y))*(t*t*t)/2+(a.y-((5*b.y)/(2))+2*c.y-((d.y)/(2)))*(t*t)+((c.y-a.y)/2)*t+(b.y))};
    }
    context.moveTo(b.x,b.y);
    for(let i=t;i<1;i+=t){
        context.lineTo(CatRom(a,b,c,d,i).x,CatRom(a,b,c,d,i).y);
    }
    context.lineTo(c.x,c.y);
}
function DrawUser() {
    const DrawingPlane = document.getElementById("drawingplane");
    const context = DrawingPlane.getContext('2d');
    const rect = DrawingPlane.getBoundingClientRect();
    const cw = DrawingPlane.width;
    const ch = DrawingPlane.height;
    let brush = {x:67,y:67};
    let mousecoord = [];
    let CurrentlyDrawing = false;
    function lazybrush(lazyradi,event){
        const dist = Math.sqrt((event.clientX-rect.left-brush.x)*(event.clientX-rect.left-brush.x)+(event.clientY-rect.top-brush.y)*(event.clientY-rect.top-brush.y));
        if(dist <= lazyradi){
            return;
        }
        else{
            brush.x = (event.clientX-rect.left)-((event.clientX-rect.left-brush.x)*lazyradi)/dist;
            brush.y = (event.clientY-rect.top)-((event.clientY-rect.top-brush.y)*lazyradi)/dist;
        }
    }
    DrawingPlane.addEventListener('pointerdown',(event) => {
        context.beginPath();
        context.lineWidth = 2;
        context.lineCap = "round";
        context.lineJoin = "round";
        CurrentlyDrawing=true;
        //context.moveTo(event.clientX-rect.left, event.clientY-rect.top);
        mousecoord.push({x:event.clientX-rect.left,y:event.clientY-rect.top});
        mousecoord.push({x:event.clientX-rect.left,y:event.clientY-rect.top});
        brush.x=event.clientX-rect.left;
        brush.y=event.clientY-rect.top;
    });
    DrawingPlane.addEventListener('pointermove', (event) => {
        if (CurrentlyDrawing) {
            const coalevents = event.getCoalescedEvents();
            for( const events of coalevents){
                lazybrush(2,events);
                // context.lineTo(brush.x, brush.y);
                mousecoord.push({x:brush.x,y:brush.y});
                if(mousecoord.length>=4){
                CatRomGraph(mousecoord[mousecoord.length-4],mousecoord[mousecoord.length-3],mousecoord[mousecoord.length-2],mousecoord[mousecoord.length-1],0.005,context);
                }
                else{
                    return;
                }
            }
            // context.lineTo(event.clientX-rect.left,event.clientY-rect.top);
            mousecoord.push({x:event.clientX-rect.left,y:event.clientY-rect.top});
            CatRomGraph(mousecoord[mousecoord.length-4],mousecoord[mousecoord.length-3],mousecoord[mousecoord.length-2],mousecoord[mousecoord.length-1],0.02,context);
            context.stroke();
        }
    });
    DrawingPlane.addEventListener('pointerup', (event) => {
        CurrentlyDrawing = false;
        mousecoord = [];
    });

}
DrawUser();
