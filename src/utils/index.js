/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

export class Calendar {
  static now = new Date() // 当前日期
  static nowDayOfWeek = Calendar.now.getDay() // 今天本周的第几天
  static nowDay = Calendar.now.getDate() // 当前日
  static nowMonth = Calendar.now.getMonth() // 当前月
  static nowYear = Calendar.now.getYear() < 2000 ? Calendar.now.getYear() + 1900 : Calendar.now.getYear() // 当前年

  static lastMonthDate = new Date(Calendar.nowYear, Calendar.nowMonth - 1, 1) // 上月日期
  static lastYear = Calendar.lastMonthDate.getYear()
  static lastMonth = Calendar.lastMonthDate.getMonth()

  static nextMonthDate = new Date(Calendar.nowYear, Calendar.nowMonth + 1, 1) // 下月日期
  static nextYear = Calendar.nextMonthDate.getYear()
  static nextMonth = Calendar.nextMonthDate.getMonth()
  constructor() {
    this.startDate = null
    this.endDate = null
  }

  /**
   * Parse the time to string, 'YY-MM-DD'
   * @param {(Date)} value
   * @returns {string}
   */
  formatDate(value) {
    const date = value
    const seperator = '-'
    const joinYear = date.getFullYear()
    let joinMonth = date.getMonth() + 1
    let joinDate = date.getDate()
    if (joinMonth >= 1 && joinMonth <= 9) {
      joinMonth = '0' + joinMonth
    }
    if (joinDate >= 0 && joinDate <= 9) {
      joinDate = '0' + joinDate
    }
    return joinYear + seperator + joinMonth + seperator + joinDate
  }

  // 获得某月的天数
  getMonthDays(myMonth) {
    const monthStartDate = new Date(Calendar.nowYear, myMonth, 1)
    const monthEndDate = new Date(Calendar.nowYear, myMonth + 1, 1)
    const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
    return days
  }

  // 本周
  getNowWeek() {
    this.startDate = new Date(Calendar.nowYear, Calendar.nowMonth, Calendar.nowDay - Calendar.nowDayOfWeek + 1)
    this.endDate = new Date(Calendar.nowYear, Calendar.nowMonth, Calendar.nowDay - Calendar.nowDayOfWeek + 7)
    return { startDate: this.formatDate(this.startDate), endDate: this.formatDate(this.endDate) }
  }

  // 上周
  getLastWeek() {
    this.startDate = new Date(Calendar.nowYear, Calendar.nowMonth, Calendar.nowDay - Calendar.nowDayOfWeek - 6)
    this.endDate = new Date(Calendar.nowYear, Calendar.nowMonth, Calendar.nowDay - Calendar.nowDayOfWeek)
    return { startDate: this.formatDate(this.startDate), endDate: this.formatDate(this.endDate) }
  }

  // 下周
  getNextWeek() {
    this.startDate = new Date(Calendar.nowYear, Calendar.nowMonth, Calendar.nowDay - Calendar.nowDayOfWeek + 8)
    this.endDate = new Date(Calendar.nowYear, Calendar.nowMonth, Calendar.nowDay - Calendar.nowDayOfWeek + 14)
    return { startDate: this.formatDate(this.startDate), endDate: this.formatDate(this.endDate) }
  }

  // 下两周
  getNextTwoWeek() {
    this.startDate = new Date(Calendar.nowYear, Calendar.nowMonth, Calendar.nowDay - Calendar.nowDayOfWeek + 15)
    this.endDate = new Date(Calendar.nowYear, Calendar.nowMonth, Calendar.nowDay - Calendar.nowDayOfWeek + 21)
    return { startDate: this.formatDate(this.startDate), endDate: this.formatDate(this.endDate) }
  }

  // 下周other
  getNextWeekOther() {
    this.startDate = new Date(Calendar.nowYear, Calendar.nowMonth, Calendar.nowDay - Calendar.nowDayOfWeek + 2)
    this.endDate = new Date(Calendar.nowYear, Calendar.nowMonth, Calendar.nowDay - Calendar.nowDayOfWeek + 8)
    return { startDate: this.formatDate(this.startDate), endDate: this.formatDate(this.endDate) }
  }

  // 下两周other
  getNextTwoWeekOther() {
    this.startDate = new Date(Calendar.nowYear, Calendar.nowMonth, Calendar.nowDay - Calendar.nowDayOfWeek + 9)
    this.endDate = new Date(Calendar.nowYear, Calendar.nowMonth, Calendar.nowDay - Calendar.nowDayOfWeek + 22)
    return { startDate: this.formatDate(this.startDate), endDate: this.formatDate(this.endDate) }
  }

  // 本月
  getNowMonth() {
    this.startDate = new Date(Calendar.nowYear, Calendar.nowMonth, 1)
    this.endDate = new Date(Calendar.nowYear, Calendar.nowMonth, this.getMonthDays(Calendar.nowMonth))
    return { startDate: this.formatDate(this.startDate), endDate: this.formatDate(this.endDate) }
  }

  // 上月
  getLastMonth() {
    this.startDate = new Date(Calendar.nowYear, Calendar.lastMonth, 1)
    this.endDate = new Date(Calendar.nowYear, Calendar.lastMonth, this.getMonthDays(Calendar.lastMonth))
    return { startDate: this.formatDate(this.startDate), endDate: this.formatDate(this.endDate) }
  }

  // 下月
  getNextMonth() {
    this.startDate = new Date(Calendar.nowYear, Calendar.nextMonth, 1)
    this.endDate = new Date(Calendar.nowYear, Calendar.nextMonth, this.getMonthDays(Calendar.nextMonth))
    return { startDate: this.formatDate(this.startDate), endDate: this.formatDate(this.endDate) }
  }

  // 本年
  getNowYear() {
    this.startDate = new Date(Calendar.nowYear, 0, 1)
    this.endDate = new Date(Calendar.nowYear, 11, 31)
    return { startDate: this.formatDate(this.startDate), endDate: this.formatDate(this.endDate) }
  }

  // 全部
  getAll() {
    this.startDate = new Date(2010, 0, 1)
    this.endDate = new Date(Calendar.nowYear + 1, 0, 1)
    return { startDate: this.formatDate(this.startDate), endDate: this.formatDate(this.endDate) }
  }
}
