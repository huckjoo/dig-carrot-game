"use strict";

const startBtn = document.querySelector(".startBtn");
const main = document.querySelector("main");
const timeLeft = document.querySelector(".timeLeft span");
function createImg(){
    for(let i=1;i<=10;i++){
        main.innerHTML += `<img class="carrot" src="img/carrot${i}.png" />`
    }
    for(let i=1;i<=10;i++){
        main.innerHTML += `<img class="bug" src="img/bug${i}.png" />`
    }
}

function printTime(){
    const timeLeft = document.querySelector(".timeLeft span");
    sec=sec-1;
    timeLeft.innerHTML = sec<10 ? `00:0${sec}`:`00:${sec}`;
    if (sec===0){
        popLose();
        clearInterval(timerId);
    }
}
let sec=10;
let timerId = null;
let flag = 0;

function newGame(){
    if (flag === 0){
        timeLeft.textContent = "00:10";
        console.log("flag==0");
        sec=10;
        const popup = document.querySelector(".popup");
        if (popup!==null){
            popup.setAttribute("class","hidden");
        }
        //아이콘 바꾸기
        startBtn.innerHTML = '<i class="fas fa-stop"></i>'
        flag++;
        //10초 타임어택 시작
        timerId = setInterval(printTime,1000)

        //당근,벌레 랜덤배치
        if (main.childNodes[0]){
            while(main.childNodes[0]){
                main.childNodes[0].remove();
            }
        }
        createImg();
        const carrotArr = document.querySelectorAll(".carrot");
        const bugArr = document.querySelectorAll(".bug");
        const carrotLeft = document.querySelector(".carrotLeft span");
        carrotLeft.innerHTML = 10;
        carrotArr.forEach(carrot=>randomPosition(carrot));
        bugArr.forEach(bug=>randomPosition(bug));
        carrotArr.forEach(carrot=>carrot.addEventListener("click",carrotOnClick));
        bugArr.forEach(bug=>bug.addEventListener("click",bugOnClick));
    }else if (flag===1){
        console.log("flag==1");
        const popup = document.querySelector(".popup");
        if (popup===null){
            popReplay();
        }
        clearInterval(timerId);
        flag=0;
    }
}

function popReplay(){
    const screen = document.createElement("div");
    screen.setAttribute("class","popup");
    screen.innerHTML = `<button class="retryBtn"><i class="fas fa-redo-alt"></i></button><span>retry?</span>`
    main.appendChild(screen);
    const retryBtn = document.querySelector(".retryBtn");
    flag=0;
    retryBtn.addEventListener("click",newGame);
}
function popWin(){
    const screen = document.createElement("div");
    screen.setAttribute("class","popup");
    screen.innerHTML = `<button class="retryBtn"><i class="fas fa-redo-alt"></i></button><span>YOU WIN😄</span>`
    main.appendChild(screen);
    const retryBtn = document.querySelector(".retryBtn");
    flag=0;
    retryBtn.addEventListener("click",newGame);
}
function popLose(){
    const screen = document.createElement("div");
    screen.setAttribute("class","popup");
    screen.innerHTML = `<button class="retryBtn"><i class="fas fa-redo-alt"></i></button><span>YOU LOSE🥴</span>`
    main.appendChild(screen);
    const retryBtn = document.querySelector(".retryBtn");
    flag=0;
    retryBtn.addEventListener("click",newGame);
}

function bugOnClick(event){
    popLose();
    clearInterval(timerId);
}

function carrotOnClick(event){
    const carrot = event.target;
    const carrotLeft = document.querySelector(".carrotLeft span");
    carrot.remove();
    const curCarrot = carrotLeft.textContent;
    carrotLeft.textContent = curCarrot-1
    if(carrotLeft.textContent==="0"){
        popWin()
        clearInterval(timerId);
    };
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
timeLeft.textContent = "00:10";