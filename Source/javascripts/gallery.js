function galleryDisplay(item) {
	// Initialize and declare variables
	var fullImage = document.querySelector('.full-img');
	var thumbBar = document.querySelector('.thumb-bar');

	// Thumb bar images
	for (var i = 0; i < item.images.length; i ++) {
		var newImage = document.createElement('img');
		newImage.setAttribute('src', item.images[i]);
		newImage.setAttribute('alt', item.title + ' ' + i);
		thumbBar.appendChild(newImage);
	}

	//Set active for the first thumbnail
	thumbBar.childNodes[0].classList.add('active');
	
	// Full image
	var displayedImage = document.createElement('img');
	displayedImage.className = 'displayed-img';
	displayedImage.setAttribute('src', item.images[0]);
	displayedImage.setAttribute('alt', item.title);
	fullImage.appendChild(displayedImage);
	
	/* STEP 4: Function to change the src of the main <img> */
	function displayImage(value) {
		displayedImage.setAttribute('src', value);
	}

	/* STEP 5: Event Delegation
	Instead of adding event handlers for each image, how about event delegation? Build a click handler on the parent element, and capture each target (and its attributes) from the event object */
	thumbBar.onclick = function(event) {
		// event.target is the element that was clicked
		if (event.target && event.target.nodeName === 'IMG') {
			var imgSrc = event.target.getAttribute('src');
			displayImage(imgSrc);
			// Lab 6 STEP G: Call the clearWayfinding() function that you built below - and enjoy the result!
			clearWayfinding();
			event.target.classList.add('active');
		}
	};
	// Lab 6 STEP D: Initialize and declare a var called 'thumbImgs' using the querySelectorAll method to grab all the IMG elements inside the .thumb-bar
	var thumbImgs = document.querySelectorAll('.thumb-bar img');

	// Lab 6 STEP E: Build a function called 'clearWayfinding()' that loops through the thumbImgs array with a FOR loop
	function clearWayfinding() {
		for(var i = 0; i < thumbImgs.length; i++) {
		// Lab 6 STEP F: Inside the clearWayfinding function, for each thumbImgs IMG element, set the CSS outline-width property to "0", and the z-index property also to "0"
			thumbImgs[i].classList.remove('active');
		}
	}
	// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Image_gallery and https://davidwalsh.name/event-delegate
}

