let vyska=130;
let sirka=110;
let test=1;
let nula=0000000000000000;
let terc;
let cas=0;
let cas2=0;
let cas3;
let casVypis;
let score = document.getElementById("score");
let body=0
let celkBody=0;
let x=50;
let y=0;
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
document.getElementById("next").addEventListener('click', next);
document.getElementById("nexte").addEventListener('click', nexte);
document.getElementById("sound_bom").addEventListener("click", pisnicka2);
document.getElementById("sound_war").addEventListener("click", pisnicka3);
document.getElementById("soundoff").addEventListener("click", pisnickaOff);
document.getElementById("canvas").addEventListener("click", onClick);
let e = document.getElementById("canvas");
let canvas = e;
//promenne 
function vyberPostavy(){ //vyber tera postava se zobrazi na canvasu
    if(rngPostava == 1){
        terc = new terce(sirka,vyska, "../img/target2.jpg", rng1, rng2, "image");
    }
    else if(rngPostava == 2){
        terc = new terce(sirka,vyska, "../img/target2_1.jpg", rng1, rng2, "image");
    }
    else{
        terc = new terce(sirka,vyska, "../img/target2_3.jpg", rng1, rng2, "image");
    }
}
window.addEventListener('load', (event) => { //promenne a zacatek funkce pri zapnuti stranky
    startHry();
    shot = new sound("../mp3/shot.wav");
    miss = new sound("../mp3/kill.wav");
    song2 = new sound("../mp3/game.mp3");
    song3 = new sound("../mp3/song_war.mp3");
    sound = new sound("../mp3/song_master.mp3");
})
function maxBodyy(){ //funkce na zapisovani maximalnich bodu
    celkBody++;
    document.getElementById("maxBody").innerHTML = celkBody;
}
function startHry() { //zacatek hry
    vyberPostavy();
    startCanvas.start();
    
}
var startCanvas = { //canvas a updatovani canvasu
    start : function() {
        this.interval = setInterval(updateGameArea, 0);
    },
    clear : function(){
        this.update();
    }
}
function terce(width, height, color, x, y, type){ //velikost a obrazek terce zobrazovaneho na canvasu
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
    
function sound(src) { //prehravani pisnicek
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
function updateGameArea() { //updatovani oblasti hry
    terc.update();
}
function pisnicka(){ //pusteni pisnicek 1/2/3 + vypnuti pisnicek na pisnickaoff
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
function onClick(e){ //vsechyn akce ktere se provedou pri kliknuti na canvas
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
        document.getElementById("maxBody").innerHTML = celkBody;

        score.innerHTML = body;
        miss.play();
        
    }
}
function showCoordsX(e) { //koordinace pri kliknuti na canvas X
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
function showCoordsY(e) { //koordinace pri kliknuti na canvas Y
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
function cleanCanvas() { //vycisteni canavasu
        ctx.beginPath();
        ctx.strokeStyle = "transparent";
        ctx.fillStyle = "#272e2e";
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.stroke();
        ctx.fill(); 
        startHry();
          }
          function myTimer(){ //časovač
            x--;
            document.getElementById("time").innerHTML = x;
            if(x <1 && body < 49){
                body = 0;
                celkBody = 0;
                score.innerHTML = body;
                document.getElementById("maxBody").innerHTML = celkBody;
                alert("Čas vypršel!/Time's Up!");
                x=50;
            }
            else if(x > 1 && celkBody > 49){
                if(y<1){
                    alert("Vyhrál si!/You won!");
                    y++;
                }
 
                body=0;
                x=50;
                
            }
          }
          function next(){ //funkce pro tlacitko na pokracovani
            if(celkBody >49){
              location.replace("v02.html");
            }
            else if(celkBody<49){
                alert("Nemáš dostatek celkových bodů! (50)")
            }
          }
          function nexte(){ //funkce pro tlacitko na pokracovani pro anglickou stranku
            if(celkBody >49){
              location.replace("v02EN.html");
            }
            else if(celkBody<49){
                alert("You dont have enought pints! (50)")
            }
          }
          function bodyplus(){ //pro specialni tlacitko ktere prida body (pouze pro testovaci mod)
              celkBody=100;
          }