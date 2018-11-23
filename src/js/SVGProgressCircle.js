
(function($) {
	
	var Circle = function( element, options ){

		// Set params
		this.element			 = $(element);
		this.numberWrapper       = this.element.find('.number');
		this.animated            = false;
		this.options 			 = $.extend({}, Circle.Defaults, options);

		// Invoke the initialization method
		this.initNumber();
		
	};
	
	// Set default options
	Circle.Defaults = {
		number 	                : 0,
		min 	                : 0,
		max 	                : 100,
		speed 					: 2000,
		delay 					: 0,
		prefix 					: '',
		suffix 					: '',
		offset					: '80%',
		loop 					: false,
		format 					: {
			decimal:'.',
			thousands_sep:','
		},
		onInit					: null,
		onComplete				: null,
	};
	
	
	Circle.prototype = {

		initNumber: function(){

			var self = this;

			if( typeof jQuery.fn.waypoint !== 'undefined' ) {
				this.numberWrapper.waypoint({
					offset: self.options.offset,
					triggerOnce: true,
					handler: function( direction ){
						self.initCount();
						self.afterInit();
					}
				});
								
			} else {
				self.initCount();
				self.afterInit();
			}
									
		},

		initCount: function(){

			var $number = this.numberWrapper.find( '.number-string' );

			if( !isNaN( this.options.delay ) && this.options.delay > 0 ) {
				setTimeout( function(){
					this.triggerCircle();
					this.countNumber();
				}.bind( this ), this.options.delay );
			}
			else {
				this.triggerCircle();
				this.countNumber();
			}
			
		},

		countNumber: function(){

			var $number = this.numberWrapper.find( '.number-string' ),
				$string = $number.find( '.number-int' ),
				min = this.options.min,
				self = this;

			if ( ! this.animated ) {
			    $string.prop( 'Counter',min ).animate({
			        Counter: this.options.number
			    }, {
			        duration: this.options.speed,
			        easing: 'swing',
			        step: function ( now, fx ) {
			        	$string.text( self.options.prefix + self.formatNumber( Math.ceil(now) + self.options.suffix ) );
			        },
			        complete: function() {
			        	if (self.options.loop === true){
				        	setTimeout(function(){
								self.countNumber();
				        	}, self.options.delay);
			        	} else {
				        	self.animated = true;
			        	}
			        }
			    });
			}
		},

		triggerCircle: function(){

			var $bar   = this.numberWrapper.find( '.bar' ),
				r      = $bar.attr('r'),
				circle = Math.PI*(r*2),
				val    = this.options.number,
				min    = this.options.min,
				max    = this.options.max;
   
			if (val < 0) { val = 0;}
			if (val > max) { val = max;}
			
			var pct = ( 1 - ( ( val - min ) / max ) ) * circle;
			
			this.animateCircle(pct);
						
		},
		
		animateCircle: function(val){
			
			var $bar = this.numberWrapper.find( '.bar' ),
				speed = this.options.speed,
				loop = this.options.loop,
				strokeDash = $bar.attr("stroke-dashoffset"),
				self = this;
			
		    $bar.animate({
		        strokeDashoffset: val
		    }, {
		        duration: speed,
		        easing: 'swing',
		        complete: function() {
		        	if (loop === true){
			        	setTimeout(function(){
				        	$bar.css("stroke-dashoffset", strokeDash);
				        	self.triggerCircle();
			        	}, self.options.delay);
		        	}
		        	self.afterComplete();
		        }
		    });
		},

		formatNumber: function( n ){
			var rgx	= /(\d+)(\d{3})/;

            n += '';
            x  = n.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? parseFloat(parseFloat('.' + x[1]).toFixed(2)) : '';
			x2 = x2 ? this.options.format.decimal + x2.toString().split('.').pop() : '';
			
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + this.options.format.thousands_sep + '$2');
			}
			
			return x1 + x2;
		},
		
		afterInit: function(){
			var callback = this.options.onInit;
			if (callback && typeof(callback) === 'function'){
				callback();
			}
		},

		afterComplete: function(){
			var callback = this.options.onComplete;
			if (callback && typeof(callback) === 'function'){
				callback();
			}
		},

	};
	
	/**
	 * The jQuery Plugin
	 */
	$.fn.progressCircle = function(options) {
		return this.each(function() {
			if (!$(this).data('progressCircle')) {
				$(this).data('progressCircle', new Circle(this, options));
			}
		});
	};

	/**
	 * The constructor for the jQuery Plugin
	 */
	$.fn.progressCircle.Constructor = Circle;
		
})(jQuery);