let Sun_Pull=50;class Planet{constructor(t,e,s,n,i,l){this.element=i,this.xpos=t,this.ypos=e,this.xspeed=s,this.yspeed=n,this.dead=!1,this.name=l,this.hitcounter=0,this.hitbox=30}move(){if(this.xpos+=this.xspeed,this.ypos+=this.yspeed,this.element.style.left=this.xpos+"px",this.element.style.top=this.ypos+"px",this.gravity(),this.dead)return this.element.remove(),void planets.splice(planets.indexOf(this),1);this.hitcounter++,this.hitcounter>20&&(this.hitbox=45)}gravity(){let t=this.xpos-400,e=this.ypos-400;const s=(t**2+e**2)**.5;s<this.hitbox&&(this.dead=!0);const n=Sun_Pull/s;if(0==t)return e>0?[0,-n]:e<0?[0,n]:[0,0];const i=Math.atan(Math.abs(e)/Math.abs(t));let l=Math.sin(i)*n,o=Math.cos(i)*n;t>0&&(o*=-1),e>0&&(l*=-1),this.xspeed+=o,this.yspeed+=l}}let planets=[],pcount=0;const space=document.getElementById("space");space.addEventListener("click",(function(t){var e=space.getBoundingClientRect(),s=t.clientX-e.left,n=t.clientY-e.top;let i=pcount.toString(36),l=Math.floor(16777215*Math.random()).toString(16),o=parseInt(document.getElementById("xspeed").value),a=parseInt(document.getElementById("yspeed").value);for(p of(isNaN(o)&&(o=0),isNaN(a)&&(a=0),space.innerHTML+=`<div class="planet" id="p_${i}" style="background-color: #${l};"></div>`,planets.push(new Planet(s+3,n-25,o,a,document.getElementById(`p_${i}`),`p_${i}`)),planets))p.element=document.getElementById(`${p.name}`);pcount++}));const movement=setInterval((()=>{if(planets.length>0)for(let t of planets)t.move()}),30);function clearP(){for(p of planets)p.dead=!0}function changePull(){let t=parseInt(document.getElementById("pull").value);isNaN(t)&&(t=0),Sun_Pull=t}