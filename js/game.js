'use strict';
import gamefield from "./gamefield.js";
import * as sound from './sound.js';

export default class gameBuilder{
    withgameDuration(duration){
        this.duration = duration;
        return this;
    }
    withgameCarrot(carrot){
        this.carrot = carrot;
        return this;
    }
    withgameBug(bug){
        this.bug = bug;
        return this;
    }
    build(){
        return new game(this.carrot,this.bug,this.duration);
    }
}

class game{
    constructor(carrot,bug,sec){
        this.gameField = new gamefield(carrot,bug,95);
        this.firstSec = sec;
        this.sec=sec;
        this.timerId = null;
        this.firstStart = true;

        this.startBtn = document.querySelector(".startBtn");
        this.startBtn.addEventListener('click',(event)=>{this.newGame(event)});

        this.timeLeft = document.querySelector(".timeLeft span");
        this.timeLeft.textContent = `00:${this.sec}`;
        this.carrotLeft = document.querySelector(".carrotLeft span");
        this.carrotLeft.textContent = `${this.gameField.carrotNum}`;
    }
    setEndGame(endGame){
        this.endGame = endGame;
        this.gameField.endGame = endGame;
    }
    printTime(){
        this.sec = this.sec-1;
        this.timeLeft.innerHTML = this.sec<10 ? `00:0${this.sec}`:`00:${this.sec}`;
        if (this.sec===0){
            this.endGame("lose");
        }
    }
    newGame(){
        sound.playBgm();
        this.startBtn.classList.remove("invisible");
        if (this.firstStart === true){
            this.sec = this.firstSec;
            this.timeLeft.textContent = `00:${this.sec}`;
            this.carrotLeft.textContent = this.gameField.carrotNum;
            this.startBtn.innerHTML = '<i class="fas fa-stop"></i>'
            this.firstStart = false;
            this.timerId = setInterval(()=>{this.printTime()},1000)
            this.gameField.createRandomImg();
            this.gameField.setRandomPosition();
        }else if (this.firstStart===false){
            this.endGame("replay");
        }
    }
    
}