let vyska=70;
let sirka=110;
let MAXS=351;
let MAXV=651;
let test=1;
let test2=0;
let nula=0;
let terc;
let tankEnd;    
let cas=0;
let cas2=0;
let i=0;
let cas3;
let klik=2;
let casVypis;
let timer;
let score = document.getElementById("score");
let body=0
let celkBody=0;
let x=60;
let rng1 = Math.floor(Math.random()*MAXV);
let rng2= Math.floor(Math.random()*MAXS);
let rngPostava = Math.floor(Math.random()*3);
//vyska = Math.floor(Math.random()*5);
//sirka = Math.floor(Math.random()*5);
let postava;
let lives=4;
let img = document.getElementById("imgfill");
let bossLives=100;
document.getElementById("bossLives").innerHTML=bossLives;
document.getElementById("Lives").innerHTML=lives;
document.getElementById("canvas").addEventListener("click", onClick);
let e = document.getElementById("canvas");
tankEnd= new end(900, 450, "../img/tankTarget.jpg",10, 10, "image");

let canvas = e;
function vyberPostavy(){
    if(1 == 1){
        terc = new terce(sirka,vyska, "../img/tankTarget.jpg", rng1, rng2, "image");
    }

}
window.addEventListener('load', (event) => {
    alert("Blíží se k tobě tank, znič ho než se dostane příliš blízo!");
    alert("Tank is coming, destroy it before it get too close!");
    shot = new sounds("../mp3/shotTank.wav");
    miss = new sounds("../mp3/kill.wav");
    sound = new sounds("../mp3/sans.mp3");
    b1 = new sounds("../bum/b1.wav");
    b2 = new sounds("../bum/b2.wav");
    b3 = new sounds("../bum/b3.wav");
    b4 = new sounds("../bum/b4.wav");
    b5 = new sounds("../bum/b5.wav");
    startHry();

})

function startHry() {
    vyberPostavy();
    startCanvas.start();
    
}
var startCanvas = {
    start : function() {
        this.interval = setInterval(updateGameArea, 0);
    },
    clear : function(){
        this.update();
    }
}
function terce(width, height, color, x, y, type){
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width=width;
    this.height=height;
    this.x = x;
    this.y = y;   
    this.update = function() {
        document.getElementById("Lives").innerHTML=lives;
        ctx = canvas.getContext('2d');
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

}
function end(width, height, color, x, y, type){ //vykreslovani tanku
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width=width;
    this.height=height;
    this.x = x;
    this.y = y;   
    this.update = function() {
        document.getElementById("Lives").innerHTML=lives;
        ctx = canvas.getContext('2d');
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
}
}

function sounds(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}
function endGameArea(){
    tankEnd.update();
}
function updateGameArea() {
    terc.update();
}
function onClick(e){
    test2=1;
    document.getElementById("Lives").innerHTML=lives;
    //console.log(showCoordsX(e));
    //console.log(showCoordsY(e));
    let X=showCoordsX(e);
    let Y=showCoordsY(e);
    if(X<=rng1+sirka && Y<=rng2+vyska && X>=rng1 && Y>=rng2){
        klik=1;
       if(i<1){
            timer = setInterval(myTimer, 1000);
            i++;
            lives=4;
        }
        if(vyska < 170){
            vyska=vyska+3;
            sirka=sirka+3;
        
        }
        if(MAXS > 800){
            if(MAXV > 25){
                MAXV=MAXV-20;   
            }

            MAXS=MAXS-9;
        }
        bossLives--;
        document.getElementById("bossLives").innerHTML=bossLives;
        rng1 = Math.floor(Math.random()*MAXV);
        rng2= Math.floor(Math.random()*MAXS);
        console.log(test);
        cleanCanvas();
        shot.play();
        rngPostava = Math.floor(Math.random()*3);
        vyberPostavy();
        sound.play();
    }
    else{
        klik=0;
        console.log(nula);
        }
        if(test2=1 && lives > 0 && klik<1){
            zivotyMinus();
        }

        miss.play();
        
    }
function showCoordsX(e) {
    let x;
    let y;
        if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
        }
        else {
        x = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }
        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;
            return x;
    }
function showCoordsY(e) {
        let x;
        let y;
            if (e.pageX != undefined && e.pageY != undefined) {
            x = e.pageX;
            y = e.pageY;
            }
            else {
            x = e.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
            }
            x -= canvas.offsetLeft;
            y -= canvas.offsetTop;
                return y;
        }
function cleanCanvas() {
        ctx.beginPath();
        ctx.strokeStyle = "transparent";
        ctx.fillStyle = "#272e2e";
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.stroke();
        ctx.fill(); 
        startHry();
          }
          function myTimer(){
                x--;
            document.getElementById("time").innerHTML = x;
            if(x<1 || lives < 1){
                sound.stop();
                alert("Prohrál jsi!");
                x=50;
                lives=4;
                bossLives=100;
                document.getElementById("bossLives").innerHTML=bossLives;
                i=0;
                vyska=80;
                sirka=110;
                MAXS=351;
                MAXV=651;

            }
            else if(bossLives<1 && x<60){
                location.replace("winEN.html");
                x=50;
                bossLives=100;
                cleanCanvas();
                endGameArea();
                document.getElementById("bossLives").innerHTML="Ded xP!";
                document.getElementById("time").innerHTML = "XXX";
            }
          }
          function zivotyMinus(){ //funkce, ktera odebere zivoty
            lives--;
            document.getElementById("Lives").innerHTML=lives;
          }
