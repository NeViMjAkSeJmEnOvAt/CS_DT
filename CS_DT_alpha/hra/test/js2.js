let vyska=90;
let sirka=80;
let test=1;
let nula=0000000000000000;
let terc;
let cas=0;
let cas2=0;
let cas3;
let casVypis;
let score = document.getElementById("score");
let body=0
let y=0;
let celkBody=0;
let x=30;
let timer = setInterval(myTimer, 1000);
let rng1 = Math.floor(Math.random()*851);
let rng2= Math.floor(Math.random()*351);
let rngPostava = Math.floor(Math.random()*3);
//vyska = Math.floor(Math.random()*5);
//sirka = Math.floor(Math.random()*5);
let postava;
let img = document.getElementById("imgfill");
document.getElementById("sound").addEventListener("click", pisnicka);
document.getElementById("bodyplus").addEventListener("click", bodyplus);
document.getElementById("sound_bom").addEventListener("click", pisnicka2);
document.getElementById("sound_war").addEventListener("click", pisnicka3);
document.getElementById("soundoff").addEventListener("click", pisnickaOff);
document.getElementById("canvas").addEventListener("click", onClick);
document.getElementById("next").addEventListener('click', next);
document.getElementById("nexte").addEventListener('click', nexte);
let e = document.getElementById("canvas");
let canvas = e;
function vyberPostavy(){
    if(rngPostava == 1){
        terc = new terce(sirka,vyska, "../img/target2_2.jpg", rng1, rng2, "image");
    }
    else if(rngPostava == 2){
        terc = new terce(sirka,vyska, "../img/target1.jpg", rng1, rng2, "image");
    }
    else{
        terc = new terce(sirka,vyska, "../img/target3.jpg", rng1, rng2, "image");
    }
}
window.addEventListener('load', (event) => {
    //let hrac = prompt("Zadej své jméno:", "Hrac1");
    startHry();
    shot = new sound("../mp3/shot.wav");
    miss = new sound("../mp3/kill.wav");
    song2 = new sound("../mp3/game.mp3");
    song3 = new sound("../mp3/song_war.mp3");
    sound = new sound("../mp3/song_master.mp3");
})
function maxBodyy(){
    celkBody++;
    document.getElementById("maxBody2").innerHTML = celkBody;
}
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
    
function sound(src) {
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
function updateGameArea() {
    terc.update();
}
function pisnicka(){
    sound.play();
}
function pisnicka2(){
    song2.play();
}
function pisnicka3(){
    song3.play();
}
function pisnickaOff(){
    sound.stop();
    song2.stop();
    song3.stop();
}
function onClick(e){
    //console.log(showCoordsX(e));
    //console.log(showCoordsY(e));
    let X=showCoordsX(e);
    let Y=showCoordsY(e);
    if(X<=rng1+sirka && Y<=rng2+vyska && X>=rng1 && Y>=rng2){
        body++;
        rng1 = Math.floor(Math.random()*901);
        rng2= Math.floor(Math.random()*351);
        console.log(test);
        score.innerHTML = body;
        cleanCanvas();
        shot.play();
        rngPostava = Math.floor(Math.random()*3);
        vyberPostavy();
        maxBodyy();
    }
    else{
        console.log(nula);
        body = 0;
        if(celkBody > 0){ 
            celkBody--;
        }
        score.innerHTML = body;
        miss.play();
        document.getElementById("maxBody").innerHTML = celkBody;
        
    }
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
            document.getElementById("time").innerHTML = x;
            if(body > 99){
                if(y < 1){
                    alert("Vyhrál si/You win!");
                    y++;
                    }
                    body=0;
                    x=30;
            }
          }
          function next(){
            if(celkBody >199){
              location.replace("boss1.html");
            }
            else if(celkBody<199){
                alert("Nemáš dostatek celkových bodů! (100)")
            }
          }
          function nexte(){
            if(celkBody >49){
              location.replace("boss1EN.html");
            }
            else if(celkBody<49){
                alert("You dont have enought points! (50)")
            }
          }
          function bodyplus(){
              celkBody=1000;
          }