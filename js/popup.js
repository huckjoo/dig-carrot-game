'use strict';

export default class popUp{
    constructor(){
        this.main = document.querySelector("main");
    }
    setEventListener(onClick){
        this.onClick = onClick;
    }
    popUpScreen(text){
        this.text(text);
        this.retry();
    }
    retry(){
        this.retryBtn = document.querySelector(".retryBtn");
        this.retryBtn.addEventListener("click",this.onClick);
    }
    text(text){
        const screen = document.createElement("div");
        screen.setAttribute("class","popup");
        screen.innerHTML = `<button class="retryBtn"><i class="fas fa-redo-alt"></i></button><span>${text}</span>`
        this.main.appendChild(screen);
    }
}