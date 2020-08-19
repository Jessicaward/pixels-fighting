//todo: change these to matching hex values.
var colours = [
    ["red", "blue"],
    ["yellow", "green"]
];

var gameProperties = {
    height: 500,
    width: 500,
    colourPalette: 0
};

var board;
var canvas;
var context;

document.addEventListener("DOMContentLoaded", function(){
    init();
});

function init(){
    randomiseColourPalette();
    initialiseBoard(gameProperties.width, gameProperties.height);

    var canvas = document.getElementById("gameCanvas");

    if(canvas.getContext){
        context = canvas.getContext("2d");
    }
    else{
        alert("Could not find canvas, this may be due to an unsupported browser.");
    }
}

function initialiseBoard(width, height) {
    board = Array.from(Array(width), () => new Array(height));
    for(var x = 0; x < gameProperties.width; x++){
        for(var y = 0; y < gameProperties.height; y++){
            if(x <= 250){
                board[x][y] = 0;
            } else {
                board[x][y] = 1
            }
        }
    }
}

function drawBoard() {
    for(var x = 0; x < gameProperties.width; x++){
        for(var y = 0; y < gameProperties.height; y++){
            //sets colour to current pixel in selected palette
            context.fillStyle = colours[gameProperties.colourPalette][board[x][y]];

            context.fillRect(x, y, 1, 1);
        }
    }
}

function randomiseColourPalette(){
    gameProperties.colourPalette = getRandomNumber(0, colours.length);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}