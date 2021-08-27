"use strict";
import popUp from './popup.js';
import gamefield from './gamefield.js';

const startBtn = document.querySelector(".startBtn");
const timeLeft = document.querySelector(".timeLeft span");
const carrotLeft = document.querySelector(".carrotLeft span");

const musicBgm = new Audio("./sound/bg.mp3");
const musicLose = new Audio("./sound/alert.wav");
const musicWin = new Audio("./sound/game_win.mp3");
const musicBug = new Audio("./sound/bug_pull.mp3");
const musicCarrot = new Audio("./sound/carrot_pull.mp3");

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
        finishBanner.popUpScreen("you lose🥴");
        clearInterval(timerId);
    }
}
const finishBanner = new popUp();

const gameField = new gamefield(5,4,95);
gameField.setClickListener(targetOnClick);

function targetOnClick(event){
    const target = event.target;
    if(target.classList.contains("carrot")){
        const carrotLeft = document.querySelector(".carrotLeft span");
        musicCarrot.play();
        target.remove();
        carrotText();
        if(carrotLeft.textContent==="0"){
            endGame("win");
        };
    }else if(target.classList.contains('bug')){
        musicBug.play();
        endGame("lose");
    }
}

finishBanner.setEventListener(newGame);

function newGame(){
    musicBgm.currentTime = 0;
    const bgm = musicBgm.play();
    startBtn.classList.remove("invisible");
    if (firstStart === true){
        sec=10;
        timeLeft.textContent = `00:${sec}`;
        carrotLeft.textContent = gameField.carrotNum;
        startBtn.innerHTML = '<i class="fas fa-stop"></i>'
        firstStart=false;
        timerId = setInterval(printTime,1000)
        gameField.createRandomImg();
        gameField.setRandomPosition();
    }else if (firstStart===false){
        if (bgm!==undefined){
            bgm.then(x=>{
                endGame("replay");
            })
        }
    }
}
function endGame(result){
    musicBgm.pause();
    if(result==="win"){
        musicWin.play();
        finishBanner.popUpScreen("You win😄");
    }else if(result === "lose"){
        musicLose.play();
        finishBanner.popUpScreen("you lose🥴");
    }else if(result === "replay"){
        finishBanner.popUpScreen("Replay❔")
    }
    startBtn.classList.add("invisible");
    firstStart=true;
    clearInterval(timerId);
}

function carrotText(){
    const curCarrot = carrotLeft.textContent;
    carrotLeft.textContent = curCarrot-1;
}

startBtn.addEventListener("click",newGame);
timeLeft.textContent = `00:${sec}`;
carrotLeft.textContent = `${gameField.carrotNum}`;
