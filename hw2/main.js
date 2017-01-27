window.onload = function() {
	var STOP = "Stop"
	var START = "Start"
	var images = [
	    "./pic/pic1.jpeg",
	    "./pic/pic2.jpeg",
	    "./pic/pic3.jpeg",
	    "./pic/pic4.jpeg",
	];
	IMAGE_LENGTH = 4

	// get td element which has image
	var tdImage = document.getElementsByClassName('image');
	var count = 0;

/*	set image source and interval for each image
	set button will control the changing of image */
	Array.from(tdImage).forEach(function(ele){
		btn = ele.getElementsByTagName('input')[0];
		img = ele.getElementsByTagName('img')[0];
		(function(btn, img, _images, count){
			btn.id = setInterval(function(){
				if (count == IMAGE_LENGTH){
					count = 0;
				}
				img.src= _images[count];
				count += 1;
			}, getRandomInterval(1, 5));

			// set the button to control this image 
			btn.onclick = function() {	
				if (btn.value == START) {
					btn.value = STOP;
					btn.id = setInterval(function(){
						if (count == IMAGE_LENGTH){
							count = 0;
						}
						img.src= _images[count];
						count += 1;
					}, getRandomInterval(1, 5));
				} else {
					btn.value = START;
					clearInterval(btn.id);
				}
				
			}
		})(btn, img, images, count)
	});

	// return a random interval between min and max seconds
	function getRandomInterval(min, max) {
	    return (Math.random() * (max - min) + min) * 1000;
	}

}
