/**
* 	Minimalock v0.4 - Arnaud P. Crowther (arnaudcrowther.com)
*	====================================
*
*	this file is the main logic controller
* 	use options.js to edit parameters
*/

$(document).ready(function() {
	$.simpleWeather({
		location: op[0],
		woeid: '',
		unit: op[5],
		success: function(weather) {
			temp = weather.temp;
			unit = weather.units.temp;
			console.log(temp);
			if (op[6] == true) {
				var toword = toWords(Math.round(temp));
				var output = toword.substring(0, toword.length - 1)+'&deg;';
			}
			else {
				var output = temp+'&deg;'+unit;
			}
			$('#weather').html(output);
		},
		error: function(error) {
			$('#weather').html(error);
		}
	});
	calculateTime();
	calulateDate();
	calculateDaysAlive();
	setInterval(calculateTime, 2000);
});


function calculateTime() {
	var militarytime = op[4];
	var currentTime = new Date();
	var hour = currentTime.getHours();
	var ampm = hour >= 12 ? 'pm' : 'am';
	var minutes = currentTime.getMinutes();
	var minute = currentTime.getMinutes();
	if (!militarytime) {
		hour = hour % 12;
		hour = (hour) ? hour : 12;
		if (hour < 10) { hour = '0' + hour; }
		if (minute < 10) { minute = '0' + minute; }
	} 
	else {
		ampm = '';
		if (minute < 10) { minute = '0' + minute; }
		if (hour < 10) { hour = '0' + hour; }
	}
	document.getElementById('time').innerText = hour+':'+minute+' '+ampm;
}
function calulateDate() {
	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth()+1;
	var curr_year = d.getFullYear();
	document.getElementById('date').innerText = curr_month+'.'+curr_date+'.'+curr_year;
}
function calculateDaysAlive() {
	var today = new Date;
	var year = op[1];
	var month = op[2]-1;
	var day = op[3];
	var bday = new Date(year, month, day);
	var msperday = 1000 * 60 * 60 * 24;
	var ageindays = Math.floor((today - bday)/msperday);
	document.getElementById('daysalive').innerText = numberWithCommas(ageindays)+' days';
}
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}