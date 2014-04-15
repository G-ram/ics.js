# ical.js

ical.js is a small piece of Javascript code, which generates for download ical calendar files on the client side.

## Installation

git clone https://github.com/G-ram/ics.js

```html
<script src="ical.js"></script>
```

###Dependencies

Blob.js - [Github](https://github.com/eligrey/Blob.js/)
```html
	<script src="http://rawgithub.com/eligrey/Blob.js/master/Blob.js"></script>
```
Filesaver.js - [Github](https://github.com/eligrey/FileSaver.js/)
```html
	<script src="http://rawgithub.com/eligrey/FileSaver.js/master/FileSaver.js"></script>
```


## Example

```javascript
var cal = new calendar("g-ram//calendar");

cal.addEvent({
	UID: "RaNd0mN0nSeNSe"
	DTSTART: new Date(),
    DTEND: new Date(new Date().getTime() + 3600000),
    SUMMARY: "Test Event",
    DESCRIPTION: "This is a test",
    LOCATION: "Hamilton 406",
    ORGANIZER: "Me",
    URL: "http://www.snazzystudios.com",
    EXDATE: ICSFormatDate(new Date().getTime() - 1200000)+","+ICSFormatDate(new Date().getTime() + 4800000),
    RRULE: "FREQ=WEEKLY;UNTIL="+ICSFormatDate(new Date().getTime() + 3600000)
});

cal.download("MyCalendar")
```


## API

### new calendar(PRODID)
Use this method to create a new calendar object. PRODID is a string that represent the calendar's PRODID element (see documentation on ICS files for more information)

### addEvent(options)
Add an event. Options is an plain object, that configure the event.

#### options.UID (String)
Event UID. If not set, an UID will be generated randomly.

#### options.DTSTART (Date Object, required)
Appointment date of beginning

#### options.DTEND (Date Object, required)
Appointment date of end

#### options.SUMMARY (String)
Appointment summary

#### options.DESCRIPTION (String)
Appointment description

#### options.LOCATION (String)
Appointment location

#### options.ORGANIZER (String)
Appointment organizer

#### options.EXDATE (String)
List of dates to exclude for a repeated event (see documentation on ICS files for more information)

#### options.RRULE (String)
Recurrence rule (see documentation on ICS files for more information)

#### options.URL (String)
Appointment Website

### download(filename)
Downloads the ics file. "filename" is a string that is the name of the ics file to be downloaded. The program will automatically tack on an ".ics" ending to the filename.

### toString()
Return calendar as a String.

### clearEvents()
Reset the calender object.

### ICSFormatDate(d,dateOnly)
Formats any date object into the format that .ics files require.
```javascript
ICSFormatDate(new Date(2014,5,1));
```


##Browser Support

Supported Browsers
------------------

| Browser        | Constructs as | Filenames    | Max Blob Size | Dependencies |
| -------------- | ------------- | ------------ | ------------- | ------------ |
| Firefox 20+    | Blob          | Yes          | 800 MiB       | None         |
| Firefox < 20   | data: URI     | No           | n/a           | [Blob.js](https://github.com/eligrey/Blob.js) |
| Chrome         | Blob          | Yes          | 345 MiB       | None         |
| Chrome for Android | Blob      | Yes          | ?             | None         |
| IE 10+         | Blob          | Yes          | 600 MiB       | None         |
| Opera 15+      | Blob          | Yes          | 345 MiB       | None         |
| Opera < 15     | data: URI     | No           | n/a           | [Blob.js](https://github.com/eligrey/Blob.js) |
| Safari 6.1+*   | Blob          | No           | ?             | None         |
| Safari < 6     | data: URI     | No           | n/a           | [Blob.js](https://github.com/eligrey/Blob.js) |

###Note: Safari may not entirely support this library 
