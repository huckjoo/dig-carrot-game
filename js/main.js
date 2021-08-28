"use strict";
import popUp from './popup.js';
import game from './game.js';
import * as sound from './sound.js';

const finishBanner = new popUp();

const Game = new game(10,10,10);
Game.setEndGame(endGame);

finishBanner.setEventListener(()=>{Game.newGame()});

function endGame(result){
    sound.stopBgm();
    if(result==="win"){
        sound.playWin();
        finishBanner.popUpScreen("You win😄");
    }else if(result === "lose"){
        sound.playLose();
        finishBanner.popUpScreen("you lose🥴");
    }else if(result === "replay"){
        finishBanner.popUpScreen("Replay❔")
    }
    Game.startBtn.classList.add("invisible");
    Game.firstStart=true;
    clearInterval(Game.timerId);
}

