module.exports = function (date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }
    const stringDate = date.toLocaleDateString('pt-br', options)
    const [sdate, time] = stringDate.split(' ')
    const [day, month, year] = sdate.split('/')
    const [hour, minute, second] = time.split(':')

    function updateDate (time, type) {
      switch(type) {
        case 'mon':
          date.setMonth(date.getMonth() + time);
          break;
        case 'day':
          date.setDate(date.getDate() + time);
          break;
        case 'min':
          date.setMinutes(date.getMinutes() + time);
          break;
        case 'sec':
          date.setSeconds(date.getSeconds() + time);
          break;
      }

      return date;
    }

    return {
      day: day,
      month: month,
      year: year,
      hour: hour,
      minute: minute,
      second: second,
      intDay: parseInt(day),
      intMonth: parseInt(month),
      intYear: parseInt(year),
      intHour: parseInt(hour),
      intMinute: parseInt(minute),
      intSecond: parseInt(second),
      formattedDate: sdate,
      formattedTime: time,
      formattedFull: stringDate,
      updateDate
    }
}