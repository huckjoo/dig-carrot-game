"use strict";
import popUp from './popup.js';
import game from './game.js';

const musicBgm = new Audio("./sound/bg.mp3");
const musicLose = new Audio("./sound/alert.wav");
const musicWin = new Audio("./sound/game_win.mp3");
const musicBug = new Audio("./sound/bug_pull.mp3");
const musicCarrot = new Audio("./sound/carrot_pull.mp3");

const finishBanner = new popUp();

const Game = new game(10,10,10);
Game.setEndGame(endGame);

finishBanner.setEventListener(()=>{Game.newGame()});

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
    Game.startBtn.classList.add("invisible");
    Game.firstStart=true;
    clearInterval(Game.timerId);
}

