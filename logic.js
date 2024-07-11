let Sun_Pull=50;

class Planet{
    constructor(x,y,xspeed,yspeed,element,name){
        this.element=element;
        this.xpos=x;
        this.ypos=y;
        this.xspeed=xspeed;
        this.yspeed=yspeed;
        this.dead=false;
        this.name=name;
        this.hitcounter=0;
        this.hitbox=30;
    }
    move(){
        this.xpos+=this.xspeed;
        this.ypos+=this.yspeed;
        this.element.style.left=this.xpos+"px";
        this.element.style.top=this.ypos+"px";
        this.gravity();
        if(this.dead){
            this.element.remove();
            planets.splice(planets.indexOf(this),1);
            return;}
        this.hitcounter++;
        if(this.hitcounter>20){this.hitbox=45;}
    }
    gravity(){
        let xcord=this.xpos-400;
        let ycord=this.ypos-400;
        const Distance=((xcord**2)+(ycord**2))**(1/2); 
        if(Distance<this.hitbox){this.dead=true;}
        const Relative_Pull=Sun_Pull/Distance;
        if(xcord==0){
            if(ycord>0){return [0,-Relative_Pull];}
            else if(ycord<0){return [0,Relative_Pull];}
            else{return [0,0];}
        }
        const angle=Math.atan(Math.abs(ycord)/Math.abs(xcord));
        
        let py=Math.sin(angle)*Relative_Pull;
        let px=Math.cos(angle)*Relative_Pull;
        if(xcord>0){px*=-1;}
        if(ycord>0){py*=-1;}

        this.xspeed+=px; this.yspeed+=py;
    }
}

let planets=[];
let pcount=0;
const space=document.getElementById("space");

space.addEventListener("click",function (event){
    var rect=space.getBoundingClientRect();
    var X=event.clientX-rect.left;
    var Y=event.clientY-rect.top;
    let num=pcount.toString(36);
    let col=Math.floor(Math.random()*16777215).toString(16);
    let speedx=parseInt(document.getElementById("xspeed").value);
    let speedy=parseInt(document.getElementById("yspeed").value);
    if(isNaN(speedx)){speedx=0;}if(isNaN(speedy)){speedy=0;}
    space.innerHTML+=`<div class="planet" id="p_${num}" style="background-color: #${col};"></div>`;
    planets.push(new Planet(X+3,Y-25,speedx,speedy,document.getElementById(`p_${num}`),`p_${num}`)); 
    for(p of planets){p.element=document.getElementById(`${p.name}`);}
    pcount++;
});

const movement=setInterval(()=>{
    if(planets.length>0){
        for(let p of planets){p.move();}
    }
},30);

function clearP(){for(p of planets){p.dead=true;}}
function changePull(){
    let val = parseInt(document.getElementById("pull").value);
    if(isNaN(val)){val=0}
    Sun_Pull=val;
}