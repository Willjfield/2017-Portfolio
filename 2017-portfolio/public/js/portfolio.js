$(document).ready(function(){
	console.log('portfolio.js');
	//Run Three.js background stuff
	init();
	animate();

	//Handle the project thumbs
	$('.project img').mouseenter(function(event) {
		if(!$(this).hasClass('project-active')){
			$(this).addClass('colorize');
			// TweenLite.to($(this).parent().find('h1.project-title'), .3, {opacity:0, onComplete:function(){
			// 	console.log('done trans')
			// 	$(this).parent().find('h1.project-title').css('z-index',-1);
			// }});
		}
	});

	$('.project img').mouseleave(function(event) {
		if(!$(this).hasClass('project-active')){
			$(this).removeClass('colorize');
			// TweenLite.to($(this).parent().find('h1.project-title'), .3, {opacity:1, onComplete:function(){
			// 	$(this).parent().find('h1.project-title').css('z-index',1);
			// }});
		}
	});

	$('.project').on('click',function(){
		if(!$(this).find('img').hasClass('project-active')){
			$('.project').find('img').addClass('project-active');
			//$().find('img').removeClass('colorize');
			$(this).find('.project-description-container').addClass('project-active');
			$('body').css('overflow','hidden');
		}else{
			$('.project').find('img').removeClass('project-active');
			$(this).find('img').removeClass('colorize');
			$(this).find('.project-description-container').removeClass('project-active');
			$('body').css('overflow','visible');
		}
		
	});

	sizeElements();
});

//EVENTS
$(window).resize(function(){
	sizeElements();
});

var lastScroll=0;
$(window).scroll(function(e){
	uniforms.u_time.value += ($(window).scrollTop()-lastScroll)*.02;
	lastScroll = $(window).scrollTop();
})

function sizeElements(){
	$('h1.project-title').each(function(index, el) {
		$(el).css('top',$(el).innerHeight());
	});
}

