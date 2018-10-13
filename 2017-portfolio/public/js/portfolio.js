var lastScrollTop=0;

$(document).ready(function(){
	console.log('portfolio.js');

	//Handle the project thumbs
	$('.project .project-img').mouseenter(function(event) {
		if(!$(this).hasClass('project-active')){
			$(this).addClass('colorize');
			// TweenLite.to($(this).parent().find('h1.project-title'), .3, {opacity:0, onComplete:function(){
			// 	console.log('done trans')
			// 	$(this).parent().find('h1.project-title').css('z-index',-1);
			// }});
		}
	});

	$('.project .project-img').mouseleave(function(event) {
		if(!$(this).hasClass('project-active')){
			$(this).removeClass('colorize');
			// TweenLite.to($(this).parent().find('h1.project-title'), .3, {opacity:1, onComplete:function(){
			// 	$(this).parent().find('h1.project-title').css('z-index',1);
			// }});
		}
	});

	var projectOpen = false;
	$('.project').on('click',function(e){
		//console.log(e.target);
		if(!$(e.target).hasClass('project-close') && !$(this).find('img').hasClass('project-active')){
			$('.project').find('.project-img').addClass('project-active');
			//$().find('img').removeClass('colorize');
			$(this).find('.project-description-container').addClass('project-active');
			$('body').css('overflow','hidden');
			projectOpen = true;
		}		
	});

	$('.project-close').on('click',function(){
			$('.project').find('img').removeClass('project-active');
			$(this).parent().parent().find('.project-img').removeClass('colorize');
			$(this).parent().parent().find('.project-description-container').removeClass('project-active');
			$('body').css('overflow','visible');
			projectOpen = false;
	});

	$(document).click(function(e) {
		console.log($(e.target));
		if(projectOpen && !$(e.target).hasClass('project-active')){
			console.log("close!");
			
			$('.project-description-container.project-active').parent().parent().find('.project-img').removeClass('colorize');
			$('.project-description-container.project-active').parent().parent().find('.project-description-container').removeClass('project-active');
			$('body').css('overflow','visible');
			$('.project').find('img').removeClass('project-active');
			projectOpen = false;
		}
			
	});

	$('.down-chevron').on('click',function(){
		TweenLite.to(window,0.5,{scrollTo:lastScrollTop+$(window).outerHeight()});
	});

	sizeElements();
});

//EVENTS
$(window).resize(function(){
	sizeElements();
});


$(window).scroll(function(e){
	if(location.pathname === '/'){
		 var st = $(this).scrollTop();
		// if(st > lastScrollTop){
		// 	if(st < $(window).innerHeight()*1.75 && !TweenMax.isTweening(window)){
		// 		$('body').css('overflow','hidden');
		// 		TweenLite.to(window,1,{scrollTo:st+$(window).innerHeight(),onComplete:function(){
		// 			$('body').css('overflow','scroll');
		// 		}});
		// 	}
		// 	//return;
		// }
	 //    lastScrollTop = st;
	    if(st>0){
	    	TweenLite.to($('.down-chevron'),0.25,{opacity:0});
	    }else{
	    	TweenLite.to($('.down-chevron'),0.25,{opacity:1});
	    }
	}
});

function sizeElements(){
	$('h1.project-title').each(function(index, el) {
		//$(el).css('top',$(el).innerHeight());
	});
}

