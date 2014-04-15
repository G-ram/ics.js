/*
	Copyright 2014 Graham Gobieski

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see [http://www.gnu.org/licenses/].
*/
function ICS(PRODID){
	var that = this;
	if(typeof PRODID == 'undefined' || typeof PRODID != 'string'){console.log("PRODID is not set or is not a string.");}
	this.PRODID = PRODID;
	this.header = "BEGIN:VCALENDAR\nMETHOD:PUBLISH\nVERSION:2.0\n";
	this.header += "PRODID:-"+this.PRODID+"\n";
	this.events = "";
	this.footer = "END:VCALENDAR";
	this.addEvent = function(options){
		var currentTime = new Date();
		var currentEvent = "BEGIN:VEVENT\n";
		currentEvent += "CREATED:"+ICSFormatDate(new Date())+"\n";
		if(typeof options.UID != 'undefined' && typeof options.UID == 'string'){
			currentEvent += "UID:"+options.UID+"\n"; 
		}else{
			currentEvent += "UID:"+("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).substr(-4);
			currentEvent += "\n";
		}
		if(typeof options.DTSTART != 'undefined' && Object.prototype.toString.call(options.DTSTART) == '[object Date]'){
			currentEvent += "DTSTART:"+ICSFormatDate(options.DTSTART)+"\n"; 
		}else{
			console.log("Start time has either not been set or is not a date object");
		}
		if(typeof options.DTEND != 'undefined' && Object.prototype.toString.call(options.DTEND) == '[object Date]'){
			currentEvent += "DTEND:"+ICSFormatDate(options.DTEND)+"\n"; 
		}else{
			console.log("End time has either not been set or is not a date object");
		}
		currentEvent += "DTSTAMP:"+ICSFormatDate(new Date())+"\n";
		if(typeof options.SUMMARY != 'undefined' && typeof options.SUMMARY == 'string'){
			currentEvent += "SUMMARY:"+options.SUMMARY+"\n";
		}else if(typeof options.SUMMARY != 'undefined'){
			console.log("Summary is not a string");
		}
		if(typeof options.LOCATION != 'undefined'){
			currentEvent += "LOCATION:"+options.LOCATION+"\n";
		}else if(typeof options.LOCATION != 'undefined'){
			console.log("Location is not a string");
		}
		if(typeof options.DESCRIPTION != 'undefined'){
			currentEvent += "DESCRIPTION:"+options.DESCRIPTION+"\n";
		}else if(typeof options.DESCRIPTION != 'undefined'){
			console.log("Description is not a string");
		}
		if(typeof options.URL != 'undefined'){
			currentEvent += "URL:"+options.URL+"\n";
		}else if(typeof options.URL != 'undefined'){
			console.log("URL is not a string");
		}
		if(typeof options.ORGANIZER != 'undefined'){
			currentEvent += "ORGANIZER:"+options.ORGANIZER+"\n";
		}else if(typeof options.ORGANIZER != 'undefined'){
			console.log("Organizer is not a string");
		}
		if(typeof options.EXDATE != 'undefined'){
			currentEvent += "EXDATE:"+options.EXDATE;
		}else if(typeof options.RRULE != 'undefined'){
			console.log("EXDATE is not a string");
		}
		if(typeof options.RRULE != 'undefined'){
			currentEvent += "RRULE:"+options.RRULE+"\n";
		}else if(typeof options.RRULE != 'undefined'){
			console.log("Recurence Rule is not a string");
		}
		currentEvent += "END:VEVENT\n";
		that.events += currentEvent;
	}
	this.toString = function(){
		return that.header+that.events+that.footer;
	}
	this.download = function(filename){
		var calendar = that.header+that.events+that.footer;
		var blob = new Blob([calendar], {type: "text/plain;charset=utf-8"});
		saveAs(blob, filename+".ics");
	}
	this.clearEvents = function(){
		that.events = "";
	}
}
function ICSFormatDate(d, dateonly){
	var pad = function(i){
		return (i < 10 ? '0': '') + i;
	};
	var s = d.getFullYear();
	s += pad(d.getMonth() + 1);
	s += pad(d.getDate());
	if(!dateonly){
		s += 'T';
		s += pad(d.getHours());
		s += pad(d.getMinutes());
		s += pad(d.getSeconds());
	}
	return s;
}