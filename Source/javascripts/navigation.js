// Credit to Lab 10 - CSS COMP1054
// Main navigator
var mainNav = document.querySelector('header');
var mainNavOffSet = mainNav.offsetTop;
var topButton = document.querySelector('footer p a.top');

window.addEventListener('scroll', function() {
	if(window.pageYOffset > mainNavOffSet) {
		mainNav.classList.add('floater');
		
		// using padding to ignore the space when the header floating
		var mainContent = document.querySelector('.floater + main');
		if(mainContent)
			mainContent.style.paddingTop = ConvertNum2Px(mainNav.offsetHeight + (mainNav.offsetWidth>768?60:0));
		topButton.style.display = 'block';
	} else {
		var mainContent = document.querySelector('.floater + main');
		if(mainContent)
			mainContent.style.paddingTop = 0;
		mainNav.classList.remove('floater');
		topButton.style.display = 'none';
	}
});

// Secondary navigator
topButton.addEventListener('click', function(event){
  scrollToTop();
  event.preventDefault();
});

function scrollToTop() {
  window.scrollBy({
    top: -window.pageYOffset,
    left: 0,
    behavior: "smooth"
  });
}

// Sticky smooth active nav
// Credit to https://css-tricks.com/sticky-smooth-active-nav/
let mainNavLinks = document.querySelectorAll("main nav ul li a");
let mainSections = document.querySelectorAll("main .section section");

// This should probably be throttled.
// Especially because it triggers during smooth scrolling.
// https://lodash.com/docs/4.17.10#throttle
// You could do like...
// window.addEventListener("scroll", () => {
//    _.throttle(doThatStuff, 100);
// });
// Only not doing it here to keep this Pen dependency-free.

window.addEventListener("scroll", event => {
	let mainNavHeight = mainNav.offsetHeight + (mainNav.offsetWidth>768?20:0);

	// add space to above the hash links
	let hashLinksSpace = document.querySelectorAll('.hashLink');
	hashLinksSpace.forEach(function (element) {
		element.style.marginTop = ConvertNum2Px(-(mainNavHeight));
		element.style.paddingBottom = ConvertNum2Px(mainNavHeight);
	});

	// Count when the section nearby the header menu
  let fromTop = window.scrollY;

  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop + mainNavHeight
    ) {
      link.classList.add("current");
    } else {
      link.classList.remove("current");
    }
  });
});

function ConvertNum2Px (num) {
	return String(num) + 'px';
}