(function fallow( window, undefined ) {
	var rjseon = [
		[/\t\r\n/g,									""],		// compressed, single line string
		[/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,		""],		// trim
		[/>[\s\uFEFF\xA0]+</g,						"><"],		// trim between nested tags
		[/"/g,										"\\\""], 	// escape quotes
		[/<dl itemscope[^>]*><dt>/g,				"{\""],		// open object
		[/<\/dd><\/dl>/g,							"\"}"],		// close object
		[/<\/dt><dd[^>]*>/g,						"\":\""],	// associate key/value
		[/(<\/dd><d[dt][^>]*>|<\/li><li[^>]*>)/g,	"\",\""],	// next iteration
		[/<ol itemscope[^>]*><li[^>]*>/g,			"[\""],		// open array
		[/<\/li><\/ol>/g,							"\"]"],		// close array
		[/([\]\[{}:,])"([\]\[{}:,])/g,				"$1$2"],	// clean up quotes
		[/([\]\[{}:,])"([\]\[{}:,])/g,				"$1$2"],	// clean up quotes
		[/"([\d\.]+|true|false|null)"/g,			"$1"]		// clean up tokens
	]
	var j=rjseon.length;
	var i=0;
	var fallow = {};
	var harvest = null;
	fallow.farm = function farm( str ){
		for (i;i < j;i++) {
			str = str.replace(rjseon[i][0],rjseon[i][1]);
		}
		this.harvest = str;
	}
	window.fallow = fallow;
})(window);
