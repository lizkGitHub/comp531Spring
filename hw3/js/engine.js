var myObstacles = [];
var myGamePiece;
var myScore;
var clickCount = 0;
var gravity = 1;

function startGame() {
    myGamePiece = new component(30, 30, "./img/owl.png", 200, 120, "image");
    myGamePiece.gravity = 1;
    myBestScore = new component("20px", "Consolas", "black", 50, 40, "text");
    leastClickCount = new component("20px", "Consolas", "black", 170, 80, "text");
    myScore = new component("20px", "Consolas", "black", 350, 40, "text");
    clickCount = new component("20px", "Consolas", "black", 450, 40, "text");
    myBackground = new component(960, 540, "./img/background.jpeg", 0, 0, "background");
	myBackground.speedX = -1; 
    myGameArea.start();
}

window.onload = function () {
	startGame();
}
