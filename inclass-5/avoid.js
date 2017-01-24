window.onload = function(){
	var button = document.getElementById("button");
	var div = document.getElementById("win");
    var maxWidth = window.innerWidth;
    var maxHeight = window.innerHeight;
    var buttonWidth = button.offsetWidth;
    var buttonHeight = button.offsetHeight;
    var CLICK_ME = "Click Me";
    var PLAY_AGAIN = "Play Again";
    button.onmouseover = move;

    function move() {
    	if (isShiftKey()){
    		return;
    	}
    	button.style.left = Math.random()*(maxWidth-buttonWidth) + "px";
        button.style.top = Math.random()*(maxHeight-buttonHeight) + "px";
    }

    button.onclick = function() {
    	if (button.innerHTML == CLICK_ME) {
    		div.style.visibility = 'visible';
    		button.innerHTML = PLAY_AGAIN;
    		button.onmouseover = function (){}
    	} else if (button.innerHTML == PLAY_AGAIN) {
    		button.innerHTML = CLICK_ME;
    		button.onmouseover = move;
    		div.style.visibility = 'hidden';
    	}
    }

    function isShiftKey() {
    	if (event.shiftKey) {
		    return true;
		}
    }
    
}