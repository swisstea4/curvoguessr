const subxunit = 20;
const subyunit = 20;
function TransformCanvas(context, cw, ch) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(cw/2,ch/2);
}

function DrawAxis(){
    const canvas = document.getElementById('plane');
    const context = canvas.getContext('2d');
    const xunit = 2*subxunit;
    const yunit = 2*subyunit;
    const ch = canvas.height;
    const cw = canvas.width;
    TransformCanvas(context, cw, ch);
    context.beginPath();
    context.strokeStyle = "#363636";
    context.lineWidth = 0.5;
    for (let i = -ch; i <= ch; i+=subyunit) {
        context.moveTo(-cw,i);
        context.lineTo(cw,i);
    }
    for (let i = -cw; i <= cw; i+=subxunit) {
        context.moveTo(i,-ch);
        context.lineTo(i,ch);
    }
    context.stroke();

    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 2;
    for (let i = -ch; i <= ch; i += yunit) {
        context.moveTo(-cw,i);
        context.lineTo(cw,i);
    }
    for (let i = -cw; i <= cw; i += xunit) {
        context.moveTo(i,-ch);
        context.lineTo(i,ch);
    }
    context.stroke();
}

function DrawGraph(xcoord, diff, Funct){
    const canvas = document.getElementById('plane');
    const context = canvas.getContext('2d');
    

    context.strokeStyle = "Red";
    context.lineWidth = 2;
    const xunit = 2*subxunit;
    const yunit = 2*subyunit;
    const step = 1/xunit;
    const cw = canvas.width;
    const ch = canvas.height;

    TransformCanvas(context,cw,ch);
    context.beginPath();
    context.moveTo(xcoord*xunit,-Funct(xcoord)*yunit);
    for (let x = xcoord; x <= (xcoord+diff); x += step){
        context.lineTo(x*xunit,-Funct(x)*yunit);
    }
    context.stroke();
}

function Squared(x) {
    return x*x;
}
DrawAxis();
DrawGraph(-2,4,Squared);