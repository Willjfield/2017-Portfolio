$(document).ready(function(){
	console.log('portfolio.js');
	//Run Three.js background stuff
	init();
	animate();

	//Handle the project thumbs
	$('.project img').mouseenter(function(event) {
		TweenLite.to($(this).parent().find('h1.project-title'), .3, {opacity:0, onComplete:function(){
			console.log('done trans')
			$(this).parent().find('h1.project-title').css('z-index',-1);
		}});
	});

	$('.project img').mouseleave(function(event) {
		TweenLite.to($(this).parent().find('h1.project-title'), .3, {opacity:1, onComplete:function(){
			$(this).parent().find('h1.project-title').css('z-index',1);
		}});
	});

	sizeElements();
});

$(window).resize(function(){
	sizeElements();
});

function sizeElements(){
	$('h1.project-title').each(function(index, el) {
		$(el).css('top',$(el).innerHeight());
	});
}