var titleScreen = document.getElementById("title-screen");
var gameContainer = document.getElementById("game");
var character = document.getElementById("character");
var block = document.getElementById("block");
const scoreDisplay = document.getElementById("score-value");
let score = 0;

function startGame() {
    titleScreen.style.display = "none"; // Hide the title screen
    gameContainer.style.display = "block";
}

titleScreen.addEventListener('click', startGame);
document.addEventListener('keydown', function(event) { 
        startGame();
});

function jump() {
    if (character.classList != "animate"){
        character.classList.add("animate");
    }
    setTimeout(function(){
        character.classList.remove("animate");
    }, 500)
}

var checkDead = setInterval(function(){
    var characterTop =
    parseInt (window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft =
    parseInt (window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<20 && blockLeft>0 && characterTop>=130){
        block.style.animation = "none";
        block.style.display = "none";
        alert("You lost.");
        location.reload(); 
    } else if (blockLeft <= -20) {
            updateScore();
    }
},10)

function updateScore() {
    score ++;
    scoreDisplay.innerText = score; 
}

document.addEventListener('keydown', function(event) {
    jump();
});
