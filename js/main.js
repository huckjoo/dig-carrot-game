"use strict";

const startBtn = document.querySelector(".startBtn");
const main = document.querySelector("main");
const timeLeft = document.querySelector(".timeLeft span");
const carrotLeft = document.querySelector(".carrotLeft span");

const musicBgm = document.querySelector(".bgm");
const musicLose = document.querySelector(".game_lose");
const musicWin = document.querySelector(".game_win");
const musicBug = document.querySelector(".bug_pull");
const musicCarrot = document.querySelector(".carrot_pull");

const GAME_NUM = 10;
let CARROT = GAME_NUM;
const BUG = GAME_NUM;
let sec=GAME_NUM;
let timerId = null;
let firstStart = true;

function createRandomImg(){
    if (main.childNodes[0]){
        while(main.childNodes[0]){
            main.childNodes[0].remove();
        }
    }
    for(let i=1;i<=CARROT;i++){
        main.innerHTML += `<img class="carrot" src="img/carrot.png" />`
    }
    for(let i=1;i<=BUG;i++){
        main.innerHTML += `<img class="bug" src="img/bug.png" />`
    }
}

function printTime(){
    const timeLeft = document.querySelector(".timeLeft span");
    sec=sec-1;
    timeLeft.innerHTML = sec<10 ? `00:0${sec}`:`00:${sec}`;
    if (sec===0){
        popUpMessage("You lose🥴","lose");
        clearInterval(timerId);
    }
}

function onClickBtn(event){
    if (firstStart===true){
        return;
    }
    if(event.target.classList.value === "carrot"){
        carrotOnClick(event);
    }else if(event.target.classList.value === "bug"){
        bugOnClick();
    }
}

function newGame(){
    musicBgm.currentTime = 0;
    const bgm = musicBgm.play();
    startBtn.classList.remove("invisible");
    if (firstStart === true){
        sec=GAME_NUM;
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
    const screen = document.createElement("div");
    screen.setAttribute("class","popup");
    screen.innerHTML = `<button class="retryBtn"><i class="fas fa-redo-alt"></i></button><span>${text}</span>`
    main.appendChild(screen);
    const retryBtn = document.querySelector(".retryBtn");
    firstStart=true;
    retryBtn.addEventListener("click",newGame);
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
    const curCarrot = carrotLeft.textContent;
    carrotLeft.textContent = curCarrot-1
    if(carrotLeft.textContent==="0"){
        popUpMessage("You Win😄","win");
        clearInterval(timerId);
    };
}

function setRandomPosition(){
    const carrotArr = document.querySelectorAll(".carrot");
    const bugArr = document.querySelectorAll(".bug");
    carrotArr.forEach(carrot=>randomPosition(carrot));
    bugArr.forEach(bug=>randomPosition(bug));
    // carrotArr.forEach(carrot=>carrot.addEventListener("click",carrotOnClick));
    // bugArr.forEach(bug=>bug.addEventListener("click",bugOnClick));
}

function randomPosition(target){
    while(true){
        const x = Math.floor(Math.random()*600)+1;
        const y = Math.floor(Math.random()*1450)+1;
        if (x>=350 && y>=30){
            target.style.top = `${x}px` //350~600사이
            target.style.left = `${y}px` //30~1450사이
            break;
        }
    }
}

startBtn.addEventListener("click",newGame);
timeLeft.textContent = `00:${sec}`;
carrotLeft.textContent = `${CARROT}`;
main.addEventListener("click",onClickBtn);