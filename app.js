const canvas=document.querySelector("#jsCanvas")
const ctx=canvas.getContext("2d")
const colors=document.querySelectorAll(".jscolor")
const range=document.querySelector("#jsRange")
const mode=document.querySelector("#jsMode")
const save=document.querySelector("#jsSave")

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

const INITIAL_COLOR="#2c2c2c"

ctx.fillStyle="white";
ctx.fillRect(0,0,canvas.width,canvas.height)
ctx.strokeStyle=INITIAL_COLOR
ctx.fillStyle=INITIAL_COLOR
ctx.lineWidth=2.5

let painting=false
let filling=false

function start(){
    painting=true;
}

function stop(){
    painting=false;
}
function onMouse(event){
    const x=event.offsetX
    const y=event.offsetY
    //console.log(x,y)
    if(!painting){
        ctx.beginPath()
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y)
        ctx.stroke();
    }
}
/* function mouseDown(event){
    painting=true
}
 */
function changeColor(event){
    console.log(event.target.style)
    const color=event.target.style.backgroundColor
    ctx.strokeStyle=color
    ctx.fillStyle=color
}

function rangeChange(event){
    //console.log(event.target.value)
    ctx.lineWidth=event.target.value
}
function changeMode(){
    if(filling === true){
        filling=false;
        mode.innerText="fill"
    }else{
        filling=true;
        mode.innerText="paint"
    }
}
function canvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height)
    }
}

function handleCM(event){
    event.preventDefault();
}
function saveImg(){
    const image=canvas.toDataURL();
    //console.log(image)
    const link=document.createElement("a")
    link.href=image;
    link.download="paintJs";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouse)
    canvas.addEventListener("mousedown",start)
    canvas.addEventListener("mouseup",stop)
    canvas.addEventListener("mouseleave",stop)
    canvas.addEventListener("click",canvasClick)
    canvas.addEventListener("contextmenu",handleCM)
}
 //console.log(Array.from(colors));
Array.from(colors).forEach(color=>color.addEventListener("click",changeColor))

if(range){
    range.addEventListener("input",rangeChange);
}
if(mode){
    mode.addEventListener("click",changeMode);
}
if(save){
    save.addEventListener("click",saveImg);
}