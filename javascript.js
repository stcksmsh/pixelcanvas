const DEFAULT_SIZE = 16
const DEFAULT_COLOR = '#000000';
const BACKGROUND_COLOR = 'white'

const gameBoard = document.getElementById("game-board")
let currentColor = DEFAULT_COLOR;
let currentMode = 'color';
let currentSize = DEFAULT_SIZE


function clearBoard(){

}

let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true};
document.body.onmouseup = () => {mouseDown = false};


function changeColor(e){
    if(e.type == 'mouseover' && !mouseDown) return;
    switch(currentMode){
        case 'random':
            let R = Math.floor(Math.random() * 256);
            let G = Math.floor(Math.random() * 256);
            let B = Math.floor(Math.random() * 256);
            e.target.style.backgroundColor = 'rgb(' + R + ',' + G + ',' + B + ')';
            break;
        case 'erase':
            e.target.style.backgroundColor = BACKGROUND_COLOR;
            break;
        case 'color':
            e.target.style.backgroundColor = currentColor;
            break;
    }
}

function resizeBoard(){
    gameBoard.innerHTML = "";

    document.documentElement.style.setProperty('--game-rows', currentSize);
    document.documentElement.style.setProperty('--game-columns', currentSize);

    for(let i = 0; i < currentSize ** 2 ; i ++){
        const gameSquare = document.createElement('div');
        gameSquare.classList = ['game-square'];
        gameSquare.style.backgroundColor = BACKGROUND_COLOR;
        gameSquare.style.border = 0;
        gameSquare.addEventListener('mousedown', changeColor);
        gameSquare.addEventListener('mouseover', changeColor);
        gameBoard.appendChild(gameSquare);
    }
}

function setEventListeners(){
    document.getElementById('colorpicker').addEventListener('change', (e) => {document.getElementById('colorpicker-wrapper').style.backgroundColor=e.target.value;currentColor=e.target.value;});
    document.getElementById('randomBtn').addEventListener('click', (e) => {currentMode = 'random';});
    document.getElementById('eraseBtn').addEventListener('click', (e) => {currentMode = 'erase';});
    document.getElementById('colorBtn').addEventListener('click', (e) => {currentMode = 'color';});
    document.getElementById('size8').addEventListener('click', (e) =>{currentSize=8;resizeBoard();});
    document.getElementById('size16').addEventListener('click', (e) =>{currentSize=16;resizeBoard();});
    document.getElementById('size32').addEventListener('click', (e) =>{currentSize=32;resizeBoard();});
}


window.onload = () => {
    resizeBoard();
    setEventListeners();
}