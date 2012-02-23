/**
 * 	PLUGIN JS
 */

jQuery.myPlugin = {
	foo: function() {
		alert('This is a test. This is only a test');
	},
	bar: function(param) {
		alert('This function takes a parameter, which is "' + param + '".');
	}
};

jQuery.fn.alert1 = function() {
	alert('Nothing happens.');
};

jQuery.fn.showAlert = function() {
	return this.each(function() {
		alert('You called this method on "' + this + '".');
	});
};

jQuery.fn.myMethod = function(parameters) {
	defaults = {
		aString : 'goodbye',
		aNumber : 97
	};
	jQuery.extend(defaults, parameters);
	alert('The string is "' + defaults.aString + '".');
	alert('The number is "' + defaults.aNumber + '".');
};

jQuery.fn.slideFadeOut = function() {
	return this.animate({height : 'hide', opacity : 'hide' });
};

jQuery.fn.slideFadeIn = function() {
	return this.animate({height : 'show', opacity : 'show' });
};


$(document).ready(function() {
	
	//$.myPlugin.foo();
	//$.myPlugin.bar('Ok');
	//$('#show-alert').showAlert().hide(2000);
	
//	$('div').myMethod({aString : 'hello', aNumber : 52 });
//	$('div').myMethod({aString : 'hello'});
//	$('div').myMethod({aNumber : 52});
//	$('div').myMethod();
	
	$('.fadeout').click(function(){
		$(this).slideFadeOut();
	});
	
	$('.fadein').click(function(){
		$('.fadeout').slideFadeIn();
	});
	
});