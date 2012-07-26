/**
 * @author Zack Perdue / Ziggidy Creative
 * @author Clayton McIlrath / Arrae Creative
 * 
 * http://zackperdue.com
 * http://ziggidycreative.com
 * http://arr.ae/
 *
 * Version 0.2
 * Copyright (c) 2012 Clay McIlrath and Zack Perdue
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */
jQuery.fn.modal = function(options) {
	
	var defaults = {
		opacity: 1,
		backgroundColor: '#fff',
		scrollable: true,
		speed: 500,
		onhide: null,
		onshow: null,
		onstart: function(){},
		onfinish: function(){},
	};
	
	if (options)
	{
		$.extend(defaults, options);
	}
	
	return this.each(function() {
		
		defaults.onstart.call(this);
		
		var $this = $(this);
		var $window = $(window);
		
		var mh = $this.height(),
			mw = $this.width(),
			ww = $window.width(),
			wh = $window.height(),
			vp = ((wh/2)-(mh/2)) + $window.scrollTop(),
			hp = (ww/2)-(mw/2);
			
		if ( ! defaults.scrollable)
		{
			$('body').height(wh).css({overflow: 'hidden'});
		}	
		
		$('<div />')
			.addClass('overlay')
			.css({'backgroundColor': defaults.backgroundColor})
			.appendTo('body')
			.animate({opacity: defaults.opacity})
			.on('click', function(){
				if (jQuery.isFunction(defaults.onhide))
				{
					defaults.onhide.call(this);
				}
				else
				{
					$(this).animate({opacity: 0}, defaults.speed, function(){
						$(this).remove();
					});
					$('.modal:visible').animate({opacity: 0, top: -400}, defaults.speed);
					$('.showModal.active').removeClass('active');
				}
				
				$('body').css({ height: 'auto', overflow: 'visible' });
			});
		
		if (jQuery.isFunction(defaults.onshow))
		{
			defaults.onshow.call(this);
		}
		else
		{
			$this.css({ display: 'block', left: hp }).animate({ opacity: 1, top: vp }, defaults.speed);
		}			
			
		defaults.onfinish.call(this);
		
	});
}