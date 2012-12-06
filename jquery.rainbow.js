/*
	2012 Alex Foran
	written for no reason at all
*/

// Conifguration object, set stuff here if you want
var Rainbow = {
	// milliseconds between animation 'ticks'
	TICK: 20,
	// how many hue-steps to jump at a time (a "hue-step" being an arbitrary thing I made up here)
	STEP: 1,
	// how many degrees there are per hue-step
	SCALE: 3,

	// utility function that return a list of CSS properties to be set to a background-image
	// offset - hue-steps to be offset
	buildGradientCSS: function (offset) {
		// support webkit + anything that adheres to CSS3 properly (which right now includes FF, maybe IE10?)
		var prefixes = ["-webkit-linear-gradient(left","linear-gradient(to left"];
		var str = "";
		for (var i=0; i<360; i++)
		{
			var deg = (i+offset)*this.SCALE%360;
			str+=", hsl("+deg+", 100%, 50%)";
		}
		str+=")";
		for (var i=0; i<prefixes.length; i++)
		{
			prefixes[i]+=str;
		}
		return prefixes;
	}
};

$.fn.rainbow = function(duration) {
	var el = $(this[0]);

	// this is the timestamp at which we end animation
	var timeTarget = (new Date()).getTime() + duration;
	var i=0;
	var interval=null;
	var callback = function() {
		// if the end time has not yet been reached, KEEP GOING, DON'T EVER GIVE UP
		if ((new Date()).getTime() < timeTarget)
		{
			var props = Rainbow.buildGradientCSS(i+=Rainbow.STEP);
			for (var j=0; j<props.length; j++)
			{
				// I hope you like warnings in your firefox error log
				el.css("background-image",props[j]);
			}
		}
		else // stop trying, give up
		{
			el.css("background-image","none");
			window.clearInterval(interval);
		}
	};

	interval = window.setInterval(callback,Rainbow.TICK);

	return $(this);
}
