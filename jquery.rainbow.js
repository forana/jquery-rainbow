/*
	2012 Alex Foran
	written for no reason at all
*/

var Rainbow = {
	TICK: 20, // ms
	STEP: 1,
	SCALE: 3,

	buildGradientCSS: function (offset) {
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

	var timeTarget = (new Date()).getTime() + duration;
	var i=0;
	var interval=null;
	var callback = function() {
		if ((new Date()).getTime() < timeTarget)
		{
			var props = Rainbow.buildGradientCSS(i+=Rainbow.STEP);
			for (var j=0; j<props.length; j++)
			{
				el.css("background-image",props[j]);
			}
		}
		else
		{
			el.css("background-image","none");
			window.clearInterval(interval);
		}
	};

	interval = window.setInterval(callback,Rainbow.TICK);

	return $(this);
}
