/* VET_loader
 *
 * Final callback should include VET_loader.modal.closeModal() in success case.
 * Sample input json for options:
 *	{
 *		callbackAfterSelect: function() {}, // callback after video is selected (first screen).  If defined, second screen will not show.
 *		callbackAfterEmbed: function() {}, // callback after video formating (second screen).
 *		callbackAfterLoaded: function() {}, // callback after VET assets are loaded
 *		embedPresets: {
 *			align: "right"
 *			caption: ""
 *			thumb: true
 *			width: 335
 *		},
 *		startPoint: 1 | 2, // display first or second screen when VET opens
 *		searchOrder: "newest" // Used in MarketingToolbox
 *	}
 */

(function(window, $) {

	if( window.VET_loader ) {
		return;
	}

	var resourcesLoaded = false,
		templateHtml = '',
		VET_loader = {};

	VET_loader.load = function(options) {
		
		var deferredList = [];
		
		if(!resourcesLoaded) {
			var templateDeferred = $.Deferred(),
				deferredMessages = $.Deferred();
				
			// Get modal template HTML
			$.nirvana.sendRequest({
				controller: 'VideoEmbedToolController',
				method: 'modal',
				type: 'get',
				format: 'html',
				callback: function(html) {
					templateHtml = html;
					templateDeferred.resolve();
				}
			});
			deferredList.push(templateDeferred);

			// Get VET i18n messages 
			$.getJSON( 
				window.wgScriptPath + "index.php?action=ajax&rs=VET&method=getMsgVars", 
				function(VETMessages) {
					for (var v in VETMessages) {
						wgMessages[v] = VETMessages[v];
					}
					deferredMessages.resolve();
				}
			);
			deferredList.push(deferredMessages);

			// Get JS and CSS
			var resourcePromise = $.getResources([
				$.loadYUI,
				window.wgExtensionsPath + '/wikia/WikiaStyleGuide/js/Dropdown.js',
				window.wgExtensionsPath + '/wikia/VideoEmbedTool/js/VET.js', 
				$.getSassCommonURL('/extensions/wikia/VideoEmbedTool/css/VET.scss'),
				$.getSassCommonURL('/extensions/wikia/WikiaStyleGuide/css/Dropdown.scss')
			]);
			deferredList.push(resourcePromise);
		}
		
		$.when.apply(this, deferredList).done(function() {
			if($.isFunction(options.callbackAfterLoaded)) {
				options.callbackAfterLoaded();
				delete options.callbackAfterLoaded;
			}
			
			VET_loader.modal = $(templateHtml).makeModal({
				width:1000,
				onClose: VET_close
			});
			
			VET_show(options);
			resourcesLoaded = true;
		});			
	};

	$.fn.addVideoButton = function(options) {
		$.preloadThrobber();

		return this.each(function() {
			var $this = $(this);
			
			$this.on('click.VETLoader', function(e) {
				e.preventDefault();
				
				// Provide immediate feedback once button is clicked
				$this.startThrobbing();
				
				options.callbackAfterLoaded = function() {
					$this.stopThrobbing();				
				}
				
				VET_loader.load(options);
			});
		});
	
	};
	
	window.VET_loader = VET_loader;
	
})(window, jQuery);