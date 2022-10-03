export const isObject = (x) => typeof x === 'object' && !Array.isArray(x) && Object.keys(x).length > 0
/**
 * convert date to str
 * desc yy-mm-dd
 */
import {M_MONTHS} from "~/composables/master";
export const localDate = (date, short, withTime, usingNumber, withSecond) => {
  if (!date || (date && typeof date !== 'string')) return ''

  const days = date && (date || '').split(' ')
  const times = withTime ? ((days && days[1]) || '').split(':') : []
  const temp = ((days && days[0]) || '').split('-')
  return `${[
    temp[2],
    usingNumber ? temp[1] : short ? M_MONTHS[Number(temp[1]) - 1].substr(0, 3) : M_MONTHS[Number(temp[1]) - 1],
    temp[0],
  ].join(usingNumber ? '/' : ' ')} ${
    withTime ? ` pukul ${withSecond ? [times[0], times[1], times[2]].join(':') : [times[0], times[1]].join(':')}` : ''
  }`
}

export const localTime = (time, options = {}) => {
  if (!time || (time && typeof time !== 'string')) return ''
  let result = ''
  const times = time ? time.split(':') : []
  result = [times[0], times[1]].join('.')

  if (options.prefix) {
    result = options.prefix + ` ${result}`
  }

  if (options.suffix) {
    result = `${result} ` + options.suffix
  }

  return result
}

export const duration = (start, end, options) => {
  options = options || {}

  // set default options
  let str = ''
  const shortDate = !!options.shortDate
  const separator = options.separator || '-'

  // format date
  if (typeof start === 'string') {
    start = new Date(start.replace(/-/g, '/'))
  } else if (!(start instanceof Date)) {
    start = new Date(start)
  }

  if (typeof end === 'string') {
    end = new Date(end.replace(/-/g, '/'))
  } else if (!(end instanceof Date)) {
    end = new Date(end)
  }

  if (!!start.getDate() && !!end.getDate()) {
    // same year
    if (start.getYear() === end.getYear()) {
      // same month
      if (start.getMonth() === end.getMonth()) {
        // same date
        if (start.getDate() === end.getDate()) {
          str = [
            start.getDate(),
            shortDate ? M_MONTHS[start.getMonth()].substr(0, 3) : M_MONTHS[start.getMonth()],
            start.getFullYear(),
          ]

          // different date
        } else {
          str = [
            start.getDate(),
            separator,
            end.getDate(),
            shortDate ? M_MONTHS[start.getMonth()].substr(0, 3) : M_MONTHS[start.getMonth()],
            start.getFullYear(),
          ]
        }

        // different month
      } else {
        str = [
          start.getDate(),
          shortDate ? M_MONTHS[start.getMonth()].substr(0, 3) : M_MONTHS[start.getMonth()],
          separator,
          end.getDate(),
          shortDate ? M_MONTHS[end.getMonth()].substr(0, 3) : M_MONTHS[end.getMonth()],
          start.getFullYear(),
        ]
      }

      // different year
    } else {
      str = [
        start.getDate(),
        shortDate ? M_MONTHS[start.getMonth()].substr(0, 3) : M_MONTHS[start.getMonth()],
        start.getFullYear(),
        separator,
        end.getDate(),
        shortDate ? M_MONTHS[end.getMonth()].substr(0, 3) : M_MONTHS[end.getMonth()],
        end.getFullYear(),
      ]
    }

    str = str.join(' ')
  }

  return str
}

export const durationYear = (start, end) => {
  let str = ''

  if (!start) {
    str = '-'
  } else {
    str = start + ' - ' + (!end || new Date(end).getFullYear() === Number(end) ? 'Sekarang' : end)
  }

  return str
}

export const getAge = (date, format) => {
  const today = new Date()
  const birthDate = new Date(date)
  const m = today.getMonth() - birthDate.getMonth()
  let age = today.getFullYear() - birthDate.getFullYear()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age = age - 1
  }

  if (format && format.ageOnly) {
    return age
  }

  return `${age} th ${m} bln`
}

export const getLatestDate = (array) =>
  new Date(
    Math.max(
      ...array.map((date) => {
        return new Date(date)
      })
    )
  )

export const pad = (number) => {
  let r = String(number)
  return r.length === 1 ? '0' + r : r
}

export const dateToString = (date) =>
  date.getFullYear() +
  '-' +
  pad(date.getMonth() + 1) +
  '-' +
  pad(date.getDate()) +
  ' ' +
  pad(date.getHours()) +
  ':' +
  pad(date.getMinutes()) +
  ':' +
  pad(date.getSeconds())

/**
 * get value object by desc key
 * desc string with .
 */
export const getDeepObj = (obj, desc) => {
  const arr = desc.split('.')
  if (obj === null) return ''
  while (arr.length && (obj = obj[arr.shift()])) {
    if (!arr.length) {
      return obj || {}
    }
  }
}

import httpBuildQuery from 'http-build-query'
export const queryString = (params, q = false) => {
  const str = httpBuildQuery(params)
  return q ? `?${str}` : str
}

export const fAlamat = (arrayAlamat) => {
  const a = arrayAlamat
  return `
  ${a[0] ? a[0] : ''}
  ${a[1] ? `RT ${a[1]}` : ''}
  ${a[2] ? `, RW ${a[2]}` : ''}
  ${a[3] ? `, Kel. ${a[3]}` : ''}
  ${a[4] ? `, Kec. ${a[4]}${a[5] ? '' : ''}` : ''}
  ${a[5] ? `<br/>${a[5]}${a[6] ? ' - ' : ''}` : ''}
  ${a[6] ? `Prov. ${a[6]}` : ''}
  `
}

export const isJson = (text) => {
  try {
    JSON.parse(text)
  } catch (e) {
    return false
  }
  return true
}

export const removeEmptyObject = (obj) => {
  let newObj = {}
  Object.keys(obj).forEach((prop) => {
    // check is value adalah object
    if (isObject(obj[prop])) {
      let temp = removeEmptyObject(obj[prop])
      newObj[prop] = temp
    } else {
      if (obj[prop] !== '') {
        newObj[prop] = obj[prop]
      }
    }
  })
  return newObj
}

export const fkata = (array) => {
  return [array.slice(0, -1).join(', '), array.slice(-1)[0]].join(array.length < 2 ? '' : ' dan ')
}

export const titleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

export const stringToHtml = (str) => {
  return String(str || '').replace(/(?:\r\n|\r|\n)/g, '<br>')
}

/**
 * convert arr to obj
 * desc string with .
 */
export const isArray = (x) => x instanceof Array && x.length > 0

export const range = (start, end, step = 1) => {
  // Test that the first 3 arguments are finite numbers.
  // Using Array.prototype.every() and Number.isFinite().
  const allNumbers = [start, end, step].every(Number.isFinite)

  // Throw an error if any of the first 3 arguments is not a finite number.
  if (!allNumbers) {
    throw new TypeError('range() expects only finite numbers as arguments.')
  }

  // Ensure the step is always a positive number.
  if (step <= 0) {
    throw new Error('step must be a number greater than 0.')
  }

  // When the start number is greater than the end number,
  // modify the step for decrementing instead of incrementing.
  if (start > end) {
    step = -step
  }

  // Determine the length of the array to be returned.
  // The length is incremented by 1 after Math.floor().
  // This ensures that the end number is listed if it falls within the range.
  const length = Math.floor(Math.abs((end - start) / step)) + 1

  // Fill up a new array with the range numbers
  // using Array.from() with a mapping function.
  // Finally, return the new array.
  return Array.from(Array(length), (x, index) => start + index * step)
}

export const arrayToObject = (array, key) =>
  array.reduce((obj, item) => {
    obj[isArray(item) ? item[0] : isObject(item) ? item[`${key}`] || item.id || item.key : item] = item
    return obj
  }, {})

export const assetsUrl = (url) => {
  /* eslint-disable no-useless-escape */
  const pattern = new RegExp('^((http(s)?(://))|//)')
  url = pattern.test(url) ? url : require(`@/assets/img/${url}`)
  return url
}

export const getUrlExtension = (url) => {
  return url.split(/\#|\?/)[0].split('.').pop().trim()
}

export const arrayFlat = (arr, d = 1) => {
  return d > 0
    ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? arrayFlat(val, d - 1) : val), [])
    : arr.slice()
}

export const chunkArray = (myArray, chunk_size) => {
  let results = []
  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size))
  }
  return results
}

export const currency = (data, n, x, s, c) => {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = Number(data).toFixed(Math.max(0, ~~n))

  return (c ? num.replace(',', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || '.'))
}

export const compareDate = (cDate = new Date(), bDate, nDate) => {
  let resultBDate = false
  let resultNDate = false

  if (bDate) {
    resultBDate = new Date(cDate.toUTCString()) > new Date(new Date(bDate).toUTCString())
  }

  if (nDate) {
    resultNDate = new Date(cDate.toUTCString()) < new Date(new Date(nDate).toUTCString())
  }

  return bDate && nDate ? resultBDate && resultNDate : bDate ? resultBDate : resultNDate
}

export const compareValues = (key, order = 'asc') => {
  return function innerSort(a, b) {
    if (!a[key] || !b[key]) {
      return 0
    }

    const varA = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key]
    const varB = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key]

    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return order === 'desc' ? comparison * -1 : comparison
  }
}

export const showMore = (value, isActived = false, maxLength = 200) => {
  if (!isActived && value.length > maxLength) {
    return `${value.slice(0, maxLength)}....`
  } else {
    return value
  }
}

export const isLongText = (value, maxLength) => {
  if (typeof value !== 'string') return ''
  else return (value || '').length > maxLength
}

export const roundDecimal = (number) => Math.round((number + Number.EPSILON) * 100) / 100

export const toRomanize = (value) => {
  let lookup = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    },
    roman = '',
    i
  for (i in lookup) {
    while (value >= lookup[i]) {
      roman += i
      value -= lookup[i]
    }
  }
  return roman
}
