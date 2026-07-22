let errorTimeout = null;
function SendError(error) {
    let box = document.getElementById("error-box");
    box.textContent = error;
    box.style.display = "block";
    box.style.opacity = "1";
    clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
        box.style.opacity = "0";
        setTimeout(() => {
            box.style.display = "none";
        }, 300);
    }, 3000)
}

function UserDrawing() {
    const DrawingPlane = document.getElementById("drawingplane");
    const context = DrawingPlane.getContext('2d');
    const rect = DrawingPlane.getBoundingClientRect();
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
        mousecoord.push({x:event.clientX-rect.left,y:event.clientY-rect.top});
        mousecoord.push({x:event.clientX-rect.left,y:event.clientY-rect.top});
        brush.x=event.clientX-rect.left;
        brush.y=event.clientY-rect.top;
    });
    DrawingPlane.addEventListener('pointermove', (event) => {
        let inRange = true;
        if (CurrentlyDrawing) {
            inRange = true;
            const coalevents = event.getCoalescedEvents();
            for(const events of coalevents){
                lazybrush(2,events);
                let brushCheck = Convert(brush);
                if (brushCheck.x < range.xl || brushCheck.x > range.xr || brushCheck.y < range.yl || brushCheck.y > range.yr) {
                    SendError("Drawing out of range!");
                    mousecoord.length=0;
                    inRange = false;
                    break;
                }
                mousecoord.push({x:brush.x,y:brush.y});
                if(mousecoord.length>=4){
                    CatRomGraph(mousecoord[mousecoord.length-4],mousecoord[mousecoord.length-3],mousecoord[mousecoord.length-2],mousecoord[mousecoord.length-1],0.005,context);
                }
                else{
                    continue;
                }
            }
            if (inRange) {
                mousecoord.push({x:event.clientX-rect.left,y:event.clientY-rect.top});
                CatRomGraph(mousecoord[mousecoord.length-4],mousecoord[mousecoord.length-3],mousecoord[mousecoord.length-2],mousecoord[mousecoord.length-1],0.02,context);
                context.stroke();
                FindError(mousecoord);
            }
        }
    });
    DrawingPlane.addEventListener('pointerup', (event) => {
        CurrentlyDrawing = false;
        mousecoord = [];
    });

}