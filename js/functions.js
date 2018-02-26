(function($) {
  "use strict";
  
	var scrollEventHandler = function()
	{
	  window.scroll(0, window.pageYOffset)
	}

	window.addEventListener("scroll", scrollEventHandler, false);

	var $sticky = $('.sticky');
	var $stickyrStopper = $('#team');

	$(document).ready(function () {
		$sticky.addClass('loaded');

		var doc = document.documentElement;
		var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

		var windowTop = $(window).scrollTop(); // returns number
		
		if (windowTop > 1000) {

			$sticky.animate({
				margin: '-160px 0 0 54px',						
				opacity: '1'
			}, 1000, 'easeInOutExpo');
		}

		var canGetFile = true;
		
		var $sides = $('#sidebar ul li span, #sidebar2 ul li span');

		$sides.click(function () {

			if ($(this).hasClass('active') || !$(this).data('conteudo')) 
				return ;

			$sides.removeClass('active');
			$(this).addClass('active');
			
			var file = $(this).data('conteudo') + '.html';

			if (canGetFile) {			
				canGetFile = false;	

				var $self = $(this);
				
				$.get( "duvidas/" + file, function( data ) {
					var $conteudo = $( ".conteudo-duvidas");
					var $conteudoContainer = $( "#duvidas .conteudo-duvidas");

					$conteudoContainer.animate({				
						opacity: '0',
					}, 400, 'easeInOutExpo', function () {
						$conteudo.html( data );

						var isMobile = {
						    Android: function() {
						        return navigator.userAgent.match(/Android/i);
						    },
						    BlackBerry: function() {
						        return navigator.userAgent.match(/BlackBerry/i);
						    },
						    iOS: function() {
						        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
						    },
						    Opera: function() {
						        return navigator.userAgent.match(/Opera Mini/i);
						    },
						    Windows: function() {
						        return navigator.userAgent.match(/IEMobile/i);
						    },
						    any: function() {
						        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
						    }
						};

						console.log(isMobile.any())

						if ($self.closest('#sidebar2').length) {
							if( isMobile.any() ) {
								$("html, body").animate({ scrollTop: $('#sidebar2').offset().top + 350 }, 300);							 
							}
						}

					});			
 
					$conteudoContainer.animate({				
						opacity: '1',
					}, 400, 'easeInOutExpo', function () {
						canGetFile = true;						
					});
				});
			}

		});

	});

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
					opacity: '1'
				}, 600, 'easeInOutExpo');
			}


			windowTop += 172;
			
			if (windowTop > 1990 ) {
				$sticky.css({ position: 'absolute', top: 2250, left: 0 });
			} else if (windowTop > 1535) {
				$sticky.css({ position: 'fixed', top: 433, left: 0 });
			} else {
				$sticky.css({position: 'absolute', top: 'initial', left: 0});
			}
		});

	}

})(jQuery);
