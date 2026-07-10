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
    
    context.moveTo(-cw/2,0);
    context.lineTo(cw/2,0);
    context.moveTo(0,-ch/2);
    context.lineTo(0,ch/2);

    context.moveTo(-cw/2,0);
    context.lineTo(-cw/2+subxunit,subyunit);
    context.moveTo(-cw/2,0);
    context.lineTo(-cw/2+subxunit,-subyunit);

    context.moveTo(cw/2,0);
    context.lineTo(cw/2-subxunit,subyunit);
    context.moveTo(cw/2,0);
    context.lineTo(cw/2-subxunit,-subyunit);

    context.moveTo(0,-ch/2);
    context.lineTo(subxunit,-ch/2+subyunit);
    context.moveTo(0,-ch/2);
    context.lineTo(-subxunit,-ch/2+subyunit);

    context.moveTo(0,ch/2);
    context.lineTo(subxunit,ch/2-subyunit);
    context.moveTo(0,ch/2);
    context.lineTo(-subxunit,ch/2-subyunit);
    context.stroke();
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
function DrawGraph(x_1, x_2, Funct_x, Funct_y){
    const canvas = document.getElementById('plane');
    const context = canvas.getContext('2d');
    const ch = canvas.height;
    const cw = canvas.width;
    
    TransformCanvas(context,cw,ch);
    context.beginPath();
    context.strokeStyle = "Red";
    context.lineWidth = 4;

    DrawGraphSegment(x_1,x_2,0.001,Funct_x, Funct_y, context);
    context.stroke();
}
function Squared_x(t) {
    return 5*Math.cos(t);
}
function Squared_y(t) {
    return 3*Math.sin(t);
}
DrawAxis();
DrawGraph(0, 2*Math.PI,Squared_x, Squared_y);

//Allow the user to draw

function DrawUser() {
    const DrawingPlane = document.getElementById("drawingplane");
    const context = DrawingPlane.getContext('2d');
    const cw = DrawingPlane.width;
    const ch = DrawingPlane.height;
    TransformCanvas(context,cw,ch);
    let CurrentlyDrawing = false;
    DrawingPlane.addEventListener('mousedown',(event) => {
        context.beginPath();
        CurrentlyDrawing=true;
        context.moveTo(event.clientX, event.clientY);
    });
    DrawingPlane.addEventListener('mousemove', (event) => {
        if (CurrentlyDrawing) {
            context.lineTo(event.clientX, event.clientY);
            context.stroke();
        }
    });
    DrawingPlane.addEventListener('mouseup', (event) => {
        CurrentlyDrawing = false;
    });
}
DrawUser();