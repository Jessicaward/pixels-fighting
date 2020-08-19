//todo: change these to matching hex values.
var colours = [
    ["#70d6ff", "#ff70a6"],
    ["#f25f5c", "#50514f"],
    ["#641220", "#e01e37"],
    ["#540d6e", "#ffd23f"],
    ["#ffd166", "#06d6a0"]
];

var gameProperties = {
    height: 250,
    width: 250,
    colourPalette: 0
};

var board;
var canvas;
var context;
var playing = true;

document.addEventListener("DOMContentLoaded", function(){
    init();
});

function init(){
    var canvas = document.getElementById("gameCanvas");

    if(canvas.getContext){
        context = canvas.getContext("2d");
        randomiseColourPalette();
        initialiseBoard(gameProperties.width, gameProperties.height);
        setInterval(gameLoop, 1);
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
            context.fillRect(x, y, 2, 2);
        }
    }
}

function gameLoop(){
    drawBoard();
    updateBoard();
    var winner = checkForWinner();
    if(winner !== undefined){
        alert(winner + " won!");
        playing = false;
    }
}

function checkForWinner(){
    var first = board.some(
        function(item){
            return item.some(
                function(inner){
                    return inner == 0;
                }
            )
        }
    );

    var second = board.some(
        function(item){
            return item.some(
                function(inner){
                    return inner == 1;
                }
            )
        }
    );

    if(first && second){
        return undefined;
    }
    else if(first) {
        return colours[gameProperties.colourPalette][0];
    }
    return colours[gameProperties.colourPalette][1];
}

function updateBoard(){
    for(var x = 0; x < gameProperties.width; x++){
        for(var y = 0; y < gameProperties.height; y++){
            switch(getSurroundingEnemyPixelNumber(x, y)){
                case 1:
                    //0% chance of death
                    break;
                case 2:
                    //10% chance of death
                    if(chanceResult(10)){
                        invertPixel(x, y);
                    }
                    break;
                case 3:
                    //25% chance of death
                    if(chanceResult(25)){
                        invertPixel(x, y);
                    }
                    break;
                case 4:
                    //50% chance of death
                    if(chanceResult(50)){
                        invertPixel(x, y);
                    }
                    break;
                case 5:
                    //50% chance of death
                    if(chanceResult(50)){
                        invertPixel(x, y);
                    }
                    break;
                case 6:
                    //70% chance of death
                    if(chanceResult(70)){
                        invertPixel(x, y);
                    }
                    break;
                case 7:
                    //80% chance of death
                    if(chanceResult(80)){
                        invertPixel(x, y);
                    }
                    break;
                case 8:
                    //surrounded, kill.
                    invertPixel(x, y);
                    break;
                default:
                    //50% chance of death
                    if(chanceResult(50)){
                        invertPixel(x, y);
                    }
                    break;
            }
        }
    }
}

function getSurroundingEnemyPixelNumber(x, y){
    var numberOfEnemies = 0;
    for(var row = x - 1; row <= x + 1; row++)
    {
        for(var col = y - 1; col <= y + 1; col++)
        {
            if(row < 0 || row >= gameProperties.width || col < 0 || col >= gameProperties.height) {
                //neighbouring pixel is out of bounds 
                continue;
            }
            else if (row == x && col == y){
                //shouldn't count itself
                continue;
            }
            else if(board[row][col] == board[x][y]){
                //neighbouring pixel is friendly
                continue;
            }

            //neighbouring pixel exists, and is an enemy.
            numberOfEnemies++;
        }
    }

    return numberOfEnemies;
}

function randomiseColourPalette(){
    gameProperties.colourPalette = getRandomNumber(0, colours.length);
}

function killswitch(){
    playing = false;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function invertPixel(x, y) {
    //uses bitwise XOR operator to invert itself (since a pixel can only be 1 or 0)
    board[x][y] = 1 ^ board[x][y];
}

function chanceResult(chance){
    return getRandomNumber(0, 100) <= chance;
}