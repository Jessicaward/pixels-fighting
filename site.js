//todo: change these to matching hex values.
var colours = [
    ["red", "blue"],
    ["yellow", "green"]
];

var canvas;
var context;
var gameProperties = {
    height: 500,
    width: 500,
    colourPalette: 0
}

function init(){
    randomiseColourPalette();

    var canvas = document.getElementById("gameCanvas");

    if(canvas.getContext){
        context = canvas.getContext("2d");
    }
    else{
        alert("Could not find canvas, this may be due to an unsupported browser.");
    }
}

function randomiseColourPalette(){
    gameProperties.colourPalette = getRandomNumber(0, colours.length);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}