(function($) {
  "use strict";

	$(document).ready(function () {

		var windowTop = $(window).scrollTop(); // returns number

		if (windowTop > 1000) {

			$sticky.animate({
				margin: '-160px 0 0 84px',						
				opacity: '1'
			}, 1000, 'easeInOutExpo');
		}

		var canGetFile = true;
		
		$('#sidebar ul li span').click(function () {

			if ($(this).hasClass('active') || !$(this).data('conteudo')) 
				return ;

			$('#sidebar ul li span').removeClass('active');
			$(this).addClass('active');
			
			var file = $(this).data('conteudo') + '.html';

			if (canGetFile) {			
				canGetFile = false;	
				
				$.get( "duvidas/" + file, function( data ) {
					var $conteudo = $( ".conteudo-duvidas");
					var $conteudoContainer = $( "#duvidas .container.duvidas");
					var marLeft = $conteudoContainer.css('margin-left')

					$conteudoContainer.animate({				
						opacity: '0',
						marginLeft : '1800px'
					}, 400, 'easeInOutExpo', function () {
						$conteudo.html( data );

						$conteudoContainer.css({
							marginLeft : '-1800px'	
						})
					});			
 
					$conteudoContainer.animate({				
						opacity: '1',
						marginLeft : marLeft
					}, 400, 'easeInOutExpo', function () {
						canGetFile = true;
					});
				});
			}

		});

	});

	var $sticky = $('.sticky');
	var $stickyrStopper = $('.sticky-stopper');

	if ($sticky.length) { // make sure ".sticky" element exists

		var generalSidebarHeight = $sticky.innerHeight();
		var stickyTop = $sticky.offset().top;
		var stickOffset = 0;
		var stickyStopperPosition = $stickyrStopper.offset().top;
		var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
		var diff = stopPoint + stickOffset;

		$(window).scroll(function(){ 
			var windowTop = $(window).scrollTop(); // returns number

			if (windowTop > 1000) {

				$sticky.animate({
					margin: '-160px 0 0 54px',						
					opacity: '1'
				}, 600, 'easeInOutExpo');
			}


			windowTop += 172;

			if (stopPoint < windowTop) {
				$sticky.css({ position: 'absolute', top: 2216 });
			} else if (stickyTop < windowTop+stickOffset) {
				$sticky.css({ position: 'fixed', top: 333 });
			} else {
				$sticky.css({position: 'absolute', top: 'initial'});
			}
		});

	}

})(jQuery);
