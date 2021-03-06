'use strict';
import * as sound from './sound.js';

export default class gamefield{
    constructor(CARROT,BUG,CARROT_SIZE){
        this.carrotNum = CARROT;
        this.bugNum = BUG;
        this.carrotSize = CARROT_SIZE;
        this.main = document.querySelector("main");
        this.main.addEventListener('click',(event)=>{
            this.targetOnClick(event);
        })
        this.carrotLeft = document.querySelector(".carrotLeft span");
        this.carrotLeft.textContent = `${this.carrotNum}`;
    }
    setEndGame(endGame){
        this.endGame = endGame;
    }
    targetOnClick(event){
        const target = event.target;
        if(target.classList.contains("carrot")){
            const carrotLeft = document.querySelector(".carrotLeft span");
            sound.playCarrot();
            target.remove();
            this.carrotText();
            if(carrotLeft.textContent==="0"){
                this.endGame("win");
            };
        }else if(target.classList.contains('bug')){
            sound.playBug();
            this.endGame("lose");
        }
    }
    createRandomImg(){
        this.removeMain();
        for(let i=1;i<=this.carrotNum;i++){
            this.main.innerHTML += `<img class="carrot" src="img/carrot.png" />`
        }
        for(let i=1;i<=this.bugNum;i++){
            this.main.innerHTML += `<img class="bug" src="img/bug.png" />`
        }
    }
    removeMain(){
        if (this.main.childNodes[0]){
            while(this.main.childNodes[0]){
                this.main.childNodes[0].remove();
            }
        }
    }
    setRandomPosition(){
        const carrotArr = document.querySelectorAll(".carrot");
        const bugArr = document.querySelectorAll(".bug");
        carrotArr.forEach(carrot=>this.randomPosition(carrot));
        bugArr.forEach(bug=>this.randomPosition(bug));
    }
    randomPosition(target){
        const rect = this.main.getBoundingClientRect();
        const x1 = 0;
        const x2 = rect.width - this.carrotSize;
        const y1 = 0;
        const y2 = rect.height - this.carrotSize;
        const x = Math.floor(Math.random()*(x2-x1))+x1;
        const y = Math.floor(Math.random()*(y2-y1))+y1;
        target.style.top = `${y}px`;
        target.style.left = `${x}px`;  
    }
    carrotText(){
        const curCarrot = this.carrotLeft.textContent;
        this.carrotLeft.textContent = curCarrot-1;
    }
}