/*
 * smileDesignerSmile Plugin V0.7.2
 *
 * Copyright (c) 2009 Sebastian Deutsch <sebastian.deutsch@9elements.com>
 * Licensed under the MIT (MIT-LICENSE.txt) license.
 *
 */
jQuery.fn.funker = function(message, options) {
    var doc = jQuery(this);
    
    if(doc.data('funker') != 'active') { // only one funker at a time
        doc.data('funker', 'active');
        
    	jQuery('<div id="funker_helper_div__" class="funker-dialog"><div class="background"></div><div class="content"><div class="page-align"><div id="funker-text"></div></div></div></div>').appendTo('body');
    	container = jQuery('#funker_helper_div__');

    	// detect the really filthy browser
    	var IE6 = false /*@cc_on || @_jscript_version < 5.7 @*/;
	
    	// get defaults
    	var defaults = {
    		opacity				: '0.75',
    		redAlert            : false
    	};
	
    	var opts = jQuery.extend(defaults, options);

    	// check for firebug
    	if (!window.console || !window.console.firebugVersion)
    	{
    	        var names       =  ["log", "debug", "info", "warn", "error",
    								"assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd",
    								"count", "trace", "profile", "profileEnd"];
    	        window.console  =  {};
    	        for (i in names)
    	        {
    	                window.console[names[i]] = function() {};
    	        }

    	}
		
	
    	// set css for the container
    	container.css({
    	   position:'absolute',
    	   top:'0px',
    	   left:'0px',
    	   width:'100%',
    	   height:'0px',
    	});
		
    	// display the message
    	jQuery('#funker-text', container).html( message );
	
        // show the container
    	container.animate({ height: '120px'}, 400, function() {
        	// hide on click
        	jQuery(document).mousedown(function() {
        	   container.slideUp(400, function() {
                   // stop interval
                   window.clearInterval(doc.data('funker-interval'));

                   // stop all animations
               	   var background = jQuery('.background', container);
               	   background.stop();
               	   container.stop();

                   // remove itself 
        	       doc.data('funker', 'inactive');
        	       container.remove();
        	   });
        	});

            // some notifier helpers
        	function redAlert() {
            	var container = jQuery('#funker_helper_div__');
        	    if(container) {
                	var background = jQuery('.background', container);
        	        if(background) {
        	            background.css({ backgroundColor: '#ff0000', opacity: '1.0'});
                    	background.animate({ backgroundColor: '#000000'}, 800, 'swing');
                    	background.animate({ opacity: '0.75'}, 800, 'swing');
        	        }    	        
        	    }
        	}

        	if(opts.redAlert) {
        	    doc.data('funker-interval', window.setInterval(redAlert,3000));
        	}    	    
    	});
    }
}
