let size=67;

class object {
	constructor(id,type,x,y){
		this.id=id;
		this.type=type;
		this.x=x;
		this.y=y;
		this.dir=0;
		objects[id]=this;
		showall();
	}
	show(){
		if (this.type=="player") document.getElementById(this.id).src="player"+this.dir+".png";
		document.getElementById(this.id).style.left=(window.innerWidth-size)/2+size*this.x+"px";
		document.getElementById(this.id).style.top=(window.innerHeight-size)/2-size*this.y+"px";
	}
	delete(){
		document.getElementById(this.id).remove();
		delete objects[this];
	}
	move(x,y,dir){
		this.dir=dir;
		let ok=true;
		for (let other in objects){
			if (x==objects[other].x && y==objects[other].y) ok=false;
		}
		if (ok){
			this.x=x;
			this.y=y;
		}
		if (!ok) this.into();
		showall()
	}
	into(){
		let dx=this.x;
		let dy=this.y;
		if (this.dir==0) dx++;
		else if (this.dir==1) dy--;
		else if (this.dir==2) dx--;
		else if (this.dir==3) dy++;
		let obj="no";
		for (let other in objects){
			if (dx==objects[other].x && dy==objects[other].y) obj=objects[other];
		}
		if (obj!="no"){
			this.interact(obj);
			obj.interacted(this);
		}
	}
	interact(other){
		showall();
	}
	interacted(other){
		if (this.type=="portal"){
			other.x=this.link.x;
			other.y=this.link.y;
			if (other.dir==0) other.x++;
			else if (other.dir==1) other.y--;
			else if (other.dir==2) other.x--;
			else if (other.dir==3) other.y++;
		}
		if (this.type=="win"){
			displaystr+="u win\n";
			displaystr+="https://discord.gg/Vhu8xH7w2Z\n";
		}
		if (this.type=="door"){
			rooms[this.link].load(this.doorx,this.doory);
		}
		showall();
	}
}

class room {
	constructor(id,objs){
		this.objs=objs;
		rooms[id]=this;
	}
	load(x,y){
		deleteall();
		objects={};
		spawnednum={};
		spawn(["player",x,y]);
		for (let obj of this.objs){
			spawn(obj);
		}
	}
}

function keydown(event){
	let key=event.key;
	let player=objects["player"];
	if (key=="ArrowLeft" || key=="a"){
		player.move(player.x-1,player.y,2);
	}
	if (key=="ArrowRight" || key=="d"){
		player.move(player.x+1,player.y,0);
	}
	if (key=="ArrowDown" || key=="s"){
		player.move(player.x,player.y-1,1);
	}
	if (key=="ArrowUp" || key=="w"){
		player.move(player.x,player.y+1,3);
	}
}

function spawn(l){
	if (l[0]=="portals"){
		let a=spawn(["portal",l[1],l[2]]);
		let b=spawn(["portal",l[3],l[4]]);
		document.getElementById(a.id).style.filter="hue-rotate("+l[5]+"deg)";
		document.getElementById(b.id).style.filter="hue-rotate("+l[5]+"deg)";
		link(a,b);
	} else if (l[0]=="walls"){
		for (let i=l[1]; i<=l[2]; i++){
			spawn(["wall",i,l[3]]);
			if (l[3]!=l[4]) spawn(["wall",i,l[4]]);
		}
		for (let i=l[3]+1; i<=l[4]-1; i++){
			spawn(["wall",l[1],i]);
			if (l[1]!=l[2]) spawn(["wall",l[2],i]);
		}
	} else {
		let type=l[0];
		let n=0;
		if (spawnednum[type]!=undefined) n=spawnednum[type]+1;
		spawnednum[type]=n;
		let name=type+n;
		if (name=="player0"){
			name="player";
			document.body.innerHTML+="<img id='player' src='player0.png'>";
		} else {
			document.body.innerHTML+="<img id='"+name+"' src='"+type+".png'>";
		}
		if (type=="door"){
			let obj=new object(name,type,l[1],l[2]);
			obj.link=l[3];
			obj.doorx=l[4];
			obj.doory=l[5];
		} else {
			return new object(name,type,l[1],l[2]);
		}
	}
}

function link(obj1,obj2){
	obj1.link=obj2;
	obj2.link=obj1;
}

function showall(){
	for (let id in objects){
		objects[id].show();
	}
}

function deleteall(){
	for (let id in objects){
		objects[id].delete();
	}
}

function display(){
	if (dialoguecur=="") document.getElementById("dialogue").style.display="none";
	else document.getElementById("dialogue").style.display="block";
	if (displaystr!=""){
		dialoguecur+=displaystr[0];
		document.getElementById("dialogue").innerText=dialoguecur;
		displaystr=displaystr.slice(1,displaystr.length);
	}
}

let objects={};
let spawnednum={};
let rooms={};
let displaystr="no this is not the entire diamond\n(click to dismiss)\n";
let dialoguecur="";
new room("a",[["door",2,0,"b",0,0],["walls",-3,3,-3,3],["wall",2,1],["wall",2,-1],["win",0,4],["portals",4,0,4,0]]).load(0,0);
new room("b",[["door",1,0,"a",0,0],["door",1,1,"c",0,0],["walls",-3,6,-3,3],["walls",3,3,-2,2],["portals",2,0,4,0],["wall",0,1],["wall",1,2],["wall",2,1],["portals",8,0,2,4,180],["door",2,2,"a",5,5],["wall",4,-1]]);
new room("c",[["door",5,0,"b",0,4]]);
setInterval(display,100);
//showall();