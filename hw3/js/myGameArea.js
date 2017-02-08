

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.obstaclesCount = 0;
        this.click = 0;

        showBestMetric();
        this.interval = setInterval(updateGameArea, 20);
        this.difficultyInterval = setInterval(changeDifficulty, 20000);
        this.obstacleSpeed = -1;
        this.canvas.addEventListener('mousedown', function (e) {
            myGamePiece.speedY = -2 * Math.abs(myGameArea.obstacleSpeed);
            myGamePiece.y -= 40;
        })
        this.canvas.addEventListener('mouseup', function (e) {
            myGamePiece.speedY = 0;
            myGameArea.click++;

        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        var bestMetric = getBestMetric();
        if (this.obstaclesCount > bestMetric.score || ((
            this.obstaclesCount == bestMetric.score) && 
            this.click  < bestMetric.click)) {
            setBestMetric();
        }
        alert("Try again!");
        clearInterval(this.interval);
        window.location.reload();
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;

    myGameArea.clear();
    myBackground.newPos(); 
    myBackground.update();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || 
        everyinterval(150/Math.abs(myGameArea.obstacleSpeed))) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 100;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "grey", x, 0));
        myObstacles.push(new component(10, x - height - gap, "grey", x, height + gap));
    }
    myGameArea.obstaclesCount = 0;
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedX = myGameArea.obstacleSpeed;
        myObstacles[i].newPos();
        myObstacles[i].update();
        if(myObstacles[i].x < 200) {
            myGameArea.obstaclesCount++;
        }
    }
    myGameArea.obstaclesCount /= 2;
    myScore.text="SCORE: " + myGameArea.obstaclesCount;
    clickCount.text="CLICK: " + myGameArea.click;
    myScore.update();
    clickCount.update();
    myBestScore.update();
    leastClickCount.update();
    myGamePiece.newPos();    
    myGamePiece.update();
    
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }
    if (myGamePiece.isOutside()) {
        myGameArea.stop();
        return;
    }
}

function changeDifficulty() {
    myGameArea.obstacleSpeed -= 1;

}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function setBestMetric() {
    setMetricCookie("BestScore", myGameArea.obstaclesCount, 365);
    setMetricCookie("LeastClick", myGameArea.click, 365);
}

function getBestMetric() {
    var bestMetric = {
        score : 0,
        click : 0
    }
    bestMetric.score = getMetricCookie("BestScore");
    bestMetric.click = getMetricCookie("LeastClick");
    return bestMetric;
}

function setMetricCookie(c_name,value,expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" + escape(value)+
    (";expires="+exdate.toGMTString());
}

function getMetricCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) { 
            c_start = c_start + c_name.length + 1 ;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start,c_end));
        } 
    }
    return 0;
}

function showBestMetric() {
    var bestMetric = getBestMetric();
    myBestScore.text = "Best record: BestScore: " + bestMetric.score;
    leastClickCount.text = "LeastClick: " + bestMetric.click;
}

function moveup() {
    myGamePiece.speedY = -1; 
}

function movedown() {
    myGamePiece.speedY = 1; 
}

function moveleft() {
    myGamePiece.speedX = -1; 
}

function moveright() {
    myGamePiece.speedX = 1; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}