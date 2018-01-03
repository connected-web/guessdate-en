/* eslint-env mocha */
const assert = require('assert')
const guessDate = require('../')

const fixedTime = new Date(1486940936 * 1000) // Sun Feb 12 2017 23:08:56 GMT

// set this to true to understand why a test may be breaking
guessDate.debug = false

const testResults = []

function test (input, expected, referenceTime) {
  referenceTime = referenceTime || fixedTime

  const result = {
    referenceTime,
    input,
    expected
  }

  const spec = it(`should match '${input}' as ${expected}`, () => {
    const actual = guessDate(referenceTime, input).toUTCString()
    assert.deepEqual(actual, expected)

    result.actual = actual
  })

  result.section = spec.parent.title
  result.title = spec.title

  testResults.push(result)
}

describe('Guess Date', () => {
  describe('Empty Input', () => {
    test('', 'Sun, 12 Feb 2017 23:08:56 GMT')
  })

  describe('Database Years', () => {
    test('2015-05-25', 'Mon, 25 May 2015 08:00:00 GMT')
  })

  describe('Day of Week Matchers', () => {
    test('Next sunday', 'Sun, 19 Feb 2017 08:00:00 GMT')
    test('on Monday', 'Mon, 13 Feb 2017 08:00:00 GMT')
    test('Tues', 'Tue, 14 Feb 2017 08:00:00 GMT')
    test('wednesday', 'Wed, 15 Feb 2017 08:00:00 GMT')
    test('thursda', 'Thu, 16 Feb 2017 08:00:00 GMT')
    test('Fri', 'Fri, 17 Feb 2017 08:00:00 GMT')
    test('Satur', 'Sat, 18 Feb 2017 08:00:00 GMT')
    test('Sun', 'Sun, 19 Feb 2017 08:00:00 GMT')
  })

  describe('Time of day strings', () => {
    test('evening', 'Sun, 12 Feb 2017 18:00:00 GMT')
    test('Monday evenig', 'Mon, 13 Feb 2017 18:00:00 GMT')
    test('Friday eve', 'Fri, 17 Feb 2017 18:00:00 GMT')

    test('morning', 'Sun, 12 Feb 2017 08:00:00 GMT')
    test('Monday morn', 'Mon, 13 Feb 2017 08:00:00 GMT')
    test('Friday mornin', 'Fri, 17 Feb 2017 08:00:00 GMT')

    test('afternoon', 'Sun, 12 Feb 2017 13:00:00 GMT')
    test('Monday afternoon', 'Mon, 13 Feb 2017 13:00:00 GMT')
    test('Friday noon', 'Fri, 17 Feb 2017 12:00:00 GMT')
    test('Friday midday', 'Fri, 17 Feb 2017 12:00:00 GMT')
  })

  describe('Month of year strings', () => {
    test('Jan', 'Mon, 01 Jan 2018 08:00:00 GMT')
    test('Febru evenig', 'Wed, 01 Feb 2017 18:00:00 GMT')
    test('March eve', 'Wed, 01 Mar 2017 18:00:00 GMT')
    test('April', 'Sat, 01 Apr 2017 08:00:00 GMT')
    test('May eve', 'Mon, 01 May 2017 18:00:00 GMT')
    test('June morn', 'Thu, 01 Jun 2017 08:00:00 GMT')
    test('July mornin', 'Sat, 01 Jul 2017 08:00:00 GMT')
    test('August mornin', 'Tue, 01 Aug 2017 08:00:00 GMT')
    test('Sept eve', 'Fri, 01 Sep 2017 18:00:00 GMT')
    test('September 15th eve', 'Fri, 15 Sep 2017 18:00:00 GMT')
    test('September 15th eve', 'Fri, 15 Sep 2017 18:00:00 GMT', new Date(1501575669788))
    test('October mornin', 'Sun, 01 Oct 2017 08:00:00 GMT')
    test('November mornin', 'Wed, 01 Nov 2017 08:00:00 GMT')
    test('December eve', 'Fri, 01 Dec 2017 18:00:00 GMT')
  })

  describe('Tomorrow', () => {
    test('tomorrow', 'Mon, 13 Feb 2017 08:00:00 GMT')
    test('tomorrow after work', 'Mon, 13 Feb 2017 17:00:00 GMT')
    test('tomorrow before lunch', 'Mon, 13 Feb 2017 11:00:00 GMT')
    test('tomorrow at 8am', 'Mon, 13 Feb 2017 08:00:00 GMT')
  })

  describe('After points in time', () => {
    test('Monday after breakfast', 'Mon, 13 Feb 2017 07:00:00 GMT')
    test('Tuesday after work', 'Tue, 14 Feb 2017 17:00:00 GMT')
    test('Wednesday after lunch', 'Wed, 15 Feb 2017 13:00:00 GMT')
    test('Thursday after school', 'Thu, 16 Feb 2017 16:00:00 GMT')
  })

  describe('Before points in time', () => {
    test('Monday before breakfast', 'Mon, 13 Feb 2017 06:00:00 GMT')
    test('Tuesday before work', 'Tue, 14 Feb 2017 07:00:00 GMT')
    test('Wednesday before lunch', 'Wed, 15 Feb 2017 11:00:00 GMT')
    test('Thursday before school', 'Thu, 16 Feb 2017 07:00:00 GMT')
  })

  describe('Dates in month', () => {
    test('24th', 'Fri, 24 Feb 2017 08:00:00 GMT')
    test('26th', 'Sun, 26 Feb 2017 08:00:00 GMT')
    test('evening of the 30th', 'Thu, 02 Mar 2017 18:00:00 GMT')
    test('January 1st', 'Mon, 01 Jan 2018 08:00:00 GMT')
    test('May 21st', 'Sun, 21 May 2017 08:00:00 GMT')
    test('1st February', 'Wed, 01 Feb 2017 08:00:00 GMT')
    test('2nd February after lunch', 'Thu, 02 Feb 2017 13:00:00 GMT')
    test('1st March', 'Wed, 01 Mar 2017 08:00:00 GMT')
    test('23rd August', 'Wed, 23 Aug 2017 08:00:00 GMT')
    test('4pm on the 25th March', 'Sat, 25 Mar 2017 16:00:00 GMT')
    test('March 25th at 2am', 'Sat, 25 Mar 2017 02:00:00 GMT')
    test('Sat May 27, 2017', 'Sat, 27 May 2017 08:00:00 GMT')
  })

  describe('Year', () => {
    test('May 27, 2018', 'Sun, 27 May 2018 08:00:00 GMT')
    test('May 27, 2016', 'Fri, 27 May 2016 08:00:00 GMT')
    test('January 2018', 'Mon, 01 Jan 2018 08:00:00 GMT')
  })

  describe('Time in day', () => {
    test('11:23', 'Sun, 12 Feb 2017 11:23:00 GMT')
    test('11am', 'Sun, 12 Feb 2017 11:00:00 GMT')
    test('11pm', 'Sun, 12 Feb 2017 23:00:00 GMT')
    test('15:59', 'Sun, 12 Feb 2017 15:59:00 GMT')
    test('5:15am', 'Sun, 12 Feb 2017 05:15:00 GMT')
    test('5:45pm', 'Sun, 12 Feb 2017 17:45:00 GMT')
    test('20:15', 'Sun, 12 Feb 2017 20:15:00 GMT')
    test('25:05', 'Mon, 13 Feb 2017 01:05:00 GMT')
    test('21:03:30', 'Sun, 12 Feb 2017 21:03:30 GMT')
  })

  describe('Mixed date and time', () => {
    test('6th December 2017 20:15', 'Wed, 06 Dec 2017 20:15:00 GMT')
  })
})

function logTestResults () {
  const path = require('path')
  const fs = require('fs')
  const filepath = path.join(__dirname, 'guess-date-tests.json')
  fs.writeFileSync(filepath, JSON.stringify(testResults, null, 2), 'utf8')
  console.log('Test results logged to:', filepath)
}

function generateMarkdown () {
  const path = require('path')
  const fs = require('fs')
  const filepath = path.join(__dirname, 'guess-date-tests.md')

  const sections = testResults.reduce((acc, item) => {
    acc[item.section] = acc[item.section] || []
    acc[item.section].push(item)
    return acc
  }, {})

  const contents = Object.keys(sections).reduce((acc, key) => {
    const section = sections[key]
    acc.push(`### ${key}`, '', '```')
    section.forEach(result => acc.push([`guessDate(now, '${result.input}')`.padEnd(43), `// ${result.actual}`].join('')))
    acc.push('```', '')
    return acc
  }, ['## Examples', '```', `const now = new Date('${fixedTime}') // The following tests assume this as the reference date`, '```', ''])

  fs.writeFileSync(filepath, contents.join('\n'), 'utf8')
  console.log('Test markdown logged to:', filepath)
}

after(() => {
  logTestResults()
  generateMarkdown()
})
