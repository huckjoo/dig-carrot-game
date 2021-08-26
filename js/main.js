"use strict";

const startBtn = document.querySelector(".startBtn");
const main = document.querySelector("main");
const timeLeft = document.querySelector(".timeLeft span");
const carrotLeft = document.querySelector(".carrotLeft span");

const musicBgm = new Audio("./sound/bg.mp3");
const musicLose = new Audio("./sound/alert.wav");
const musicWin = new Audio("./sound/game_win.mp3");
const musicBug = new Audio("./sound/bug_pull.mp3");
const musicCarrot = new Audio("./sound/carrot_pull.mp3");

const CARROT_SIZE = 95;
let CARROT = 10;
const BUG = 10;
let sec=10;
let timerId = null;
let firstStart = true;

function timeText(){
    const timeLeft = document.querySelector(".timeLeft span");
    sec=sec-1;
    timeLeft.innerHTML = sec<10 ? `00:0${sec}`:`00:${sec}`;
}
function printTime(){
    timeText();
    if (sec===0){
        popUpMessage("You lose🥴","lose");
        clearInterval(timerId);
    }
}

function onClickBtn(event){
    const target = event.target.classList;
    if(target.contains("carrot")){
        carrotOnClick(event);
    }else if(target.contains("bug")){
        bugOnClick();
    }
}

function newGame(){
    musicBgm.currentTime = 0;
    const bgm = musicBgm.play();
    startBtn.classList.remove("invisible");
    if (firstStart === true){
        sec=10;
        timeLeft.textContent = `00:${sec}`;
        carrotLeft.textContent = CARROT;
        startBtn.innerHTML = '<i class="fas fa-stop"></i>'
        firstStart=false;
        timerId = setInterval(printTime,1000)
        createRandomImg();
        setRandomPosition();
        
    }else if (firstStart===false){
        if (bgm!==undefined){
            bgm.then(x=>{
                restart();
            })
        }
    }
}

function restart(){
    const popup = document.querySelector(".popup");
    if (popup===null){
        musicLose.play();
        popUpMessage("Replay❔","replay");
    }
    clearInterval(timerId);
    firstStart=true;
}

function popUpMessage(text,result){
    musicBgm.pause();
    if(result==="win"){
        musicWin.play();
    }else if(result === "lose"){
        musicLose.play();
    }
    startBtn.classList.add("invisible");
    popUpText(text);
    popUpRetry();
    firstStart=true;
}
function popUpRetry(){
    const retryBtn = document.querySelector(".retryBtn");
    retryBtn.addEventListener("click",newGame);
}

function popUpText(text){
    const screen = document.createElement("div");
    screen.setAttribute("class","popup");
    screen.innerHTML = `<button class="retryBtn"><i class="fas fa-redo-alt"></i></button><span>${text}</span>`
    main.appendChild(screen);
}
function bugOnClick(){
    musicBug.play();
    popUpMessage("You lose🥴","lose");
    clearInterval(timerId);
}

function carrotOnClick(event){
    const carrot = event.target;
    const carrotLeft = document.querySelector(".carrotLeft span");
    musicCarrot.play();
    carrot.remove();
    carrotText();
    if(carrotLeft.textContent==="0"){
        popUpMessage("You Win😄","win");
        clearInterval(timerId);
    };
}
function carrotText(){
    const curCarrot = carrotLeft.textContent;
    carrotLeft.textContent = curCarrot-1
}

function setRandomPosition(){
    const carrotArr = document.querySelectorAll(".carrot");
    const bugArr = document.querySelectorAll(".bug");
    carrotArr.forEach(carrot=>randomPosition(carrot));
    bugArr.forEach(bug=>randomPosition(bug));
}

function randomPosition(target){
    const rect = main.getBoundingClientRect();
    const x1 = 0;
    const x2 = rect.width - CARROT_SIZE;
    const y1 = 0;
    const y2 = rect.height - CARROT_SIZE;
    const x = Math.floor(Math.random()*(x2-x1))+x1;
    const y = Math.floor(Math.random()*(y2-y1))+y1;
    target.style.top = `${y}px`;
    target.style.left = `${x}px`;  
}
function removeMain(){
    if (main.childNodes[0]){
        while(main.childNodes[0]){
            main.childNodes[0].remove();
        }
    }
}

function createRandomImg(){
    removeMain();
    for(let i=1;i<=CARROT;i++){
        main.innerHTML += `<img class="abs carrot" src="img/carrot.png" />`
    }
    for(let i=1;i<=BUG;i++){
        main.innerHTML += `<img class="abs bug" src="img/bug.png" />`
    }
}

startBtn.addEventListener("click",newGame);
timeLeft.textContent = `00:${sec}`;
carrotLeft.textContent = `${CARROT}`;
main.addEventListener("click",onClickBtn);