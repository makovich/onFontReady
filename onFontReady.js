/*
 * onFontReady (c) Paul Makovich 2013 - License MIT
 */
onFontReady = (function() {
	
	var isInitialized = false,
		$body,
		$divHelper,
		fallbackFonts = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy'],
		fontImprintPattern = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	
	function init()
	{
		if (isInitialized) {
			return;
		}
		
		isInitialized = true;
		
		$divHelper  = document.createElement('div');
		$divHelper.style.cssText = 'position: absolute;' +
								   'visibility: hidden;' +
								   'top: -200px;' +
								   'left: -100000px;' +
								   'width: 100000px;' +
								   'height: 200px;' +
								   'font-size: 100px;';
		$divHelper.innerHTML = '<span id="onFontReadyHelper">'+ fontImprintPattern +'</span>';
		
		$body = document.getElementsByTagName('body')[0];
		$body.insertBefore($divHelper, $body.firstChild);
	}
	
	function isFontLoaded(fontName)
	{
		var wThisFont = 0;
		var wPrevFont = 0;
		
		if (!isInitialized) {
			init ();
		}
		
		for(var ix = 0, ln = fallbackFonts.length; ix < ln; ++ix)
		{
			var $helperSpan = document.getElementById('onFontReadyHelper');
			$helperSpan.style.cssText = 'font-family: ' + fontName + ',' + fallbackFonts[ix];
			
			wThisFont = $helperSpan.offsetWidth;
			
			if (ix > 0 && wThisFont != wPrevFont) {
				return false;
			}
			
			wPrevFont = wThisFont;
		}
		
		return true;
	}
	
	return function(fontName, onSuccess, onFail, options) {
		if (!fontName) {
			return;
		}
		
		var msCheckInterval = (options && options.interval) ? options.interval : 100;
		var msCheckTimeout  = (options && options.timeout)  ? options.timeout  : 5000;
		
		if (!onSuccess && !onFail) {
			return;
		}
		
		if (!isInitialized) {
			init();
		}
		
		var utStart = new Date().getTime();
		var idInterval = setInterval(
			function() {
				if (isFontLoaded(fontName)) {
					
					clearInterval(idInterval);
					$body.removeChild($divHelper);
					onSuccess(fontName);
					
					return;
				} else {
					var utNow = new Date().getTime();
					if ((utNow - utStart) > msCheckTimeout) {
						
						clearInterval(idInterval);
						$body.removeChild($divHelper);
						if (onFail) {
							onFail(fontName);
						}
					}
				}
			},
			msCheckInterval
		);
	}
})();