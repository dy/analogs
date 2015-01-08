/**
 * Test whether ccjs can unwrap proxy calls.
 */

module.exports =

(function(){
	function abc(x){
		return x;
	}

	function def(x){
		return abc(x);
	}

	return def;
})();