let size=67;

class object {
	constructor(id,x,y){
		this.id=id;
		this.x=x;
		this.y=y;
		this.dir=0;
		this.show();
	}
	show(){
		document.getElementById(this.id).style.left=(window.innerWidth-size)/2+size*this.x+"px";
		document.getElementById(this.id).style.top=(window.innerHeight-size)/2-size*this.y+"px";
		document.getElementById(this.id).style.transform="rotate("+90*this.dir+"deg)";
	}
	move(x,y,dir){
		this.dir=dir;
		let ok=true;
		for (let other of interacts){
			if (x==other.x && y==other.y) ok=false;
		}
		if (ok){
			this.x=x;
			this.y=y;
		}
		this.show();
		if (!ok) this.interact();
	}
	interact(){
		let dx=this.x;
		let dy=this.y;
		if (this.dir==0) dx++;
		else if (this.dir==1) dy--;
		else if (this.dir==2) dx--;
		else if (this.dir==3) dy++;
		let obj="no";
		for (let other of interacts){
			if (dx==other.x && dy==other.y) obj=other;
		}
		if (obj!="no"){
			obj.interacted();
		}
	}
	interacted(){
		if (this.id=="interact") alert("https://discord.gg/Vhu8xH7w2Z");
	}
}

function keydown(event){
	let key=event.key;
	if (["J", "ArrowLeft"].includes(key)){
		player.move(player.x-1,player.y,2);
	}
	if (["L", "ArrowRight"].includes(key)){
		player.move(player.x+1,player.y,0);
	}
	if (["K", "ArrowDown"].includes(key)){
		player.move(player.x,player.y-1,1);
	}
	if (["I", "ArrowUp"].includes(key)){
		player.move(player.x,player.y+1,3);
	}
}

let x=0;
let y=0;
let player=new object("player",x,y);
let interact=new object("interact",3,-3);
let wall1=new object("wall1",3,-2);
let wall2=new object("wall2",2,-3);
let wall3=new object("wall3",4,-3);
let wall4=new object("wall4",2,-4);
let wall5=new object("wall5",4,-4);
let wall6=new object("wall6",2,-5);
let wall7=new object("wall7",4,-5);
let wall8=new object("wall8",2,-6);
let wall9=new object("wall9",4,-6);
let wall10=new object("wall10",2,-7);
let wall11=new object("wall11",4,-7);
let wall12=new object("wall12",2,-8);
let wall13=new object("wall13",4,-8);
let wall14=new object("wall14",2,-9);
let wall15=new object("wall15",4,-9);
let interacts=[interact,wall1,wall2,wall3,wall4,wall5,wall6,wall7,wall8,wall9,wall10,wall11,wall12,wall13,wall14,wall15];
