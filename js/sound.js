'use strict';

const musicBgm = new Audio("./sound/bg.mp3");
const musicLose = new Audio("./sound/alert.wav");
const musicWin = new Audio("./sound/game_win.mp3");
const musicBug = new Audio("./sound/bug_pull.mp3");
const musicCarrot = new Audio("./sound/carrot_pull.mp3");

export function playCarrot(){
    play(musicCarrot);
}

export function playBug(){
    play(musicBug);
}

export function playWin(){
    play(musicWin);
}

export function playLose(){
    play(musicLose);
}

export function playBgm(){
    play(musicBgm);
}
export function stopBgm(){
    stop(musicBgm);
}

function play(sound){
    sound.currentTime = 0;
    sound.play();
}
function stop(sound){
    sound.pause();
}