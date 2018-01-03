# Guess Date (EN)

Guess an english date string, returns a javascript date object.

## Usage

### Node JS

Add to your node js project:
```
npm i --save guessdate-en
```

Then:
```
const guessDate = require('guessdate-en')
const date = guessDate('April 31st after lunch')
console.log('Guesed date: ' + date)
```

### Web / HTML

Include using our CDN link, or copy `guess-date.js` into your project:
```
<!DOCTYPE HTML>
<html>
  <head>
  <title>Guess Date (EN) Example</title>
  <script src="https://cdn.rawgit.com/connected-web/guessdate-en/1.0.0/src/guess-date.js" type="text/javascript"></script>
  </head>
  <body>
    <script type="text/javascript">
    document.write('Next Monday at 6:20pm', guessDate('Next Monday at 6:20pm'))
    </script>
  </body>
</html>
```

## API

### `guessDate(inputString)`

- `inputString`: the natural language string to guess a date and time from, relative to `Date.now()`

`returns` a javascript `Date` object

### `guessDate(dateContext, inputString)`

- `dateContext`: a `Date` object from which to apply the guess to, defaults to `Date.now()`
- `inputString`: the natural language string to guess a date and time from

`returns` a javascript `Date` object

## Examples
```
const guessDate = require('guessdate-en') // or const guessDate = window.guessDate
const now = new Date('Sun Feb 12 2017 23:08:56 GMT+0000 (GMT)') // The following examples assume this as the reference date
```

### Empty Input

```
guessDate(now, '')                         // Sun, 12 Feb 2017 23:08:56 GMT
```

### Day of Week Matchers

```
guessDate(now, 'Next sunday')              // Sun, 19 Feb 2017 08:00:00 GMT
guessDate(now, 'on Monday')                // Mon, 13 Feb 2017 08:00:00 GMT
guessDate(now, 'Tues')                     // Tue, 14 Feb 2017 08:00:00 GMT
guessDate(now, 'wednesday')                // Wed, 15 Feb 2017 08:00:00 GMT
guessDate(now, 'thursda')                  // Thu, 16 Feb 2017 08:00:00 GMT
guessDate(now, 'Fri')                      // Fri, 17 Feb 2017 08:00:00 GMT
guessDate(now, 'Satur')                    // Sat, 18 Feb 2017 08:00:00 GMT
guessDate(now, 'Sun')                      // Sun, 19 Feb 2017 08:00:00 GMT
```

### Time of day strings

```
guessDate(now, 'evening')                  // Sun, 12 Feb 2017 18:00:00 GMT
guessDate(now, 'Monday evenig')            // Mon, 13 Feb 2017 18:00:00 GMT
guessDate(now, 'Friday eve')               // Fri, 17 Feb 2017 18:00:00 GMT
guessDate(now, 'morning')                  // Sun, 12 Feb 2017 08:00:00 GMT
guessDate(now, 'Monday morn')              // Mon, 13 Feb 2017 08:00:00 GMT
guessDate(now, 'Friday mornin')            // Fri, 17 Feb 2017 08:00:00 GMT
guessDate(now, 'afternoon')                // Sun, 12 Feb 2017 13:00:00 GMT
guessDate(now, 'Monday afternoon')         // Mon, 13 Feb 2017 13:00:00 GMT
guessDate(now, 'Friday noon')              // Fri, 17 Feb 2017 12:00:00 GMT
guessDate(now, 'Friday midday')            // Fri, 17 Feb 2017 12:00:00 GMT
```

### Month of year strings

```
guessDate(now, 'Jan')                      // Mon, 01 Jan 2018 08:00:00 GMT
guessDate(now, 'Febru evenig')             // Wed, 01 Feb 2017 18:00:00 GMT
guessDate(now, 'March eve')                // Wed, 01 Mar 2017 18:00:00 GMT
guessDate(now, 'April')                    // Sat, 01 Apr 2017 08:00:00 GMT
guessDate(now, 'May eve')                  // Mon, 01 May 2017 18:00:00 GMT
guessDate(now, 'June morn')                // Thu, 01 Jun 2017 08:00:00 GMT
guessDate(now, 'July mornin')              // Sat, 01 Jul 2017 08:00:00 GMT
guessDate(now, 'August mornin')            // Tue, 01 Aug 2017 08:00:00 GMT
guessDate(now, 'Sept eve')                 // Fri, 01 Sep 2017 18:00:00 GMT
guessDate(now, 'September 15th eve')       // Fri, 15 Sep 2017 18:00:00 GMT
guessDate(now, 'September 15th eve')       // Fri, 15 Sep 2017 18:00:00 GMT
guessDate(now, 'October mornin')           // Sun, 01 Oct 2017 08:00:00 GMT
guessDate(now, 'November mornin')          // Wed, 01 Nov 2017 08:00:00 GMT
guessDate(now, 'December eve')             // Fri, 01 Dec 2017 18:00:00 GMT
```

### Tomorrow

```
guessDate(now, 'tomorrow')                 // Mon, 13 Feb 2017 08:00:00 GMT
guessDate(now, 'tomorrow after work')      // Mon, 13 Feb 2017 17:00:00 GMT
guessDate(now, 'tomorrow before lunch')    // Mon, 13 Feb 2017 11:00:00 GMT
guessDate(now, 'tomorrow at 8am')          // Mon, 13 Feb 2017 08:00:00 GMT
```

### After points in time

```
guessDate(now, 'Monday after breakfast')   // Mon, 13 Feb 2017 07:00:00 GMT
guessDate(now, 'Tuesday after work')       // Tue, 14 Feb 2017 17:00:00 GMT
guessDate(now, 'Wednesday after lunch')    // Wed, 15 Feb 2017 13:00:00 GMT
guessDate(now, 'Thursday after school')    // Thu, 16 Feb 2017 16:00:00 GMT
```

### Before points in time

```
guessDate(now, 'Monday before breakfast')  // Mon, 13 Feb 2017 06:00:00 GMT
guessDate(now, 'Tuesday before work')      // Tue, 14 Feb 2017 07:00:00 GMT
guessDate(now, 'Wednesday before lunch')   // Wed, 15 Feb 2017 11:00:00 GMT
guessDate(now, 'Thursday before school')   // Thu, 16 Feb 2017 07:00:00 GMT
```

### Dates in month

```
guessDate(now, '24th')                     // Fri, 24 Feb 2017 08:00:00 GMT
guessDate(now, '26th')                     // Sun, 26 Feb 2017 08:00:00 GMT
guessDate(now, 'evening of the 30th')      // Thu, 02 Mar 2017 18:00:00 GMT
guessDate(now, 'January 1st')              // Mon, 01 Jan 2018 08:00:00 GMT
guessDate(now, 'May 21st')                 // Sun, 21 May 2017 08:00:00 GMT
guessDate(now, '1st February')             // Wed, 01 Feb 2017 08:00:00 GMT
guessDate(now, '2nd February after lunch') // Thu, 02 Feb 2017 13:00:00 GMT
guessDate(now, '1st March')                // Wed, 01 Mar 2017 08:00:00 GMT
guessDate(now, '23rd August')              // Wed, 23 Aug 2017 08:00:00 GMT
guessDate(now, '4pm on the 25th March')    // Sat, 25 Mar 2017 16:00:00 GMT
guessDate(now, 'March 25th at 2am')        // Sat, 25 Mar 2017 02:00:00 GMT
guessDate(now, 'Sat May 27, 2017')         // Sat, 27 May 2017 08:00:00 GMT
```

### Year

```
guessDate(now, 'May 27, 2018')             // Sun, 27 May 2018 08:00:00 GMT
guessDate(now, 'May 27, 2016')             // Fri, 27 May 2016 08:00:00 GMT
guessDate(now, 'January 2018')             // Mon, 01 Jan 2018 08:00:00 GMT
```

### Time in day

```
guessDate(now, '11:23')                    // Sun, 12 Feb 2017 11:23:00 GMT
guessDate(now, '11am')                     // Sun, 12 Feb 2017 11:00:00 GMT
guessDate(now, '11pm')                     // Sun, 12 Feb 2017 23:00:00 GMT
guessDate(now, '15:59')                    // Sun, 12 Feb 2017 15:59:00 GMT
guessDate(now, '5:15am')                   // Sun, 12 Feb 2017 05:15:00 GMT
guessDate(now, '5:45pm')                   // Sun, 12 Feb 2017 17:45:00 GMT
guessDate(now, '20:15')                    // Sun, 12 Feb 2017 20:15:00 GMT
guessDate(now, '25:05')                    // Mon, 13 Feb 2017 01:05:00 GMT
guessDate(now, '21:03:30')                 // Sun, 12 Feb 2017 21:03:30 GMT
```

### Mixed date and time

```
guessDate(now, '6th December 2017 20:15')  // Wed, 06 Dec 2017 20:15:00 GMT
```
