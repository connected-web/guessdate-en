(function () {
  const LOG_TABS = '     '
  const SECOND = 1000
  const MINUTE = SECOND * 60
  const HOUR = MINUTE * 60
  const DAY = HOUR * 24

  const DayOfWeekMatcher = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)u?s?n?e?s?r?s?d?a?y?$/i
  const MonthOfYearMatcher = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[ruarychileyustemober]*$/i
  const DateInMonthMatcher = /^(\d\d?)[nrdsth]{2}$/i
  const TimeOfDayMatcher = /^(1?\d):?([0-5]\d)?(am|pm)$/i
  const YearMonthDayMatcher = /^(\d\d\d?\d?)[/\\|,.-]([0-1]\d)[/\\|,.-]([0-2]\d)$/i
  const ExactTimeOfDayMatcher = /^([1-2]?\d):([0-5]\d):?([0-5]\d)?$/i
  const YearMatcher = /^(\d\d\d\d)$/i
  const RogueNumberMatcher = /^(\d?\d),?$/i

  const matchers = [{
    regex: ExactTimeOfDayMatcher,
    handler: matchExactTimeOfDay
  }, {
    regex: TimeOfDayMatcher,
    handler: matchTimeOfDay
  }, {
    regex: DayOfWeekMatcher,
    handler: matchDayOfWeek
  }, {
    regex: MonthOfYearMatcher,
    handler: matchMonthOfYear
  }, {
    regex: /^even?i?n?g?$/i,
    handler: matchEvening
  }, {
    regex: /^before$/i,
    handler: matchBefore
  }, {
    regex: /^after$/i,
    handler: matchAfter
  }, {
    regex: /^morn?i?n?g?$/i,
    handler: matchMorning
  }, {
    regex: /^afterno?o?n?$/i,
    handler: matchAfternoon
  }, {
    regex: /^noon?$/i,
    handler: matchMidday
  }, {
    regex: /^midda?y?$/i,
    handler: matchMidday
  }, {
    regex: /^tomor[row]*$/i,
    handler: matchTomorrow
  }, {
    regex: DateInMonthMatcher,
    handler: matchDateInMonth
  }, {
    regex: RogueNumberMatcher,
    handler: matchRogueNumber
  }, {
    regex: YearMatcher,
    handler: matchYear
  }, {
    regex: YearMonthDayMatcher,
    handler: matchYearMonthDay
  }]

  const applyHours = (hours) => {
    return {
      setUTCHours: hours
    }
  }

  function matchRogueNumber (token, tokens, context) {
    let dateInMonth = Number.parseInt(token.match(RogueNumberMatcher)[1])

    return {
      setUTCDate: dateInMonth
    }
  }

  function matchYear (token, tokens, context) {
    let year = Number.parseInt(token.match(YearMatcher)[1])

    return {
      setUTCFullYear: year
    }
  }

  function matchExactTimeOfDay (token, tokens, context) {
    let time = token.match(ExactTimeOfDayMatcher)
    let hours = Number.parseInt(time[1])
    let minutes = Number.parseInt(time[2])
    let seconds = Number.parseInt(time[3])

    let setUTCSeconds = seconds || undefined

    return {
      setUTCHours: hours,
      setUTCMinutes: minutes,
      setUTCSeconds: setUTCSeconds
    }
  }

  function matchTimeOfDay (token, tokens, context) {
    let hours = Number.parseInt(token.match(TimeOfDayMatcher)[1])
    let minutes = Number.parseInt(token.match(TimeOfDayMatcher)[2]) || 0
    let amOrPm = token.match(TimeOfDayMatcher)[3].toLowerCase()
    hours = hours + ((amOrPm === 'pm') ? 12 : 0)

    return {
      setUTCHours: hours,
      setUTCMinutes: minutes
    }
  }

  function matchDateInMonth (token, tokens, context) {
    let dateInMonth = Number.parseInt(token.match(DateInMonthMatcher)[1])

    return {
      setUTCDate: dateInMonth
    }
  }

  function matchTomorrow (token, tokens, context) {
    let now = context.getTime()
    let future = new Date(now + DAY)

    return {
      setUTCFullYear: future.getUTCFullYear(),
      setUTCMonth: future.getUTCMonth(),
      setUTCDate: future.getUTCDate()
    }
  }

  function matchAfter (token, tokens, context) {
    const subject = tokens.shift()
    const subjects = {
      work: applyHours(17),
      lunch: applyHours(13),
      school: applyHours(16),
      breakfast: applyHours(7)
    }

    return subjects[subject] || {}
  }

  function matchBefore (token, tokens, context) {
    const subject = tokens.shift()
    const subjects = {
      work: applyHours(7),
      lunch: applyHours(11),
      school: applyHours(7),
      breakfast: applyHours(6)
    }

    return subjects[subject] || {}
  }

  function matchEvening (token, tokens, context) {
    return {
      setUTCHours: 18
    }
  }

  function matchMorning (token, tokens, context) {
    return {
      setUTCHours: 8
    }
  }

  function matchAfternoon (token, tokens, context) {
    return {
      setUTCHours: 13
    }
  }

  function matchMidday (token, tokens, context) {
    return {
      setUTCHours: 12
    }
  }

  function matchMonthOfYear (token, tokens, context) {
    let key = token.match(MonthOfYearMatcher)[1].toLowerCase()
    let monthOffset = {
      'jan': 0,
      'feb': 1,
      'mar': 2,
      'apr': 3,
      'may': 4,
      'jun': 5,
      'jul': 6,
      'aug': 7,
      'sep': 8,
      'oct': 9,
      'nov': 10,
      'dec': 11
    }[key]

    if (!Number.isInteger(monthOffset)) {
      throw new Error('Unrecognised month of the year: ' + monthOffset)
    }

    let now = context.getTime()
    let future = new Date(now)
    future.setUTCMonth(monthOffset)
    if (context.getMonth() > monthOffset) {
      future.setUTCFullYear(context.getUTCFullYear() + 1)
    }

    return {
      setUTCFullYear: future.getUTCFullYear(),
      setUTCMonth: future.getUTCMonth()
    }
  }

  function matchDayOfWeek (token, tokens, context) {
    let key = token.match(DayOfWeekMatcher)[1].toLowerCase()
    let dayOffset = {
      'sun': 0,
      'mon': 1,
      'tue': 2,
      'wed': 3,
      'thu': 4,
      'fri': 5,
      'sat': 6
    }[key]

    if (!Number.isInteger(dayOffset)) {
      throw new Error('Unrecognised day of the week: ' + dayOffset)
    }

    dayOffset = (dayOffset - context.getDay() + 7) % 7 || 7
    let now = context.getTime()
    let future = new Date(now + (dayOffset * DAY))

    return {
      setUTCFullYear: future.getUTCFullYear(),
      setUTCMonth: future.getUTCMonth(),
      setUTCDate: future.getUTCDate()
    }
  }

  function matchYearMonthDay (token, tokens, context) {
    let year = Number.parseInt(token.match(YearMonthDayMatcher)[1].toLowerCase())
    let month = Number.parseInt(token.match(YearMonthDayMatcher)[2].toLowerCase())
    let day = Number.parseInt(token.match(YearMonthDayMatcher)[3].toLowerCase())

    return {
      setUTCFullYear: year,
      setUTCMonth: month - 1,
      setUTCDate: day
    }
  }

  function tokenize (inputString) {
    let plainText = (inputString + '').replace(/[^a-z0-9+:/-]+/gi, ' ')
    let sanitized = plainText.replace(/\s+/gi, ' ')
    let tokens = sanitized.split(' ')
    return tokens
  }

  function dateFor (dateString, context) {
    let tokens = tokenize(dateString)
    let token

    let results = []
    while (tokens.length > 0) {
      token = tokens.shift()
      matchers.forEach(function (matcher) {
        if (matcher.regex.test(token)) {
          let result = matcher.handler(token, tokens, context)
          if (guessDate.debug) {
            console.log(LOG_TABS, 'Matched', JSON.stringify(result))
          }
          results.push(result)
        };
      })
    }

    const decisions = {}
    if (results.length > 0) {
      results.forEach(function (item) {
        Object.keys(item).forEach(function (key) {
          let value = item[key]
          decisions[key] = value
        })
      })

      if (Number.isInteger(decisions.setUTCFullYear)) {
        decisions.setUTCMonth = decisions.setUTCMonth || 0
      }
      if (Number.isInteger(decisions.setUTCMonth)) {
        decisions.setUTCDate = decisions.setUTCDate || 1
      }
      if (Number.isInteger(decisions.setUTCDate)) {
        decisions.setUTCHours = decisions.setUTCHours || 8
      }
      if (Number.isInteger(decisions.setUTCHours)) {
        decisions.setUTCMinutes = decisions.setUTCMinutes || 0
      }
      if (Number.isInteger(decisions.setUTCMinutes)) {
        decisions.setUTCSeconds = decisions.setUTCSeconds || 0
      }
    }

    let date = new Date(context)
    Object.keys(decisions).forEach(function (key) {
      let value = decisions[key]
      date[key](value)
    })

    return date
  }

  function guessDate (dateContext, dateString) {
    if (dateContext && !dateString) {
      dateString = dateContext
      dateContext = new Date()
    }

    let entry = dateFor(dateString, dateContext)
    if (guessDate.debug) {
      console.log(LOG_TABS, 'Intepreted date', dateContext.toUTCString(), dateString, 'as', entry.toUTCString())
    }
    return entry
  }

  if (typeof module !== 'undefined') {
    module.exports = guessDate
  }

  if (typeof window !== 'undefined') {
    window.guessDate = guessDate
  }
})()
